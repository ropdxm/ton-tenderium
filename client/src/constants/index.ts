import { createCampaign, dashboard, profile } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-tender',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  }
];
