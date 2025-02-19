import {useState} from 'react';
import {Carousel, Typography} from 'antd';

const {Text, Title, Paragraph} = Typography;

interface CarouselItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
  dotText: string;
  btnText: string;
  btnStyle: string;
  mainTitle?: string | JSX.Element;
  subTitle?: string | JSX.Element;
}

const carouselData: CarouselItem[] = [
  {
    id: 'carousel-omni',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/OMNI_banner_1.png?v=1739496011',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/890add065964db5a0d65cefe7a77bf5b.jpg?v=1739496123',
    linkUrl: '/pages/omni',
    dotText: 'OMNI Connect',
    btnText: 'Learn More',
    btnStyle: 'text-black bg-yellowColor hover:text-yellowColor hover:bg-black',
    mainTitle: (
      <span className={`font-semibold text-3xl text-contrast`}>
        <span className={`text-themeColor`}>OMNI Connect</span>
        <br />
        Consumer Experience
      </span>
    ),
    subTitle: (
      <span className={`text-contrast`}>
        With the OMNI Consumer experience, end users can access customizable.
      </span>
    ),
  },
  {
    id: 'carousel-postless',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Postless_76429c09-2efc-42b6-885d-cab42686e0d0.png?v=1739496010',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/890add065964db5a0d65cefe7a77bf5b.jpg?v=1739496123',
    linkUrl: '/pages/ikraft',
    dotText: 'Postless',
    btnText: 'View all products',
    btnStyle:
      'text-black bg-contrast hover:text-contrast hover:bg-black md:text-contrast md:bg-black hover:md:text-black hover:md:bg-contrast',
    mainTitle: (
      <span className={`font-semibold text-3xl text-black`}>
        Postless Goodness
      </span>
    ),
    subTitle: (
      <span className={`text-black`}>
        With the OMNI Consumer experience, end users can access customizable.
      </span>
    ),
  },
  {
    id: 'carousel-vatra',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/OMNI_banner_1.png?v=1739496011',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/890add065964db5a0d65cefe7a77bf5b.jpg?v=1739496123',
    linkUrl: '/pages/omni',
    dotText: 'OMNI Connect',
    btnText: 'Learn More',
    btnStyle: 'text-black bg-yellowColor hover:text-yellowColor hover:bg-black',
    mainTitle: (
      <span className={`font-semibold text-3xl text-contrast`}>
        <span className={`text-themeColor`}>OMNI Connect</span>
        <br />
        Consumer Experience
      </span>
    ),
    subTitle: (
      <span className={`text-contrast`}>
        With the OMNI Consumer experience, end users can access customizable.
      </span>
    ),
  },
  {
    id: 'carousel-customer',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Postless_76429c09-2efc-42b6-885d-cab42686e0d0.png?v=1739496010',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/890add065964db5a0d65cefe7a77bf5b.jpg?v=1739496123',
    linkUrl: '/pages/ikraft',
    dotText: 'Postless',
    btnText: 'View all products',
    btnStyle:
      'text-black bg-contrast hover:text-contrast hover:bg-black md:text-contrast md:bg-black hover:md:text-black hover:md:bg-contrast',
    mainTitle: (
      <span className={`font-semibold text-3xl text-black`}>
        Postless Goodness
      </span>
    ),
    subTitle: (
      <span className={`text-black`}>
        With the OMNI Consumer experience, end users can access customizable.
      </span>
    ),
  },
];

export function CarouselMain(): JSX.Element {
  const [isDarkDots, setIsDarkDots] = useState(false);

  return (
    <Carousel
      arrows
      autoplay
      speed={700}
      autoplaySpeed={7000}
      // touchMove={false}
      className={`mainCarousel`}
      customPaging={(i) => (
        <button
          key={i}
          id={`${i}-dot`}
          style={{
            color: isDarkDots ? '#000' : '#fff',
          }}
        >
          {carouselData[i].dotText}
        </button>
      )}
      afterChange={(index) => {
        if (index % 2 !== 0) {
          setIsDarkDots(true);
        } else {
          setIsDarkDots(false);
        }
      }}
    >
      {carouselData.map((item) => {
        return (
          <div
            key={item.id}
            className={`m-0 relative`}
            data-index={item.dotText}
          >
            <img
              src={item.imgUrl}
              alt="iKrusher"
              className={`hidden md:block object-cover`}
              style={{aspectRatio: '1920/1120'}}
            />
            <img
              src={item.mobileImgUrl}
              alt="iKrusher"
              className={`block md:hidden object-cover`}
              style={{aspectRatio: '425/525'}}
            />
            <div
              className={`flex flex-col absolute lg:top-1/2 bottom-8 top-auto lg:bottom-auto gap-y-4 heroDesktopText lg:items-start lg:text-left items-center text-center px-8 lg:px-0`}
            >
              {item.mainTitle && <Title level={2}>{item.mainTitle}</Title>}
              {item.subTitle && <Paragraph>{item.subTitle}</Paragraph>}
              <a
                className={`bottom-7 px-4 min-w-min text-center font-semibold rounded-2xl py-1 leading-normal ${item.btnStyle} no-underline hover:no-underline md:bottom-60 md:left-44 md:transform-none`}
                href={item.linkUrl}
              >
                {item.btnText}
              </a>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
