export const NAVBAR_DATA = `
*[_type == "navbar"][0]{
  _id,
  title,
  logo{
    asset->{
      url
    },
    alt
  },
  navigationItems[]{
    label,
    hasSubItems,
    route,
    subItems[]{
      label,
      route,
      _key
    },
    _key
  },
  ctaButton{
    label,
    action
  }
}`;
