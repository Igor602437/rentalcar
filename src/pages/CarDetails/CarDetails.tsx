import css from './CarDetails.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../services/carsApi';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { Icon } from '../../components/Icon/Icon';
import type { CarProps } from '../../types/car';
import RentForm from '../../components/RentForm/RentForm';

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadCar() {
      setLoading(true);
      try {
        const data = await fetchCarById(id!);
        setCar(data);
        if (!data) {
          toast.error('The car was not found. ❓');
        }
      } catch (err) {
        toast.error('Error loading vehicle 🚨');
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  }, [id]);

  if (loading) return <Loader />;
  if (!car) return toast.error('The car was not found. ❓');

  return (
    <section className={css.carDetailsSection}>
      <div className={css.carDetails}>
        <div className={css.carInfo}>
          <div className={css.infoTitle}>
            <h2 className={css.carTitle}>
              {car.brand} {car.model}, {car.year}
            </h2>
            <p className={css.carId}>id:{car.id}</p>
            <p className={`${css.carDetailsItem} ${css.rentAddress}`}>
              <Icon id="map" className={css.svgIcon} />
              {car.address.split(', ')[1]}, {car.address.split(', ')[2]}
              <span className={`${css.carDetailsItem} ${css.carMileage}`}>
                Mileage: {car.mileage.toLocaleString()} км
              </span>
            </p>
          </div>
          <p className={css.rentalPrice}>${car.rentalPrice}</p>
          <p className={`${css.carDetailsItem} ${css.carDescription}`}>
            {car.description}
          </p>

          <div className={css.techInfo}>
            <div>
              <h3 className={css.blockTitle}>Rental Conditions: </h3>
              <ul className={css.blokList}>
                {car.rentalConditions.map((item, index) => (
                  <li key={index} className={css.carDetailsItem}>
                    <Icon id="check" className={css.svgIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={css.blockTitle}>Car Specifications:</h3>
              <ul className={css.blokList}>
                <li className={css.carDetailsItem}>
                  <Icon id="calendar" className={css.svgIcon} />
                  Year: {car.year}
                </li>
                <li className={css.carDetailsItem}>
                  <Icon id="car" className={css.svgIcon} />
                  Type: {car.type}
                </li>
                <li className={css.carDetailsItem}>
                  <Icon id="fuel" className={css.svgIcon} />
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.carDetailsItem}>
                  <Icon id="gear" className={css.svgIcon} />
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div>
              <h3 className={css.blockTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.blokList}>
                {car.accessories.map((item, index) => (
                  <li key={index} className={css.carDetailsItem}>
                    <Icon id="check" className={css.svgIcon} />
                    {item}
                  </li>
                ))}
                {car.functionalities.map((item, index) => (
                  <li key={index} className={css.carDetailsItem}>
                    <Icon id="check" className={css.svgIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={css.photoForm}>
          <img src={car.img} alt={`${car.brand} ${car.model}`} />
          <RentForm />
        </div>
      </div>
    </section>
  );
}
