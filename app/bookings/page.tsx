'use client';

import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import './bookings.css';

import { MdAirlineSeatReclineNormal, MdGasMeter } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { GiCarWheel } from "react-icons/gi";

interface Car {
  id: string;
  carAvg: number;
  carType: string;
  image: { url: string };
  price: number;
  name: string;
  seat: number;
}

interface Location {
  cityLocation: string;
}

interface Booking {
  rentalplan: string;
  addons: string[];
  pickuptime: string;
  dropofftime: string;
  email: string;
  contactno: string;
  createdAt: string;
  location: Location;
  carList: Car[];
}

const GET_BOOKINGS = gql`
  query Bookings {
    bookings {
      rentalplan
      addons
      pickuptime
      dropofftime
      email
      contactno
      createdAt
      location {
        cityLocation
      }
      carList {
        id
        carAvg
        carBrand
        carType
        image {
          url
        }
        price
        name
        seat
      }
    }
  }
`;

const BookingsPage = () => {
  const { data, loading, error } = useQuery(GET_BOOKINGS);
  const [fallbackData, setFallbackData] = useState<{ bookings: Booking[] } | null>(null);

  useEffect(() => {
    if (error) {
      setFallbackData({
        bookings: [
          {
            rentalplan: "Daily",
            addons: ["GPS", "Child Seat"],
            pickuptime: "2025-05-08T10:00:00Z",
            dropofftime: "2025-07-08T14:00:00Z",
            email: "rgranjitha94@gmail.com",
            contactno: "+91 1234567890",
            createdAt: "2025-05-01T12:00:00Z",
            location: { cityLocation: "Jog Falls" },
            carList: [
              {
                id: "1",
                carAvg: 35,
                carType: "manual",
                image: { url: "/suv.jpg" },
                price: 2000,
                name: "Toyota SUV",
                seat: 4,
              },
            ],
          },
        ],
      });
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;

  const bookings = fallbackData ? fallbackData.bookings : data?.bookings;

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>

      {bookings?.map((booking, idx) => (
        <div key={idx} className="booking">
          <div className="booking-details">
            <p><strong>Rental Plan:</strong> {booking.rentalplan}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Contact:</strong> {booking.contactno}</p>
            <p><strong>Pickup Location:</strong> {booking.location.cityLocation}</p>
            <p><strong>Pickup Date & Time:</strong> {new Date(booking.pickuptime).toLocaleString()}</p>
            <p><strong>Dropoff Date & Time:</strong> {new Date(booking.dropofftime).toLocaleString()}</p>
          </div>

          <div className="car-list">
            {booking.carList.map((car) => (
              <div key={car.id} className="car-card">
                <img src={car.image.url} alt={car.name} className="car-image" />
                <h3>{car.name}</h3>

                <div className="car-details">
                  <p><GiCarWheel /> <strong>Type:</strong><br />{car.carType}</p>
                  <p><MdAirlineSeatReclineNormal /> <strong>Seats:</strong><br />{car.seat}</p>
                  <p><MdGasMeter /> <strong>Mileage:</strong><br />{car.carAvg} MPG</p>
                  <p><PiCurrencyInrBold /> <strong>Price:</strong><br />₹{car.price}</p>
                </div>

                <button className="rent-button">Rented</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsPage;
