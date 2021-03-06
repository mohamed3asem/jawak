import React from 'react';
import nextCookie from 'next-cookies';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Navbar from '../components/Navbar';
import { store } from '../redux';
import { registerAdmin } from '../redux/actions';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let { token } = nextCookie(ctx);
    if (token) {
      token = JSON.parse(token);
    }
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      },
      token
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.store.dispatch(registerAdmin(this.props.token.id));
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>Jawak - Admin</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
