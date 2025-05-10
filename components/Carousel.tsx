"use client";

import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";

const slides = [
  {
    title: "Hygienic Vehicles",
    description: "Every car is sanitised, serviced and inspected before each trip.",
  },
  {
    title: "Honest Pricing",
    description: "What you see is what you pay, no last-minute costs.",
  },
  {
    title: "Always On Time",
    description: "Count on us for prompt pickups and seamless travel—every single time.",
  },
  {
    title: "Verfied Chauffeurs",
    description: "Ride with drivers who respect your time and space.",
  },
  {
    title: "Local Expertise",
    description: "Unforgettable journeys backed by insider insights and guides.",
  },
];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const emblaApiRef = useRef<any>(null);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApiRef.current = emblaApi;

    const interval = setInterval(() => {
      emblaApiRef.current?.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="carousel-wrapper">
       <h1 className="carousel-heading">Why Choose Us?</h1>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide carousel-slide">
              <div className="carousel-card">
                <div className="carousel-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
