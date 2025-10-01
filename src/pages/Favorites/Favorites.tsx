import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import CarList from '../../components/CarList/CarList';
import css from './Favorites.module.css';

export default function Favorites() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  if (!favorites || favorites.length === 0) {
    return (
      <h3 className={css.empty}>You don't have any favorite cars yet. 🚗</h3>
    );
  }

  return (
    <main>
      <div className={css.container}>
        <h2 className={css.favoriteTitle}>Your Favorite Cars</h2>
        <ul className={css.carList}>
          {favorites.map(car => (
            <li key={car.id} className={css.carItem}>
              <CarList car={car} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
