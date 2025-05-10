import { NextResponse } from "next/server";
import { hygraphClient } from "@/lib/hygraphClient";
import { supabase } from "@/lib/supabaseClient";

interface HygraphCar {
  id: string;
  name: string;
  price: number;
  seat: number;
  carAvg: number;
  carType: string;
  carBrand: string;
  image?: {
    url?: string;
  };
}

interface HygraphResponse {
  cars: HygraphCar[];
}

export async function GET() {
  try {
    const response: HygraphResponse = await hygraphClient.request(`
      {
        cars {
          id
          name
          price
          seat
          carAvg
          carType
          carBrand
          image {
            url
          }
        }
      }
    `);

    const { cars } = response;

    for (const car of cars) {
      const upsertCar = {
        id: car.id,
        name: car.name,
        price: car.price,
        seat: car.seat,
        carAvg: car.carAvg,
        carType: car.carType,
        carBrand: car.carBrand,
        image_url: car.image?.url || null,
      };

      const { error } = await supabase.from("cars").upsert([upsertCar]);

      if (error) {
        console.error(`❌ Failed to insert ${car.name}:`, error.message);
      }
    }

    return NextResponse.json({ message: "✅ Cars synced to Supabase!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
