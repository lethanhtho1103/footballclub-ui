import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowClubs.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt, UilPlus } from '@iconscout/react-unicons';
import { userService } from '~/services';
import ModalCreateClubs from '../ModalCreateClubs';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(style);

function TableShowClubs() {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [club, setClub] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [clubId, setClubId] = useState('');
  const [name, setName] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const [isShowModalCreateClubs, setIsShowModalCreateClubs] = useState(false);

  const columns = [
    { Header: 'Club ID', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Club Name', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Club Logo', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col4', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: row.club_id,
        col2: row.name,
        col3: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={row.image?.length > 9 ? `${baseUrl}${row.image}` : noAvatar}
              alt=""
              style={{
                width: '48px',
                height: '48px',
              }}
            />
          </div>
        ),
        col4: (
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
              onClick={() => handleUpdateClub(row.club_id)}
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
              onClick={() => handleShowDeleteConfirmationDialog(row.club_id, row.name)}
            >
              <UilTimes size={18} />
            </Button>
          </div>
        ),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllClubs = async () => {
    const res = await userService.getAllClubs();
    convertToDataRow(res.clubs);
  };

  const handleUpdateClub = async (club_id) => {
    const res = await adminService.getOneClub(club_id);
    setIsShowModalCreateClubs(true);
    setClubId(club_id);
    setClub(res.club);
  };

  const handleCloseModalCreateClubs = () => {
    setIsShowModalCreateClubs(false);
  };
  const handleClose = () => setShowDeleteConfirmationDialog(false);

  const handleShowDeleteConfirmationDialog = (club_id, name) => {
    setShowDeleteConfirmationDialog(true);
    setClubId(club_id);
    setName(name);
  };

  const handleDelete = () => {
    setIsLoader(true);
    setTimeout(async () => {
      const res = await adminService.deleteClub(clubId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllClubs();
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
          <Modal.Title style={{ fontSize: '24px' }}>Confirm club deletion</Modal.Title>
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

  useEffect(() => {
    handleGetAllClubs();
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
            <h2 className={cx('title')}>List of clubs</h2>
            <div className={cx('note')}>
              Actions:
              <div className={cx('btn-actions')}>
                <Button
                  className={cx('btn-add')}
                  onClick={() => {
                    setIsShowModalCreateClubs(true);
                    setClub(null);
                  }}
                >
                  <UilPlus size={16} />
                  <span>Add club</span>
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
          {isShowModalCreateClubs && (
            <ModalCreateClubs
              handleClose={handleCloseModalCreateClubs}
              handleGetAllClubs={handleGetAllClubs}
              access_token={access_token}
              club={club}
              clubId={clubId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TableShowClubs;
