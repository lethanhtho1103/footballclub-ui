import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowPlayers.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt, UilPlus } from '@iconscout/react-unicons';
import { userService } from '~/services';
import ModalCreatePlayers from '../ModalCreatePlayers';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';
import * as request from '~/utils/httpRequest';

const cx = classNames.bind(style);

function TableShowPlayers() {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [countries, setCountries] = useState([]);
  const [player, setPlayer] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const [isShowModalCreatePlayers, setIsShowModalCreatePlayers] = useState(false);

  const columns = [
    { Header: 'Jersey number', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Player name', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Email', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Date of birth', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Nationality', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Position', accessor: 'col7', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col8', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: row.jersey_number,
        col2: (
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
        col3: row.email,
        col5: row.date_of_birth,
        col6: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>{row.nationality}</div>
            <img
              src={`https://flagcdn.com/h60/${row.flag}.png`}
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
        col7: row.position,
        col8: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
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
              onClick={() => handleUpdatePlayer(row.user_id)}
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

  const handleGetAllPlayers = async () => {
    const res = await userService.getAllPlayers();
    convertToDataRow(res.players);
  };

  const handleUpdatePlayer = async (user_id) => {
    const res = await adminService.getOnePlayer(user_id);
    setIsShowModalCreatePlayers(true);
    setUserId(user_id);
    setPlayer(res);
  };

  const handleCloseModalCreatePlayers = () => {
    setIsShowModalCreatePlayers(false);
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
      const res = await adminService.deletePlayer(userId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllPlayers();
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
          <Modal.Title style={{ fontSize: '24px' }}>Confirm player deletion</Modal.Title>
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
    handleGetAllPlayers();
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
            <h2 className={cx('title')}>List of players</h2>
            <div className={cx('note')}>
              Actions:
              <div className={cx('btn-actions')}>
                <Button
                  className={cx('btn-add')}
                  onClick={() => {
                    setIsShowModalCreatePlayers(true);
                    setPlayer(null);
                  }}
                >
                  <UilPlus size={16} />
                  <span>Add player</span>
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
          {isShowModalCreatePlayers && (
            <ModalCreatePlayers
              handleClose={handleCloseModalCreatePlayers}
              handleGetAllPlayers={handleGetAllPlayers}
              access_token={access_token}
              countries={countries}
              player={player}
              userId={userId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TableShowPlayers;
