import React from 'react'
import Helmet from 'react-helmet'
import {get, find} from 'lodash'
import {graphql, Link} from 'gatsby'

import Layout from '../components/layout'
import Gallery from '../components/Gallery'

class HomeIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
  }

  openLightbox(index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return

    this.gotoNext()
  }

  render() {
    const {data} = this.props
    const {allSanitySiteConfig, allSanityBlogPost, allSanityProject, allSanityProjectRack} = data

    const siteConfig = {
      title: 'Site title',
      description: 'Site description',
      author: 'Unknown author',
      ...get(allSanitySiteConfig, ['edges', 0, 'node'], {})
    }

    const latestBlogPost = get(allSanityBlogPost, ['edges', 0, 'node'])
    const latestPost = get(latestBlogPost, 'slug.current') ? latestBlogPost : null
    const allProjects = allSanityProject ? allSanityProject.edges.map(edge => edge.node) : []
    const projectsRack = get(allSanityProjectRack, ['edges', 0, 'node', 'projects']) || []

    const projects =
      projectsRack.length > 0 ? projectsRack.map(({_id}) => find(allProjects, {_id})) : allProjects

    return (
      <Layout>
        <Helmet>
          <title>{siteConfig.title}</title>
          <meta name="description" content={siteConfig.description} />
        </Helmet>

        <div id="main">
          {latestPost && (
            <section id="one">
              <header className="major">
                <h2>{latestPost.title}</h2>
              </header>
              <p>{latestPost.preamble}</p>

              <ul className="actions">
                <li>
                  <Link to={`/blog/${latestPost.slug.current}`} className="button">
                    Read article
                  </Link>
                </li>
              </ul>
            </section>
          )}

          {allProjects.filter(hasImage).length > 0 && (
            <section id="two">
              <h2>{projectsRack.length > 0 ? 'Featured Projects' : 'Recent Projects'}</h2>

              <Gallery
                images={projects.filter(hasImage).map(({_id, title, description, tags, image}) => ({
                  src: image.asset.url,
                  thumbnail: `${image.asset.url}?w=370&h=217&fit=crop`,
                  caption: title,
                  description
                }))}
              />

              <ul className="actions">
                <li>
                  <Link to="/projects" className="button">
                    Full Portfolio
                  </Link>
                </li>
              </ul>
            </section>
          )}

          {!latestPost && allProjects.length === 0 && (
            <section id="two">
              <h2>No content yet!</h2>
            </section>
          )}
        </div>
      </Layout>
    )
  }
}

function hasImage(project) {
  return Boolean(get(project, 'image.asset.url'))
}

export default HomeIndex

export const pageQuery = graphql`
  query {
    allSanitySiteConfig {
      edges {
        node {
          title
          author
          description
          profileImage {
            asset {
              url
            }
          }
        }
      }
    }

    allSanityProject(sort: {fields: [_createdAt], order: DESC}) {
      edges {
        node {
          _id
          title
          description
          tags
          image {
            asset {
              url
            }
          }
        }
      }
    }

    allSanityBlogPost(limit: 1, sort: {fields: [_createdAt], order: DESC}) {
      edges {
        node {
          title
          preamble
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

    allSanityProjectRack {
      edges {
        node {
          projects {
            _id
          }
        }
      }
    }
  }
`
