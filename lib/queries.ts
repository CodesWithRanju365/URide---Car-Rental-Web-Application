//queries.ts
import { gql } from '@apollo/client';

export const GET_BOOKINGS = gql`
  query Bookings {
    bookingss {
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
        carAvg
        carBrand
        carType
        image {
          id
        }
        price
        name
        seat
      }
    }
  }
`;
