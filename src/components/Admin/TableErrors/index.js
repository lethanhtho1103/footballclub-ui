import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faBug } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './TableErrors.module.scss';

const cx = classNames.bind(style);

function TableErrors({ errors }) {
  const hasErrors = Object.values(errors).some((err) => err !== '');
  return (
    <div className={cx('table-err', { show: hasErrors })}>
      <h2>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faBug} />
        </div>
        <span>Please check the entered data:</span>
      </h2>
      <div className={cx('wrap-err')}>
        <ul>
          {Object.entries(errors).map(
            ([key, value]) =>
              value && (
                <li key={key}>
                  <label htmlFor={key}>
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {value}
                  </label>
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
}

export default TableErrors;
