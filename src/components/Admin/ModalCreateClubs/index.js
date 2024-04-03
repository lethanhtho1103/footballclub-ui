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

function ModalCreateClubs({ handleClose, handleGetAllClubs, club, access_token, clubId }) {
  const [isLoader, setIsLoader] = useState(false);
  const [name, setName] = useState(club?.name || '');
  const [image, setImage] = useState(club?.image || null);

  const [imageErr, setImageErr] = useState('');
  const [nameErr, setNameErr] = useState('');

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
      default: {
        break;
      }
    }
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const setDefaultValue = (club) => {
    setName(club?.name || '');
    setImage(club?.image || null);
    setNameErr('');
    setImageErr('');
  };

  const validateErrors = (errors) => {
    setNameErr(errors.name);
    setImageErr(errors.image);
  };

  const createClub = async () => {
    try {
      const clubData = {
        name,
        image,
        access_token,
      };
      const res = await adminService.createClub(clubData);
      if (res.club) {
        setDefaultValue();
        handleGetAllClubs();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updateClub = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (club?.image !== image) {
        formData.append('image', image);
      }
      const res = await adminService.updateClub(clubId, formData, access_token);
      if (res.club) {
        setDefaultValue(res.club);
        handleGetAllClubs();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createClub();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateClub();
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
        <TableErrors errors={{ name: nameErr, image: imageErr }} />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{club ? 'Update club' : 'Add club'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <FormInputGroup
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => changeInput(e, 'name')}
              required
              placeholder="Enter your name"
              error={nameErr?.length > 0}
            />
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
          {club ? (
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

export default ModalCreateClubs;
