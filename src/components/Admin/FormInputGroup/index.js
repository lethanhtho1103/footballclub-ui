import classNames from 'classnames/bind';
import style from './FormInputGroup.module.scss';

const cx = classNames.bind(style);

function FormInputGroup({ id, label, type, value, onChange, placeholder, error }) {
  return (
    <div className={cx('form__group', 'field', { err: error })}>
      <input
        required=""
        className={cx('form__field')}
        autoComplete="off"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label className={cx('form__label')}>
        <span>*</span> {label}:
      </label>
      {/* {error && <span className={cx('error')}>{error}</span>} */}
    </div>
  );
}

export default FormInputGroup;
