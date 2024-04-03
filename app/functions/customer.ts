import {redirect, type AppLoadContext} from '@remix-run/server-runtime';
import {type Customer} from '@shopify/hydrogen/customer-account-api-types';
import {type CustomerAccessTokenCreatePayload} from '@shopify/hydrogen/storefront-api-types';

import {CUSTOMER_LOGIN_MUTATION} from '~/graphql/mutations/customer';

import {CUSTOMER_QUERY} from '~/graphql/queries/customer';

export async function getCustomer(
  context: AppLoadContext,
  customerAccessToken: string,
) {
  const {storefront} = context;
  const data = await storefront.query<{
    customer: Customer;
  }>(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  if (!data || !data.customer) {
    throw await doLogout(context);
  }

  return data.customer;
}

export async function doLogin(
  {storefront}: AppLoadContext,
  {email, password}: {email: string; password: string},
) {
  const data = await storefront.mutate<{
    customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
  }>(CUSTOMER_LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
  }
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
}

export async function doLogout(context: AppLoadContext, params?: any) {
  const {session} = context;
  session.unset('customerAccessToken');

  return redirect('/account', {
    headers: {
      'Set-Cookie': await session.commit(),
    },
  });
}
