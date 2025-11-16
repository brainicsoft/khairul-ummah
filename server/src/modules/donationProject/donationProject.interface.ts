// donationProject.model.ts

export interface IDonationProject {
  name: string;
  email: string;
  phone?: string;
  slug: string;
  // Project fields
  title: string;
  desc: string;
  image: string;
  category: "general" | "special" | "emergency";

  benefits: string[];
  status: "pending" | "active" | "completed";

  videoUrl?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
