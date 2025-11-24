import { apiUrl } from "@/config/constants";

export async function DonatesTypesMenue() {
  try {
    const res = await fetch(`${apiUrl}/donation/slug/all`, { cache: "no-store" });
    if (!res.ok) return []; // API error → empty array

    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch donation types:", error);
    return []; // server off → empty array
  }
}
