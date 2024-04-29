import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';
import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { AdminLayout } from '~/layouts';

import { Tab, Tabs } from 'react-bootstrap';
import TicketParStatistical from '~/components/Admin/TicketParStatistical/TicketParStatistical';
import SalaryParStatistical from '~/components/Admin/SalaryParStatistical/SalaryParStatistical';

const cx = classNames.bind(styles);

function Statistical() {
  const isLogined = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student-par');

  const controlPage = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);

  function handleTabSelect(key) {
    setActiveTab(key);
  }

  useEffect(() => {
    controlPage();
  }, [controlPage]);

  return (
    <AdminLayout>
      <div className={cx('wrap')}>
        <div className={cx('map')}>
          <Tabs
            defaultActiveKey="student-par"
            id="work"
            className="mb-3"
            activeKey={activeTab}
            onSelect={handleTabSelect}
          >
            <Tab
              eventKey="student-par"
              tabClassName={cx({
                active: activeTab === 'student-par',
              })}
              title="Ticket revenue"
            >
              <TicketParStatistical />
            </Tab>
            <Tab
              eventKey="salary"
              tabClassName={cx({
                active: activeTab === 'salary',
              })}
              title="Salary and Contract"
            >
              <SalaryParStatistical />
            </Tab>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Statistical;
