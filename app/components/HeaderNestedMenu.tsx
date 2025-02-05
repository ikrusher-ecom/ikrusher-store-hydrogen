import * as React from 'react';
import {Menu} from 'antd';

interface MenuItem {
  id: string;
  title: string;
  to?: string;
  items: MenuItem[];
}

interface NestedMenuListProps {
  menuProp: MenuItem[];
}

const FALLBACK_HEADER_MENU: MenuItem[] = [
  {
    id: 'gid://shopify/MenuItem/461609500728',
    title: 'Products',
    to: '/collections/all-products',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609533496',
    title: 'Blogs',
    to: '/blogs/blog',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609566264',
    title: 'Policy',
    to: '/policies',
    items: [],
  },
  {
    id: 'gid://shopify/MenuItem/461609599032',
    title: 'About',
    to: '/pages/about-us',
    items: [],
  },
];

export default function HeaderNestedMenu({menuProp}: NestedMenuListProps) {
  const items = (menuProp?.length ? menuProp : FALLBACK_HEADER_MENU)
    .map((item) => {
      if (!item.to) return null;

      const result =
        item.items.length > 0
          ? {
              key: item.id,
              label: (
                <a
                  className={`font-semibold text-2xl flex flex-row text-black no-underline`}
                  href={item.to}
                >
                  {item.title}
                </a>
              ),
              children: item.items
                .map((subItem) => {
                  if (!subItem.to) return null;

                  return {
                    key: subItem.id,
                    label: (
                      <a
                        className={`no-underline text-greyColor font-medium text-lg`}
                        href={subItem.to}
                        style={{color: 'rgb(var(--color-grey))'}}
                      >
                        {subItem.title}
                      </a>
                    ),
                  };
                })
                .filter(Boolean),
            }
          : {
              key: item.id,
              label: (
                <a
                  className={`font-semibold text-2xl text-black no-underline`}
                  href={item.to}
                >
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
