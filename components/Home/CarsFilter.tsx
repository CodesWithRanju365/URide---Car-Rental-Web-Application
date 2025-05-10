"use client";

import React, { useState } from "react";
import './CarsFilter.module.css';
import { supabase } from '@/lib/supabaseClient'; 

interface FilterProps {
  onLocationFilter: (locations: { pickupLocation: string; dropLocation: string }) => void;
  onFilter: (filters: {
    price: string;
    brand: string;
    user_email: string;
    contact_no: string;
    rental_plan: string;
    addons: string[];
  }) => void;
}

const CarsFilter: React.FC<FilterProps> = ({ onLocationFilter, onFilter }) => {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [dropLocation, setDropLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [rentalPlan, setRentalPlan] = useState<string>("standard");
  const [addons, setAddons] = useState<string[]>([]);

  const handleLocationFilter = () => {
    if (pickupLocation && dropLocation) {
      onLocationFilter({ pickupLocation, dropLocation });
    }
  };

  const handleFilter = async () => {
    const { data, error } = await supabase.from("bookings").insert([
      {
        pickup_location: pickupLocation,
        drop_location: dropLocation,
        price,
        brand,
        user_email: userEmail,
        contact_no: contactNo,
        rental_plan: rentalPlan,
        addons,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Something went wrong");
    } else {
      console.log("Booking saved:", data);
      alert("Booking saved successfully! ");
    }

    onFilter({ price, brand, user_email: userEmail, contact_no: contactNo, rental_plan: rentalPlan, addons });
  };

  const clearFilters = () => {
    setPickupLocation("");
    setDropLocation("");
    setPrice("");
    setBrand("");
    setUserEmail("");
    setContactNo("");
    setRentalPlan("standard");
    setAddons([]);
  };

  return (
    <div className="wrapper">
      <div className="titleSection">
        <h2 className="heading">Filter Cars</h2>
        <div className="gridLayout">

          <div className="form-group">
            <label htmlFor="pickupLocation" className="label">Pickup Location</label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="select"
              placeholder="Enter Pickup Location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dropLocation" className="label">Drop Location</label>
            <input
              type="text"
              id="dropLocation"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="select"
              placeholder="Enter Drop Location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="label">Price</label>
            <select
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="select"
            >
              <option value="">Select Price Range</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brand" className="label">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="select"
              placeholder="Enter Car Brand"
            />
          </div>

          <div className="form-group">
            <label htmlFor="userEmail" className="label">Email</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="select"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNo" className="label">Contact Number</label>
            <input
              type="tel"
              id="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="select"
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rentalPlan" className="label">Rental Plan</label>
            <select
              id="rentalPlan"
              value={rentalPlan}
              onChange={(e) => setRentalPlan(e.target.value)}
              className="select"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Addons</label>
            <div className="addons-checkboxes">
              {["GPS", "Child Seat", "Wi-Fi"].map((addon) => (
                <label key={addon}>
                  <input
                    type="checkbox"
                    checked={addons.includes(addon)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAddons([...addons, addon]);
                      } else {
                        setAddons(addons.filter(a => a !== addon));
                      }
                    }}
                  />
                  {addon}
                </label>
              ))}
            </div>
          </div>

          <button className="filterButton" onClick={handleFilter}>Apply Filters</button>
          <button className="filterButton" onClick={handleLocationFilter}>Apply Location Filters</button>
          <button className="clearButton" onClick={clearFilters}>Clear Filters</button>

        </div>
      </div>
    </div>
  );
};

export default CarsFilter;
