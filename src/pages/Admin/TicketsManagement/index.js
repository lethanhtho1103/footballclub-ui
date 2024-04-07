import { AdminLayout } from '~/layouts';
import TableShowAllTickets from '~/components/Admin/TableShowAllTickets';

// import classNames from 'classnames/bind';
// import styles from './TicketsManagement.module.scss';
// const cx = classNames.bind(styles);

function TicketsManagement() {
  return (
    <AdminLayout>
      <TableShowAllTickets />
    </AdminLayout>
  );
}

export default TicketsManagement;
