import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cn = classNames.bind(styles);

function Button({ children, type, variant, width, disabled, mix, onClick }) {
  const cnButton = cn(`button-${variant}`, mix);

  return (
    <button
      className={cnButton}
      style={{ width, minWidth: 'max-content' }}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
  width: PropTypes.string,
  disabled: PropTypes.bool,
  mix: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  width: 'max-content',
  disabled: false,
  mix: undefined,
  onClick: undefined,
};
