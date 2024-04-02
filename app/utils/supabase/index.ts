import {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  createBrowserClient,
  createServerClient,
  parse,
  serialize,
} from '@supabase/ssr';

export const createSupabaseServerClient = (
  request: Request,
  SUPABASE_URL: string,
  SUPABASE_ANON_KEY: string,
) => {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();
  const supabaseClient = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append('Set-Cookie', serialize(key, value, options));
      },
      remove(key, options) {
        headers.append('Set-Cookie', serialize(key, '', options));
      },
    },
  });
  return {supabaseClient, headers};
};
