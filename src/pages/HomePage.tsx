import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data: users } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, // skip - в каких случаях не нужно выполнять запрос, принимает boolean значение
    refetchOnFocus: true // обновление данных при переключении вкладок на долгое время (автозапрос)
  });

  const [fetchRepos, { isLoading: isLoadingRepos, data: repos }] = useLazyGetUserReposQuery();

  const clickHandler = (login: string) => {
    fetchRepos(login);
    setDropdown(false);
  }

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-100'>
      {isError && <p className='text-center text-red-600'>Ошибка при поиске...</p>}

      <div className='relative w-[560px]'>
        <input 
          type="text"
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for Github username...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        /> 
        {dropdown && <ul className='list-none absolute top-[42px] left-0 right-0 overflow-y-scroll max-h-[200px] shadow-md bg-white'>
          { isLoading && <p className='text-center'>Загрузка...</p> }
          { users?.map(user => (
            <li 
              key={user.id}
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-poiner"
              onClick={() => clickHandler(user.login)}
            >
              {user.login}
            </li>
          )) }
        </ul>}
        <div className='container'>
          { isLoadingRepos && <p className='text-center'>Репозитории загружаются...</p> }
          { repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
        </div>
      </div>
    </div>
  );
};

export default HomePage;