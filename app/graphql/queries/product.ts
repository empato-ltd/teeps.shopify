export const PRODUCT_QUERY = `#graphql
  query product($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      description
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
      handle
      variants(first: 5){
        nodes{
          id
          title
          product{
             id
          }
          price {
            amount
            currencyCode
          }
        }
      }
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width

              height
            }
          }
          ... on Model3d {
            id
            mediaContentType
            sources {
              mimeType
              url
            }
          }
        }
      }
      options {
        name,
        values
      }
      tags
    }
  }
`;
