import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../styles/searchBar';

const SearchBar = ({ label, text, values, handleSearch }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);

  const inputLabel = useRef(null);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const handleClick = async value => {
    setLoading(true);
    await handleSearch(value);
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor={label}>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          input={
            <OutlinedInput labelWidth={labelWidth} name={label} id={label} />
          }
        >
          <MenuItem value="" />
          {values.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{text}</FormHelperText>
      </FormControl>
      <div className={classes.wrapper}>
        <Fab
          disabled={loading}
          className={classes.fab}
          onClick={() => handleClick(value)}
          size="medium"
        >
          <SearchIcon />
        </Fab>
        {loading && (
          <CircularProgress size={20} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = loading => ({ loading });

export default connect(mapStateToProps)(SearchBar);
