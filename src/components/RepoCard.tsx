import React, { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/useActions';
import { IRepo } from '../models/models';

interface RepoCardProps {
  repo: IRepo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector(state => state.github);
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));
  
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    addFavourite(repo.html_url);
    setIsFav(true);
  }

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeFavourite(repo.html_url);
    setIsFav(false);
  }

  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm'>
          Forks: <span className='font-bold mr-2'>{repo.forks}</span>
          Watchers: <span className='font-bold'>{repo.watchers}</span>
        </p>
        <p className='text-sm font-thin'>{repo?.description}</p>
      </a>
      {!isFav && <button 
          className='py-2 px-3 bg-yellow-400 rounded mr-2 hover:shadow-md transition-all'
          onClick={(event) => addToFavourite(event)}
        >
          Add
      </button>}
      {isFav && <button 
          className='py-2 px-3 bg-red-400 rounded hover:shadow-md transition-all'
          onClick={(event) => removeFromFavourite(event)}
        >
          Remove
      </button>}
    </div>
  );
};

export default RepoCard;