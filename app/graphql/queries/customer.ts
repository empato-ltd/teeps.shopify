export const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  variant {
                    title
                    image {
                      url
                      altText
                      height
                      width
                    }
                    price {
                      amount
                      currencyCode
                    }
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
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;
