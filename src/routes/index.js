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
import MatchesManagement from '~/pages/Admin/Matches';
import CoachManagement from '~/pages/Admin/Coach';
import PlayersManagement from '~/pages/Admin/Players';
import CompanyManagement from '~/pages/Admin/Company';
import TicketPurchase from '~/pages/User/TicketPurchase';
import MyTicket from '~/pages/User/MyTicket';
import ClubsManagement from '~/pages/Admin/Clubs';
import StadiumsManagement from '~/pages/Admin/Stadiums';
import ContractsManagement from '~/pages/Admin/Contracts';

import Test from '~/test';
import Dashboard from '~/pages/Admin/Dashboard';
import TicketsManagement from '~/pages/Admin/Tickets';
import UsersManagement from '~/pages/Admin/Users';
import MatchDetail from '~/pages/Admin/MatchDetail';
import SeatsManagement from '~/pages/Admin/Seats';
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
  {
    path: '/admin/dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/management/match-details',
    component: MatchDetail,
  },
  {
    path: '/admin/management/clubs',
    component: ClubsManagement,
  },
  {
    path: '/admin/management/stadiums',
    component: StadiumsManagement,
  },
  {
    path: '/admin/management/seats',
    component: SeatsManagement,
  },
  {
    path: '/admin/tickets-management',
    component: TicketsManagement,
  },
  {
    path: '/admin/management/matches',
    component: MatchesManagement,
  },
  {
    path: '/admin/management/contracts',
    component: ContractsManagement,
  },
  {
    path: '/admin/management/users',
    component: UsersManagement,
  },
  {
    path: '/admin/management/coach',
    component: CoachManagement,
  },
  {
    path: '/admin/management/players',
    component: PlayersManagement,
  },

  {
    path: '/admin/statistical',
    component: Statistical,
  },
  {
    path: '/admin/management/company',
    component: CompanyManagement,
  },
  {
    path: '*',
    component: InvalidAdmin_404,
  },
];

export { adminRoutes, publicRoutes };
