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
	width,
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
	variant: PropTypes.oneOf(['rounded', 'text', 'active', 'passive']),
	viewType: PropTypes.oneOf(['outlined']),
	color: PropTypes.oneOf(['primary', 'secondary']),
	fullWidth: PropTypes.bool,
	disabled: PropTypes.bool,
	mix: PropTypes.string,
	onClick: PropTypes.func,
	width: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'rounded',
	viewType: '',
	color: 'primary',
	fullWidth: true,
	disabled: false,
	mix: undefined,
	onClick: undefined,
	width: undefined,
};
