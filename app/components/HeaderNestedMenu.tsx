import * as React from 'react';
import {Menu} from 'antd';

interface MenuItem {
  id: string;
  resourceId?: string;
  title: string;
  url?: string;
  items: MenuItem[];
}

interface NestedMenuListProps {
  menu?: MenuItem[];
  primaryDomainUrl: string;
  viewport: string;
  publicStoreDomain: string;
}

const FALLBACK_HEADER_MENU: MenuItem[] = [
  {
    id: 'gid://shopify/MenuItem/461609500728',
    title: 'Products',
    url: '/collections/all-products',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609533496',
    title: 'Blogs',
    url: '/blogs/blog',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609566264',
    title: 'Policy',
    url: '/policies',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609599032',
    title: 'About',
    url: '/pages/about-us',
    items: [],
  },
];

export default function NestedMenuList({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: NestedMenuListProps) {
  const items = (menu || FALLBACK_HEADER_MENU)
    .map((item) => {
      if (!item.url) return null;

      const url =
        item.url.includes('myshopify.com') ||
        item.url.includes(publicStoreDomain) ||
        item.url.includes(primaryDomainUrl)
          ? new URL(item.url).pathname
          : item.url;

      const result =
        item.items.length > 0
          ? {
              key: item.resourceId || item.id,
              label: <a href={url}>{item.title}</a>,
              children: item.items
                .map((subItem) => {
                  if (!subItem.url) return null;

                  return {
                    key: subItem.id,
                    label: <a href={subItem.url}>{subItem.title}</a>,
                  };
                })
                .filter(Boolean),
            }
          : {
              key: item.id,
              label: <a href={url}>{item.title}</a>,
            };

      return result;
    })
    .filter(Boolean);

  return (
    <Menu
      mode="inline"
      items={items as any} // Ant Design types require `items` to have a specific structure.
      style={{borderInlineEnd: 'none', background: 'transparent'}}
    />
  );
}
