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
            dockerwp_test_field
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
    `{
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
      categories {
          edges {
            node {
              id
              parentId
              slug
              name
              taxonomy {
                node {
                  name
                }
              }
            }
          }
      }
      dockerwp_test_field
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
            id
            title
            slug
            content
            pageBlocks {
              pageblocks {
                ... on Page_Pageblocks_Pageblocks_Flexgroup {
                  additionalText
                  fieldGroupName
                }
                ... on Page_Pageblocks_Pageblocks_CalloutUnit {
                  fieldGroupName
                  textIntro
                }
                ... on Page_Pageblocks_Pageblocks_TabUnit {
                  fieldGroupName
                }
                ... on Page_Pageblocks_Pageblocks_VideoEmbed {
                  fieldGroupName
                  videoEmbedCode
                }
              }
            }  
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
              regularPrice
              salePrice
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
        id
        slug
        name
        description
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
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


//

// We'll be calling this function directly in our blog/index.js page, so it needs to be exported
export async function getAllDocuments(preview) {
  const data = await fetchAPI(
    `
    query allDocuments {
      documents {
        edges {
          node {
            id
            slug
            title
            uri
            content
          }
        }
      }
    }
    `
  );

  return data?.documents;
}


export async function getAllDocumentsWithSlug() {
  const data = await fetchAPI(
    `
    query allDocuments {
      documents {
        edges {
          node {
            id
            slug
            uri
          }
        }
      }
    }
    `
  );
  return data?.documents;
}


export async function getDocument(slug) {

  const data = await fetchAPI(
    `
      query singleDocument {
      document(id: "${slug}", idType: SLUG) {
        id
        title
        slug
        content
        docCPTFields{
          docTitle
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

