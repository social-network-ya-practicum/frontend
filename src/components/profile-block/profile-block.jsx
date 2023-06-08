import PropTypes from 'prop-types';
import styles from './profile-block.module.scss';

function ProfileBlock({ avatar, info, role }) {
	return (
		<div className={styles['profile-block']}>
			<div className={styles['profile-block__photo']}>
				{avatar && (
					<img
						className={styles['profile-block__avatar']}
						src={avatar}
						alt="аватар"
					/>
				)}
			</div>
			<h2 className={styles['profile-block__name']}>
				{info.firstName} {info.lastName}
			</h2>
			<p className={styles['profile-block__role']}>{role}</p>
			<div className={styles['profile-block__item']}>
				<p className={styles['profile-block__text']}>Публикации</p>
				<span className={styles['profile-block__span']}>8</span>
			</div>
		</div>
	);
}

export default ProfileBlock;

ProfileBlock.propTypes = {
	role: PropTypes.string,
	avatar: PropTypes.string,
	info: PropTypes.shape({
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
	}),
};

ProfileBlock.defaultProps = {
	role: '',
	avatar: '',
	info: {
		firstName: '',
		lastName: '',
	},
};
