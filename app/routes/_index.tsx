import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/server-runtime';

export const loader: LoaderFunction = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  return json({message: 'Hello'});
};

export default () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <p>Hello</p>
    </div>
  );
};
