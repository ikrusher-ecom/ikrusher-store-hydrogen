import {CSSProperties, useState} from 'react';
import {Flex, Row, Col, Carousel, Typography} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import arrowLeftIcon from '~/assets/arrow-left.svg';
import arrowRightIcon from '~/assets/arrow-right.svg';

const {Text, Link, Paragraph, Title} = Typography;

interface SlideItem {
  id: string;
  imgUrl: string;
  mobileImgUrl: string;
  linkUrl: string;
  customStyle?: CSSProperties;
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
  const [touchStart, setTouchStart] = useState<{x: number; y: number} | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<{x: number; y: number} | null>(null);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;
  // Maximum angle in degrees to consider a horizontal swipe
  const maxSwipeAngle = 30;

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setIsHorizontalSwipe(false);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;

    const xDistance = touchStart.x - currentX;
    const yDistance = touchStart.y - currentY;

    // Calculate the angle of the swipe
    const angle = Math.abs((Math.atan2(yDistance, xDistance) * 180) / Math.PI);

    // Determine if this is a horizontal swipe
    const isHorizontal = angle < maxSwipeAngle || angle > 180 - maxSwipeAngle;

    if (isHorizontal && Math.abs(xDistance) > minSwipeDistance) {
      setIsHorizontalSwipe(true);
    }

    setTouchEnd({
      x: currentX,
      y: currentY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isHorizontalSwipe) return;

    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;

    // Calculate the angle of the swipe
    const angle = Math.abs((Math.atan2(yDistance, xDistance) * 180) / Math.PI);

    // Only process horizontal swipes
    if (angle < maxSwipeAngle || angle > 180 - maxSwipeAngle) {
      const isLeftSwipe = xDistance > minSwipeDistance;
      const isRightSwipe = xDistance < -minSwipeDistance;

      if (isLeftSwipe) {
        handleNext();
      } else if (isRightSwipe) {
        handlePrev();
      }
    }

    // Reset the horizontal swipe flag
    setIsHorizontalSwipe(false);
  };

  return (
    <div className={`relative mb-20 lg:mb-40`}>
      <TitleDiv
        subTitle={titleData.subTitle}
        mainTitle={titleData.mainTitle}
        description={titleData.description}
        link={titleData.link}
        customClass={`${
          titleData.subTitle?.toLowerCase() || ''
        }SlidesTitle lg:text-center lg:items-center lg:max-w-screen-md lg:mx-auto`}
      />
      <div className={`overflow-hidden lg:hidden block`}>
        <Flex
          gap="middle"
          className={`py-2 pl-1 pr-4 flex-slide ml-7`}
          style={{
            transform: `translateX(calc(-${currentIndex * 80}% - ${
              currentIndex * 0
            }px))`,
            transition: 'transform 0.7s ease-in-out',
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
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
                  className={`hidden lg:block w-full rounded-xl`}
                  style={{boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
                />
                <img
                  src={item.mobileImgUrl}
                  alt="iKrusher"
                  className={`block lg:hidden w-full rounded-xl object-cover`}
                  style={{
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    ...item.customStyle,
                  }}
                />
              </a>
            );
          })}
        </Flex>
      </div>
      <button
        onClick={handlePrev}
        className={`absolute lg:hidden`}
        style={{right: '90px', top: 'calc(100% + 20px)'}}
      >
        <img src={arrowLeftIcon} alt="iKrusher" />
      </button>
      <button
        onClick={handleNext}
        className={`absolute lg:hidden`}
        style={{right: '30px', top: 'calc(100% + 20px)'}}
      >
        <img src={arrowRightIcon} alt="iKrusher" />
      </button>
      {titleData.subTitle === 'The Collection' && (
        <div className={`lg:block hidden max-w-screen-lg mx-auto`}>
          <Row gutter={[16, 16]}>
            {slideData.map((item) => {
              return (
                <Col
                  className="gutter-row flex items-center"
                  span={8}
                  key={item.id}
                >
                  <img
                    src={item.imgUrl}
                    alt="iKrusher"
                    className={`hidden md:block w-full rounded-xl`}
                    style={{boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
      {titleData.subTitle === 'iKraft' && (
        <div
          className={`hidden w-full max-w-screen-lg mx-auto lg:flex ikraftDesktopSection`}
        >
          <Carousel
            autoplay
            speed={700}
            autoplaySpeed={7000}
            // touchMove={false}
          >
            {slideData.map((item) => (
              <div key={item.id}>
                <img
                  src={item.imgUrl}
                  alt="iKrusher"
                  className={`w-full rounded-xl`}
                  style={{aspectRatio: '546/433'}}
                />
              </div>
            ))}
          </Carousel>
          {/* <TitleDiv
            subTitle={titleData.subTitle}
            mainTitle={titleData.mainTitle}
            description={titleData.description}
            link={titleData.link}
            customClass={`lg:text-left lg:items-left lg:max-w-screen-sm lg:mx-auto ikraftDesktopTitle`}
          /> */}
          <div className={`h-full`} style={{aspectRatio: '546/433'}}>
            <div
              className={`pl-16 flex flex-col justify-center h-full gap-y-8`}
            >
              {titleData.subTitle && (
                <Text className={`text-greyColor text-base font-medium`}>
                  {titleData.subTitle}
                </Text>
              )}
              <Title
                level={2}
                className={`pb-2 font-bold leading-none pt-1`}
                style={{
                  margin: '0',
                  fontWeight: '700',
                  lineHeight: '1',
                  color: '#000',
                }}
              >
                {titleData.mainTitle}
              </Title>
              {titleData.description && (
                <Paragraph>{titleData.description}</Paragraph>
              )}
              {titleData.link && (
                <Link href={titleData.link.href} underline>
                  <span className={`text-themeColor text-base block pt-2`}>
                    {titleData.link.text}
                  </span>
                </Link>
              )}
              <div className={`flex flex-col gap-y-2`}>
                <Text>
                  <Link href={'/pages/custom-vapes'}>Click here</Link> for
                  custom vape
                </Text>
                <Text>
                  <Link href={'/pages/custom-packaging'}>Click here</Link> for
                  custom packaging
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
