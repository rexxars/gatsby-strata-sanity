import createSchema from 'part:@sanity/base/schema-creator'
import {fromGQL, graphql} from 'sanity-graphql-schema'

const schema = graphql`
  union ProjectOrBlogPost = Project | BlogPost
  union BlogBody = Block | Image | YoutubeVideo

  type YoutubeVideo {
    url: Url
  }

  type SocialLinks {
    twitter: String
    github: String
    email: Email
  }

  type Author implements Document {
    name: String
    work: [ProjectOrBlogPost]
  }

  type SiteConfig implements Document {
    title: String
    description: String
    author: String
    social: SocialLinks
    profileImage: Image @hotspot
    backgroundImage: Image
  }

  type BlogPost implements Document {
    title: String
    slug: Slug
    preamble: String
    mainImage: Image @hotspot
    body: [BlogBody]
  }

  type Project implements Document {
    title: String
    description: String
    image: Image @hotspot
    tags: [String] @display(layout: "tags")
    date: Date
  }

  type ProjectRack implements Document {
    title: String
    projects: [Project]
  }
`

export default createSchema({
  name: 'default',
  types: fromGQL(schema)
})
