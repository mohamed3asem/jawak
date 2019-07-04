import React from 'react';
import Router from 'next/router';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../styles/loginPage';
import { login } from '../redux/actions';

const validationSchema = Yup.object({
  emailorphone: Yup.string('').required('Required Field'),
  password: Yup.string('').required('Required Field')
});

const Index = ({
  values: { emailorphone, password },
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  isSubmitting
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
            id="emailorphone"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address Or Phone Number"
            name="emailorphone"
            autoFocus
            helperText={touched.emailorphone ? errors.emailorphone : ''}
            error={touched.emailorphone && !!errors.emailorphone}
            value={emailorphone}
            onChange={change.bind(null, 'emailorphone')}
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
          {errors.credentials && (
            <Typography color="secondary" align="center">
              {errors.credentials}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid || isSubmitting}
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
  mapPropsToValues: () => ({ emailorphone: '', password: '' }),
  validationSchema,
  handleSubmit: async (
    { emailorphone, password },
    { setSubmitting, setFieldError }
  ) => {
    try {
      const { data } = await login(emailorphone, password);
      localStorage.setItem('jawakAdmin', data.email);
      Router.push('/events');
    } catch (e) {
      setFieldError('credentials', 'Wrong Credentials');
      setSubmitting(false);
    }
  }
})(Index);
