import Players from '~/pages/User/Players';
import LoginUser from '~/pages/User/LoginUser';
import Register from '~/pages/User/Register';
import DetailUser from '~/pages/User/DetailPlayer';
import Admin from '~/pages/Admin/Home';
import Home from '~/pages/User/Home';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import InvalidUser_404 from '~/pages/User/InvalidUser_404';
import InvalidAdmin_404 from '~/pages/Admin/InvalidAdmin_404';
import History from '~/pages/User/History';
import Tickets from '~/pages/User/Tickets';
import Results from '~/pages/User/Results';
import PlayersManager from '~/pages/Admin/PlayersManager';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/players',
    component: Players,
  },
  {
    path: '/tickets',
    component: Tickets,
  },
  {
    path: '/results',
    component: Results,
  },
  {
    path: '/players/:name',
    component: DetailUser,
  },
  {
    path: '/login',
    component: LoginUser,
  },
  {
    path: '/admin/login',
    component: LoginAdmin,
  },
  {
    path: 'manchester-city-history',
    component: History,
  },
  {
    path: '*',
    component: InvalidUser_404,
  },
];

const adminRoutes = [
  {
    path: '/admin',
    component: Admin,
  },
  {
    path: '/admin/players-manager',
    component: PlayersManager,
    layout: null,
  },
  {
    path: '*',
    component: InvalidAdmin_404,
  },
];

export { adminRoutes, publicRoutes };
