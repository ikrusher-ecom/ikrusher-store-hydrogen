import {CSSProperties, useState} from 'react';
import {Button, Flex, Typography, Modal, Image} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import arrowLeftIcon from '~/assets/arrow-left.svg';
import arrowRightIcon from '~/assets/arrow-right.svg';
import plusButtonIcon from '~/assets/plus-button.svg';

const {Text, Link, Paragraph, Title} = Typography;

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

interface TechSlideProps {
  slideData: TechSlideItem[];
  titleData: {
    subTitle?: string;
    mainTitle: string | JSX.Element;
    description?: string;
  };
}

export function TechSlide({slideData, titleData}: TechSlideProps): JSX.Element {
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

  const [isOpen, setIsOpen] = useState(false);
  const [openTech, setOpenTech] = useState<string>('');

  const showModal = (id: string) => {
    setIsOpen(true);
    setOpenTech(id);
    // console.log(isOpen, openTech, id);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setOpenTech('');
    // console.log(isOpen, openTech);
  };

  return (
    <div
      className={`relative mb-20 lg:mb-40 lg:max-w-screen-2xl lg:ml-auto lg:mr-0`}
    >
      <TitleDiv
        subTitle={titleData.subTitle}
        mainTitle={titleData.mainTitle}
        description={titleData.description}
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
              <Flex
                vertical
                key={item.id}
                className={`m-0 relative flex-none w-4/5 h-full object-cover object-center rounded-2xl bg-lightGreyColor pt-9 pb-20 px-4`}
                style={{
                  flexBasis: '80%',
                  flexShrink: 0,
                  aspectRatio: '3/4',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  ...(item.bgImgUrl
                    ? {
                        backgroundImage: `url(${item.bgImgUrl})`,
                        backgroundPosition: '85%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }
                    : {}),
                  ...item.customStyle,
                }}
              >
                <Flex
                  vertical
                  className={`h-full w-full justify-between text-center items-center`}
                  style={{...item.customStyle}}
                >
                  <div style={{...item.customStyle}}>
                    <Title style={{...item.customStyle}} level={4}>
                      {item.mainTitle}
                    </Title>
                    <Paragraph style={{...item.customStyle}}>
                      {item.subTitle}
                    </Paragraph>
                  </div>
                  {item.imgUrl && (
                    <img
                      src={item.imgUrl}
                      alt={item.mainTitle}
                      className={`h-56 w-auto`}
                    />
                  )}
                </Flex>
                <Button
                  onClick={() => showModal(item.id)}
                  type="link"
                  className={`absolute right-4 bottom-9`}
                >
                  <img src={plusButtonIcon} alt="iKrusher" />
                </Button>
                <Modal
                  open={isOpen && openTech === item.id}
                  onOk={handleCloseModal}
                  onCancel={handleCloseModal}
                  footer={null}
                  centered
                  className={`bg-contrast rounded-2xl px-7 py-12 techSlideModal`}
                  style={{
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    padding: '48px 28px',
                  }}
                >
                  {openTech === item.id && (
                    <div>
                      <Text className={`text-greyColor`}>
                        {titleData.subTitle}
                      </Text>
                      <Title
                        level={2}
                        className={`mt-3`}
                        style={{marginTop: '12px'}}
                      >
                        {item.mainTitle}
                      </Title>
                      {item.content.map((content) => (
                        <div
                          key={content.title}
                          className={`mt-8 rounded-2xl bg-lightGreyColor`}
                        >
                          <Flex vertical className={`pt-6 px-6 pb-10 gap-y-3`}>
                            <Title level={4}>{content.title}</Title>
                            <Paragraph className={`text-greyColor`}>
                              {content.description}
                            </Paragraph>
                          </Flex>
                          <Flex
                            vertical
                            className={`justify-center items-center pb-10`}
                          >
                            <img
                              src={content.image}
                              alt={content.title}
                              className={`rounded-b-2xl`}
                            />
                          </Flex>
                        </div>
                      ))}
                    </div>
                  )}
                </Modal>
              </Flex>
            );
          })}
        </Flex>
      </div>
      <div className={`overflow-hidden hidden lg:block`}>
        <Flex
          gap="middle"
          className={`py-2 pl-1 pr-4 flex-slide ml-7`}
          style={{
            transform: `translateX(calc(-${currentIndex * 25}% - ${
              currentIndex * 0
            }rem))`,
            transition: 'transform 0.7s ease-in-out',
          }}
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
        >
          {slideData.map((item) => (
            <Flex
              vertical
              key={item.id}
              className={`m-0 relative flex-none w-1/4 h-full object-cover object-center rounded-2xl bg-lightGreyColor pt-9 pb-20 px-4`}
              style={{
                flexShrink: 0,
                aspectRatio: '3/4',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                ...(item.bgImgUrl
                  ? {
                      backgroundImage: `url(${item.bgImgUrl})`,
                      backgroundPosition: '85%',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }
                  : {}),
                ...item.customStyle,
              }}
            >
              <Flex
                vertical
                className={`h-full w-full justify-between text-center items-center`}
                style={{...item.customStyle}}
              >
                <div style={{...item.customStyle}}>
                  <Title style={{...item.customStyle}} level={4}>
                    {item.mainTitle}
                  </Title>
                  <Paragraph style={{...item.customStyle}}>
                    {item.subTitle}
                  </Paragraph>
                </div>
                {item.imgUrl && (
                  <img
                    src={item.imgUrl}
                    alt={item.mainTitle}
                    className={`h-56 w-auto`}
                  />
                )}
              </Flex>
              <Button
                onClick={() => showModal(item.id)}
                type="link"
                className={`absolute right-4 bottom-9`}
              >
                <img src={plusButtonIcon} alt="iKrusher" />
              </Button>
              <Modal
                open={isOpen && openTech === item.id}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                footer={null}
                centered
                className={`bg-contrast rounded-2xl px-7 py-12 techSlideModal`}
                style={{
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  padding: '48px 28px',
                }}
              >
                {openTech === item.id && (
                  <div>
                    <Text className={`text-greyColor`}>
                      {titleData.subTitle}
                    </Text>
                    <Title
                      level={2}
                      className={`mt-3`}
                      style={{marginTop: '12px'}}
                    >
                      {item.mainTitle}
                    </Title>
                    {item.content.map((content) => (
                      <div
                        key={content.title}
                        className={`mt-8 rounded-2xl bg-lightGreyColor`}
                      >
                        <Flex vertical className={`pt-6 px-6 pb-10 gap-y-3`}>
                          <Title level={4}>{content.title}</Title>
                          <Paragraph className={`text-greyColor`}>
                            {content.description}
                          </Paragraph>
                        </Flex>
                        <Flex
                          vertical
                          className={`justify-center items-center pb-10`}
                        >
                          <img
                            src={content.image}
                            alt={content.title}
                            className={`rounded-b-2xl`}
                          />
                        </Flex>
                      </div>
                    ))}
                  </div>
                )}
              </Modal>
            </Flex>
          ))}
        </Flex>
      </div>
      <button
        onClick={handlePrev}
        className="absolute lg:mr-40"
        style={{right: '90px', top: 'calc(100% + 20px)'}}
      >
        <img src={arrowLeftIcon} alt="iKrusher" />
      </button>
      <button
        onClick={handleNext}
        className="absolute lg:mr-40"
        style={{right: '30px', top: 'calc(100% + 20px)'}}
      >
        <img src={arrowRightIcon} alt="iKrusher" />
      </button>
    </div>
  );
}
