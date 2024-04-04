export const COLLECTIONS_QUERY = `#graphql
    query Collections {
        collections(first: 5) {
            edges {
                node {
                    id
                    title
                    handle
                    image {
                        url
                    }
                }
            }
        }
    }
`;

export const COLLECTION_QUERY = `#graphql
    query Collection($handle: String!) {
        collection(handle: $handle) {
            title
            products(first: 15) {
                edges {
                    node {
                        id
                        title
                        handle
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    image {
                                        url
                                    }
                                }
                            }
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
                }
            }
        }
    }
`;
