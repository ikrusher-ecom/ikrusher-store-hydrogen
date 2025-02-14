import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {Breadcrumb, Layout as AntdLayout, Menu as AntdMenu, theme} from 'antd';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import FooterSocialPayment from '~/components/FooterSocialPayment';
import FooterSubscribe from '~/components/FooterSubscribe';
import FooterLocations from '~/components/FooterLocations';
import HeaderNestedMenu from '~/components/HeaderNestedMenu';
import HeaderDesktopMenu from '~/components/HeaderDesktopMenu';
import {Button} from '~/components/Button';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import arrowOpenedIcon from '~/assets/arrow-opened.svg';
import arrowClosedIcon from '~/assets/arrow-closed.svg';
import logoIcon from '~/assets/logo.svg';
import wishlistIcon from '~/assets/wishlist-icon.svg';
import loginIcon from '~/assets/login-icon.svg';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

const {Header: AntdHeader, Content, Footer: AntdFooter} = AntdLayout;

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <AntdLayout className={`bg-contrast`}>
      <div className="relative flex flex-col">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && (
          <AntdHeader
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 50,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '0',
              height: '0',
            }}
          >
            <Header title={layout?.shop.name || 'iKrusher'} menu={headerMenu} />
          </AntdHeader>
        )}
        <main
          role="main"
          id="mainContent"
          className={`flex-grow relative w-screen lg:top-0 top-16`}
        >
          {children}
          <div
            className={`w-screen h-full absolute top-0 left-0 z-20 hidden`}
            id={`menuPopupBg`}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(6px)',
            }}
          ></div>
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </AntdLayout>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      heading="Cart"
      openFrom="right"
      headingContent={<span>Cart</span>}
      moreContent={null}
    >
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  const params = useParams();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      openFrom="right"
      heading="Menu"
      headingContent={
        <Link className="flex items-center flex-grow w-full h-full" to="/">
          <img src={logoIcon} alt="iKrusher icon" />
        </Link>
      }
      moreContent={
        <>
          {/* <Form
            method="get"
            action={params.locale ? `/${params.locale}/search` : '/search'}
            className="items-center gap-2 sm:flex"
          > */}
          <a
            href={params.locale ? `/${params.locale}/search` : '/search'}
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </a>
          {/* <Input
              type="search"
              variant="minisearch"
              placeholder="Search"
              name="q"
            /> */}
          {/* </Form> */}
          <AccountLink className="relative flex items-center justify-center w-8 h-8" />
          {/* <a href="/pages/wishlist">
            <img src={wishlistIcon} alt="iKrusher wishlist" />
          </a> */}
        </>
      }
    >
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

interface MenuItem {
  id: string;
  title: string;
  url?: string;
  items: MenuItem[];
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="grid gap-4 py-6 sm:gap-6 sm:py-8">
      <HeaderNestedMenu
        menuProp={(menu?.items || []) as unknown as MenuItem[]}
      />
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`fixed bg-themeColor text-contrast flex xl:hidden items-center h-nav backdrop-blur-lg z-40 top-0 left-0 justify-between w-screen leading-none gap-4 px-4 xl:px-8`}
    >
      <div className="flex items-center justify-between w-full gap-4">
        <Link
          className="flex items-center h-full text-transparent"
          to="/"
          style={{color: 'transparent'}}
        >
          <img src={logoIcon} alt="iKrusher icon" />
          <Heading className={`text-transparent w-0 no-underline`} as="h1">
            {title}
          </Heading>
        </Link>

        <button
          onClick={openMenu}
          className="relative flex items-center justify-end w-8 h-8"
        >
          <IconMenu />
        </button>
      </div>

      {/* <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form> */}

      {/* <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div> */}
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();

  return (
    <header
      role="banner"
      className={`relative top-20 inset-x-14 rounded-full desktopHeaderNav bg-themeColor text-contrast hidden xl:flex items-center transition duration-300 backdrop-blur-lg z-40 justify-between leading-none px-12 py-4 2xl:gap-8 2xl:px-20 2xl:py-7`}
      style={{width: 'calc(100% - 112px)'}}
    >
      <div className="flex gap-12 2xl:gap-20 justify-center items-center">
        <Link
          className="font-bold flex flex-col justify-center items-center no-underline hover:no-underline h-full text-transparent"
          to="/"
          prefetch="intent"
          style={{width: '100px', color: 'transparent'}}
        >
          <img src={logoIcon} alt="iKrusher icon" className={`w-full h-auto`} />
          <Heading className={`text-transparent w-0 h-0 no-underline`} as="h1">
            {title}
          </Heading>
        </Link>
        <nav className="flex gap-8">
          <HeaderDesktopMenu
            menuProp={(menu?.items || []) as unknown as MenuItem[]}
          />
          {/* {(menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              prefetch="intent"
              className={({isActive}) =>
                isActive
                  ? 'pb-1 border-b -mb-px text-contrast no-underline'
                  : 'pb-1 text-contrast no-underline'
              }
            >
              {item.title}
            </Link>
          ))} */}
        </nav>
      </div>
      <div>
        <Button
          to="/pages/contact"
          className={`bg-yellowColor font-semibold text-black no-underline hover:no-underline hover:bg-black hover:text-yellowColor py-4 px-6 rounded-3xl text-semibold border-none w-44`}
        >
          Request a Quote
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {/* <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder=""
            name="q"
          /> */}
        <button
          type="submit"
          className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
        >
          <IconSearch />
        </button>
        {/* </Form> */}
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        {/* <CartCount isHome={isHome} openCart={openCart} /> */}
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<img src={loginIcon} alt="iKrusher icon" />}>
        <Await
          resolve={isLoggedIn}
          errorElement={<img src={loginIcon} alt="iKrusher icon" />}
        >
          {/* {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)} */}
          <img src={loginIcon} alt="iKrusher icon" />
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : 0;

  return (
    <>
      <Section
        divider={isHome ? 'none' : 'top'}
        as="footer"
        role="contentinfo"
        className={`p-0 gap-0 bg-primary text-contrast`}
        style={{padding: '0', gap: '0'}}
      >
        <div
          className={`footerGrid border-none mx-auto grid min-h-[25rem] items-start grid-flow-row w-full px-0 lg:pt-16 pt-8 pb-0 grid-cols-1 bg-primary text-contrast overflow-hidden relative max-w-screen-xl`}
          style={{
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <FooterLocations />
          <FooterMenu menu={menu} />
          <div className={`lg:hidden block`}>
            <FooterSubscribe />
            <FooterSocialPayment />
          </div>
          {/* <CountrySelector /> */}
        </div>
        <div
          className={`bg-primary text-contrast z-10 py-8 -mt-1 hidden lg:block`}
        >
          <FooterSocialPayment />
        </div>
      </Section>
    </>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a
        href={item.to}
        target={item.target}
        rel="noopener noreferrer"
        className={`text-greyColor no-underline`}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      target={item.target}
      prefetch="intent"
      className={`text-greyColor no-underline`}
    >
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4 px-5 pt-5 w-full mobile-border',
    nav: 'grid gap-2 pb-5',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left lg:cursor-default">
                  <Heading
                    className="flex justify-between font-semibold text-[22px] m-0 items-center"
                    size="lead"
                    as="h4"
                  >
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="lg:hidden">
                        {/* <IconCaret direction={open ? 'up' : 'down'} /> */}
                        {open ? (
                          <img src={arrowOpenedIcon} alt="iKrusher icon" />
                        ) : (
                          <img src={arrowClosedIcon} alt="iKrusher icon" />
                        )}
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `h-fit` : `max-h-0 lg:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
