export type NavLink = {
  href: string
  label: string
  dropdown?: "about" | "fund"
}

/** Main site navbar — keep regular donation here so it is not lost during edits. */
export const mainNavLinks: NavLink[] = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের সম্পর্কে", dropdown: "about" },
  { href: "/activities", label: "আমাদের কার্যক্রম" },
  { href: "/running-project", label: "চলমান প্রজেক্ট" },
  { href: "/donate", label: "দানের তহবিল", dropdown: "fund" },
  { href: "/donate/regular", label: "নিয়মিত অনুদান" },
  { href: "/lifetime-donor", label: "আজীবন দাতা সদস্য" },
  { href: "/gellery", label: "গ্যালারি" },
  { href: "/blog", label: "ব্লগ" },
  { href: "/volunteer", label: "স্বেচ্ছাসেবক নিবন্ধন" },
  { href: "/user/donations", label: "আমার অনুদান" },
  { href: "/contact", label: "যোগাযোগ" },
]

export const aboutSubMenu = [
  { href: "/about/advisors", label: "উপদেষ্টা মন্ডলী" },
  { href: "/about/committee", label: "পরিচালনা পরিষদ" },
]

/** Always first in fund dropdown — not loaded from API. */
export const regularDonationNavItem = {
  id: "regular-donation",
  href: "/donate/regular",
  label: "নিয়মিত অনুদান",
} as const
