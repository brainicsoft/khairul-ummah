export const PENDING_DONOR_KEY = "pending_donor_profile";

export type PendingDonorProfile = {
  name: string;
  phone: string;
  email?: string;
  savedAt?: number;
};

export function savePendingDonorProfile(profile: Omit<PendingDonorProfile, "savedAt">) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    PENDING_DONOR_KEY,
    JSON.stringify({
      ...profile,
      savedAt: Date.now(),
    })
  );
}

export function getPendingDonorProfile(): PendingDonorProfile | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(PENDING_DONOR_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingDonorProfile;
    if (!parsed.name || !parsed.phone) return null;

    const maxAgeMs = 24 * 60 * 60 * 1000;
    if (parsed.savedAt && Date.now() - parsed.savedAt > maxAgeMs) {
      clearPendingDonorProfile();
      return null;
    }

    return parsed;
  } catch {
    clearPendingDonorProfile();
    return null;
  }
}

export function clearPendingDonorProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_DONOR_KEY);
}
