import { AdminLayout } from '~/layouts';
import TableShowAllTickets from '~/components/Admin/TableShowAllTickets';

function TicketsManagement() {
  return (
    <AdminLayout>
      <TableShowAllTickets />
    </AdminLayout>
  );
}

export default TicketsManagement;
