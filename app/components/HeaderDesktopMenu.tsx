import React, {useState} from 'react';
import {Dropdown, Flex, Menu, Typography} from 'antd';
import type {DropdownProps, MenuProps} from 'antd';

import DropdownMenu from '~/components/DropdownMenu';

const {Text} = Typography;

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
                <Text
                  className={`font-semibold text-xl flex flex-row text-contrast no-underline hover:no-underline 2xl:px-4 active:text-contrast`}
                  // href={item.to}
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                    fontSize: '1.25rem',
                  }}
                >
                  {item.title}
                </Text>
              ),
              children: item.items
                .map((subItem) => {
                  if (!subItem.to) return null;

                  return {
                    key: subItem.id,
                    label: (
                      <a
                        className={`no-underline text-black font-semibold text-lg hover:no-underline`}
                        href={subItem.to}
                        style={{color: '#000', textDecoration: 'none'}}
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
                  className={`font-semibold text-xl text-contrast no-underline hover:no-underline 2xl:px-4 active:text-contrast`}
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

  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  const onHover: MenuProps['onOpenChange'] = (openKeys) => {
    // console.log(openKeys.length);
    // console.log(document.getElementById('menuPopupBg').style.display);
    // if (openKeys.length == 0) {
    //   document.getElementById('menuPopupBg').style.display = 'hidden';
    // } else {
    //   document.getElementById('menuPopupBg').style.display = 'block';
    // }
  };

  return (
    <Flex className={`gap-x-2 2xl:gap-x-4`}>
      <Menu
        triggerSubMenuAction="hover"
        onClick={onClick}
        onOpenChange={onHover}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className={`bg-transparent border-none desktopDropdownMenu`}
      />
    </Flex>
  );
}
