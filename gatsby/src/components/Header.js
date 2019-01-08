import React from 'react'
import {get} from 'lodash'
import {Link, StaticQuery, graphql} from 'gatsby'
import Footer from './Footer'

class Header extends React.Component {
  render() {
    const site = get(this.props, ['data', 'allSanitySiteConfig', 'edges', 0, 'node'], {})
    const avatar = get(site, ['profileImage', 'asset', 'url'])
    const bgImage = get(site, ['backgroundImage', 'asset', 'url'])
    const styles = bgImage
      ? {backgroundImage: `url(${bgImage}?w=1274&h=1274&fit=crop)`, backgroundSize: 'cover'}
      : {}

    return (
      <header id="header" style={styles}>
        <div className="inner">
          {avatar && (
            <Link to="/" className="image avatar">
              <img src={`${avatar}?w=200&h=200&fit=crop`} alt={site.author} />
            </Link>
          )}
          <h1>
            {site.author && <strong>I am {site.author}</strong>}
            <br />
            {site.description}
          </h1>
        </div>
        <Footer data={site} />
      </header>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
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
              backgroundImage {
                asset {
                  url
                }
              }
              social {
                email
                github
                twitter
              }
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)
