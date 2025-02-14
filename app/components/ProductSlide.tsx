import {useState} from 'react';
import {Flex, Typography, Image} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import arrowLeftIcon from '~/assets/arrow-left.svg';
import arrowRightIcon from '~/assets/arrow-right.svg';

const {Text, Link, Paragraph, Title} = Typography;

interface ProductItem {
  name: string;
  image: string;
  subTitle: string;
  link: string;
  compatibility?: string[];
}

interface ProductSlideProps {
  productItems: ProductItem[];
  subTitle: string;
  mainTitle: string;
}

export function ProductSlide({
  productItems,
  subTitle,
  mainTitle,
}: ProductSlideProps) {
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
      prevIndex === 0 ? productItems.length - 1 : prevIndex - 1,
    );
    console.log(currentIndex);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productItems.length - 1 ? 0 : prevIndex + 1,
    );
    console.log(currentIndex);
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
    <div
      className={`relative mb-20 lg:mb-40 lg:max-w-screen-2xl lg:ml-auto lg:mr-0`}
    >
      <TitleDiv subTitle={subTitle} mainTitle={mainTitle} />
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
          {productItems.map((item) => (
            <Flex
              vertical
              key={item.name}
              className={`m-0 relative flex-none w-4/5 h-full object-cover object-center rounded-2xl bg-lightGreyColor`}
              style={{
                flexBasis: '80%',
                flexShrink: 0,
                aspectRatio: '3/4',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Image
                preview={false}
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover object-center rounded-2xl`}
              />
              <Flex
                vertical
                className={`absolute left-0 right-0 text-center h-full w-full flex flex-col justify-between py-9 px-2`}
              >
                <Flex vertical className={`gap-y-1`}>
                  <Title level={4}>{item.name}</Title>
                  <Paragraph>{item.subTitle}</Paragraph>
                </Flex>
                <Link href={item.link}>View here</Link>
              </Flex>
            </Flex>
          ))}
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
          {productItems.map((item) => (
            <Flex
              vertical
              key={item.name}
              className={`m-0 relative flex-none w-1/4 h-full object-cover object-center rounded-2xl bg-lightGreyColor`}
              style={{
                flexShrink: 0,
                aspectRatio: '3/4',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Image
                preview={false}
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover object-center rounded-2xl`}
              />
              <Flex
                vertical
                className={`absolute left-0 right-0 text-center h-full w-full flex flex-col justify-between py-9 px-2`}
              >
                <Flex vertical className={`gap-y-1`}>
                  <Title level={4}>{item.name}</Title>
                  <Paragraph>{item.subTitle}</Paragraph>
                </Flex>
                <Link href={item.link}>View here</Link>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </div>
      <button
        onClick={handlePrev}
        className="absolute lg:mr-40"
        style={{right: '90px', top: 'calc(100% + 14px)'}}
      >
        <img src={arrowLeftIcon} alt="iKrusher" />
      </button>
      <button
        onClick={handleNext}
        className="absolute lg:mr-40"
        style={{right: '30px', top: 'calc(100% + 14px)'}}
      >
        <img src={arrowRightIcon} alt="iKrusher" />
      </button>
    </div>
  );
}
