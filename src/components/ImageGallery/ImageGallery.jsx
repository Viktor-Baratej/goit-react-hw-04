import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(function ImageGallery(props, ref) {
  const { images, openModal, defineImageModalID } = props;

  return (
    <ul ref={ref} className={styles.image_gallery}>
      {images.map(image => {
        return (
          <li className={styles.image_gallery_item} key={image.id}>
            <ImageCard
              image={image}
              openModal={openModal}
              defineImageModalID={defineImageModalID}
            />
          </li>
        );
      })}
    </ul>
  );
});
export default ImageGallery;
