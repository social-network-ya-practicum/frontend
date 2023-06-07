import PropTypes from 'prop-types';
import ProfileBlock from '../profile-block/profile-block';
import styles from './main-page-shell.module.scss';

function MainPageShell( {children} ) {
	return (
		<div className={styles['main-page-shell']}>
      <div className={styles['main-page-shell__box']}>
        <ProfileBlock/>
        {children}
      </div>
		</div>
	);
}

export default MainPageShell;


MainPageShell.propTypes = {
  children: PropTypes.node.isRequired
}

