import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowContracts.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt } from '@iconscout/react-unicons';
import ModalCreateContracts from '../ModalCreateContracts';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(style);

function TableShowContracts() {
  const access_token = useSelector(accessTokenSelector);
  const [row, setRow] = useState([]);
  const [contract, setContract] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [contractId, setContractId] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const [isShowModalCreateContracts, setIsShowModalCreateContracts] = useState(false);

  const columns = [
    { Header: 'Contract ID', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Name owner', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Type', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Date created', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Expiration date', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Salary', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'PDF', accessor: 'col7', filter: 'fuzzyText' },
    { Header: 'Actions', accessor: 'col8', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: row.contract_id,
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
        col3: row.type,
        col4: row.date_created,
        col5: row.expiration_date,
        col6: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.salary),
        col7: (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href="https://drive.google.com/file/d/1eGKRf-_KDev6frONL9b-Ua0RzT3MFd_E/view?usp=sharing" target="_blank">
            PDF
          </a>
        ),
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
              onClick={() => handleUpdateContract(row.contract_id)}
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
              onClick={() => handleShowDeleteConfirmationDialog(row.contract_id, row.name)}
            >
              <UilTimes size={18} />
            </Button>
          </div>
        ),
      };
    });
    setRow(dataRow);
  };

  //
  const handleGetAllUsers = async () => {
    const res = await adminService.getAllUser();
    setUsers(res);
  };

  //

  const handleGetAllContracts = async () => {
    const res = await adminService.getAllContracts();
    convertToDataRow(res.contracts);
  };

  const handleUpdateContract = async (contract_id) => {
    const res = await adminService.getOneContract(contract_id);
    setIsShowModalCreateContracts(true);
    setContractId(contract_id);
    setContract(res.contract);
  };

  const handleCloseModalCreateContracts = () => {
    setIsShowModalCreateContracts(false);
  };
  const handleClose = () => setShowDeleteConfirmationDialog(false);

  const handleShowDeleteConfirmationDialog = (contract_id, name) => {
    setShowDeleteConfirmationDialog(true);
    setContractId(contract_id);
    setName(name);
  };

  const handleDelete = () => {
    setIsLoader(true);
    setTimeout(async () => {
      const res = await adminService.deleteContract(contractId, access_token);
      setObToast({ content: res.message, isShow: true });
      handleClose();
      setIsLoader(false);
      handleGetAllContracts();
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
          <Modal.Title style={{ fontSize: '24px' }}>Confirm contract deletion</Modal.Title>
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
    handleGetAllContracts();
    handleGetAllUsers();
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
            <h2 className={cx('title')}>List of contracts</h2>
            <div className={cx('note')}>
              Actions:
              <div className={cx('btn-actions')}>
                <Button
                  className={cx('btn-add')}
                  onClick={() => {
                    setIsShowModalCreateContracts(true);
                    setContract(null);
                  }}
                >
                  <span class="material-symbols-outlined">add_ad</span>
                  <span style={{ marginLeft: '4px' }}>Add contract</span>
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
          {isShowModalCreateContracts && (
            <ModalCreateContracts
              handleClose={handleCloseModalCreateContracts}
              handleGetAllContracts={handleGetAllContracts}
              access_token={access_token}
              contract={contract}
              contractId={contractId}
              users={users}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TableShowContracts;
