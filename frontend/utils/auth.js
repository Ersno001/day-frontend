import jwt_decode from 'jwt-decode';

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    return !!decoded;
  } catch {
    return false;
  }
}
