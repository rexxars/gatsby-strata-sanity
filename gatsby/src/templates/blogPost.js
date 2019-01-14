import React from 'react'
import {graphql, Link} from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'
import YoutubeEmbed from '../components/YoutubeEmbed'
import Layout from '../components/layout'
import sanity from '../../sanity'

function maybeRedirect(location) {
  if (typeof window !== 'undefined' && window.location) {
    window.location.pathname = location
  }
}

const BlogPostPage = ({data, pageContext}) => {
  const {previous, next} = pageContext
  const post = data.sanityBlogPost
  if (!post) {
    maybeRedirect('/')
    return null
  }

  return (
    <Layout>
      <article id="main" className="blog-post">
        {post.title && <h1>{post.title}</h1>}
        <time>{post._createdAt}</time>

        {post._rawBody && (
          <BlockContent
            {...sanity}
            blocks={post._rawBody}
            serializers={{types: {youtubeVideo: YoutubeEmbed}}}
            imageOptions={{w: 680, h: 450, fit: 'max'}}
          />
        )}

        <ul className="prev-next">
          {previous && (
            <li>
              <Link to={`/blog/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={`/blog/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </article>
    </Layout>
  )
}

export default BlogPostPage

export const pageQuery = graphql`
  query($slug: String!) {
    sanityBlogPost(slug: {current: {eq: $slug}}) {
      title
      preamble
      _rawBody
      _createdAt(formatString: "ddd, MMMM do YYYY HH:mm")
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
`
