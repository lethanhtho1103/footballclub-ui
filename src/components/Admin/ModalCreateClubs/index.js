import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalCreateClubs.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';

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
    setImageErr('');
  };

  const checkErr = (type) => {
    switch (type) {
      case 'name': {
        return nameErr?.length > 0;
      }
      case 'image': {
        return imageErr?.length > 0;
      }
      default: {
        break;
      }
    }
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
      if (res.user) {
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
      if (res.Club) {
        setDefaultValue(res.Club);
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
        <TableErrors
          nameErr={nameErr}
          imageErr={imageErr}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{club ? 'Update club' : 'Add club'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('name'),
              })}
            >
              <input
                required=""
                placeholder="Name"
                id="name"
                className={cx('form__field')}
                autoComplete="off"
                type="input"
                value={name}
                onChange={(e) => changeInput(e, 'name')}
              ></input>
              <label className={cx('form__label')} htmlFor="name">
                <span>*</span> Name:
              </label>
            </div>
            
            <div
              className={cx('form__group', 'field', {
                err: checkErr('image'),
              })}
            >
              <input onChange={handleChangeImage} id="image" className={cx('form__field')} type="file"></input>
              <label className={cx('form__label')} htmlFor="image">
                <span>*</span> Select file image:
              </label>
            </div>
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
