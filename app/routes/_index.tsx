import {
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from '@remix-run/react';
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  type ActionFunction,
  json,
  redirect,
} from '@remix-run/server-runtime';
import {SupabaseClient} from '@supabase/supabase-js';
import {useEffect} from 'react';
import * as z from 'zod';

import {TPAppleIcon, TPGooglePlayIcon} from '~/assets/icons';
import {Button, AuthForm} from '~/components';
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

  if (data.session) {
    return redirect('/catalog');
  }
  return json({});
};

export const action: ActionFunction = async ({context, request}) => {
  const formData = Object.fromEntries(await request.formData());
  const authSchema = z.object({
    email: z.string().min(10, 'Value too short'),
  });

  try {
    const {email} = authSchema.parse(formData);
    const {supabaseClient, headers} = createSupabaseServerClient(
      request,
      context.env.SUPABASE_URL,
      context.env.SUPABASE_API_KEY,
    );
    const {error} = await supabaseClient.functions.invoke(
      'signInWithMagicLink',
      {
        body: JSON.stringify({
          email,
          fallbackUrl: `${window.location.protocol}//${window.location.host}/auth/`,
        }),
      },
    );
    if (error) {
      return json({error, headers}, {status: 500});
    }
    return json({success: true}, {headers});
  } catch (error) {
    return json({error}, {status: 400});
  }
};

export default function Index() {
  return (
    <div style={{height: `calc(100dvh - 80px)`}} className="flex flex-col">
      <AuthForm />
      <div className="p-6 flex items-center gap-4">
        <Button title="App Store" layout="secondary" icon={<TPAppleIcon />} />
        <Button
          title="Google Play"
          layout="secondary"
          icon={<TPGooglePlayIcon />}
        />
      </div>
    </div>
  );
}
