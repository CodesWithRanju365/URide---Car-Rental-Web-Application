import { GraphQLClient, gql } from 'graphql-request';

// Define the endpoint and token
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!;
const token = process.env.HYGRAPH_TOKEN!;

// Initialize GraphQL client
const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Define TypeScript types for the response
type Car = {
  id: string;
  name: string;
  price: number;
  seat: number;
  carBrand: string;
  carType: string;
  carAvg: number;
  image: {
    url: string;
  };
  pickupLocation: {
    cityLocation: string;
  };
  dropoffLocation: {
    cityLocation: string;
  };
};

type CarListsResponse = {
  carLists: Car[];
};

// Define the GraphQL query to fetch the car data
const CAR_LIST_QUERY = gql`
  query CarLists {
    carLists(first: 50) {
      id
      name
      price
      seat
      carBrand
      carType
      carAvg
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

// Fetch car data from the GraphQL API
export const fetchAllCars = async (): Promise<Car[]> => {
  try {
    const data = await client.request<CarListsResponse>(CAR_LIST_QUERY);
    return data.carLists;  // Return the car list
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw error;
  }
};
