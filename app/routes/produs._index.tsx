import {type LoaderFunction, redirect} from '@remix-run/server-runtime';

export const loader: LoaderFunction = () => {
  return redirect('/catalog');
};

export default function Product() {}
