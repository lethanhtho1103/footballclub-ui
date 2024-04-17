import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from '../FormInputGroup/FormInputGroup.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import FormInputGroup from '../FormInputGroup';
import SelectInput from '../SelectInput';

const cx = classNames.bind(style);

function ModalCreateSeats({ handleClose, access_token, isUpdate, isDelete, handleShowSeatsOfArea }) {
  const [isLoader, setIsLoader] = useState(false);

  const [stand, setStand] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [start_seat, setStartSeat] = useState();
  const [end_seat, setEndSeat] = useState();
  const [status, setStatus] = useState('');

  const [standErr, setStandErr] = useState('');
  const [typeErr, setTypeErr] = useState('');
  const [priceErr, setPriceErr] = useState('');
  const [quantityErr, setQuantityErr] = useState('');
  const [startSeatErr, setStartSeatErr] = useState('');
  const [endSeatErr, setEndSeatErr] = useState('');
  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'stand': {
        setStand(value);
        break;
      }
      case 'type': {
        setType(value);
        break;
      }
      case 'price': {
        setPrice(value);
        break;
      }
      case 'quantity': {
        setQuantity(value);
        break;
      }
      case 'start_seat': {
        setStartSeat(value);
        break;
      }
      case 'end_seat': {
        setEndSeat(value);
        break;
      }
      case 'status': {
        setStatus(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const setDefaultValue = () => {
    setStand('');
    setType('');
    setPrice('');
    setQuantity('');
    setStartSeat('');
    setEndSeat('');
    setStatus('');

    setStandErr('');
    setTypeErr('');
    setPriceErr('');
    setQuantityErr('');
    setStartSeatErr('');
    setEndSeatErr('');
  };

  const validateErrors = (errors) => {
    setStandErr(errors.stand);
    setTypeErr(errors.type);
    setPriceErr(errors.price);
    setQuantityErr(errors.quantity);
    setStartSeatErr(errors.start_seat);
    setEndSeatErr(errors.end_seat);
  };

  const createSeats = async () => {
    try {
      const seatsData = {
        stadium_id: 1,
        stand,
        type,
        price,
        quantity,
        access_token,
      };
      const res = await adminService.createSeats(seatsData);
      if (res.message) {
        handleShowSeatsOfArea(stand);
        setDefaultValue();
        setObToast({ content: res.message, isShow: true });
      }
      console.log(seatsData);
    } catch (error) {
      validateErrors(error.response.data.error);
    }
  };

  const updateSeats = async () => {
    try {
      const seatsData = {
        stadium_id: 1,
        stand,
        type,
        price,
        start_seat,
        end_seat,
        status: 'available',
        access_token,
      };
      const res = await adminService.updateSeats(seatsData);
      if (res.message) {
        handleShowSeatsOfArea(stand);
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.error);
    }
  };

  const deleteSeats = async () => {
    try {
      const seatsData = {
        stadium_id: 1,
        stand,
        start_seat,
        end_seat,
        access_token,
      };
      const res = await adminService.deleteSeats(seatsData);
      if (res.message) {
        handleShowSeatsOfArea(stand);
        setObToast({ content: res.message, isShow: true });
        handleClose();
      }
    } catch (error) {
      validateErrors(error.response.data.error);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createSeats();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateSeats();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickDelete = () => {
    setIsLoader(true);
    setTimeout(() => {
      deleteSeats();
      setIsLoader(false);
    }, 1000);
  };

  return (
    <>
      {isLoader && <Loader />}
      {obToast?.content?.length > 0 && (
        <ToastMassage isShow={obToast.show} content={obToast.content} handleClose={() => setObToast({ content: '' })} />
      )}
      <Modal
        show={true}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
        <TableErrors
          errors={{
            start_seat: startSeatErr,
            end_seat: endSeatErr,
            stand: standErr,
            type: typeErr,
            price: priceErr,
            quantity: quantityErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{isUpdate ? 'Update seats' : isDelete ? 'Delete seats' : 'Add seats'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            {(isUpdate || isDelete) && (
              <div>
                <FormInputGroup
                  label="Start_Seat"
                  type="number"
                  placeholder="start_seat"
                  value={start_seat}
                  id="start_seat"
                  onChange={(e) => changeInput(e, 'start_seat')}
                  error={startSeatErr?.length > 0}
                />
              </div>
            )}
            {(isUpdate || isDelete) && (
              <div>
                <FormInputGroup
                  label="End_Seat"
                  type="number"
                  placeholder="end_seat"
                  value={end_seat}
                  id="end_seat"
                  onChange={(e) => changeInput(e, 'end_seat')}
                  error={endSeatErr?.length > 0}
                />
              </div>
            )}
            <SelectInput
              label="Stand"
              id="stand"
              options={[
                { value: 'E', label: 'East stand' },
                { value: 'W', label: 'West stand' },
                { value: 'N', label: 'North bank' },
                { value: 'S', label: 'South end' },
              ]}
              value={stand}
              onChange={(e) => changeInput(e, 'stand')}
              error={standErr?.length > 0}
            />
            {!isDelete && (
              <SelectInput
                label="Type"
                id="type"
                options={[
                  { value: 'Normal', label: 'Normal' },
                  { value: 'VIP', label: 'VIP' },
                  { value: 'VVIP', label: 'VVIP' },
                ]}
                value={type}
                onChange={(e) => changeInput(e, 'type')}
                error={typeErr?.length > 0}
              />
            )}

            {!isDelete && (
              <div>
                <FormInputGroup
                  label="Price"
                  type="number"
                  placeholder="price"
                  value={price}
                  id="price"
                  onChange={(e) => changeInput(e, 'price')}
                  error={priceErr?.length > 0}
                />
              </div>
            )}

            {!isUpdate && !isDelete && (
              <div>
                <FormInputGroup
                  label="Quantity"
                  type="number"
                  placeholder="quantity"
                  value={quantity}
                  id="quantity"
                  onChange={(e) => changeInput(e, 'quantity')}
                  error={quantityErr?.length > 0}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={cx('btn')}
            variant="secondary"
            onClick={() => {
              setDefaultValue('er');
              handleClose();
            }}
          >
            Cancel
          </Button>

          {isUpdate ? (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickUpdate}>
              Update
            </Button>
          ) : isDelete ? (
            <Button className={cx('btn')} variant="danger" onClick={handleCLickDelete}>
              Delete
            </Button>
          ) : (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickCreate}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateSeats;
