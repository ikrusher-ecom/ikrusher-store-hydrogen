import {Carousel} from 'antd';

interface CarouselItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
  btnText: string;
  btnStyle: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 'carousel-ikraft',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/your_vision_our_vapes3_2.png?v=1736989775',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/ikraft_december2025.png?v=1736990112',
    linkUrl: '/pages/custom-vapes',
    btnText: 'Get Started',
    btnStyle:
      'text-black bg-contrast hover:text-contrast hover:bg-black md:text-contrast md:bg-black hover:md:text-black hover:md:bg-contrast',
  },
  {
    id: 'carousel-omni',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/OMNI_723c8100-57d1-4508-8d52-23c50e4924b2.png?v=1733275909',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Image_1_e7d1ae53-a3a7-4d02-a4ee-060fc3817ab9.jpg?v=1736560038',
    linkUrl: '/pages/omni',
    btnText: 'Learn More',
    btnStyle: 'text-black bg-yellowColor hover:text-yellowColor hover:bg-black',
  },
  {
    id: 'carousel-vatra',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Vatra3.png?v=1737055062',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Vatra_v4.jpg?v=1737055062',
    linkUrl: '/products/vatra-pro',
    btnText: 'Shop Now',
    btnStyle:
      'text-contrast bg-themeColor hover:text-themeColor hover:bg-contrast',
  },
  {
    id: 'carousel-customer',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/customer_service.jpg?v=1735928499',
    mobileImgUrl:
      'https://cdn.shopify.com/s/files/1/0585/9386/9871/files/Image_2_ecab42ca-4a3d-45de-a126-499878581e72.jpg?v=1736560040',
    linkUrl: '/pages/locations',
    btnText: 'Contact Us',
    btnStyle:
      'text-contrast bg-themeColor hover:text-themeColor hover:bg-contrast',
  },
];

export function CarouselMain(): JSX.Element {
  return (
    <Carousel arrows autoplay speed={700} autoplaySpeed={7000}>
      {carouselData.map((item) => {
        return (
          <div key={item.id} className={`m-0 relative`}>
            <img
              src={item.imgUrl}
              alt="iKrusher"
              className={`hidden md:block`}
            />
            <img
              src={item.mobileImgUrl}
              alt="iKrusher"
              className={`block md:hidden`}
            />
            <a
              className={`absolute bottom-5 inset-x-1/2 w-32 text-center font-semibold rounded-2xl py-1 leading-normal ${item.btnStyle}`}
              style={{transform: 'translateX(-50%)'}}
              href={item.linkUrl}
            >
              {item.btnText}
            </a>
          </div>
        );
      })}
    </Carousel>
  );
}
