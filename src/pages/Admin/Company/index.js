import classNames from 'classnames/bind';
import styles from './Company.module.scss';
import TableShowCompany from '~/components/Admin/TableShowCompany';

import { AdminLayout } from '~/layouts';

const cx = classNames.bind(styles);

function Company() {
  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('wrap-post')}>
          <TableShowCompany />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Company;
