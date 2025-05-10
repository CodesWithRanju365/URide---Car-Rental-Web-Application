// lib/wishlist/wishlistStorage.ts

export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem("wishlist");
  return stored ? JSON.parse(stored) : [];
};

export const addToWishlist = (carId: string) => {
  if (typeof window === 'undefined') return;
  const current = getWishlist();
  if (!current.includes(carId)) {
    localStorage.setItem("wishlist", JSON.stringify([...current, carId]));
  }
};

export const removeFromWishlist = (carId: string) => {
  if (typeof window === 'undefined') return;
  const current = getWishlist();
  const updated = current.filter(id => id !== carId);
  localStorage.setItem("wishlist", JSON.stringify(updated));
};

export const isInWishlist = (carId: string): boolean => {
  if (typeof window === 'undefined') return false;
  return getWishlist().includes(carId);
};
