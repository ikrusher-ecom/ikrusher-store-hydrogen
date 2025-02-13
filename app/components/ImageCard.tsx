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
    <>
      <div className={`lg:hidden`}>
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
            className={`w-full h-full justify-end text-center text-contrast`}
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
              <p className={`text-contrast font-normal px-6`}>
                {imageCardData.description}
              </p>
            </Paragraph>
            <a
              href={imageCardData.button.link}
              className={`bg-yellowColor text-black border-0 rounded-3xl py-2 px-4 font-semibold my-8`}
            >
              {imageCardData.button.text}
            </a>
          </Flex>
        </Card>
      </div>
      <div className={`lg:flex hidden items-center max-w-screen-lg mx-auto`}>
        <img
          src={imageCardData.imgUrl}
          alt="iKrusher"
          className={`rounded-2xl w-1/2 h-full object-cover`}
        />
        <Flex
          vertical
          align="left"
          gap="small"
          className={`w-1/2 h-full justify-center text-left pl-7 gap-y-8`}
        >
          <Title
            level={2}
            className={`font-bold leading-none`}
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
            <p className={`text-black font-normal`}>
              {imageCardData.description}
            </p>
          </Paragraph>
          <a
            href={imageCardData.button.link}
            className={`bg-themeColor text-contrast no-underline border-0 rounded-3xl py-2 px-4 font-semibold hover:text-contrast hover:no-underline max-w-max`}
          >
            {imageCardData.button.text}
          </a>
        </Flex>
      </div>
    </>
  );
}
