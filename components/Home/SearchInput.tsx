"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRoute, FaCarSide, FaRupeeSign } from 'react-icons/fa';
import './SearchInput.css';

interface SearchInputProps {
  onFilter: (filters: { price: string; brand: string }) => void;
  onLocationFilter: (filters: { pickupLocation: string; dropLocation: string }) => void;
}

const touristCities = [
  "Shimoga", "Mysore", "Coorg", "Hampi", "Gokarna", "Chikmagalur", "Udupi", "Mangalore", "Bijapur", "Badami", "Bandipur", "Jog Falls"
];

const carBrands = [
  "Maruti Suzuki", "Hyundai", "Tata", "BMW", "Audi", "Honda", "Toyota", "Mahindra",
  "Kia", "Renault", "Volkswagen", "Skoda", "MG", "Ford", "Mercedes-Benz", "Jaguar",
  "Land Rover", "Mustang", "Camaro", "Force Traveller", "Tempo Traveller 12/14/16"
];

const SearchInput: React.FC<SearchInputProps> = ({ onFilter, onLocationFilter }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');

  const applyFilters = () => {
    onLocationFilter({ pickupLocation, dropLocation });
    onFilter({ price, brand });
  };

  return (
    <div className="page-wrapper">
      <div className="search-box">
        <div className="slogan">Find your ideal car with precise filters</div>

        <div className="input-group">
          <label htmlFor="pickup">Pick-Up Location:</label>
          <div className="input-row">
            <FaMapMarkerAlt className="input-icon" />
            <select
              id="pickup"
              className="dropdown-select"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {touristCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="drop">Drop-off Location:</label>
          <div className="input-row">
            <FaRoute className="input-icon" />
            <select
              id="drop"
              className="dropdown-select"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
            >
              <option value="">Select Drop Location</option>
              {touristCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="brand">Sort by Brand:</label>
          <div className="input-row">
            <FaCarSide className="input-icon" />
            <select
              id="brand"
              className="dropdown-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Choose Car Brand</option>
              {carBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="price">Sort by Price:</label>
          <div className="input-row">
            <FaRupeeSign className="input-icon" />
            <select
              id="price"
              className="dropdown-select"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>
        </div>

        <button className="search-button" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
