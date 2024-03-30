/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/auth',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    console.log(getState());
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('Reauthenticating...');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original request with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export default createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
