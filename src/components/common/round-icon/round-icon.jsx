import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './round-icon.module.scss';

function RoundIcon({ size, src, alt, mixBlock, mixImg }) {
  const cnBorderGradient = clsx(
    {
      [styles.roundIconBlockSmall]: size === 'small',
      [styles.roundIconBlockSmallPlus]: size === 'small-plus',
      [styles.roundIconBlockMedium]: size === 'medium',
      [styles.roundIconBlockLarge]: size === 'large',
    },
    mixBlock
  );

  return (
    <div className={cnBorderGradient}>
      {src && (
        <img className={mixImg || styles.roundIconImg} src={src} alt={alt} />
      )}
    </div>
  );
}

export default RoundIcon;

RoundIcon.propTypes = {
  size: PropTypes.oneOf(['small', 'small-plus', 'medium', 'large']),
  src: PropTypes.string,
  alt: PropTypes.string,
  mixBlock: PropTypes.string,
  mixImg: PropTypes.string,
};

RoundIcon.defaultProps = {
  size: 'small',
  src: undefined,
  alt: 'Иконка',
  mixBlock: undefined,
  mixImg: undefined,
};
