/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';
import {Flex} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import arrowLeftIcon from '~/assets/arrow-left.svg';
import arrowRightIcon from '~/assets/arrow-right.svg';

interface HeadingData {
  heading?: string;
  subTitle?: string;
  link?: {
    href: string;
    text: string;
  };
}

interface BlogSlideProps {
  headingData: HeadingData;
  articleData: any[];
}

export function BlogSlide({headingData, articleData}: BlogSlideProps) {
  if (!articleData || !articleData.length) {
    return <div>No articles available.</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articleData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articleData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className={`relative`} style={{marginBottom: '70px'}}>
      <TitleDiv
        subTitle={headingData.subTitle}
        mainTitle={headingData.heading || 'Default Title'}
        link={{href: '/journal', text: 'View all articles'}}
      />
      <Flex
        gap="middle"
        className={`ml-7`}
        style={{
          transform: `translateX(calc(-${currentIndex * 80}% - ${
            currentIndex * 8
          }px))`,
          transition: 'transform 0.7s ease-in-out',
        }}
      >
        {articleData.map((item) => {
          return (
            <div
              key={item.node.id}
              className={`m-0 relative flex-none w-4/5`}
              style={{flexBasis: '80%', flexShrink: 0}}
            >
              <a
                href={`/journal/${item.node.handle}`}
                className={`mb-2 block`}
                style={{aspectRatio: '35/25'}}
              >
                <img
                  src={item.node.image.url}
                  alt={item.node.image.altText}
                  className={`block md:hidden w-full rounded-xl object-cover`}
                  style={{aspectRatio: '35/25'}}
                />
              </a>
              <div>
                {/* <span></span> */}
                <span className={`text-sm`}>
                  {new Intl.DateTimeFormat(`en-US`, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(item.node.publishedAt!))}
                </span>
              </div>
              <TitleDiv
                customClass={`pt-0 pb-0 pl-0 pr-0`}
                titleColor={'theme'}
                mainTitle={item.node.title}
                descriptionHtml={item.node.contentHtml}
                link={{
                  href: `/blog/${item.node.handle}`,
                  text: 'Learn more...',
                }}
              />
            </div>
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
