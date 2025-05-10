import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllCars } from '@/lib/hygraph/fetchCars'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔄 Starting fetchAllCars API route...');

    const cars = await fetchAllCars(); 
    console.log('Cars successfully fetched:', cars.length);

    

    res.status(200).json({ message: 'Successfully fetched cars.', cars });
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error('Error in fetchAllCars API route:', error.message);

    res.status(500).json({ message: 'Failed to fetch cars.', error: error.message });
  }
}
