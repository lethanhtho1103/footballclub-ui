import classNames from 'classnames/bind';
import styles from './Contracts.module.scss'; 
import TableShowContracts from '~/components/Admin/TableShowContracts';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Contracts() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowContracts />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Contracts;
