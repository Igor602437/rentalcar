import { useNavigate } from 'react-router-dom';
import type { CarProps } from '../../types/car';
// import { Icon } from '../../../public/sprite.svg';
import css from './CarList.module.css';
import { Icon } from '../Icon/Icon';

interface CarListProps {
  car: CarProps;
}

export default function CarList({ car }: CarListProps) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const favorites = useSelector(
  // (state: RootState) => state.favorites.favorites
  // );
  // const isFavorite = favorites.some(f => f.id === car.id);

  // const toggleFavorite = () => {
  //   if (isFavorite) {
  //     dispatch(removeFavorite(car.id));
  //   } else {
  //     dispatch(addFavorite(car));
  //   }
  // };

  const parts = car.address.split(',');
  const city = parts[1]?.trim() || '';
  const country = parts[2]?.trim() || '';
  const mile = car.mileage.toLocaleString('ru-RU');

  return (
    <div>
      <div className={css.imageWrapper}>
        <img src={car.img} alt={car.brand} className={css.image} />
        <button
          type="button"
          // onClick={toggleFavorite}
          className={css.favoriteButton}
        >
          {/* {isFavorite ? (
            <Icon id="hearton" className={css.activeIcon} />
          ) : ( */}
          <Icon id="heart" className={css.inactiveIcon} />
          {/* )} */}
        </button>
      </div>

      <div className={css.brand}>
        <h3 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h3>
        <p className={css.title}>${car.rentalPrice}</p>
      </div>

      <p className={`${css.description} ${css.company}`}>
        {city} | {country} | {car.rentalCompany}
      </p>
      <p className={`${css.description} ${css.mileage}`}>
        {car.type} | {mile} km
      </p>

      <button
        className={css.buttonDetails}
        onClick={() => navigate(`/catalog/${car.id}`)}
      >
        Read Details
      </button>
    </div>
  );
}
