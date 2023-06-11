import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './border-gradient.module.scss';

const cn = classNames.bind(styles);

function BorderGradient({ children, size, mix }) {
  const cnBorderGradient = cn(`borderGradient-${size}`, mix);

  return <div className={cnBorderGradient}>{children}</div>;
}

export default BorderGradient;

BorderGradient.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  mix: PropTypes.string,
};

BorderGradient.defaultProps = {
  size: 'small',
  mix: PropTypes.string,
};
