import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalCreateContracts.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import { baseUrl } from '~/axios';

const cx = classNames.bind(style);

function ModalCreateContracts({ handleClose, handleGetAllContracts, contract, access_token, contractId, users }) {
  const [isLoader, setIsLoader] = useState(false);

  const [user_id, setUserId] = useState(contract?.user_id || '');
  const [date_created, setDateCreated] = useState(contract?.date_created || '');
  const [expiration_date, setExpirationDate] = useState(contract?.expiration_date || '');
  const [salary, setSalary] = useState(contract?.salary || '');
  const [pdf, setPdf] = useState(contract?.pdf || null);
  const [type, setType] = useState(contract?.type || ''); // Thêm state cho type
  const [userIdErr, setUserIdErr] = useState('');
  const [dateCreatedErr, setDateCreatedErr] = useState('');
  const [expirationDateErr, setExpirationDateErr] = useState('');
  const [salaryErr, setSalaryErr] = useState('');
  const [pdfErr, setPdfErr] = useState('');
  const [typeErr, setTypeErr] = useState(''); // State lưu trữ lỗi liên quan đến type

  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'user_id': {
        setUserId(value);
        break;
      }
      case 'date_created': {
        setDateCreated(value);
        break;
      }
      case 'expiration_date': {
        setExpirationDate(value);
        break;
      }
      case 'salary': {
        setSalary(value);
        break;
      }
      case 'type': { // Thêm xử lý cho type
        setType(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangePdf = (e) => {
    setPdf(e.target.files[0]);
  };

  const setDefaultValue = (contract) => {
    setUserId(contract?.user_id || '');
    setDateCreated(contract?.date_created || '');
    setExpirationDate(contract?.expiration_date || '');
    setSalary(contract?.salary || '');
    setPdf(contract?.pdf || null);
    setType(contract?.type || ''); // Thêm type
    setUserIdErr('');
    setExpirationDateErr('');
    setSalaryErr('');
    setPdfErr('');
    setTypeErr(''); // Reset typeErr
  };

  const checkErr = (type) => {
    switch (type) {
      case 'user_id': {
        return userIdErr?.length > 0;
      }
      case 'date_created': {
        return dateCreatedErr?.length > 0;
      }
      case 'expiration_date': {
        return expirationDateErr?.length > 0;
      }
      case 'salary': {
        return salaryErr?.length > 0;
      }
      case 'pdf': {
        return pdfErr?.length > 0;
      }
      case 'type': { // Thêm xử lý cho type
        return typeErr?.length > 0;
      }
      default: {
        break;
      }
    }
  };

  const validateErrors = (errors) => {
    setUserIdErr(errors.user_id);
    setDateCreatedErr(errors.date_created);
    setExpirationDateErr(errors.expiration_date);
    setSalaryErr(errors.salary);
    setPdfErr(errors.pdf);
    setTypeErr(errors.type); // Thêm xử lý cho type
  };

  const createContract = async () => {
    try {
      const contractData = {
        user_id,
        date_created,
        expiration_date,
        salary,
        pdf,
        access_token,
        type // Thêm type
      };
      const res = await adminService.createContract(contractData);
      if (res.contract) {
        setDefaultValue();
        handleGetAllContracts();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const updateContract = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('date_created', date_created);
      formData.append('expiration_date', expiration_date);
      formData.append('salary', salary);
      formData.append('type', type); // Thêm type
      if (contract?.pdf !== pdf) {
        formData.append('pdf', pdf);
      }
      const res = await adminService.updateContract(contractId, formData, access_token);
      if (res.contract) {
        setDefaultValue(res.contract);
        handleGetAllContracts();
        setObToast({ content: res.message, isShow: true });
      }
    } catch (error) {
      validateErrors(error.response.data.errors);
    }
  };

  const handleCLickCreate = () => {
    setIsLoader(true);
    setTimeout(() => {
      createContract();
      setIsLoader(false);
    }, 1000);
  };

  const handleCLickUpdate = () => {
    setIsLoader(true);
    setTimeout(() => {
      updateContract();
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
          userIdErr={userIdErr}
          dateCreatedErr={dateCreatedErr}
          expirationDateErr={expirationDateErr}
          salaryErr={salaryErr}
          pdfErr={pdfErr}
          typeErr={typeErr} // Thêm typeErr
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{contract ? 'Update contract' : 'Add Contract'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('user_id'),
              })}
            >
              <select
                required=""
                id="user_id"
                className={cx('form__field')}
                value={user_id}
                onChange={(e) => changeInput(e, 'user_id')}
              >
                <option value="">Select User</option>
                {users.slice(1).map((user) => (
                  <option key={user.id} value={user.user_id} style={{ backgroundImage: `url(${baseUrl}${user.image}` }}>
                    {user.name}
                  </option>
                ))}
              </select>
              <label className={cx('form__label')} htmlFor="user_id">
                <span>*</span> User:
              </label>
            </div>

            <div
              className={cx('form__group', 'field', {
                err: checkErr('type'), // Thêm xử lý cho type
              })}
            >
              <select
                id="type"
                className={cx('form__field')}
                value={type}
                onChange={(e) => changeInput(e, 'type')}
              >
                <option value="">Select Type</option>
                <option value="advertisement">Advertisement</option>
                <option value="individual">Individual</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="rental">Rental</option>
              </select>
              <label className={cx('form__label')} htmlFor="type">
                <span>*</span> Type:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('date_created'),
              })}
            >
              <input
                required=""
                placeholder="Date Created"
                id="date_created"
                className={cx('form__field')}
                autoComplete="off"
                type="date"
                value={date_created}
                onChange={(e) => changeInput(e, 'date_created')}
              ></input>
              <label className={cx('form__label')} htmlFor="date_created">
                <span>*</span> Date Created:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('expiration_date'),
              })}
            >
              <input
                required=""
                placeholder="Expiration Date"
                id="expiration_date"
                className={cx('form__field')}
                autoComplete="off"
                type="date"
                value={expiration_date}
                onChange={(e) => changeInput(e, 'expiration_date')}
              ></input>
              <label className={cx('form__label')} htmlFor="expiration_date">
                <span>*</span> Expiration Date:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('salary'),
              })}
            >
              <input
                required=""
                placeholder="Salary"
                id="salary"
                className={cx('form__field')}
                autoComplete="off"
                type="number"
                value={salary}
                onChange={(e) => changeInput(e, 'salary')}
              ></input>
              <label className={cx('form__label')} htmlFor="salary">
                <span>*</span> Salary:
              </label>
            </div>
            <div
              className={cx('form__group', 'field', {
                err: checkErr('pdf'),
              })}
            >
              <input onChange={handleChangePdf} id="pdf" className={cx('form__field')} type="file"></input>
              <label className={cx('form__label')} htmlFor="pdf">
                <span>*</span> Select PDF file:
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
          {contract ? (
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

export default ModalCreateContracts;
