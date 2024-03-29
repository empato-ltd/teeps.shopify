export const COLLECTIONS_QUERY = `#graphql
    query Collections {
        collections(first: 5) {
            edges {
                node {
                    id
                    title
                    image {
                        url
                    }
                }
            }
        }
    }
`;

export const COLLECTION_QUERY = `#graphql
    query Collection {
        collection(handle: "the-icons") {
            title
            products(first: 10) {
                edges {
                    node {
                        id
                        title
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
