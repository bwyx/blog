import Block from '~/components/Block'
import Article from '~/components/Article'
import notion from '~/lib/notion'
import config from '~/config'

import { attachMainLayout } from '~/layouts/Main.layout'

const Post = ({ post, blocks }: any) => {
  return (
    <>
      <h1 style={{ fontSize: '2rem' }}>
        {post?.properties?.title?.title[0]?.plain_text}
      </h1>
      <Article prose="lg">
        {blocks?.results?.length
          ? blocks.results.map((block: any) => (
              <Block key={block.id} block={block} />
            ))
          : null}
      </Article>
    </>
  )
}
Post.layout = attachMainLayout

export const getStaticProps = async (req: any) => {
  const { results: postResults } = await notion.databases.query({
    database_id: config.NOTION_BLOG_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'published',
          checkbox: {
            equals: true
          }
        },
        {
          property: 'slug',
          text: {
            equals: req.params.slug
          }
        }
      ]
    }
  })

  const blocks = await notion.blocks.children.list({
    block_id: postResults[0].id
  })

  return {
    props: {
      post: postResults[0],
      blocks
    },
    revalidate: 300
  }
}

export const getStaticPaths = async () => {
  const response = await notion.databases.query({
    database_id: config.NOTION_BLOG_DATABASE_ID
  })

  const slug = response.results.map((post: any) => post.properties.slug.url)

  return {
    paths: slug.map((s: string) => '/blog/' + s),
    fallback: true
  }
}

export default Post
