"use client";

import React, { useEffect, useState } from "react";
import CarCard from "@/components/Home/CarCard";
import { fetchAllCars } from "@/lib/hygraph/fetchCars";

interface Car {
  id: string;
  name: string;
  price: number;
  seat: number;
  carBrand: string;
  carType: string;
  carAvg: number;
  image?: { url: string | null };
  pickupLocation?: {
    cityLocation: string;
  };
  dropoffLocation?: {
    cityLocation: string;
  };
}

const WishlistPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(["car123", "car456"]); 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const allCars = await fetchAllCars();
      const filteredCars = allCars.filter((car: Car) =>
        wishlist.includes(car.id)
      );
      setCars(filteredCars);
    };

    if (wishlist.length > 0) {
      fetchData();
    }
  }, [wishlist]);

  return (
    <div className="wishlist-container">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {cars.length === 0 ? (
        <p>No cars</p>
      ) : (
        <div className="wishlist-grid grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onAddToWishlist={() => {}}
              onRemoveFromWishlist={() => {}}
              isInWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
