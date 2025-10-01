import { useEffect, useState } from 'react';
import css from './Catalog.module.css';
import { fetchCars } from '../../services/carsApi';
import type { CarProps } from '../../types/car';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import CarList from '../../components/CarList/CarList';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

export default function Catalog() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>(
    {}
  );

  const loadCars = async (
    pageNumber: number,
    filters?: Record<string, string>
  ) => {
    setLoading(true);
    try {
      const { cars: fetchedCars, totalPages: fetchedTotalPages } =
        await fetchCars(
          pageNumber.toString(),
          filters?.brand,
          filters?.rentalPrice,
          filters?.minMileage,
          filters?.maxMileage
        );

      if (pageNumber === 1) {
        setCars(fetchedCars);
      } else {
        setCars(prev => [...prev, ...fetchedCars]);
      }

      setTotalPages(fetchedTotalPages);
    } catch (err) {
      console.error('Error loading cars:', err);
      toast.error('Failed to load cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars(1);
  }, []);

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCars(nextPage, currentFilters);
    }
  };

  const handleFilter = (
    filteredCars: CarProps[],
    totalFilteredPages: number,
    filters: Record<string, string>
  ) => {
    setCars(filteredCars);
    setPage(1);
    setTotalPages(totalFilteredPages);
    setCurrentFilters(filters);
  };

  if (loading) return <Loader />;

  return (
    <main>
      <div className={css.container}>
        <h2 className={css.visuallyHidden}>Car catalog</h2>

        <FilterPanel onFilter={handleFilter} />
        <ul className={css.carList}>
          {cars.map(car => (
            <li key={car.id} className={css.carItem}>
              <CarList car={car} />
            </li>
          ))}
        </ul>
        {page < totalPages && (
          <button
            type="button"
            className={css.buttonLoadMore}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </main>
  );
}
