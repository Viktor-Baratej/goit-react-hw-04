import styles from './ImageCard.module.css';

const ImageCard = ({ image, openModal, defineImageModalID }) => {
  const handleClick = id => {
    defineImageModalID(id);
    openModal(image);
  };
  return (
    <div className={styles.image_card}>
      <img
        className={styles.image_card_img}
        src={image.urls.small}
        alt={image.description}
        onClick={() => handleClick(image.id)}
      />
    </div>
  );
};
export default ImageCard;
