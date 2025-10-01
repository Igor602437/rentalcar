import axios from 'axios';
import type { CarProps } from '../types/car';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export interface CarsResponse {
  cars: CarProps[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export async function fetchCars(
  page: string,
  brand?: string,
  rentalPrice?: string,
  minMileage?: string,
  maxMileage?: string
): Promise<CarsResponse> {
  const axiosOptions = {
    params: {
      page,
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    },
  };
  const { data } = await axios.get<CarsResponse>('/cars', axiosOptions);

  return data;
}

export async function fetchCarById(id: string): Promise<CarProps> {
  const { data } = await axios.get<CarProps>(`/cars/${id}`);

  return data;
}

export async function fetchBrands(): Promise<string[]> {
  const { data } = await axios.get<string[]>('/brands');

  return data;
}
