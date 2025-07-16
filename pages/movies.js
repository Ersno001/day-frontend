import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    else fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const res = await axios.get('/movies');
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page">
      <Header />
      <h1>Каталог фильмов</h1>
      <div className="grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
