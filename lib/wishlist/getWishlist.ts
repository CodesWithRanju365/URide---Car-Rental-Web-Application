import { supabase } from "@/lib/supabaseClient";

interface WishlistItem {
  id: string;
  user_id: string;
  car_id: string;
  cars: {
    id: string;
    name: string;
    price: number;
    carBrand: string;
    carType: string;
    seat: number;
    carAvg: number;
    image?: { url?: string | null } | null;
  };
}

type WishlistResponse =
  | { data: WishlistItem[]; error?: undefined }
  | { error: string; data?: undefined };

export async function getWishlist(userId: string): Promise<WishlistResponse> {
  if (!userId) {
    return { error: "User ID is required." };
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select("*, cars(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("❌ Get wishlist error:", error.message);
    return { error: error.message };
  }

  return { data: data as WishlistItem[] };
}
