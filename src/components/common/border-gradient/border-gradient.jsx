import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './border-gradient.module.scss';

function BorderGradient({ children, size, mix }) {
  const cnBorderGradient = clsx(
    {
      [styles.borderGradientSmall]: size === 'small',
      [styles.borderGradientSmallPlus]: size === 'small-plus',
      [styles.borderGradientMedium]: size === 'medium',
      [styles.borderGradientLarge]: size === 'large',
    },
    mix
  );

  return <div className={cnBorderGradient}>{children}</div>;
}

export default BorderGradient;

BorderGradient.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'small-plus', 'medium', 'large']),
  mix: PropTypes.string,
};

BorderGradient.defaultProps = {
  size: 'small',
  mix: undefined,
};
