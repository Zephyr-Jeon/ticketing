// Next does not just take components and show them on the screen.
// Instead, it wraps them up in its own custom default component which is referred to “_app.js” file
// Global CSS files should be imported here to be applied
// https://nextjs.org/docs/advanced-features/custom-app
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const { AppTree, Component, router, ctx } = appContext;
  const client = buildClient(ctx);

  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  try {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(
        ctx,
        client,
        data.currentUser
      );
    }

    return {
      pageProps,
      ...data,
    };
  } catch (e) {
    return { pageProps };
  }
};

export default AppComponent;
