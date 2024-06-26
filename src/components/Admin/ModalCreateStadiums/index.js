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
import FileInput from '../FileInput/FileInput';

const cx = classNames.bind(style);

function ModalCreateStadiums({ handleClose, handleGetAllStadiums, access_token, stadium, stadiumId }) {
  const [isLoader, setIsLoader] = useState(false);

  const [name, setName] = useState(stadium?.name || '');
  const [address, setAddress] = useState(stadium?.address || '');
  const [capacity, setCapacity] = useState(stadium?.capacity || '');
  const [image, setImage] = useState(stadium?.image || null);

  const [nameErr, setNameErr] = useState('');
  const [addressErr, setAddressErr] = useState('');
  const [capacityErr, setCapacityErr] = useState('');
  const [imageErr, setImageErr] = useState('');

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'name': {
        setName(value);
        break;
      }
      case 'address': {
        setAddress(value);
        break;
      }
      case 'capacity': {
        setCapacity(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const setDefaultValue = (stadium) => {
    setName(stadium?.name || '');
    setAddress(stadium?.address || '');
    setCapacity(stadium?.capacity || '');
    setImage(stadium?.image || null);
    setNameErr('');
    setAddressErr('');
    setCapacityErr('');
    setImageErr('');
  };

  const validateErrors = (errors) => {
    setNameErr(errors.name);
    setAddressErr(errors.address);
    setCapacityErr(errors.capacity);
    setImageErr(errors.image);
  };

  const createStadium = async () => {
    try {
      const stadiumData = {
        name,
        address,
        capacity,
        image,
        access_token,
      };
      const res = await adminService.createStadium(stadiumData);
      if (res.stadium) {
        setDefaultValue();
        handleGetAllStadiums();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updateStadium = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('capacity', capacity);
      if (stadium?.image !== image) {
        formData.append('image', image);
      }
      const res = await adminService.updateStadium(stadiumId, formData, access_token);
      if (res.stadium) {
        setDefaultValue(res.stadium);
        handleGetAllStadiums();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createStadium();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateStadium();
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
            name: nameErr,
            address: addressErr,
            capacity: capacityErr,
            image: imageErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{stadium ? 'Update stadium' : 'Add stadium'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <FormInputGroup
              label="Name"
              type="text"
              placeholder="Name"
              value={name}
              id="name"
              onChange={(e) => changeInput(e, 'name')}
              error={nameErr?.length > 0}
            />
            <FormInputGroup
              label="Address"
              type="text"
              placeholder="address"
              value={address}
              id="address"
              onChange={(e) => changeInput(e, 'address')}
              error={addressErr?.length > 0}
            />
            <div className={cx('col-md-6')}>
              <FormInputGroup
                label="Capacity"
                type="number"
                placeholder="capacity"
                value={capacity}
                id="capacity"
                onChange={(e) => changeInput(e, 'capacity')}
                error={capacityErr?.length > 0}
              />
            </div>
            <FileInput label="Select file image" onChange={handleChangeImage} error={imageErr?.length > 0} />
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
          {stadium ? (
            <Button className={cx('btn')} variant="primary" onClick={handleCLickUpdate}>
              Update
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

export default ModalCreateStadiums;
