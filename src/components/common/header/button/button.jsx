import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './button.module.scss';

function Button({ primary, backgroundColor, label, ...props }) {
	const mainCn = cn(
		styles.button,
		styles[backgroundColor],
	)
	
	return (
		<button
			type="button"
			className={mainCn}
			{...props}
		>
			{label}
		</button>
	);
};

export default Button;

Button.propTypes = {
	primary: PropTypes.bool,
	backgroundColor: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	backgroundColor: null,
	primary: false,
	onClick: undefined,
};
