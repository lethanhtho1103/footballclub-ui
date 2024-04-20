import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowSalaryMonth.module.scss';
import { useEffect, useState } from 'react';
import { UilEditAlt } from '@iconscout/react-unicons';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import adminService from '~/services/adminService';
import { Button, Modal } from 'react-bootstrap';
import Loader from '~/components/Loader';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import ToastMassage from '../ToastMassage';

const cx = classNames.bind(style);

function TableShowSalaryMonth({ month, year }) {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [showUpdateConfirmationDialog, setShowUpdateConfirmationDialog] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [salaryId, setSalaryId] = useState('');
  const [name, setName] = useState('');
  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Player', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Amount', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Payment Date', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Received', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col6', disableSortBy: true },
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <div style={{ width: '50%', textAlign: 'center' }}>{row.name}</div>
            <img
              src={row.image?.length > 9 ? `${baseUrl}${row.image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
                display: 'block',
              }}
            />
          </div>
        ),
        col3: row.amount,
        col4: row.payment_date,
        col5: row.received === 1 ? 'Yes' : <span style={{ color: 'red' }}>No</span>,
        col6: row.received === 0 && (
          <Button
            style={{
              padding: '4px 10px',
              backgroundColor: '#5E5DF0',
              color: '#fff',
              borderRadius: '8px',
              borderColor: '#5E5DF0',
            }}
            onMouseOver={(e) => (e.target.style.opacity = 0.8)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
            onClick={() => {
              setShowUpdateConfirmationDialog(true);
              setSalaryId(row.salary_id);
              setName(row.name);
            }}
          >
            <UilEditAlt size={18} />
          </Button>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllMatchOfMonth = async () => {
    const res = await adminService.getSalaryByMonth(month, year);
    convertToDataRow(res.salary_payments);
  };

  const handleClose = () => setShowUpdateConfirmationDialog(false);

  const handleUpdateReceived = () => {
    setIsLoader(true);
    setTimeout(async () => {
      const res = await adminService.updateReceivedSalary(salaryId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllMatchOfMonth();
    }, 500);
  };

  const UpdateConfirmationDialog = () => {
    return (
      <Modal show={showUpdateConfirmationDialog} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="modal-header"
          style={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '20px 20px 10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Modal.Title style={{ fontSize: '24px' }}>Confirm received salary</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body"
          style={{
            padding: '20px 20px 20px',
            fontSize: '1.4rem',
          }}
        >
          Are you sure you want to confirm {name} received salary?
        </Modal.Body>
        <Modal.Footer
          className="modal-footer"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            variant=""
            onClick={handleClose}
            style={{
              backgroundColor: '#eee',
              color: '#333',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7.4px 16px',
              marginRight: '8px',
              border: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateReceived}
            style={{
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7px 16px',
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    handleGetAllMatchOfMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <>
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        {isLoader && <Loader />}

        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>{monthNames[month - 1]} salary list</h2>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
            {UpdateConfirmationDialog()}
            {obToast?.content?.length > 0 && (
              <ToastMassage
                isShow={obToast.show}
                content={obToast.content}
                handleClose={() => setObToast({ content: '' })}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableShowSalaryMonth;
