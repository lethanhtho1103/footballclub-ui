import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faBug } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './TableErrors.module.scss';

const cx = classNames.bind(style);

function TableErrors({
  nameErr,
  emailErr,
  passwordErr,
  dateOfBirthErr,
  nationalityErr,
  positionErr,
  jerseyNumberErr,
  imageErr,
  detailErr,
}) {
  return (
    <div
      className={cx('table-err', {
        show:
          nameErr ||
          emailErr ||
          passwordErr ||
          dateOfBirthErr ||
          nationalityErr ||
          positionErr ||
          jerseyNumberErr ||
          imageErr ||
          detailErr,
      })}
    >
      <h2>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faBug} />
        </div>
        <span>Please check the entered data:</span>
      </h2>
      <div className={cx('wrap-err')}>
        <ul>
          {nameErr && (
            <li>
              <label htmlFor="name">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {nameErr}
              </label>
            </li>
          )}
          {emailErr && (
            <li>
              <label htmlFor="email">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {emailErr}
              </label>
            </li>
          )}
          {passwordErr && (
            <li>
              <label htmlFor="password">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {passwordErr}
              </label>
            </li>
          )}
          {dateOfBirthErr && (
            <li>
              <label htmlFor="date_of_birth">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {dateOfBirthErr}
              </label>
            </li>
          )}
          {nationalityErr && (
            <li>
              <label htmlFor="nationality">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {nationalityErr}
              </label>
            </li>
          )}
          {positionErr && (
            <li>
              <label htmlFor="position">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {positionErr}
              </label>
            </li>
          )}
          {jerseyNumberErr && (
            <li>
              <label htmlFor="jersey_number">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {jerseyNumberErr}
              </label>
            </li>
          )}
          {imageErr && (
            <li>
              <label htmlFor="image">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {imageErr}
              </label>
            </li>
          )}
          {detailErr && (
            <li>
              <label htmlFor="detail">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {detailErr}
              </label>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TableErrors;
