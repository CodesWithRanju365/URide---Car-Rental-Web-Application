import { supabase } from "@/lib/supabaseClient";

export async function removeFromWishlist(
  userId: string,
  carId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("wishlist")
      .delete()
      .match({ user_id: userId, car_id: carId });

    if (error) {
      console.error("Delete wishlist error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return { success: false, error: "An unknown error occurred." };
  }
}
