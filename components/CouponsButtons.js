import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { changeCouponState } from '../helperFunctions/couponfunctions';

const CouponsButtons = ({ couponId, isActive }) => {
  const [updatedActive, setUpdatedActive] = useState(isActive);

  const handleClick = (id, activityState) => {
    try {
      changeCouponState(id, activityState);
      setUpdatedActive(!updatedActive);
    } catch (e) {}
  };

  return (
    <Tooltip title={!updatedActive ? 'Activate' : 'Disable'}>
      <IconButton
        color={updatedActive ? 'primary' : 'secondary'}
        onClick={() => handleClick(couponId, updatedActive)}
      >
        {updatedActive ? <CheckIcon /> : <CloseIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CouponsButtons;
