import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../styles/loginPage';

const validationSchema = Yup.object({
  email: Yup.string('Please, enter your email')
    .email('Not valid email')
    .required('Required Field'),
  password: Yup.string('').required('Required Field')
});

const Index = ({
  values: { email, password },
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched
}) => {
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && !!errors.email}
            value={email}
            onChange={change.bind(null, 'email')}
          />
          <TextField
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && !!errors.password}
            value={password}
            onChange={change.bind(null, 'password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema,
  handleSubmit: values => {
    console.log(values);
  }
})(Index);
