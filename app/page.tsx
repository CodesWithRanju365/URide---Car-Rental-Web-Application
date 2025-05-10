"use client";

import React, { useEffect, useState, useRef } from "react";
import { gql, request } from "graphql-request";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import CarsList from "@/components/Home/CarsList";
import Carousel from "@/components/Carousel";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Car } from "@/lib";

interface CarResponse {
  carLists: Car[];
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const carListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await fetchCarsData();
        setCars(result.carLists || []);
        setFilteredCars(result.carLists || []);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleLocationFilter = ({
    pickupLocation,
    dropLocation,
  }: {
    pickupLocation: string;
    dropLocation: string;
  }) => {
    let filtered = [...cars];

    if (pickupLocation) {
      filtered = filtered.filter((car) => {
        const pickupCity = car.pickupLocation?.cityLocation;
        return (
          pickupCity && pickupCity.toLowerCase() === pickupLocation.toLowerCase()
        );
      });
    }

    if (dropLocation) {
      filtered = filtered.filter((car) => {
        const dropCity = car.dropoffLocation?.cityLocation;
        return (
          dropCity && dropCity.toLowerCase() === dropLocation.toLowerCase()
        );
      });
    }

    setFilteredCars(filtered);
  };

  const handleFilter = (filters: { price: string; brand: string }) => {
    let filtered = [...cars];

    if (filters.price === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.price === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (filters.brand) {
      const brandFilter = filters.brand.toLowerCase().trim();

      filtered = filtered.filter((car) => {
        const carBrands = Array.isArray(car.carBrand)
          ? car.carBrand.map((brand) => brand.toLowerCase())
          : [car.carBrand.toLowerCase()];

        return carBrands.includes(brandFilter);
      });
    }

    setFilteredCars(filtered);
  };

  const scrollToCars = () => {
    if (carListRef.current) {
      carListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10">
      
      <Hero onExploreCars={scrollToCars} />
      <SearchInput
        onFilter={handleFilter}
        onLocationFilter={handleLocationFilter}
      />
      <div ref={carListRef}>
        <CarsList cars={filteredCars} />
      </div>
      <Carousel />
      <FAQ />
      <Footer />
    </div>
  );
}

async function fetchCarsData(): Promise<CarResponse> {
  try {
    const result = await request<CarResponse>(
      "https://ap-south-1.cdn.hygraph.com/content/cm9sam4di03pf08vyfqd73smc/master",
      gql`
        query CarLists {
          carLists(first: 50) {
            id
            name
            price
            seat
            carAvg
            carBrand
            carType
            image {
              url
            }
            pickupLocation {
              cityLocation
            }
            dropoffLocation {
              cityLocation
            }
          }
        }
      `
    );
    return result;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Error fetching cars");
  }
}
