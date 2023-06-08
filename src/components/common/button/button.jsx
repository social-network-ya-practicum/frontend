import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cn = classNames.bind(styles);

function Button({
	children,
	type,
	variant,
	width,
	outlined,
	active,
	disabled,
	mix,
	onClick,
}) {
	const cnButton = cn(
		`button-${variant}`,
		{ [`button-${variant}_outlined`]: outlined },
		{ [`button-${variant}_active`]: active },
		mix
	);

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
	variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
	width: PropTypes.string,
	outlined: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	mix: PropTypes.string,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	width: 'max-content',
	outlined: false,
	active: false,
	disabled: false,
	mix: undefined,
	onClick: undefined,
};
