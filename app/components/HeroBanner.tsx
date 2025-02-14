import {Flex, Image, Typography} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface HeroBannerProps {
  handle: string;
  title: string | JSX.Element;
  description: string;
  image: string;
  desktopImage: string;
}

export function HeroBanner({
  handle,
  title,
  description,
  image,
  desktopImage,
}: HeroBannerProps): JSX.Element {
  return (
    <>
      <Flex
        vertical
        className={`block relative lg:hidden`}
        style={{aspectRatio: '425 / 525'}}
      >
        <Image
          src={image}
          alt={handle}
          preview={false}
          fallback="https://placehold.co/425x525/343434/f5f5f5"
          className={`w-full h-full object-cover`}
          style={{height: '100%'}}
        />
        <Flex
          vertical
          className={`absolute text-center inset-x-1/2 py-12 justify-end w-full h-full px-8 top-0`}
          style={{transform: 'translateX(-50%)'}}
        >
          {typeof title === 'string' ? <Title level={1}>{title}</Title> : title}
          <Paragraph
            className={`text-contrast`}
            style={{color: 'rgb(var(--color-contrast))'}}
          >
            {description}
          </Paragraph>
        </Flex>
      </Flex>
      <Flex
        vertical
        className={`relative hidden lg:block`}
        style={{aspectRatio: '1920/1120'}}
      >
        <Image
          src={desktopImage}
          alt={handle}
          preview={false}
          fallback="https://placehold.co/1920x1120/343434/f5f5f5"
          className={`w-full h-full object-cover`}
          style={{height: '100%'}}
        />
        <Flex
          vertical
          className={`heroDesktopText absolute text-left py-12 justify-center items-start w-full h-full px-8 xl:top-10 top-0`}
        >
          {typeof title === 'string' ? <Title level={1}>{title}</Title> : title}
          <Paragraph
            className={`text-contrast mt-4`}
            style={{color: 'rgb(var(--color-contrast))'}}
          >
            {description}
          </Paragraph>
        </Flex>
      </Flex>
    </>
  );
}
