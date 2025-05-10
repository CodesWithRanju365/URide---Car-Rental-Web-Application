"use client";

import React, { useEffect, useState, useRef } from "react";
import { gql, request } from "graphql-request";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import CarsList from "@/components/Home/CarsList";
import { Car } from "@/lib"; // Import Car type from lib/index.ts

interface CarResponse {
  carLists: Car[]; // Response type from the GraphQL query
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]); // Use imported Car type
  const [filteredCars, setFilteredCars] = useState<Car[]>([]); // Use imported Car type
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
        const pickupCity = car.pickupLocation?.cityLocation?.toLowerCase(); // Handle cityLocation as string
        return (
          pickupCity && pickupCity === pickupLocation.toLowerCase() // Ensure pickupCity is valid before comparing
        );
      });
    }

    if (dropLocation) {
      filtered = filtered.filter((car) => {
        const dropCity = car.dropoffLocation?.cityLocation?.toLowerCase(); // Handle cityLocation as string
        return (
          dropCity && dropCity === dropLocation.toLowerCase() // Ensure dropCity is valid before comparing
        );
      });
    }

    setFilteredCars(filtered); // Update filteredCars state
  };

  const handleFilter = (filters: { price: string; brand: string }) => {
    let filtered = [...cars];

    // Price Sorting
    if (filters.price === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.price === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    //  Brand Filtering
    if (filters.brand) {
      const brandFilter = filters.brand.toLowerCase().trim();

      filtered = filtered.filter((car) => {
        // Check if carBrand is an array and handle it accordingly
        const carBrands = Array.isArray(car.carBrand)
          ? car.carBrand.map((brand) => brand.toLowerCase()) // If it's an array, converting each brand to lowercase
          : [car.carBrand.toLowerCase()]; // Otherwise, make it an array with a single string

        return carBrands.includes(brandFilter); // Checking if any of the brands matches the filter
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
      <SearchInput onFilter={handleFilter} onLocationFilter={handleLocationFilter} />
      <div ref={carListRef}>
        <CarsList cars={filteredCars} />
      </div>
      
    </div>
  );
}

async function fetchCarsData(): Promise<CarResponse> { // Specify the return type
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
    return result; // result is now properly typed as CarResponse
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Error fetching cars");
  }
}
