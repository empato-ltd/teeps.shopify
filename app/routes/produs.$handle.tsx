import {Suspense, useState} from 'react';
import {
  Await,
  useLoaderData,
  useNavigate,
  type MetaFunction,
} from '@remix-run/react';
import {
  defer,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from '@remix-run/server-runtime';
import {CartForm, ShopPayButton} from '@shopify/hydrogen';

import {TPChevronLeftIcon, TPStarIcon} from '~/assets/icons';
import {PRODUCT_QUERY} from '~/graphql/queries/product';

export const meta: MetaFunction = () => {
  return [{title: 'Teeps | Testament | Produs'}];
};

export const loader: LoaderFunction = async ({
  context,
  params,
}: LoaderFunctionArgs) => {
  const {handle} = params;
  const product = context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
    },
  });
  return defer({product});
};

export default function Product() {
  const {product} = useLoaderData() as {product: any};
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-light">
            <p className="text-text font-roboto text-sm">Loading...</p>
          </div>
        }
      >
        <Await resolve={product}>
          {({product}) => {
            return (
              <>
                <div className="relative h-[250px] pt-6 pb-2 border border-secondary flex items-center justify-center">
                  <img
                    className="object-cover h-full"
                    src={
                      product?.media?.nodes?.[1]
                        ? product?.media?.nodes?.[1]?.image?.url
                        : product?.media?.nodes?.[0]?.image?.url
                    }
                    alt="fragrance"
                  />
                  <div className="absolute top-4 w-full px-4">
                    <button
                      onClick={() => navigate(-1)}
                      className="bg-primary h-7 w-7 rounded-lg flex items-center justify-center"
                    >
                      <TPChevronLeftIcon />
                    </button>
                  </div>
                  <div className="absolute bottom-4 w-full px-4 flex justify-between items-center">
                    <button className="bg-black h-7 w-16 rounded-[14px] flex items-center gap-1 justify-center">
                      <TPStarIcon />
                      <span className="text-white text-xs font-roboto leading-none mt-0.5">
                        5.0
                      </span>
                    </button>
                    <ShopPayButton
                      variantIdsAndQuantities={[
                        {
                          id: 'gid://shopify/ProductVariant/46079877677341',
                          quantity: count,
                        },
                      ]}
                      className="max-h-7 max-w-28 overflow-hidden flex justify-center items-center rounded-[16px] [&>shop-pay-button]:scale-[0.8]"
                      storeDomain="https://testament-london.myshopify.com"
                    />
                  </div>
                </div>
                <div className="bg-white px-4 border-b border-secondary h-16 flex items-center justify-between">
                  <p className="font-roboto font-semibold text-sm">
                    {product?.title}
                  </p>
                  <p className="font-roboto font-semibold text-sm">{`${product?.variants?.nodes?.[0]?.price?.currencyCode} ${product?.variants?.nodes?.[0]?.price?.amount}0`}</p>
                </div>
                <div
                  style={{minHeight: 'calc(100dvh - 250px)'}}
                  className="bg-light py-6 px-4 font-roboto"
                >
                  <p className="text-sm">{`${
                    product?.tags?.includes('flagship')
                      ? '65 ml | '
                      : product?.tags?.includes('bullet')
                      ? '15 ml | '
                      : ''
                  }${product?.metafields?.[0]?.value} ${
                    product?.metafields?.[1]?.value ? '| Nose:' : ''
                  } ${
                    product?.metafields?.[1]?.value
                      ? product?.metafields?.[1]?.value
                      : ''
                  }`}</p>
                  <p className="text-text text-xs mt-2 font-light">
                    {product?.description}
                  </p>
                </div>
                <div className="fixed bottom-0 h-[100px] px-6 w-full bg-white flex justify-between items-center border-t border-secondary">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        setCount((prev) => (prev > 2 ? prev - 1 : 1))
                      }
                      className="h-10 w-10 pb-1 rounded-full border border-black flex items-center justify-center text-2xl leading-none"
                    >
                      -
                    </button>
                    <div className="w-10 flex justify-center">{count}</div>
                    <button
                      onClick={() => setCount((prev) => prev + 1)}
                      className="h-10 w-10 pb-1 rounded-full border border-black flex items-center justify-center text-2xl leading-none"
                    >
                      +
                    </button>
                  </div>
                  <CartForm
                    route="/cos-cumparaturi"
                    action={CartForm.ACTIONS.LinesAdd}
                    inputs={{
                      lines: [
                        {
                          merchandiseId: product?.variants?.nodes?.[0]?.id,
                          quantity: count,
                        },
                      ],
                    }}
                  >
                    <button className="h-10 bg-primary rounded-[20px] px-6 text-white font-roboto text-sm">
                      Adauga in Cos
                    </button>
                  </CartForm>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
