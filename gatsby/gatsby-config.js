const sanity = require('./sanity')

module.exports = {
  siteMetadata: {
    title: 'Not used',
    author: 'Fethed from Sanity'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png'
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...sanity,
        watchMode: true,
        overlayDrafts: true,
        token: process.env.SANITY_AUTH_TOKEN,
      }
    }
  ]
}
