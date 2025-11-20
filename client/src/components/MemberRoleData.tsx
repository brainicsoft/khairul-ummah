import { apiUrl } from "@/config/constants";
const res = await fetch(`${apiUrl}/commitee/roleType/all`, { cache: "no-store" });
const json = await res.json();
const items = json?.data || [];
export function MemberRoleData() {
    return items
    
}