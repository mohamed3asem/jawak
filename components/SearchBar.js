import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { getEventsByOrganizerId } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '35%'
  },
  fab: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const SearchBar = ({ label, text, values, handleSearch }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

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
      <Fab
        variant="extended"
        className={classes.fab}
        onClick={() => handleSearch(value)}
      >
        <SearchIcon />
        Search
      </Fab>
    </div>
  );
};

export default SearchBar;
