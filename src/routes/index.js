import Players from '~/pages/User/Players';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const publicRoutes = [
  {
    path: '/players',
    component: Players,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
];

export { publicRoutes };
