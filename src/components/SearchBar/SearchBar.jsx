import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';

export const SearchBar = ({ setQueryParams }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      toast.error('Please enter the value in the search field');
      return;
    }
    setQueryParams({ query });
  };

  const handleInputChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies ..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">
        <IoSearch />
      </button>
    </form>
  );
};
