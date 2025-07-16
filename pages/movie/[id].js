import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../utils/api';
import Header from '../../components/Header';

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) fetchMovie();
  }, [id]);

  async function fetchMovie() {
    try {
      const res = await axios.get(`/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      alert('Не удалось загрузить фильм');
    }
  }

  if (!movie) return <div>Загрузка...</div>;

  return (
    <div className="page">
      <Header />
      <div className="player-container">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <video controls src={movie.video_url} />
      </div>
    </div>
  );
}
