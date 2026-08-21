export const MOVIE_API_BASE = 'https://phimapi.com';

export const movieApi = {
  search: (keyword) =>
    `${MOVIE_API_BASE}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}`,

  detail: (slug) =>
    `${MOVIE_API_BASE}/phim/${slug}`,
};
