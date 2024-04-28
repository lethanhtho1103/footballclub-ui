import { useState } from 'react';
import TableShowContracts from '~/components/Admin/TableShowContracts';
import { AdminLayout } from '~/layouts';
import classNames from 'classnames/bind';
import style from './Contracts.module.scss';
const cx = classNames.bind(style);

function Contracts() {
  const [isPlayerContract, setIsPlayerContract] = useState(true);
  return (
    <AdminLayout>
      {isPlayerContract ? (
        <div className={cx('title-link')} onClick={() => setIsPlayerContract(!isPlayerContract)}>
          Sponsorship deal
        </div>
      ) : (
        <div className={cx('title-link')} onClick={() => setIsPlayerContract(!isPlayerContract)}>
          Player contract
        </div>
      )}
      <TableShowContracts isPlayerContract={isPlayerContract} />
    </AdminLayout>
  );
}

export default Contracts;
