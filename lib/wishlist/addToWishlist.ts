import { supabase } from "../supabaseClient";

type CarType = {
  id: string;
  name: string;
  price: number;
  seat: number;
  carBrand: string;
  carType: string;
  carAvg: number;
  image?: string | null;
};

type WishlistResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const addToWishlist = async (
  userId: string,
  car: CarType
): Promise<WishlistResponse> => {
  if (!userId || !car) {
    return { success: false, error: "User ID and Car details are required." };
  }

  const { data, error } = await supabase
    .from("wishlist")
    .insert([
      {
        user_id: userId,
        car_id: car.id,
        name: car.name,
        price: car.price,
        seat: car.seat,
        carBrand: car.carBrand,
        carType: car.carType,
        carAvg: car.carAvg,
        image: car.image ?? null,
      }
    ]);

  if (error) {
    console.error("Add to wishlist error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};
