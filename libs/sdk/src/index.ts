// export * as SDK from './lib/generated/sdk';
export * from './lib/generated/apollo';
import * as _SDK from './lib/generated/sdk';
import createAxios from 'axios';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';

const graphqlEndpoint = 'http://localhost:8080/v1/graphql';
let accessToken = '';
const httpLink = new HttpLink({
  uri: graphqlEndpoint,
  credentials: 'include',
  headers: {
    get Authorization() {
      if (accessToken) return `Bearer ${accessToken}`;
      return '';
    },
  },
});
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export const axios = createAxios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});
export const login = (email: string, password: string) => {
  return axios
    .post('/login', {
      email,
      password,
    })
    .then(async (response) => {
      console.log(response.data.accessToken);
      await apolloClient.resetStore();
      accessToken = response.data.accessToken;
      return response;
    });
};
export const SDK = _SDK;

const graphQLClient = new GraphQLClient(graphqlEndpoint, {
  credentials: 'include',
});
export const sdk = SDK.getSdk(graphQLClient);
export const useLogin = () => {
  return (email: string, password: string) =>
    sdk
      .login({
        email,
        password,
      })
      .then((res) => {
        if (res.login?.accessToken) accessToken = res.login.accessToken;
        return res;
      });
};
