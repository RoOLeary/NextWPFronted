const API_URL = process.env.WP_API_URL;

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  });

  //console.log(res);

  // error handling
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// We'll be calling this function directly in our blog/index.js page, so it needs to be exported
export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
        edges {
          node {
            id
            date
            title
            slug
            extraPostInfo {
              authorExcerpt
              thumbsImage {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    `
  );

  return data?.posts;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  );

  return data;
}


export async function getAllPagesWithSlug() {
  const data = await fetchAPI(
    `
    query getAllPagesWithSlug {
      pages {
          edges {
            node {
                id
                slug
                title
              }
          }
      }
  }`
  );
  return data?.pages;
}

export async function getPage(slug) {
  const data = await fetchAPI(
    `
        {
        pageBy(uri: "/${slug}") {
                title
                slug
                content
            }
        }
  `
  );

  return data;
}


// Notice the 'export' keyword here. We'll be calling this function
// directly in our blog/index.js page, so it needs to be exported
export async function getAllProducts(preview) {
  const data = await fetchAPI(
    `
    query allProducts {
      products {
        edges {
          node {
            name
            slug
            sku
            description
            visibleProducts {
              edges {
                node {
                  id
                }
              }
            }
            ... on SimpleProduct {
              id
              name
              price
            }
          }
        }
      }
    }
    `
  );

  return data?.products;
}

export async function getAllProductsWithSlug() {
  const data = await fetchAPI(
    `
    {
      products(first: 10000) {
        edges {
          node {
            name
            slug
            sku
            id
          }
        }
      }
    }`

    
  );
  return data?.products;
}


export async function getProduct(slug) {
  const data = await fetchAPI(
    `
    query sinlgeProduct {
      product(idType: SLUG, id: "${slug}") {
        slug
        name
        description
        ... on SimpleProduct {
          price
          regularPrice
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  );
  return data;
}
