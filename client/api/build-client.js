import axios from 'axios';

const buildClient = ({ req }) => {
  // For the initial page load, getInitialProps will run on the server only.
  // getInitialProps will then run on the client when navigating to a different route via the next/link component or by using next/router
  if (typeof window === 'undefined') {
    // We are on the server
    // base url: “http://<servicename>.<namespace>.svc.cluster.local”
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};

export default buildClient;
