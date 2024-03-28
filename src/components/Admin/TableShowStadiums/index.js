import DataTable from '~/components/Admin/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowStadiums.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UilTimes, UilEditAlt, UilPlus } from '@iconscout/react-unicons';
import { userService } from '~/services';
import ModalCreateStadiums from '../ModalCreateStadiums';
import adminService from '~/services/adminService';
import ToastMassage from '../ToastMassage';
import Loader from '~/components/Loader';
import { baseUrl } from '~/axios';
import noAvatar from '~/assets/images/no-avatar.png';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '~/redux/selector';

const cx = classNames.bind(style);

function TableShowStadiums() {
    const access_token = useSelector(accessTokenSelector);
    const [row, setRow] = useState([]);
    const [stadium, setStadium] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
    const [stadiumId, setStadiumId] = useState('');
    const [name, setName] = useState('');

    const [obToast, setObToast] = useState({
        content: '',
        isShow: false,
    });

    const [isShowModalCreateStadiums, setIsShowModalCreateStadiums] = useState(false);

    const columns = [
        { Header: 'Stadium ID', accessor: 'col1', filter: 'fuzzyText' },
        { Header: 'Name', accessor: 'col2', filter: 'fuzzyText' },
        { Header: 'Address', accessor: 'col3', filter: 'fuzzyText' },
        { Header: 'Capacity', accessor: 'col4', filter: 'fuzzyText' },
        { Header: 'Image', accessor: 'col5', filter: 'fuzzyText' },
        { Header: 'Actions', accessor: 'col6', disableSortBy: true },
    ];

    const convertToDataRow = (row) => {
        const dataRow = row.map((row, index) => {
            return {
                col1: row.stadium_id,
                col2: row.name,
                col3: row.address,
                col4: row.capacity,
                col5: (
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
                ),
                col6: (
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
                            onClick={() => handleUpdateStadium(row.stadium_id)}
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
                            onClick={() => handleShowDeleteConfirmationDialog(row.stadium_id, row.name)}
                        >
                            <UilTimes size={18} />
                        </Button>
                    </div>
                ),
            };
        });
        setRow(dataRow);
    };

    const handleGetAllStadiums = async () => {
        const res = await adminService.getAllStadiums();
        convertToDataRow(res.stadiums);
    };

    const handleUpdateStadium = async (stadium_id) => {
        const res = await adminService.getOneStadium(stadium_id);
        setIsShowModalCreateStadiums(true);
        setStadiumId(stadium_id);
        setStadium(res);
    };

    const handleCloseModalCreateStadiums = () => {
        setIsShowModalCreateStadiums(false);
    };
    const handleClose = () => setShowDeleteConfirmationDialog(false);

    const handleShowDeleteConfirmationDialog = (stadium_id, name) => {
        setShowDeleteConfirmationDialog(true);
        setStadiumId(stadium_id);
        setName(name);
    };

    const handleDelete = () => {
        setIsLoader(true);
        setTimeout(async () => {
            const res = await adminService.deleteStadium(stadiumId, access_token);
            setObToast({ content: res.message, isShow: true });
            handleClose();
            setIsLoader(false);
            handleGetAllStadiums();
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
                    <Modal.Title style={{ fontSize: '24px' }}>Confirm stadium deletion</Modal.Title>
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
        handleGetAllStadiums();
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
                        <h2 className={cx('title')}>List of stadiums</h2>
                        <div className={cx('note')}>
                            Actions:
                            <div className={cx('btn-actions')}>
                                <Button
                                    className={cx('btn-add')}
                                    onClick={() => {
                                        setIsShowModalCreateStadiums(true);
                                        setStadium(null);
                                    }}
                                >
                                    <UilPlus size={16} />
                                    <span>Add stadium</span>
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
                    {isShowModalCreateStadiums && (
                        <ModalCreateStadiums
                            handleClose={handleCloseModalCreateStadiums}
                            handleGetAllStadiums={handleGetAllStadiums}
                            access_token={access_token}
                            stadium={stadium}
                            stadiumId={stadiumId}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default TableShowStadiums;
