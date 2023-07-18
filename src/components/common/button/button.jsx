import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './button.module.scss';

function Button({
  children,
  type,
  variant,
  width,
  disabled,
  mix,
  onClick,
  link,
}) {
  const cnButton = clsx(
    {
      [styles.buttonPrimary]: variant === 'primary',
      [styles.buttonSecondary]: variant === 'secondary',
      [styles.buttonLink]: link,
    },
    mix
  );

  if (link) {
    return (
      <a
        className={cnButton}
        style={{ width, minWidth: 'max-content' }}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

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
  link: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  width: 'max-content',
  disabled: false,
  mix: undefined,
  onClick: undefined,
  link: undefined,
};
