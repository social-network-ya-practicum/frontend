import PropTypes from 'prop-types';
import styles from './right-sidebar-container.module.scss';

const RightSidebarContainer = ({ children, gap, width }) => {
  const inlineStyles = { gap, width };

  return (
    <section className={styles.container} style={inlineStyles}>
      {children}
    </section>
  );
};

export default RightSidebarContainer;

RightSidebarContainer.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  width: PropTypes.string,
};

RightSidebarContainer.defaultProps = {
  gap: undefined,
  width: undefined,
};
