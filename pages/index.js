import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import nextCookie from 'next-cookies';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../styles/loginPage';
import { login } from '../helperFunctions/authFunctions';
import { registerAdmin } from '../redux/actions';
import Loader from '../components/Loader';
const { publicRuntimeConfig } = getConfig();

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
  isSubmitting,
  token
}) => {
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  useEffect(() => {
    if (token) Router.push('/events');
  }, []);

  if (token) {
    return <Loader title="Redirecting to admin page" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src="/static/images/jawak.gif" style={{ width: '50%' }} />
        <Typography component="h1" variant="h5" className={classes.title}>
          Admin Sign In
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
          <div className={classes.loadingWrapper}>
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
            {isSubmitting && <CircularProgress size={24} className={classes.loading} />}
          </div>
        </form>
      </div>
    </Container>
  );
};

Index.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  return token ? { token: JSON.parse(token) } : {};
};

const formikedIndex = withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: () => ({ emailorphone: '', password: '' }),
  validationSchema,
  handleSubmit: async ({ emailorphone, password }, { setSubmitting, setFieldError, props }) => {
    try {
      const { data: token } = await axios.post(`${publicRuntimeConfig.API_URL}/api/admin/login`, {
        emailorphone,
        password
      });
      props.registerAdmin(token.id);
      login({ token });
    } catch (e) {
      if (e.message === 'Network Error') {
        setFieldError('credentials', `Network error, please check your internet connection.`);
      } else {
        setFieldError('credentials', 'Wrong Credentials.');
      }
      setSubmitting(false);
    }
  }
})(Index);

const mapDispatchToProps = dispatch => ({ registerAdmin: id => dispatch(registerAdmin(id)) });

export default connect(
  null,
  mapDispatchToProps
)(formikedIndex);
