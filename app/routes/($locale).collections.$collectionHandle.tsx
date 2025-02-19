import {CSSProperties, useEffect, Suspense} from 'react';
import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
  defer,
} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate, Await} from '@remix-run/react';
import {useInView} from 'react-intersection-observer';
import type {
  Filter,
  ProductCollectionSortKeys,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Pagination,
  flattenConnection,
  getPaginationVariables,
  Analytics,
  getSeoMeta,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import {Typography} from 'antd';

import {PageHeader, Section, Text} from '~/components/Text';
import {Grid} from '~/components/Grid';
import {Button} from '~/components/Button';
import {ProductCard} from '~/components/ProductCard';
import {SortFilter, type SortParam} from '~/components/SortFilter';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {FILTER_URL_PREFIX} from '~/components/SortFilter';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {parseAsCurrency} from '~/lib/utils';
import {HeroBanner} from '~/components/HeroBanner';
import {TitleDiv} from '~/components/TitleDiv';
import {ProductSlide} from '~/components/ProductSlide';
import {ProductFilterSlide} from '~/components/ProductFilterSlide';
import {FlexSlide} from '~/components/FlexSlide';
import {TechSlide} from '~/components/TechSlide';
import {ProductComparison} from '~/components/ProductComparison';
import {productSpecs} from '~/data/products';
import {ImageTicker} from '~/components/ImageTicker';
import {BlogSlide} from '~/components/BlogSlide';
import {FaqAccordion} from '~/components/FaqAccordion';

const {Title} = Typography;

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 50,
  });
  const {collectionHandle} = params;
  const locale = context.storefront.i18n;

  invariant(collectionHandle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;

  const {sortKey, reverse} = getSortValuesFromParam(
    searchParams.get('sort') as SortParam,
  );
  const filters = [...searchParams.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [] as ProductFilter[],
  );

  const {collection, collections} = await context.storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  if (!collection) {
    throw new Response('collection', {status: 404});
  }

  const seo = seoPayload.collection({collection, url: request.url});

  const allFilterValues = collection.products.filters.flatMap(
    (filter) => filter.values,
  );

  const appliedFilters = filters
    .map((filter) => {
      const foundValue = allFilterValues.find((value) => {
        const valueInput = JSON.parse(value.input as string) as ProductFilter;
        // special case for price, the user can enter something freeform (still a number, though)
        // that may not make sense for the locale/currency.
        // Basically just check if the price filter is applied at all.
        if (valueInput.price && filter.price) {
          return true;
        }
        return (
          // This comparison should be okay as long as we're not manipulating the input we
          // get from the API before using it as a URL param.
          JSON.stringify(valueInput) === JSON.stringify(filter)
        );
      });
      if (!foundValue) {
        // eslint-disable-next-line no-console
        console.error('Could not find filter value for filter', filter);
        return null;
      }

      if (foundValue.id === 'filter.v.price') {
        // Special case for price, we want to show the min and max values as the label.
        const input = JSON.parse(foundValue.input as string) as ProductFilter;
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';

        return {
          filter,
          label,
        };
      }
      return {
        filter,
        label: foundValue.label,
      };
    })
    .filter((filter): filter is NonNullable<typeof filter> => filter !== null);

  const blogData = context.storefront
    .query(BLOGS_QUERY, {
      variables: {
        blogHandle: 'blog',
        pageBy: PAGINATION_SIZE,
        language: context.storefront.i18n.language,
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return defer({
    collection,
    appliedFilters,
    collections: flattenConnection(collections),
    seo,
    blogData,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Collection() {
  const {collection, collections, appliedFilters, blogData} =
    useLoaderData<typeof loader>();

  const {ref, inView} = useInView();

  interface ProductItem {
    name: string;
    image: string;
    subTitle: string;
    link: string;
    compatibility?: string[];
  }

  const productSlideItems: ProductItem[] = collection.products.nodes.map(
    (product) => ({
      name: product.title.split(' | ')[0],
      image: product.variants.nodes[0].image?.url ?? '',
      subTitle: product.title.split(' | ')[1],
      link: `/products/${product.handle}`,
      compatibility: JSON.parse(product.compatibility[0]?.value as string),
    }),
  );

  interface TechContentItem {
    title: string;
    description: string;
    image: string;
  }

  interface TechSlideItem {
    id: string;
    imgUrl?: string;
    bgImgUrl?: string;
    mainTitle: string;
    subTitle: string;
    content: TechContentItem[];
    customStyle?: CSSProperties;
  }

  const aioTitle = {
    subTitle: 'Technology',
    mainTitle: (
      <span>
        Cutting-Edge <br />
        Vaping Technology
      </span>
    ),
  };

  const aioSlide: TechSlideItem[] = [
    {
      id: 'tech-ikonic-arc',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_2.png?v=1738790488',
      mainTitle: 'iKonic Arc',
      subTitle: 'Smooth. Powerful. Reliable.',
      content: [
        {
          title: 'Ceramic Core',
          description:
            'Unlock the full potential of your vape with ceramic core technology. Crafted for precision and purity, ceramic cores provide consistent heat, preserve authentic flavors.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Felt Fabric Material',
          description:
            'The felt acts as an efficient wick, ensuring that your concentrate is thoroughly absorbed and vaporized.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Heating Element',
          description:
            'Engineered for superior flavor, even heat distribution, and long-lasting durability, our ceramic technology minimizes dry hits, reduces.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
      ],
    },
    {
      id: 'tech-ikonic-flux',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/7898a189a2f8701fb5b925f29206e691.png?v=1738790488',
      mainTitle: 'iKonic Flux',
      subTitle: 'Precision, Power, Perfection.',
      content: [
        {
          title: 'Ceramic Angular Design',
          description:
            'With its angular, robust design, this offers enhanced stability and durability, making it perfect for daily use.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Superior Flavor Quality',
          description:
            'Experience pure, untainted vapor with a postless design that reduces metal contact, ensuring your cannabis.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Zero Contact',
          description: `The concentrates aren't in direct contact with metal posts compare to traditional designs, this reduces the risk of a metallic taste.`,
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Consistent Heating Distribution',
          description:
            'iKonic Flux prevents hot spots and ensuring that your concentrates are fully vaporized.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
        {
          title: 'Efficient Airflow & Vapor Production',
          description:
            'Allows for smoother, more direct airflow, resulting in larger, more consistent clouds of vapor. Say goodbye to harsh hits and hello to seamless, enjoyable draws with every session.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
      ],
    },
    {
      id: 'tech-omni-connect',
      bgImgUrl:
        'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/c0dab33c82170ce0642ed777474826c1.png?v=1739478516',
      mainTitle: 'OMNI Connect',
      subTitle: 'Smooth Hits. Pure Power.',
      content: [
        {
          title: 'Dual NFC',
          description:
            'Ceramic Core Unlock the full potential of your vape with ceramic core technology.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_364_1.png?v=1739488357',
        },
        {
          title: 'Tempature Control',
          description:
            'Ceramic Core Unlock the full potential of your vape with ceramic core technology.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Rectangle_364.png?v=1739488357',
        },
      ],
      customStyle: {
        color: '#fff',
      },
    },
    {
      id: 'tech-dual-airflow',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/faffb1cf39c7f46a4ce7c82f7d804c5b.jpg?v=1739478571',
      mainTitle: 'Dual Airflow',
      subTitle: 'No Clogs, Just Power',
      content: [
        {
          title: 'Prevents Clogging and Build-Up',
          description:
            'This innovative feature uses two independent airflow channels, ensuring smooth, uninterrupted airflow and preventing the build-up of resin, oils.',
          image:
            'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/VATRA_1.194_11.png?v=1739489166',
        },
      ],
    },
  ];

  interface ProductComparisonItem {
    id: string;
    name: string;
    image: string;
    specs: SpecItem;
  }

  interface SpecItem {
    name: string;
    id: string;
    type: string;
    batteryCapacity?: string;
    heatingElement?: string;
    centerPost?: string;
    maxFillVolume?: string;
    activation?: string;
    outputVoltage?: string;
    resistance?: string;
    aperture?: string;
    tankMaterial?: string;
    chargePort?: string;
    mouthpiece?: string;
  }

  const productComparisonItems: ProductComparisonItem[] =
    collection.products.nodes.map((product) => ({
      id: product.id,
      name: product.title.split(' | ')[0],
      image: product.variants.nodes[0].image?.url ?? '',
      specs: productSpecs.find((spec) => spec.id === product.id),
    }));

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

  return (
    <>
      {/* <PageHeader heading={collection.title}>
        {collection?.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <Text format width="narrow" as="p" className="inline-block">
                {collection.description}
              </Text>
            </div>
          </div>
        )}
      </PageHeader> */}

      {/* All in one */}
      {collection.handle === 'disposable-vapes' && (
        <>
          <div className={`mb-20 lg:mb-40`}>
            <HeroBanner
              handle={collection.handle}
              title={
                <Title
                  level={1}
                  className={`text-contrast`}
                  style={{color: 'rgb(var(--color-contrast))'}}
                >
                  <span className={`text-blueColor`}>All-in-One</span>
                  <br />
                  Disposable Vapes
                </Title>
              }
              description={`With the OMNI consumer experience, end users can access customizable.`}
              image={
                'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/fba26fbd3740796227522c4f7007912b.png?v=1738696050'
              }
              desktopImage={
                'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/b1285071ce337ff6b5a1c62c818120b8_1.png?v=1739472341'
              }
            />
          </div>
          <ProductSlide
            productItems={productSlideItems}
            subTitle="The Fresh Line-Up"
            mainTitle={
              <span>
                New <span className={`text-themeColor`}>All-in-One</span>
                <br />
                Vape Hardware
              </span>
            }
          />
          <ProductFilterSlide
            productItems={productSlideItems}
            subTitle="Collection"
            mainTitle={
              <span>
                AIO Designed For
                <br />
                Your Taste
              </span>
            }
          />
          <TechSlide slideData={aioSlide} titleData={aioTitle} />
          <ProductComparison
            productItems={productComparisonItems}
            titleData={{
              subTitle: 'Comparison Chart',
              mainTitle: (
                <span>
                  Find Your Perfect
                  <br />
                  AIO Device
                </span>
              ),
              description: (
                <span className={`text-greyColor`}>
                  For any assistance, speak with
                  <br className={`lg:hidden`} />{' '}
                  <a className={`text-themeColor`} href="/contact">
                    our specialist
                  </a>
                  .
                </span>
              ),
            }}
          />
        </>
      )}

      <ImageTicker imageUrls={brandUrls} />

      <FaqAccordion />

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

      {/* <Section>
        <SortFilter
          filters={collection.products.filters as Filter[]}
          appliedFilters={appliedFilters}
          collections={collections}
        >
          <Pagination connection={collection.products}>
            {({
              nodes,
              isLoading,
              PreviousLink,
              NextLink,
              nextPageUrl,
              hasNextPage,
              state,
            }) => (
              <>
                <div className="flex items-center justify-center mb-6">
                  <Button as={PreviousLink} variant="secondary" width="full">
                    {isLoading ? 'Loading...' : 'Load previous'}
                  </Button>
                </div>
                <ProductsLoadedOnScroll
                  nodes={nodes}
                  inView={inView}
                  nextPageUrl={nextPageUrl}
                  hasNextPage={hasNextPage}
                  state={state}
                />
                <div className="flex items-center justify-center mt-6">
                  <Button
                    ref={ref}
                    as={NextLink}
                    variant="secondary"
                    width="full"
                  >
                    {isLoading ? 'Loading...' : 'Load more products'}
                  </Button>
                </div>
              </>
            )}
          </Pagination>
        </SortFilter>
      </Section> */}
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

function ProductsLoadedOnScroll({
  nodes,
  inView,
  nextPageUrl,
  hasNextPage,
  state,
}: {
  nodes: any;
  inView: boolean;
  nextPageUrl: string;
  hasNextPage: boolean;
  state: any;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage) {
      navigate(nextPageUrl, {
        replace: true,
        preventScrollReset: true,
        state,
      });
    }
  }, [inView, navigate, state, nextPageUrl, hasNextPage]);

  return (
    <Grid layout="products" data-test="product-grid">
      {nodes.map((product: any, i: number) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={getImageLoadingPriority(i)}
        />
      ))}
    </Grid>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
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

function getSortValuesFromParam(sortParam: SortParam | null): {
  sortKey: ProductCollectionSortKeys;
  reverse: boolean;
} {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
