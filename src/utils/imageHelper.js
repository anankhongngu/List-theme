// src/utils/ophimImage.js

export function buildImageMovieUrl(domain, path) {
  if (!domain || !path) return '';
  // Chuẩn hoá domain
  domain = domain.replace(/\/+$/, '');
  // Nếu đã là link đầy đủ thì trả luôn
  if (path.startsWith('http')) {
    return path;
  }
  // Nếu chỉ là filename => thêm uploads/movies/
  if (!path.includes('/')) {
    path = `uploads/movies/${path}`;
  }
  // Bỏ slash đầu nếu có
  path = path.replace(/^\/+/, '');

  return `${domain}/${path}`;
}