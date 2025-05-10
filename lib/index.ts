import { gql, request } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

const query = gql`
  {
    carLists(first: 50) {
      id
      name
      price
      seat
      carAvg
      createdAt
      updatedAt
      publishedAt
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
`;

export type Car = {
  id: string;
  name: string;
  price: number;
  seat: number;
  carAvg: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  carBrand: string;
  carType: string;
  image: {
    url: string | null;
  };
  pickupLocation?: {
    cityLocation: string;
  };
  dropoffLocation?: {
    cityLocation: string;
  };
};

type CarsResponse = {
  carLists: Car[];
};

export const fetchCars = async (): Promise<Car[]> => {
  if (!endpoint) {
    throw new Error("HYGRAPH endpoint is missing");
  }
  const data = await request<CarsResponse>(endpoint, query);
  return data.carLists;
};
