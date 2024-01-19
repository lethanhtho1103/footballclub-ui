import Players from '~/pages/User/Players';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import DetailUser from '~/pages/User/DetailUser';
import Admin from '~/pages/Admin/Home';

const publicRoutes = [
  {
    path: '/login',
    component: Login,
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
    path: '/players/name-player',
    component: DetailUser,
  },
  {
    path: '/admin',
    component: Admin,
  },
];

export { publicRoutes };
