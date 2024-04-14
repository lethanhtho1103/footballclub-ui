import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from '../FormInputGroup/FormInputGroup.module.scss';
import classNames from 'classnames/bind';
import adminService from '~/services/adminService';
import Loader from '~/components/Loader';
import TableErrors from '../TableErrors';
import { baseUrl } from '~/axios';
import FormInputGroup from '../FormInputGroup';
import SelectInput from '../SelectInput';

const cx = classNames.bind(style);

function ModalCreateContracts({ handleClose, handleGetAllContracts, contract, access_token, contractId, users }) {
  const [isLoader, setIsLoader] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [user_id, setUserId] = useState(contract?.user_id || '');
  const [date_created, setDateCreated] = useState(contract?.date_created || '');
  const [expiration_date, setExpirationDate] = useState(contract?.expiration_date || '');
  const [salary, setSalary] = useState(contract?.salary || '');
  const [pdf, setPdf] = useState(contract?.pdf || null);
  const [type, setType] = useState(contract?.type || '');

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
      case 'type': {
        // Thêm xử lý cho type
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
        type, // Thêm type
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

  const handleGetAllCompany = async () => {
    const res = await adminService.getAllCompany();
    setCompanies(res.company);
  };

  useEffect(() => {
    handleGetAllCompany();
  }, []);

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
            user_id: userIdErr,
            date_created: dateCreatedErr,
            expiration_date: expirationDateErr,
            salary: salaryErr,
            pdf: pdfErr,
            type: typeErr,
          }}
        />
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>{contract ? 'Update contract' : 'Add Contract'}</h5>
        </Modal.Header>
        <Modal.Body className={cx('modal-body')}>
          <Form>
            <SelectInput
              label="Type"
              id="type"
              options={[
                { value: 'advertisement', label: 'Advertisement' },
                { value: 'individual', label: 'Individual' },
                { value: 'sponsorship', label: 'Sponsorship' },
                { value: 'rental', label: 'Rental' },
              ]}
              value={type}
              onChange={(e) => changeInput(e, 'type')}
              error={typeErr?.length > 0}
            />
            {type === 'individual' && (
              <SelectInput
                id="user_id"
                label="User"
                options={users.slice(1).map((user) => ({
                  value: user.user_id,
                  label: user.name,
                }))}
                value={user_id}
                onChange={(e) => changeInput(e, 'user_id')}
                error={userIdErr?.length > 0}
              />
            )}
            {type !== 'individual' && type.length > 0 && (
              <SelectInput
                id="user_id"
                label="Company"
                options={companies.map((company) => ({
                  value: company.user_id,
                  label: company.name,
                }))}
                value={user_id}
                onChange={(e) => changeInput(e, 'user_id')}
                error={userIdErr?.length > 0}
              />
            )}

            <FormInputGroup
              id="date_created"
              label="Date Created"
              type="date"
              value={date_created}
              onChange={(e) => changeInput(e, 'date_created')}
              error={dateCreatedErr?.length > 0}
            />
            <FormInputGroup
              id="expiration_date"
              label="Expiration Date"
              type="date"
              value={expiration_date}
              onChange={(e) => changeInput(e, 'expiration_date')}
              error={expirationDateErr?.length > 0}
            />
            <FormInputGroup
              id="salary"
              label="Salary"
              type="number"
              value={salary}
              placeholder="salary"
              onChange={(e) => changeInput(e, 'salary')}
              error={salaryErr?.length > 0}
            />
            <FormInputGroup
              id="pdf"
              label="Select PDF file"
              type="file"
              onChange={handleChangePdf}
              error={pdfErr?.length > 0}
            />
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
