"use client";

import React, { useState, useEffect, useRef } from "react";
import { Car } from "@/lib";
import CarCard from "./CarCard";
import "./CarsList.css";

const cityLocations = [
  "Mangalore", "Mysore", "Coorg", "Hampi", "Chikmagalur",
  "Gokarna", "Bandipur", "Bijapur", "Shimoga", "Jog Falls"
];

interface Props {
  cars: Car[];
}

const CarsList: React.FC<Props> = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setTimeout(() => {
      modalRef.current?.showModal();
    }, 0);
  };

  const closeModal = () => {
    modalRef.current?.close();
    setSelectedCar(null);
  };

  return (
    <div className="cars-list-container">
      {filteredCars.length === 0 ? (
        <p className="no-cars-message">No cars found</p>
      ) : (
        <div className="cars-list">
          {filteredCars.map((car) => (
            <div key={car.id} onClick={() => handleCardClick(car)}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}

      <dialog ref={modalRef} className="modal">
        {selectedCar && (
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-flex">
              {/* Left: Car Preview */}
              <div className="modal-car-preview">
                <CarCard car={selectedCar} />
              </div>

              {/* Right: Booking Form */}
              <div className="modal-details">
                <h2 className="modal-title">Book {selectedCar.name}</h2>
                <form className="modal-form" method="dialog" onSubmit={(e) => e.preventDefault()}>

                  {/* Pickup Row */}
                  <div className="modal-form-row">
                    <div className="modal-form-label-group">
                      <label className="modal-form-label">Pickup Location *</label>
                      <select className="modal-input" required>
                        <option value="">Select Pickup Location</option>
                        {cityLocations.map((city, idx) => (
                          <option key={idx} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div className="modal-form-label-group">
                      <label className="modal-form-label">Pickup Date & Time *</label>
                      <input type="datetime-local" required className="modal-input" />
                    </div>
                  </div>

                  {/* Drop-off Row */}
                  <div className="modal-form-row">
                    <div className="modal-form-label-group">
                      <label className="modal-form-label">Drop-off Location *</label>
                      <select className="modal-input" required>
                        <option value="">Select Drop-off Location</option>
                        {cityLocations.map((city, idx) => (
                          <option key={idx} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div className="modal-form-label-group">
                      <label className="modal-form-label">Drop-off Date & Time *</label>
                      <input type="datetime-local" required className="modal-input" />
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="modal-form-label-group">
                    <label className="modal-form-label">Add-ons (Optional)</label>
                    <div className="modal-checkboxes">
                      <label><input type="checkbox" /> GPS</label>
                      <label><input type="checkbox" /> Child Seat</label>
                      <label><input type="checkbox" /> Extra Driver</label>
                    </div>
                  </div>

                  {/* Rental Plan */}
                  <div className="modal-form-label-group">
                    <label className="modal-form-label">Rental Plan *</label>
                    <select className="modal-input" required>
                      <option value="">Select Plan</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="modal-form-label-group">
    <label className="modal-form-label">Contact No *</label>
    <input type="tel" className="modal-input" required pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" />
  </div>
  <div className="modal-form-label-group">
    <label className="modal-form-label">Email ID *</label>
    <input type="email" className="modal-input" required placeholder="Enter your email address" />
  </div>

                  {/* Action Buttons */}
                  <div className="modal-action">
                    <button type="submit" className="btn primary">Confirm Booking</button>
                    <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default CarsList;
