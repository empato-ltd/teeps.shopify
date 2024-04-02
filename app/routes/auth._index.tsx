import {type LoaderFunction, redirect} from '@remix-run/server-runtime';

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
