import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <div className={styles.button_container}>
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;
