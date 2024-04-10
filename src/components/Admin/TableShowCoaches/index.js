import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowCoaches.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt } from '@iconscout/react-unicons';
import { userService } from '~/services';
import ModalCreateCoaches from '../ModalCreateCoaches';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import * as request from '~/utils/httpRequest';

const cx = classNames.bind(style);

function TableShowCoaches() {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [countries, setCountries] = useState([]);
  const [Coach, setCoach] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const [isShowModalCreateCoaches, setIsShowModalCreateCoaches] = useState(false);

  const columns = [
    { Header: 'Coach name', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Email', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Date of birth', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Nationality', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Position', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col6', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.name}</div>
            <img
              src={row.image?.length > 9 ? `${baseUrl}${row.image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
                display: 'block',
                borderRadius: '50%',
              }}
            />
          </div>
        ),
        col2: row.email,
        col3: row.date_of_birth,
        col4: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.nationality}</div>
            <img
              src={`https://flagcdn.com/36x27/${row.flag}.png`}
              alt="No flag"
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #dde6ed',
                display: 'block',
                borderRadius: '4px',
              }}
            />
          </div>
        ),
        col5: row.position,
        col6: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
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
              onClick={() => handleUpdateCoach(row.user_id)}
            >
              <UilEditAlt size={18} />
            </Button>
            <Button
              style={{
                padding: '4px 8px',
                backgroundColor: '#FF4742',
                color: '#fff',
                borderRadius: '8px',
                borderColor: '#FF4742',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
              onClick={() => handleShowDeleteConfirmationDialog(row.user_id, row.name)}
            >
              <UilTimes size={18} />
            </Button>
          </div>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllCoaches = async () => {
    try {
      const res = await userService.getAllCoaches();
      if (res && res.coaches) {
        convertToDataRow(res.coaches);
      } else {
        // Handle case where data is undefined or empty
        console.error('No coach data found.');
      }
    } catch (error) {
      console.error('Error fetching coach data:', error);
    }
  };

  const handleUpdateCoach = async (user_id) => {
    const res = await adminService.getOneCoach(user_id);
    setIsShowModalCreateCoaches(true);
    setUserId(user_id);
    setCoach(res.coach);
  };

  const handleCloseModalCreateCoaches = () => {
    setIsShowModalCreateCoaches(false);
  };
  const handleClose = () => setShowDeleteConfirmationDialog(false);

  const handleShowDeleteConfirmationDialog = (user_id, name) => {
    setShowDeleteConfirmationDialog(true);
    setUserId(user_id);
    setName(name);
  };

  const handleDelete = () => {
    setIsLoader(true);
    setTimeout(async () => {
      const res = await adminService.deleteCoach(userId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllCoaches();
    }, 500);
  };

  const DeleteConfirmationDialog = () => {
    return (
      <Modal show={showDeleteConfirmationDialog} onHide={handleClose} centered>
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
          <Modal.Title style={{ fontSize: '24px' }}>Confirm coach deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body"
          style={{
            padding: '20px 20px 20px',
            fontSize: '1.4rem',
          }}
        >
          Are you sure you want to delete {name}?
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
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: '#385678',
              color: '#fff',
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
            variant="danger"
            onClick={handleDelete}
            style={{
              backgroundColor: '#d9534f',
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

  const handleGetAllCountries = async () => {
    const res = await request.get();
    setCountries(res);
  };

  useEffect(() => {
    handleGetAllCoaches();
    handleGetAllCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>List of coaches</h2>
            <div className={cx('note')}>
              Actions:
              <div className={cx('btn-actions')}>
                <Button
                  className={cx('btn-add')}
                  onClick={() => {
                    setIsShowModalCreateCoaches(true);
                    setCoach(null);
                  }}
                >
                  <span class="material-symbols-outlined">person_add</span>
                  <span style={{ marginLeft: '4px' }}>Add coach</span>
                </Button>
              </div>
            </div>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
            {DeleteConfirmationDialog()}
            {obToast?.content?.length > 0 && (
              <ToastMassage
                isShow={obToast.show}
                content={obToast.content}
                handleClose={() => setObToast({ content: '' })}
              />
            )}
          </div>
          {isShowModalCreateCoaches && (
            <ModalCreateCoaches
              handleClose={handleCloseModalCreateCoaches}
              handleGetAllCoaches={handleGetAllCoaches}
              access_token={access_token}
              countries={countries}
              coach={Coach}
              userId={userId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TableShowCoaches;
