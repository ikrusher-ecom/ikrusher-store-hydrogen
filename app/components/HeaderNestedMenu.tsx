import * as React from 'react';
import {Menu} from 'antd';

interface MenuItem {
  id: string;
  title: string;
  url?: string;
  items: MenuItem[];
}

interface NestedMenuListProps {
  menuProp: MenuItem[];
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

export default function HeaderNestedMenu({menuProp}: NestedMenuListProps) {
  const items = (menuProp?.length ? menuProp : FALLBACK_HEADER_MENU)
    .map((item) => {
      if (!item.url) return null;

      const result =
        item.items.length > 0
          ? {
              key: item.id,
              label: (
                <a
                  className={`font-semibold text-2xl flex flex-row`}
                  href={item.url}
                >
                  {item.title}
                </a>
              ),
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
              label: (
                <a className={`font-semibold text-2xl`} href={item.url}>
                  {item.title}
                </a>
              ),
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
