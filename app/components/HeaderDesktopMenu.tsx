import React, {useState} from 'react';
import {Dropdown, Flex, Menu} from 'antd';
import type {DropdownProps, MenuProps} from 'antd';

interface MenuItem {
  id: string;
  title: string;
  to?: string;
  items: MenuItem[];
}

interface DesktopHeaderMenuProps {
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

export default function HeaderDesktopMenu({menuProp}: DesktopHeaderMenuProps) {
  const items = (menuProp?.length ? menuProp : FALLBACK_HEADER_MENU)
    .map((item) => {
      if (!item.to) return null;

      const result =
        item.items.length > 0
          ? {
              key: item.id,
              label: (
                <a
                  className={`font-semibold text-xl flex flex-row text-contrast no-underline hover:no-underline 2xl:px-4`}
                  href={item.to}
                  style={{textDecoration: 'none'}}
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
                        className={`no-underline text-contrast font-medium text-lg hover:no-underline`}
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
                  className={`font-semibold text-xl text-contrast no-underline hover:no-underline 2xl:px-4`}
                  href={item.to}
                  style={{color: '#fff', textDecoration: 'none'}}
                >
                  {item.title}
                </a>
              ),
            };

      return result;
    })
    .filter(Boolean);

  return (
    <Flex>
      {items.map((item, i) => {
        console.log('items', items);
        const menuItems: MenuProps['items'] | null =
          item.children !== undefined
            ? item.children?.map((submenu) => {
                return {
                  label: submenu.label,
                  key: submenu.key,
                };
              })
            : null;
        console.log('menuItems', i, menuItems);
        return menuItems == null ? (
          <div key={item.key}>{item.label}</div>
        ) : (
          <Dropdown
            key={item.key}
            menu={{
              menuItems,
              onClick: () => console.log(menuItems),
              selectable: true,
            }}
            // dropdownRender={(menu) => {
            //   return (
            //     <div>
            //       {menu.label}
            //       <Flex>product placement</Flex>
            //     </div>
            //   );
            // }}
          >
            {item.label}
          </Dropdown>
        );
      })}
    </Flex>
  );
}
