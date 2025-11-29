import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { volunteerRoutes } from '../modules/volunteer/volunteer.routes';
import { galleryRoutes } from '../modules/gallery/gallery.routes';
import { donationProjectRoutes } from '../modules/donationProject/donationProject.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { newsletterRoutes } from '../modules/newsletter/newsletter.routes';
import { commiteeRoutes } from '../modules/commitee/commitee.routes';
import { activitiesRoutes } from '../modules/activities/activities.routes';
import { contactRoutes } from '../modules/contact/contact.routes';
import { massegeRoutes } from '../modules/massege/massege.routes';
type IModulerRoutes = { path: string; route: Router }[];
export const modulerRoutes: IModulerRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/volunteer',
    route: volunteerRoutes
  },
  {
    path: '/gallery',
    route: galleryRoutes
  },
  {
    path: '/donation',
    route: donationProjectRoutes
  },
  {
    path: '/blog',
    route: blogRoutes
  },
  {
    path: '/payment',
    route: paymentRoutes
  },
  {
    path: '/newsletter',
    route: newsletterRoutes
  },
  {
    path: '/commitee',
    route: commiteeRoutes
  },
  {
    path: '/activities',
    route: activitiesRoutes
  },
  {
    path: '/massege',
    route: massegeRoutes
  }
];
