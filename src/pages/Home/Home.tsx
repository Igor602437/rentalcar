import { Link } from 'react-router-dom';
import css from './Home.module.css';

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.titleHero}>Find your perfect rental car</h1>
        <p className={css.description}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog">
          <button className={css.buttonCatalog}>View Catalog</button>
        </Link>
      </div>
    </section>
  );
}
