import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IRepo, IServerResponse, IUser } from '../../models/models';

export const githubAPI = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      // callback, позволяющий трансформировать данные из ответа
      transformResponse: (response: IServerResponse<IUser>) => response.items 
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (login: string) => ({
        url: `users/${login}/repos`
      })
    }),  
  })
});

// lazy hook - позволяет воспроизводить запрос не при инициализации хука, а в нужный момент, после инициализации
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubAPI;