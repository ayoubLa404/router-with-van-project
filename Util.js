// redirect protective routes

import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;

  const isLogIn = localStorage.getItem('loggedin');

  if (!isLogIn)
    throw redirect(`/login?message=please log in first&redirectTo=${pathname}`);
}
