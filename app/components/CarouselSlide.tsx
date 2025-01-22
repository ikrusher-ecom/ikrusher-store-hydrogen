import {Carousel} from 'antd';

interface CarouselItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
}

interface CarouselSlideProps {
  slideData: CarouselItem[];
}

export function CarouselSlide({slideData}: CarouselSlideProps): JSX.Element {
  return (
    <Carousel arrows speed={700}>
      {slideData.map((item) => {
        return (
          <a href={item.linkUrl} key={item.id} className={`m-0 relative`}>
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
          </a>
        );
      })}
    </Carousel>
  );
}
