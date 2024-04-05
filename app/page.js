"use client"

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'bo977eCNczwT30lXIgtLLpwMxDTMy4WS1oVL6F6RwWA';
const IMAGES_PER_PAGE = 20;

const Page = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-4 mt-10'>
      <h1>Image Search</h1>
      <div>
        <form onSubmit={handleSearch}>
          <label className="input input-bordered flex items-center gap-2 w-[300px]">
            <input type="text" className="grow" ref={searchInput} placeholder="Search" />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </button>
          </label>
        </form>
      </div>
      <div className='flex items-center gap-4'>
        <button className='btn btn-neutral' onClick={() => handleSelection('nature')}>Nature</button>
        <button className='btn btn-neutral' onClick={() => handleSelection('birds')}>Birds</button>
        <button className='btn btn-neutral' onClick={() => handleSelection('cats')}>Cats</button>
        <button className='btn btn-neutral' onClick={() => handleSelection('shoes')}>Shoes</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image,index) => {
          return (
            <div className="shadow-xl w-44" key={index}>
              <figure className="h-full"><img key={image.id} src={image.urls.small} alt={image.alt_description} className="h-full w-full object-cover rounded-md" /></figure>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page;
