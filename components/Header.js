import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        DAYDREAM
      </div>
      <nav>
        <Link href="/movies">Каталог</Link>
        <Link href="/profile">Профиль</Link>
      </nav>
    </header>
  );
}
