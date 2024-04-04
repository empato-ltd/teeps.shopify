import {useLoaderData} from '@remix-run/react';
import {
  redirect,
  json,
  type LoaderFunction,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/server-runtime';
import {type CustomerCreatePayload} from '@shopify/hydrogen/storefront-api-types';

import {CUSTOMER_CREATE_MUTATION} from '~/graphql/mutations/customer';

import {doLogin} from '~/functions/customer';

export const loader: LoaderFunction = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  return json({});
};

export const action: ActionFunction = async ({
  context,
  params,
  request,
}: ActionFunctionArgs) => {
  const {storefront, session} = context;

  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password');

  try {
    const createData = await storefront.mutate<{
      custmerCreate: CustomerCreatePayload;
    }>(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password},
      },
    });

    if (createData.custmerCreate.customerUserErrors) {
      return json(
        {errors: createData.custmerCreate.customerUserErrors},
        {status: 500},
      );
    }

    const customerAccessToken = await doLogin(context, {
      email: email as string,
      password: password as string,
    });
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/catalog', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    return json({error}, {status: 500});
  }
};

export default function Shopify() {
  const data = useLoaderData();
  return null;
}
