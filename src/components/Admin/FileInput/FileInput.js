import classNames from 'classnames/bind';
import style from '../FormInputGroup/FormInputGroup.module.scss';

const cx = classNames.bind(style);

function FileInput({ label, onChange, error }) {
  return (
    <div className={cx('form__group', 'field', { err: error })}>
      <input onChange={onChange} className={cx('form__field')} type="file" id="image" />
      <label className={cx('form__label')}>
        <span>*</span> {label}:
      </label>
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
}

export default FileInput;
