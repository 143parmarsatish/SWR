import React from 'react';

const SearchBox = () => {
  return (
    <div className="mb-2 flex justify-center">
      <input
        type="text"
        placeholder="Search Stocks"
        className="border h-11 p-2 w-70 rounded-l-full outline-0 border-r-0"
      />
      <button className="border p-2 bg-gray-100 rounded-r-full border-l-0">
        Search
      </button>
    </div>
  );
};

export default SearchBox;
