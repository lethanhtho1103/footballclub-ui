import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

import classNames from 'classnames/bind';
import styles from './GlobalFilter.module.scss';
const cx = classNames.bind(styles);

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value.trim() || undefined);
  }, 200);

  return (
    <span className={cx('wrap')}>
      <span className={cx('title')}>Search:</span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

export default GlobalFilter;
