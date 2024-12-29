import { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
