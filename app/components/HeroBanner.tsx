import {Flex, Image, Typography} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface HeroBannerProps {
  handle: string;
  title: string | JSX.Element;
  description: string;
  image: string;
}

export function HeroBanner({
  handle,
  title,
  description,
  image,
}: HeroBannerProps): JSX.Element {
  return (
    <Flex vertical className={`relative`}>
      <Image
        src={image}
        alt={handle}
        preview={false}
        fallback="https://placehold.co/425x525/343434/f5f5f5"
        className={`w-full`}
      />
      <Flex
        vertical
        className={`absolute text-center inset-x-1/2 pb-10 justify-end w-full h-full px-5`}
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
  );
}
