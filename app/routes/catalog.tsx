import {Suspense, useEffect, useRef, useState} from 'react';
import {
  Await,
  Link,
  useLoaderData,
  useSearchParams,
  type MetaFunction,
  useFetcher,
  useFetchers,
} from '@remix-run/react';
import {
  type LoaderFunction,
  type ActionFunction,
  defer,
  redirect,
} from '@remix-run/server-runtime';

import {TPToGoIcon} from '~/assets/icons';
import {COLLECTION_QUERY} from '~/graphql/queries';
import {CartActionInput, CartForm} from '@shopify/hydrogen';
import {createSupabaseServerClient} from '~/utils/supabase';
import {s} from 'node_modules/vite/dist/node/types.d-FdqQ54oU';

export const meta: MetaFunction = () => {
  return [{title: 'Teeps | Testament | Catalog'}];
};

export const loader: LoaderFunction = async ({context, params, request}) => {
  const {supabaseClient} = createSupabaseServerClient(
    request,
    context.env.SUPABASE_URL,
    context.env.SUPABASE_API_KEY,
  );

  const {data, error} = await supabaseClient.auth.getSession();

  if (!data.session) {
    return redirect('/');
  }

  const sortBy = new URL(request.url).searchParams.get('collection');
  const collection = context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: sortBy || 'the-icons',
    },
  });
  return defer({collection, sortBy});
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const handle = formData.get('handle');

  return redirect(`?collection=${handle}`);
};

export default function Catalog() {
  const {collection} = useLoaderData() as {
    collection: any;
  };
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  useEffect(() => {
    setDistanceFromTop(
      (containerRef?.current?.getBoundingClientRect()?.top || 0) +
        window.scrollY,
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-4 px-4 bg-light"
      style={{minHeight: `calc(100vh - ${distanceFromTop}px)`}}
    >
      <p className="font-exo font-medium text-sm">
        {searchParams.get('collection')
          ? searchParams
              .get('collection')
              ?.split('-')
              .map(
                (word) =>
                  `${word.at?.(0)?.toUpperCase()}${word.slice(
                    1,
                    word?.length,
                  )} `,
              )
          : 'Preferate de clienti'}
      </p>
      <Suspense
        fallback={
          <p className="mt-4 text-center font-roboto text-sm text-text">
            Loading...
          </p>
        }
      >
        <Await resolve={collection}>
          {(data) => {
            return (
              <div className="mt-4 flex flex-col gap-2">
                {data?.collection?.products?.edges?.map((edge: any) => {
                  return <ProductCard key={edge?.node?.id} edge={edge} />;
                })}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

const ProductCard = ({edge}: {edge: any}) => {
  const [searchParams] = useSearchParams();

  return (
    <div
      key={edge?.node?.id}
      className="bg-white flex items-between h-48 rounded-lg overflow-hidden"
    >
      <Link
        to={`/produs/${edge?.node?.handle}`}
        className="relative flex-1 flex items-center justify-center"
      >
        <img
          src={edge?.node?.variants?.edges?.[0]?.node?.image?.url}
          alt="fragrance"
          className="h-36"
        />
      </Link>
      <div className="pt-6 pr-2 pb-2 font-roboto flex-1 flex flex-col justify-between">
        <div>
          <p className="leading-tight font-medium">{edge?.node?.title}</p>
          <div className="text-text text-xs mt-2">
            <p className="text-xs">
              {searchParams.get('collection') === null ||
              ['the-icons', 'new', 'private'].includes(
                searchParams.get('collection') as string,
              )
                ? '65 ml | '
                : searchParams.get('collection') === 'bullets'
                ? '15 ml | '
                : ''}
              {edge?.node?.metafields?.[0]?.value}
            </p>
            <p className="text-xs">
              Nose: {edge?.node?.metafields?.[1]?.value}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">{`${edge?.node?.variants?.edges?.[0]?.node?.price?.currencyCode} ${edge?.node?.variants?.edges?.[0]?.node?.price?.amount}0`}</p>
          <div className="flex items-center gap-2 mt-1">
            <button className="h-7 px-3 border border-black rounded-[14px]">
              <TPToGoIcon />
            </button>
            <CartForm
              route="/cos-cumparaturi"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{
                lines: [
                  {
                    merchandiseId: edge?.node?.variants?.edges?.[0]?.node?.id,
                    quantity: 1,
                  },
                ],
                title: edge?.node?.title || '',
              }}
            >
              <button
                className={`min-w-[112px] h-7 hover:bg-dark bg-primary rounded-[14px] text-white font-roboto font-light text-sm px-3`}
              >
                Adauga in Cos
              </button>
            </CartForm>
          </div>
        </div>
      </div>
    </div>
  );
};
