import { News } from '../../interfaces';

const BASE_URL = 'http://localhost:3000/api/v1';

interface SearchParams {
  state?: string;
  topic?: string;
  search?: string;
}

export const getNews = async (): Promise<News[]> => {
  const response = await fetch(`${BASE_URL}/news`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return await response.json();
};

export const searchNews = async (params: SearchParams = {}): Promise<News[]> => {
  const searchParams = new URLSearchParams();

  if (params.state) {
    searchParams.append('state', params.state);
  }
  if (params.topic) {
    searchParams.append('topic', params.topic);
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }

  const queryString = searchParams.toString();
  const url = `${BASE_URL}/news${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search news');
  }
  return await response.json();
};
