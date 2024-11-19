import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const trimSearchQuery = searchQuery.trim();
    if (!trimSearchQuery) {
      toast.error('Please enter the value in the search field');
      return;
    }
    onSubmit(trimSearchQuery);
    setSearchQuery('');
  };

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies ..."
        name="searchQuery"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">
        <IoSearch />
      </button>
    </form>
  );
};
