import React from 'react'

class Footer extends React.Component {
  render() {
    const { author } = this.props.data
    const social = this.props.data.social || {}
    const trim = str => encodeURIComponent((str || '').trim())
    return (
      <div id="footer">
        <div className="inner">
          <ul className="icons">
            {social.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${trim(social.twitter)}`}
                  className="icon fa-twitter"
                >
                  <span className="label">Twitter</span>
                </a>
              </li>
            )}
            {social.github && (
              <li>
                <a
                  href={`https://github.com/${trim(social.github)}`}
                  className="icon fa-github"
                >
                  <span className="label">Github</span>
                </a>
              </li>
            )}
            {social.email && (
              <li>
                <a
                  href={`mailto:${social.email}`}
                  className="icon fa-envelope-o"
                >
                  <span className="label">Email</span>
                </a>
              </li>
            )}
          </ul>
          <ul className="copyright">
            {author && <li>&copy; {author}</li>}
            <li>
              Design: <a href="http://html5up.net">HTML5 UP</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
