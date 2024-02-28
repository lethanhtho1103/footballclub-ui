import { Toast, ToastContainer } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ToastMassage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ToastMassage({ content, handleClose, isShow, dur = 4000 }) {
  return (
    <div className={cx('wrap')}>
      <ToastContainer>
        <Toast className={cx('toast')} onClose={handleClose} show={isShow} delay={dur} animation={true} autohide>
          <Toast.Header className={cx('toast-header')}>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
            <small>Just finished</small>
          </Toast.Header>
          <Toast.Body>
            <FontAwesomeIcon className={cx('icon')} icon={faCircleCheck} />

            <span className={cx('content')}>{content}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastMassage;
