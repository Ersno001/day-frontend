import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="card">
        <img src={movie.poster_url} alt={movie.title} />
        <div className="card-title">{movie.title}</div>
      </div>
    </Link>
  );
}
