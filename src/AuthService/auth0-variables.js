import { SPA_DOMAIN } from '../config';

export const AUTH_CONFIG = {
  domain: 'custom-shopping-cart.auth0.com',
  clientId: 'UCDBi0bGmF97bjI1ChBq2xwnohOt8E3k',
  callbackUrl: SPA_DOMAIN + '/callback',
  audience: 'shopping-cart-node-express-api'
};

/* AUTH_CONFIG.callbackUrl = 'http://localhost:3000/callback';
AUTH_CONFIG.callbackUrl =
('http://asmmahmud-react-shopping-cart.s3-website.us-east-2.amazonaws.com/callback'); */
