import { hygraphClient } from "./hygraphClient";
import { gql } from "graphql-request";

export interface Booking {
  id: string;
  email: string;
  pickuptime: string;
  dropofftime: string;
}

interface BookingResponse {
  bookings: Booking[];
}

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      id
      email
      pickuptime
      dropofftime
    }
  }
`;

const fallbackBookings: Booking[] = [
  {
    id: "01",
    email: "chandankumar@gmail.com",
    pickuptime: "2025-05-09T09:00:00Z",
    dropofftime: "2025-05-09T18:00:00Z",
  },
  {
    id: "02",
    email: "marmikchaudary@gmail.com",
    pickuptime: "2025-05-10T10:00:00Z",
    dropofftime: "2025-05-10T19:00:00Z",
  },
];

export const getBookings = async (): Promise<Booking[]> => {
  if (!hygraphClient) {
    console.warn("Hygraph client not available. Returning fallback data.");
    return fallbackBookings;
  }

  try {
    const res = await hygraphClient.request<BookingResponse>(GET_BOOKINGS);
    return res.bookings;
  } catch (error) {
    console.warn("GraphQL error — falling back to default bookings!", error);
    return fallbackBookings;
  }
};
