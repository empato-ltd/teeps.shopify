/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Session,
  SessionStorage,
  createCookieSessionStorage,
  logDevReady,
  AppLoadContext,
} from '@remix-run/cloudflare';
import {createPagesFunctionHandler} from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createStorefrontClient,
} from '@shopify/hydrogen';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: async (context): Promise<AppLoadContext> => {
    const [cache, session] = await Promise.all([
      caches.open('hydrogen'),
      HydrogenSession.init(context.request, [context.env.SESSION_SECRET]),
    ]);

    const {storefront} = createStorefrontClient({
      cache,
      i18n: {language: 'EN', country: 'US'},
      publicStorefrontToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
      privateStorefrontToken: context.env.PRIVATE_STOREFRONT_API_TOKEN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
      storefrontId: context.env.PUBLIC_STOREFRONT_ID,
    });

    const cart = createCartHandler({
      storefront,
      getCartId: cartGetIdDefault(context.request.headers),
      setCartId: cartSetIdDefault(),
      cartQueryFragment: CART_QUERY_FRAGMENT,
    });
    return {env: context.env, storefront, session, cart};
  },
  mode: build.mode,
});

export class HydrogenSession {
  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  has(key: string) {
    return this.session.has(key);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.session.set(key, value);
  }

  commit() {
    return this.sessionStorage.commitSession(this.session);
  }
}

const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          tags
          metafields(identifiers: [
                  {namespace: "custom", key: "profile"},
                  {namespace: "custom", key: "nose"},
                  {namespace: "custom", key: "head_accords"},
                  {namespace: "custom", key: "heart_accords"},
                  {namespace: "custom", key: "base_accords"},
                  {namespace: "custom", key: "subtitle"},
                 ]) {
                  value
                }
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartApiQuery on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ...CartLine
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
      totalDutyAmount {
        ...Money
      }
      totalTaxAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }
` as const;
