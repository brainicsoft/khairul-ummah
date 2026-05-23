import { apiUrl } from "@/config/constants";

export type DonationFundOption = {
  _id: string;
  slug: string;
  title: string;
  desc?: string;
  image?: string;
};

export async function DonatesTypesMenue(): Promise<DonationFundOption[]> {
  try {
    const res = await fetch(`${apiUrl}/donation?page=1&limit=50`, { cache: "no-store" });
    if (!res.ok) return [];

    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch donation types:", error);
    return [];
  }
}
