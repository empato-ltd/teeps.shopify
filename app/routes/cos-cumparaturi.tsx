import {MetaFunction, useLoaderData, useNavigate} from '@remix-run/react';
import {
  json,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunction,
} from '@remix-run/server-runtime';
import {
  CartForm,
  type HydrogenCart,
  type CartQueryDataReturn,
} from '@shopify/hydrogen';
import {CartLine, type Cart} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';

import {TPChevronLeftIcon, TPCreditCardIcon} from '~/assets/icons';

export const meta: MetaFunction = () => {
  return [{title: 'Teeps | Testament | Cos Cumparaturi'}];
};

export const action: ActionFunction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  const cart = context.cart as HydrogenCart;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds as string[]);
      break;
    default:
      invariant(false, `${action} cart action is not defined`);
  }
  const headers = cart.setCartId(result.cart.id);
  return json(result, {status: 200, headers});
};

export const loader: LoaderFunction = async ({context}) => {
  const {cart} = context;
  return json({cart: await cart.get()});
};

const CartLine = ({line}: {line: CartLine}) => {
  return (
    <div className="border-b border-secondary flex items-center gap-4 py-4">
      <div className="w-10 h-15">
        <img
          className="object-contain h-full w-full"
          src={line.merchandise?.image?.url}
          alt="fragrance"
        />
      </div>
      <div className="flex-1 h-full flex">
        <div className="h-full font-roboto flex flex-col items-between gap-1">
          <p className="font-medium text-sm">
            {line.merchandise?.product?.title}
          </p>
          <div className="text-xs text-text">
            <p className="leading-none">{`${
              line.merchandise?.product?.tags?.includes('flagship')
                ? '65 ml'
                : line.merchandise?.product?.tags?.includes('bullet')
                ? '15 ml'
                : ''
            }`}</p>
            {(line?.merchandise?.product?.tags?.includes('flagship') ||
              line?.merchandise?.product?.tags?.includes('bullet')) && (
              <p className="leading-none">
                Nose: {line?.merchandise?.product?.metafields?.[1]?.value}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end justify-between">
          <div className="flex">
            <CartForm
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{
                lines: [{id: line.id, quantity: line.quantity - 1}],
              }}
            >
              <button className="border border-black w-7 h-7 rounded-full pb-1">
                -
              </button>
            </CartForm>
            <div className="w-7 flex items-center justify-center font-roboto text-sm font-medium">
              {line.quantity}
            </div>
            <CartForm
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{
                lines: [{id: line.id, quantity: line.quantity + 1}],
              }}
            >
              <button className="border border-black w-7 h-7 rounded-full pb-1">
                +
              </button>
            </CartForm>
          </div>
          <p className="mt-2 font-roboto text-sm font-semibold">{`${line?.cost?.totalAmount?.currencyCode} ${line?.cost?.totalAmount?.amount}`}</p>
        </div>
      </div>
    </div>
  );
};

export default function Cart() {
  const {cart} = useLoaderData() as {cart: Cart};
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-light pb-32">
      <div className="p-4 border border-secondary flex items-center bg-white">
        <div className="flex-1">
          <button
            onClick={() => navigate(-1)}
            className="bg-primary h-7 w-7 rounded-lg flex items-center justify-center"
          >
            <TPChevronLeftIcon />
          </button>
        </div>
        <p className="font-exo text-sm text-center">Cosul de cumparaturi</p>
        <div className="flex-1" />
      </div>
      {cart?.totalQuantity ? (
        <div className="px-4 py-2">
          {cart?.lines?.nodes?.map((node, index) => (
            <CartLine key={`${node.id}`} line={node as CartLine} />
          ))}
          <div className="w-full bg-white py-2 rounded-lg px-2 mt-4 flex justify-between font-roboto">
            <p className="text-sm font-medium">Totalul comenzii:</p>
            <p className="text-sm font-semibold">{`${cart?.cost?.totalAmount?.currencyCode} ${cart?.cost?.totalAmount?.amount}`}</p>
          </div>
        </div>
      ) : (
        <div className="pt-10 flex items-center justify-center">
          <p className="font-roboto text-sm">Empty cart</p>
        </div>
      )}
      {cart?.totalQuantity ? (
        <div className="fixed bottom-0 h-[100px] w-full px-4 bg-white flex items-center">
          <a
            href={cart?.checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-primary hover:bg-dark flex w-full h-10 items-center justify-center gap-1 rounded-[20px]"
          >
            <TPCreditCardIcon color="white" height={20} width={20} />
            <span className="font-roboto text-white text-xs">Plateste</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
