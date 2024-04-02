import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type LoaderFunction,
} from '@remix-run/server-runtime';

import {createSupabaseServerClient} from '~/utils/supabase';

export const loader: LoaderFunction = async ({
  context,
  request,
}: LoaderFunctionArgs) => {
  const {supabaseClient} = createSupabaseServerClient(
    request,
    context.env.SUPABASE_URL,
    context.env.SUPABASE_API_KEY,
  );

  const {data, error} = await supabaseClient.auth.getSession();

  if (!data.session) {
    return redirect('/');
  }
  return json({});
};

export default function Orders() {
  return <></>;
}
