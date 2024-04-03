import classNames from 'classnames/bind';
import style from '../FormInputGroup/FormInputGroup.module.scss';

const cx = classNames.bind(style);

function SelectInput({ id, label, options, value, onChange, error }) {
  return (
    <div className={cx('form__group', 'field', { err: error })}>
      <select className={cx('form__field')} value={value} onChange={onChange} id={id}>
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className={cx('form__label')}>
        <span>*</span> {label}:
      </label>
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
}

export default SelectInput;
