import axios from 'axios';

const token = process.env.REACT_APP_GITHUB_TOKEN;

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});