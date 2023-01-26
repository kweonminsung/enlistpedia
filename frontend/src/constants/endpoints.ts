export const SERVER_URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'https://api.enlistpedia.org'
    : 'http://localhost:8000';

export const DOMAIN =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'https://enlistpedia.org'
    : 'http://localhost:3000';
