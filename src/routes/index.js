import Players from '~/pages/User/Players';
import LoginUser from '~/pages/User/LoginUser';
import Register from '~/pages/User/Register';
import DetailUser from '~/pages/User/DetailPlayer';
import Admin from '~/pages/Admin/Home';
import Home from '~/pages/User/Home';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
// import InvalidUser_404 from '~/pages/User/InvalidUser_404';
import InvalidAdmin_404 from '~/pages/Admin/InvalidAdmin_404';
import History from '~/pages/User/History';
import Tickets from '~/pages/User/Tickets';
import Results from '~/pages/User/Results';
import Statistical from '~/pages/Admin/Statistical';
// import UsersManagement from '~/pages/Admin/UsersManagement';
import MatchesManagement from '~/pages/Admin/MatchesManager';
import CoachManagement from '~/pages/Admin/Coach';
import PlayersManagement from '~/pages/Admin/Players';
import MyTicket from '~/pages/User/MyTicket';
import TicketPurchase from '~/pages/User/BuyTicket';
import Test from '~/test';
const publicRoutes = [
  {
    path: '/test',
    component: Test,
  },
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
    path: '/my-ticket',
    component: MyTicket,
  },
  {
    path: '/matches/:game_id',
    component: TicketPurchase,
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
    path: '/manchester-city-history',
    component: History,
  },

  // {
  //   path: '*',
  //   component: InvalidUser_404,
  // },
];

const adminRoutes = [
  {
    path: '/admin',
    component: Admin,
  },
  // {
  //   path: '/admin/users-management',
  //   component: UsersManagement,
  // },
  {
    path: '/admin/management/coach',
    component: CoachManagement,
  },
  {
    path: '/admin/management/players',
    component: PlayersManagement,
  },
  {
    path: '/admin/matches-management',
    component: MatchesManagement,
  },
  {
    path: '/admin/statistical',
    component: Statistical,
  },
  {
    path: '*',
    component: InvalidAdmin_404,
  },
];

export { adminRoutes, publicRoutes };
