import request, { gql } from 'graphql-request';

export const getCarsList = async () => {
  const query = gql`
    query CarLists {
      carLists {
        id
        name
        price
        seat
        image {
          url
        }
      }
    }
  `;

  const result = await request(
    'https://ap-south-1.cdn.hygraph.com/content/cm9sam4di03pf08vyfqd73smc/master',
    query
  );

  console.log("🐾 Hygraph raw result:", result);
  return result;
};
