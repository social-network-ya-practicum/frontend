import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({ children }) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default ScrollToTop;

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
};
