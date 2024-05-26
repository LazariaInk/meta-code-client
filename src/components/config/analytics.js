// src/analytics.js
import ReactGA from 'react-ga4';

const initGA = () => {
  ReactGA.initialize('G-7Q2536ZKL2');
};

const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export { initGA, logPageView };
