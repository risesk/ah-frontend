import React from 'react';
import PropTypes from 'prop-types';

import './spin.css';

const Spin = ({ mix }) => {
  const style = mix
    ? `spin ${mix}`
    : 'spin';

  return (
    <span className={style} />
  );
};

Spin.propTypes = { mix: PropTypes.string };

export default Spin;
