import S from '@sanity/desk-tool/structure-builder'

export default S.list()
  .id('__root__')
  .title('Content')
  .showIcons(false)
  .items([
    S.documentListItem()
      .id('site-config')
      .title('Site config')
      .schemaType('siteConfig'),

    S.documentListItem()
      .id('front-page-rack')
      .title('Front page rack')
      .schemaType('projectRack'),

    ...S.documentTypeListItems().filter(
      item => !['siteConfig', 'projectRack'].includes(item.getId())
    )
  ])
