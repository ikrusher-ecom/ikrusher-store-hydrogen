import {Card, Flex, Typography, Button} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface ImageCardData {
  imgUrl: string;
  title: string | JSX.Element;
  description: string;
  button: {
    link: string;
    text: string;
  };
}

interface ImageCardProps {
  imageCardData: ImageCardData;
}

export function ImageCard({imageCardData}: ImageCardProps): JSX.Element {
  return (
    <Card
      bordered={false}
      cover={
        <img
          src={imageCardData.imgUrl}
          alt="iKrusher"
          className={`rounded-none w-full h-full object-cover`}
          style={{filter: 'brightness(70%)'}}
        />
      }
      className={`relative`}
      style={{
        aspectRatio: '425/400',
      }}
    >
      <Flex
        vertical
        align="center"
        gap="small"
        className={`w-full h-full justify-center text-center text-contrast`}
      >
        <Title
          level={2}
          className={`py-2 font-bold text-contrast leading-none`}
          style={{
            margin: '0',
            fontWeight: '700',
            color: 'var(--color-contrast)',
            lineHeight: '1',
          }}
        >
          {imageCardData.title}
        </Title>
        <Paragraph>
          <p className={`text-contrast font-light`}>
            {imageCardData.description}
          </p>
        </Paragraph>
        <a
          href={imageCardData.button.link}
          className={`bg-themeColor text-contrast border-0 rounded-3xl py-2 px-4 font-semibold mt-3`}
        >
          {imageCardData.button.text}
        </a>
      </Flex>
    </Card>
  );
}
