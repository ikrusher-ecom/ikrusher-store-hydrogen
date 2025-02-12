import {useState} from 'react';
import {Flex, Typography, Tabs} from 'antd';
import type {TabsProps} from 'antd';

const {Text, Title} = Typography;

interface DropdownMenuItem {
  key: string;
  label: string | JSX.Element;
}

interface DropdownMenuProps {
  menuItem: DropdownMenuItem;
  subMenuItems: DropdownMenuItem[];
}

const productsImgs = {
  'All-In-Ones': [
    [
      'UZO',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/49d80957e2f2d44da3ab1c5ab9a67d05.jpg?v=1739297591',
    ],
    [
      'Nord',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/82278636f89daf74b42f6e72f6c1e727.png?v=1739297682',
    ],
    [
      'Eros Pro',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/2ebd77a703fe495755627e6d952c1286.jpg?v=1739297682',
    ],
    [
      'Nord Pro',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/1e8eb315339a8cac7cbfe3d19bd0ef6d.png?v=1739297682',
    ],
  ],
  'Pod Systems': [
    [
      'Vfire Mod',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/974738c95c3130323bebba953dbd9730.png?v=1739298565',
    ],
  ],
  Cartridges: [
    [
      'Karno',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/488d5f571cefe8749b51336b05d2fc63.png?v=1739298663',
    ],
    [
      'Calibr',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/b03b64cc5c580da1a42e018976c83616.jpg?v=1739298663',
    ],
    [
      'Calibr Pro Max',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/1605a443bd8679840f76ce6b5bf88947.jpg?v=1739298663',
    ],
    [
      'Tux',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/80df0ffb7628b025f7514c9854337f03.jpg?v=1739298663',
    ],
  ],
  Batteries: [
    [
      'Koble',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/fcd36814ec82c5003505f8e0b8914ddc.png?v=1739298777',
    ],
    [
      'Phin',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/881893dd567a3815b076a3e3c19dc5b9.jpg?v=1739298777',
    ],
    [
      'UZO',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/49d80957e2f2d44da3ab1c5ab9a67d05.jpg?v=1739297591',
    ],
    [
      'Nord',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/82278636f89daf74b42f6e72f6c1e727.png?v=1739297682',
    ],
  ],
  'OMNI Compatible': [
    [
      'Koble',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/b84429795858c24e019f1fbf38bef951.png?v=1739298866',
    ],
    [
      'Phin',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/881893dd567a3815b076a3e3c19dc5b9.jpg?v=1739298777',
    ],
    [
      'UZO',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/49d80957e2f2d44da3ab1c5ab9a67d05.jpg?v=1739297591',
    ],
    [
      'Nord',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/82278636f89daf74b42f6e72f6c1e727.png?v=1739297682',
    ],
  ],
  eKo: [
    [
      'Koble',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/b84429795858c24e019f1fbf38bef951.png?v=1739298866',
    ],
    [
      'Phin',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/881893dd567a3815b076a3e3c19dc5b9.jpg?v=1739298777',
    ],
    [
      'UZO',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/49d80957e2f2d44da3ab1c5ab9a67d05.jpg?v=1739297591',
    ],
    [
      'Nord',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/82278636f89daf74b42f6e72f6c1e727.png?v=1739297682',
    ],
  ],
  Postless: [
    [
      'Koble',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/b84429795858c24e019f1fbf38bef951.png?v=1739298866',
    ],
    [
      'Phin',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/881893dd567a3815b076a3e3c19dc5b9.jpg?v=1739298777',
    ],
    [
      'UZO',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/49d80957e2f2d44da3ab1c5ab9a67d05.jpg?v=1739297591',
    ],
    [
      'Nord',
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/82278636f89daf74b42f6e72f6c1e727.png?v=1739297682',
    ],
  ],
};

export default function DropdownMenu({
  menuItem,
  subMenuItems,
}: DropdownMenuProps) {
  const [isClickable, setIsClickable] = useState(
    new Array(subMenuItems.length).fill(false),
  );
  const tabItems: TabsProps['items'] = subMenuItems.map((subMenu, i) => ({
    key: subMenu.key,
    label: (
      <Title
        level={3}
        onClick={(e) => {
          if (!isClickable[i]) {
            e.preventDefault();
            let newClickable: boolean[] = [...isClickable];
            newClickable[i] = true;
            setIsClickable(newClickable);
          }
        }}
      >
        {subMenu.label}
      </Title>
    ),
    children: productsImgs[subMenu.label?.props?.children]
      ? productsImgs[subMenu.label.props.children].map((product) => (
          <Flex vertical key={product[0]}>
            <img width={120} src={product[1]} alt={product[0]} />
            <Text>{product[0]}</Text>
          </Flex>
        ))
      : null,
  }));

  console.log(tabItems);

  const [isMenuClickable, setIsMenuClickable] = useState(false);
  const handleClickMenu = (e) => {
    if (!isMenuClickable) {
      e.preventDefault();
      setIsMenuClickable(true);
    }
  };

  return (
    <div>
      <button className={`menuLabel`} onClick={handleClickMenu}>
        {menuItem.label}
      </button>
      <div
        className={`menuContent relative ${
          isMenuClickable ? 'block' : 'hidden'
        }`}
        id={menuItem.key}
      >
        {menuItem.key == 'gid://shopify/MenuItem/527140159535' && (
          <div
            className={`absolute z-40 w-full dropdownMenuContent py-8 px-20 2xl:py-14 2xl:px-52 bg-lightGreyColor rounded-3xl`}
            style={{
              width: 'calc(100vw - 112px)',
              left: 'calc(-10rem - 100px)',
              top: '2.25rem',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div>
              <Text className={`text-sm text-greyColor font-light`}>
                Catagory
              </Text>
              <Tabs
                defaultActiveKey="1"
                items={tabItems.slice(0, 5)}
                tabPosition="left"
                more={{trigger: 'hover'}}
              />
            </div>
            <div>
              <Text className={`text-sm text-greyColor font-light`}>
                Series
              </Text>
              <Tabs
                defaultActiveKey="1"
                items={tabItems.slice(5)}
                tabPosition="left"
                more={{trigger: 'hover'}}
              />
            </div>
            {/* {subMenuItems.map((subMenu) => {
              return (
                <div className={`dropdownProducts`} key={subMenu.key}>
                  <Title level={3}>{subMenu.label}</Title>
                  {productsImgs[subMenu.label?.props?.children] &&
                    productsImgs[subMenu.label.props.children].map(
                      (product) => {
                        return (
                          <Flex className={`hidden`} vertical key={product[0]}>
                            <img
                              width={120}
                              src={product[1]}
                              alt={product[0]}
                            ></img>
                            <Text>{product[0]}</Text>
                          </Flex>
                        );
                      },
                    )}
                </div>
              );
            })} */}
          </div>
        )}
      </div>
    </div>
  );
}
