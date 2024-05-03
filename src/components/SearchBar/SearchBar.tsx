import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative  mx-auto p-3 w-1/3">
      <div className="absolute p-3 right-3" >
        <FaSearch className="text-gray-500" />
      </div>

      {/* Input Box */}
      <input
        type="text"
        placeholder="Search movies here"
        className="w-full h-10 pl-4 pr-10 border border-white bg-transparent rounded-xl text-white focus:outline-none focus:border-white"
      />
    </div>
  );
};

export default SearchBar;