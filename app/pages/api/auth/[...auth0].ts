import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0';
import { LoggerService } from '@services/logger';
import { NextApiRequest, NextApiResponse } from 'next';

function onError(req: NextApiRequest, res: NextApiResponse, error: Error) {
  LoggerService.log('error', error.message, { req, res, error });
}

async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res, {
      afterCallback: (req, res, session) => {
        console.log(session.user);

        return session;
      },
    });
  } catch (err) {
    LoggerService.log('error', err);

    if (err instanceof Error) {
      return res.redirect('/account');
    }

    return res.redirect('/account');
  }
}

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogin(req, res, {
      returnTo: '/account',
    });
  } catch (err) {
    LoggerService.log('error', err);
    return res.redirect('/api/auth/logout');
  }
}

export default handleAuth({
  onError,
  callback,
  login,
});
