/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/server-runtime';
import {type AuthResponse, type SupabaseClient} from '@supabase/supabase-js';

import {createSupabaseServerClient} from '~/utils/supabase';
import {TPSpinnerIcon} from '~/assets/icons';

export const loader: LoaderFunction = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  const {token} = params;
  const {supabaseClient} = createSupabaseServerClient(
    request,
    context.env.SUPABASE_URL,
    context.env.SUPABASE_API_KEY,
  );

  const {data, error} = await supabaseClient.auth.getSession();

  if (data.session) {
    return redirect('/catalog');
  }

  return json(
    (await supabaseClient.auth.verifyOtp({
      token_hash: token as string,
      type: 'email',
    })) as AuthResponse,
  );
};

export default function Auth() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>() as AuthResponse;
  const {supabaseClient} = useOutletContext() as {
    supabaseClient: SupabaseClient;
  };

  useEffect(() => {
    (async () => {
      try {
        if (loaderData?.data?.session) {
          const {access_token, refresh_token} = loaderData.data.session;
          const {data, error} = await supabaseClient.auth.setSession({
            access_token,
            refresh_token,
          });
          if (!error) {
            navigate('/catalog');
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    })();
  }, [supabaseClient]);

  return (
    <div className="h-[100dvh] w-screen bg-primary flex items-center justify-center">
      <TPSpinnerIcon />
    </div>
  );
}
