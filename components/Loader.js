import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/loader';

const Loader = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <div className="loader--root">
        <div className="loader--body">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="loader--base">
            <span />
            <div className="loader--face" />
          </div>
        </div>
      </div>
      <div className="loader--longfazers">
        <span />
        <span />
        <span />
        <span />
      </div>
      <h1 className="loader--text">{title}</h1>
    </>
  );
};

export default Loader;
