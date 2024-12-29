import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({
  imageModalID,
  images,
  isOpen,
  onRequestClose,
  style,
}) => {
  const [showImage] = images.filter(image => image.id === imageModalID);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
      shouldCloseOnOverlayClick={true}
    >
      {showImage && (
        <div className={styles.image_modal}>
          <img
            className={styles.image_modal_img}
            src={showImage.urls.regular}
            alt={showImage.description}
          />
          <ul className={styles.image_modal_list}>
            <li>
              Author:
              <span className={styles.image_modal_info}>
                {showImage.user.first_name} {showImage.user.last_name}
              </span>
            </li>

            <li>
              Likes:
              <span className={styles.image_modal_info}>{showImage.likes}</span>
            </li>

            <li>
              Description:
              <span className={styles.image_modal_info}>
                {showImage.alt_description}
              </span>
            </li>
          </ul>
        </div>
      )}
    </ReactModal>
  );
};

export default ImageModal;
