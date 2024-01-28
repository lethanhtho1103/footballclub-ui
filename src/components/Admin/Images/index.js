import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import images from '~/assets/images/sponsor.webp';
import styles from './images.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, fallback: customFallback = images.noImage, className, ...props }, ref) => {
  const [fallback, serFallback] = useState('');

  const handeleError = () => {
    serFallback(customFallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handeleError}
    />
  );
});

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
