import {useState} from 'react';
import {Flex} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import arrowLeftIcon from '~/assets/arrow-left.svg';
import arrowRightIcon from '~/assets/arrow-right.svg';

interface SlideItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
}

interface FlexSlideProps {
  slideData: SlideItem[];
  titleData: {
    subTitle?: string;
    mainTitle: string | JSX.Element;
    description?: string;
    link?: {
      href: string;
      text: string;
    };
  };
}

export function FlexSlide({slideData, titleData}: FlexSlideProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className={`relative`} style={{marginBottom: '54px'}}>
      <TitleDiv
        subTitle={titleData.subTitle}
        mainTitle={titleData.mainTitle}
        description={titleData.description}
        link={titleData.link}
      />
      <Flex
        gap="middle"
        className={`ml-7`}
        style={{
          transform: `translateX(calc(-${currentIndex * 80}% - ${
            currentIndex * 8
          }px))`,
        }}
      >
        {slideData.map((item) => {
          return (
            <a
              href={item.linkUrl}
              key={item.id}
              className={`m-0 relative flex-none w-4/5`}
              style={{flexBasis: '80%', flexShrink: 0}}
            >
              <img
                src={item.imgUrl}
                alt="iKrusher"
                className={`hidden md:block w-full rounded-xl`}
                style={{boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
              />
              <img
                src={item.mobileImgUrl}
                alt="iKrusher"
                className={`block md:hidden w-full rounded-xl`}
                style={{boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
              />
            </a>
          );
        })}
      </Flex>
      <button
        onClick={handlePrev}
        className="absolute"
        style={{right: '90px', top: 'calc(100% + 14px)'}}
      >
        <img src={arrowLeftIcon} alt="iKrusher" />
      </button>
      <button
        onClick={handleNext}
        className="absolute"
        style={{right: '30px', top: 'calc(100% + 14px)'}}
      >
        <img src={arrowRightIcon} alt="iKrusher" />
      </button>
    </div>
  );
}
