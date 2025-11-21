import { apiUrl } from "@/config/constants";
const res = await fetch(`${apiUrl}/donation/slug/all`, { cache: "no-store" });
const json = await res.json();
const items = json?.data || [];

export function DonatesTypesMenue() {
    return items
    
}


