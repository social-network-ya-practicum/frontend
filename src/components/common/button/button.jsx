import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cn = classNames.bind(styles);

function Button({
	children,
	type,
	variant,
	viewType,
	color,
	fullWidth,
	disabled,
	mix,
	onClick,
	maxWidth,
}) {
	const cnButton = cn(
		`button-${variant}`,
		`button-${variant}_${viewType}`,
		`button-${variant}_color_${color}`,
		{
			[`button-${variant}_full-widthed`]: fullWidth,
		},
		mix
	);

	return (
		<button
			className={cnButton}
			style={{ maxWidth, minWidth: 'max-content' }}
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
	variant: PropTypes.oneOf(['rounded', 'text']),
	viewType: PropTypes.oneOf(['filled', 'outlined']),
	color: PropTypes.oneOf(['primary']),
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	mix: PropTypes.string,
	onClick: PropTypes.func,
	maxWidth: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'rounded',
	viewType: 'filled',
	color: 'primary',
	fullWidth: true,
	disabled: false,
	mix: undefined,
	onClick: undefined,
	maxWidth: undefined,
};
