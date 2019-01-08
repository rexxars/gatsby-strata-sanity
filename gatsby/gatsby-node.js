const {get} = require('lodash')
const gql = require('tagged-template-noop')

exports.createPages = async ({graphql, actions}) => {
  const {createPage, createPageDependency} = actions

  const result = await graphql(gql`
    {
      allSanityBlogPost(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            title
            preamble
            bodyRaw
            slug {
              current
            }
            mainImage {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const posts = get(result, 'data.allSanityBlogPost.edges', [])
  posts.forEach((edge, index) => {
    const previous = index === posts.length - 1 ? null : shapeNav(posts[index + 1])
    const next = index === 0 ? null : shapeNav(posts[index - 1])
    const path = `/blog/${edge.node.slug.current}`

    createPage({
      path,
      component: require.resolve('./src/templates/blogPost.js'),
      context: {slug: edge.node.slug.current, previous: previous, next}
    })

    createPageDependency({path, nodeId: edge.node.id})
  })
}

function shapeNav(edge) {
  return edge ? {slug: edge.node.slug.current, title: edge.node.title} : null
}
