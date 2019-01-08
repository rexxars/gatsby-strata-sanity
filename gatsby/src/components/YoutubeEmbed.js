import React from 'react'
import PropTypes from 'prop-types'

class YoutubeEmbed extends React.Component {
  rewriteUrl() {
    const url = this.props.node.url
    if (!url || /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9]+/.test(url)) {
      return url
    }

    const [, videoId] = url.match(/youtube\.com.*?v=([A-Za-z0-9]+)/) || []
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  render() {
    const { node, width, height } = this.props
    const { url } = node
    return (
      <iframe
        title={`YouTube ${url}`}
        width={width}
        height={height}
        src={this.rewriteUrl()}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
}

YoutubeEmbed.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

YoutubeEmbed.defaultProps = {
  width: 680,
  height: 382,
  node: {},
}

export default YoutubeEmbed
