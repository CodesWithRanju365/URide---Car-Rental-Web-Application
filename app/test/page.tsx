'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestPage() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*, cars(*)")
        .eq("user_id", "user_abc123"); // 🧡 change this to a real user_id from your database

      console.log("🎯 Filtered Wishlist:", data);
      console.error("🚨 Error:", error);
    };

    test();
  }, []);

  return <div className="p-6 text-lg font-semibold">Filtered Test Wishlist Page 💌</div>;
}
