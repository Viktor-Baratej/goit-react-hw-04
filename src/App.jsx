import { useEffect, useState } from 'react';
import { fetchImages } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageID, setSelectedImageID] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchGallery = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        if (data.results.length === 0) {
          toast.error('No images found for your search.');
          setHasMore(false);
          return;
        }

        setImages(prevImages => [...prevImages, ...data.results]);
        setHasMore(data.results.length > 0);
      } catch (err) {
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [query, page]);

  const handleSearch = searchQuery => {
    if (query === searchQuery) return;

    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const defineImageModalID = id => {
    setSelectedImageID(id);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          defineImageModalID={defineImageModalID}
          openModal={openModal}
        />
      )}
      {isLoading && <Loader />}
      {hasMore && !isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {showModal && selectedImage && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          images={images}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
