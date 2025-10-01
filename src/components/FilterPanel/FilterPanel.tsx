import css from './FilterPanel.module.css';
import type { CarProps } from '../../types/car';
import { useEffect, useState } from 'react';
import { fetchBrands, fetchCars } from '../../services/carsApi';
import CustomSelect from '../CustomSelect/CustomSelect';
import toast from 'react-hot-toast';

interface FilterPanelProps {
  onFilter: (
    cars: CarProps[],
    totalPages: number,
    filters: Record<string, string>
  ) => void;
}

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState(''); // ✅ есть локальные стейты
  const [rentalPrice, setRentalPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  useEffect(() => {
    async function loadBrands() {
      try {
        const brands = await fetchBrands();
        setBrands(brands);
      } catch (err) {
        console.error('Error loading brands:', err);
      }
    }
    loadBrands();
  }, []);

  const numbers: string[] = [];
  for (let i = 10; i <= 200; i += 10) numbers.push(i.toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filters: Record<string, string> = {
      page: '1',
      brand: brand.trim(), // ✅ используем локальный стейт
      rentalPrice: rentalPrice.trim(),
      minMileage: minMileage.trim(),
      maxMileage: maxMileage.trim(),
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );

    if (Object.keys(cleanedFilters).length === 1) {
      alert('Please fill in at least one field');
      return;
    }

    try {
      const { cars, totalPages } = await fetchCars(
        cleanedFilters.page,
        cleanedFilters.brand,
        cleanedFilters.rentalPrice,
        cleanedFilters.minMileage,
        cleanedFilters.maxMileage
      );

      // Передаём результат наверх
      onFilter(cars, totalPages, filters);

      // Сбрасываем форму после успешного поиска
      setBrand('');
      setRentalPrice('');
      setMinMileage('');
      setMaxMileage('');
    } catch (err) {
      toast.error('Error fetching cars');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="brand" className={css.formLabel}>
          Car brand
        </label>
        <CustomSelect
          options={brands}
          value={brand || 'Choose a brand'}
          onChange={setBrand}
          buttonClass={`${css.select} ${css.selectBrand}`}
          listClass={`${css.optionsList} ${css.listBrand}`}
          itemClass={`${css.optionsItem} ${css.itemBrand}`}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="rentalPrice" className={css.formLabel}>
          Price/ 1 hour
        </label>
        <CustomSelect
          options={numbers}
          value={rentalPrice ? `To $${rentalPrice}` : 'Choose a price'}
          onChange={setRentalPrice}
          buttonClass={`${css.select} ${css.selectPrice}`}
          listClass={`${css.optionsList} ${css.listPrice}`}
          itemClass={`${css.optionsItem} ${css.itemPrice}`}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="minMileage" className={css.formLabel}>
          Сar mileage / km
        </label>
        <div>
          <div className={css.wrapper}>
            <span className={css.prefix}>From</span>
            <input
              id="minMileage"
              type="text"
              name="minMileage"
              value={
                minMileage ? Number(minMileage).toLocaleString('en-US') : ''
              }
              onChange={e => setMinMileage(e.target.value.replace(/\D/g, ''))}
              className={`${css.input} ${css.fromMileageInput}`}
            />
          </div>
          <div className={css.wrapper}>
            <span className={css.prefix}>To</span>
            <input
              id="maxMileage"
              type="text"
              name="maxMileage"
              value={
                maxMileage ? Number(maxMileage).toLocaleString('en-US') : ''
              }
              onChange={e => setMaxMileage(e.target.value.replace(/\D/g, ''))}
              className={`${css.input} ${css.toMileageInput}`}
            />
          </div>
        </div>
      </div>

      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
}
