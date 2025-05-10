"use client";

import React, { useEffect, useState } from 'react';
import './CarCard.css';
import { MdAirlineSeatReclineNormal, MdGasMeter } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { GiCarWheel } from "react-icons/gi";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { addToWishlist } from "@/lib/wishlist/addToWishlist";
import { removeFromWishlist } from "@/lib/wishlist/removeFromWishlist";
import { getWishlist } from "@/lib/wishlist/getWishlist";
import { useUser } from "@clerk/nextjs";

const fallbackImage = '/images/default-image.jpg';

type WishlistResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

interface Car {
  id: string;
  name: string;
  price: number;
  seat: number;
  carBrand: string;
  carType: string;
  carAvg: number;
  image?: { url?: string | null } | null;
}

interface CarCardProps {
  car: Car;
  onAddToWishlist: (car: Car) => void;
  onRemoveFromWishlist: (carId: string) => void;
  isInWishlist: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onAddToWishlist, onRemoveFromWishlist, isInWishlist }) => {
  const imageUrl = car?.image?.url ? car.image.url : fallbackImage;

  const handleHeartClick = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(car.id);
    } else {
      onAddToWishlist(car);
    }
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <img src={imageUrl} alt={car.name || 'Car'} />
      </div>

      <h2 className="car-name">{car.name}</h2>

      <div className="car-info">
        <div className="car-info-row">
          <p className="car-detail">
            <PiCurrencyInrBold className="car-icon" />
            {car.price.toLocaleString()} / day
          </p>
          <p className="car-detail">
            <MdAirlineSeatReclineNormal className="car-icon" />
            {car.seat} Seats
          </p>
        </div>

        <div className="car-info-row">
          <p className="car-detail">
            <MdGasMeter className="car-icon" />
            {car.carAvg} MPG
          </p>
          <p className="car-detail">
            <GiCarWheel className="car-icon" />
            {car.carType}
          </p>
        </div>
      </div>

      <div className="car-actions">
        <button className="rent-btn">Rent Now</button>

        <span
          className={`heart-icon ${isInWishlist ? 'wishlisted' : ''}`}
          onClick={handleHeartClick}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
        </span>
      </div>
    </div>
  );
};

export default CarCard;
