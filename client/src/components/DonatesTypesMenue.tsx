import { apiUrl } from "@/config/constants";

const loadDataLimit = 50 // for header or navbar menu 
const res = await fetch(`${apiUrl}/donation?page=1&limit=${loadDataLimit}`, { cache: "no-store" });
const json = await res.json();
const items = json?.data || [];
console.log(items)

export function DonatesTypesMenue() {
    return items
    
}


