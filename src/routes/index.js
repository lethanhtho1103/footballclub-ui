import Players from '~/pages/User/Players';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import DetailUser from '~/pages/User/DetailPlayer';
import Admin from '~/pages/Admin/Home';
import Home from '~/pages/User/Home';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
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
    path: '/players/:name',
    component: DetailUser,
  },
  {
    path: '/admin',
    component: Admin,
  },
];

export { publicRoutes };
