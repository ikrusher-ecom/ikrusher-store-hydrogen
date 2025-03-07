import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {CSSProperties, Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {CarouselMain} from '~/components/CarouselMain';
import {FlexSlide} from '~/components/FlexSlide';
import {VimeoVideoPlayer} from '~/components/VimeoVideoPlayer';
import {TitleDiv} from '~/components/TitleDiv';
import {ImageTicker} from '~/components/ImageTicker';
import {ImageCard} from '~/components/ImageCard';
import {BlogSlide} from '~/components/BlogSlide';
import {CertTicker} from '~/components/CertTicker';
import {Hero} from '~/components/Hero';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {JudgemeReview} from '~/components/JudgemeReview';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {PAGINATION_SIZE} from '~/lib/const';
export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const [{shop, hero}] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {handle: 'freestyle'},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    shop,
    primaryHero: hero,
    seo: seoPayload.home({url: request.url}),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        /**
         * Country and language properties are automatically injected
         * into all queries. Passing them is unnecessary unless you
         * want to override them from the following default:
         */
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const secondaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const featuredCollections = context.storefront
    .query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const tertiaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const blogData = context.storefront
    .query(BLOGS_QUERY, {
      variables: {
        blogHandle: 'blog',
        pageBy: PAGINATION_SIZE,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
    secondaryHero,
    featuredCollections,
    tertiaryHero,
    blogData,
  };
}

interface SlideItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
  customStyle?: CSSProperties;
}

const categorySlide: SlideItem[] = [
  {
    id: 'slide-new-arrival-1',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_a43b71a6-d056-48ef-9a62-ff85bc0d10b0.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/eb7f9e86d45850c03bba4fc41a90dde4.png?v=1740087570',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
  {
    id: 'slide-take-it-anywhere',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_3.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/02fb42db4132bbe147f792cabffd5cc1.jpg?v=1740087569',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
  {
    id: 'slide-new-arrival-2',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_1.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/32a057171127f84e97c1494768a964d7.png?v=1740087570',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
  {
    id: 'slide-pod-power-perfected',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_4.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/ea2e01467b527333c3e440c5d807da7d.jpg?v=1740087569',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
  {
    id: 'slide-new-arrival-3',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_2.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/dbc71e5fb3f695ba703b97096f52a729.png?v=1740087569',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
  {
    id: 'slide-bilo',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_306_5.png?v=1740087499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/f58d44bf8407f6522c5078cdbdf192eb.png?v=1740087569',
    linkUrl: '/collections/new-arrivals',
    customStyle: {
      aspectRatio: '3/4',
      objectPosition: 'center 20%',
    },
  },
];

const categoryTitle = {
  subTitle: 'The Collection',
  mainTitle: (
    <span>
      <span className="text-themeColor">Hardware</span> Designed
      <br /> For Your <span className="text-themeColor">Taste</span>
    </span>
  ),
  link: {href: '/collections/all-products', text: 'View all products'},
};

const automationTitle = {
  subTitle: 'Automation',
  mainTitle: (
    <span>
      Filling <span className="text-themeColor">&</span>
      <br />
      Capping <span className="text-themeColor">Solution</span>
    </span>
  ),
  description:
    'With a proven track record of delivering high-quality vape hardware iKrusher has sold hundreds of millions',
  link: {
    href: '/pages/filling-capping',
    text: 'Learn more',
  },
};

const ikraftTitle = {
  subTitle: 'iKraft',
  mainTitle: (
    <span>
      Custom <span className="text-themeColor">Vapes</span> &<br />
      <span className="text-themeColor">Packaging</span>
    </span>
  ),
  description:
    'With a proven track record of delivering high-quality vape hardware iKrusher has sold hundreds of millions of units, earning the trust of thousands of satisfied business customers.',
};

const iKraftSlide: SlideItem[] = [
  {
    id: 'slide-custom-vape',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/9d274bc771c116b25572123c09c93080.png?v=1737583844',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/9d274bc771c116b25572123c09c93080.png?v=1737583844',
    linkUrl: '/pages/custom-vape',
    customStyle: {
      aspectRatio: '1',
    },
  },
  {
    id: 'slide-custom-packaging',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/ed9dc586a74ff944ecab799ee3bc8b56.png?v=1737583844',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/ed9dc586a74ff944ecab799ee3bc8b56.png?v=1737583844',
    linkUrl: '/pages/custom-packaging',
    customStyle: {
      aspectRatio: '1',
      backgroundColor: '#E0E0E0',
    },
  },
];

const brandUrls = [
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos_c4_copy.png?v=1701387042',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos_c1.png?v=1701387032',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-13.png?v=1701387021',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-05.png?v=1701387009',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-11.png?v=1701386999',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-12.png?v=1701386991',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-20.png?v=1701386981',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-09.png?v=1701386970',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-17.png?v=1701386960',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-14.png?v=1701386950',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-19.png?v=1701386939',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-07.png?v=1701386930',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-10.png?v=1701386919',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-16.png?v=1701386909',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos_c2.png?v=1701386892',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-15.png?v=1701386880',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos_c3.png?v=1701386869',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-24.png?v=1700501836',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-08.png?v=1701386854',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-23.png?v=1700501837',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-18.png?v=1701386828',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-22.png?v=1701386781',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos_c4.png?v=1701386770',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Client_logos-06.png?v=1701386758',
];

const certUrls = [
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/003300473a276301eaf1e933b35f9f7a.png?v=1738366876',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/1e6eda6e4572a7a351d30c6447d3515a.png?v=1738366876',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/5792742ae739f5bc57a23aafaa7736b5.png?v=1738366876',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/99e9c0d8cdde239eba105d8819c20bf9.png?v=1738366876',
  'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/34967d9bbabf4cfff94427e52ac97161.png?v=1738366876',
];

const customerCardData = {
  imgUrl:
    'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/d717235ec883b591a5111dd68d69693b.png?v=1737590646',
  title: (
    <span>
      Your
      <br className={`hidden lg:block`} />{' '}
      <span className="text-themeColor">Satisfaction</span>,<br />
      <span className="text-themeColor">Our</span> Priority
    </span>
  ),
  description:
    'We strive to exceed customer expectations and ensure satisfaction at iKrusher.',
  button: {
    link: '/pages/contact-us',
    text: 'Request a Quote',
  },
};

export default function Homepage() {
  const {
    // primaryHero,
    // secondaryHero,
    // tertiaryHero,
    // featuredCollections,
    // featuredProducts,
    blogData,
  } = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )} */}

      <div className={`mb-4 relative`}>
        <CarouselMain />
      </div>

      <JudgemeReview />

      <FlexSlide slideData={categorySlide} titleData={categoryTitle} />

      <div className={`mb-20 lg:mb-40`}>
        <TitleDiv
          mainTitle={
            <span>
              <span className="text-themeColor">Quality</span> &{' '}
              <span className="text-themeColor">Safety</span>
            </span>
          }
          subTitle="Certifications"
          description="Ensuring all products are certified for quality, safety, and compliance. Our commitment to excellence guarantees reliable and high-performance solutions for our customers."
          customClass={`lg:text-center lg:items-center lg:max-w-screen-md lg:mx-auto`}
        />
        <CertTicker imageUrls={certUrls} />
      </div>

      <FlexSlide slideData={iKraftSlide} titleData={ikraftTitle} />

      <div
        className={`mb-20 lg:mb-40 lg:flex lg:w-full lg:max-w-screen-lg lg:mx-auto`}
      >
        <TitleDiv
          {...automationTitle}
          customClass={`lg:max-w-screen-md lg:mx-auto lg:pr-16 lg:flex lg:flex-col lg:justify-center lg:h-full lg:gap-y-8`}
        />
        <div className={`px-7`}>
          <VimeoVideoPlayer className={`rounded-2xl`} videoId="910983760" />
        </div>
      </div>

      <ImageTicker imageUrls={brandUrls} />

      <div className={`mb-20 lg:mb-40`}>
        <ImageCard imageCardData={customerCardData} />
      </div>

      {blogData && (
        <div className={`mb-20 pb-20 lg:pb-0 lg:mb-40`}>
          <Suspense>
            <Await resolve={blogData}>
              {(response) => {
                if (!response || !response.blog || !response.blog.articles) {
                  return <></>;
                }
                return (
                  <BlogSlide
                    headingData={{
                      heading: 'Chasing the Cloud',
                      subTitle: 'Stories & Insights',
                      link: {href: '/journal', text: 'View all articles'},
                    }}
                    articleData={response.blog.articles.edges}
                  />
                );
              }}
            </Await>
          </Suspense>
        </div>
      )}

      {/* {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (
                !response ||
                !response?.products ||
                !response?.products?.nodes
              ) {
                return <></>;
              }
              return (
                <ProductSwimlane
                  products={response.products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )} */}

      {/* {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {(response) => {
              if (!response || !response?.hero) {
                return <></>;
              }
              return <Hero {...response.hero} />;
            }}
          </Await>
        </Suspense>
      )} */}

      {/* {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {(response) => {
              if (
                !response ||
                !response?.collections ||
                !response?.collections?.nodes
              ) {
                return <></>;
              }
              return (
                <FeaturedCollections
                  collections={response.collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )} */}

      {/* {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {(response) => {
              if (!response || !response?.hero) {
                return <></>;
              }
              return <Hero {...response.hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const BLOGS_QUERY = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
  $cursor: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(first: $pageBy, after: $cursor) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
}

fragment Article on Article {
  author: authorV2 {
    name
  }
  contentHtml
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;
