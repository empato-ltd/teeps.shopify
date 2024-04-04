import {Await, useLoaderData} from '@remix-run/react';
import {defer, json, type LoaderFunction} from '@remix-run/server-runtime';
import {Suspense} from 'react';

export const loader: LoaderFunction = async ({context, params, request}) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        message: 'Mock data received',
      };
      resolve(data);
    }, 5000);
  });
  return json({promise: await promise});
  // return defer({promise});
};

export default function Test() {
  const {promise} = useLoaderData() as {promise: Promise<any>};

  return (
    <div className="h-screen bg-blue-200 flex items-center justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={promise}>
          {({message}) => {
            return <p>{message}</p>;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
