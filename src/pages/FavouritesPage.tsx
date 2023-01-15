import React from 'react';
import { useAppSelector } from '../hooks/redux';

const FavouritesPage = () => {
  const { favourites } = useAppSelector(state => state.github);

  if(favourites.length === 0) return <p className='text-center'>Нет элементов.</p>

  return (
    <div className='flex justify-center h-screen pt-[50px]'>
      <ul className='list-none'>
        { favourites.map(fav => (
          <li key={fav}>
            <a href={fav} target="_blank" rel="noreferrer">{fav}</a>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default FavouritesPage;