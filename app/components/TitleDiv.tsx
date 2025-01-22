import {Flex, Space, Typography} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface TitleDivProps {
  subTitle?: string;
  mainTitle: string | JSX.Element;
  description?: string;
  link?: {
    href: string;
    text: string;
  };
}

export function TitleDiv({
  subTitle,
  mainTitle,
  description,
  link,
}: TitleDivProps): JSX.Element {
  return (
    <Flex vertical align="start" gap="small" className={`mx-12 mt-6 mb-4`}>
      {subTitle && (
        <Text className={`text-greyColor text-base font-medium`}>
          {subTitle}
        </Text>
      )}
      <Title
        level={2}
        className={`my-2 font-bold text-black leading-none`}
        style={{margin: '0', fontWeight: '700', color: '#000', lineHeight: '1'}}
      >
        {mainTitle}
      </Title>
      {description && <Paragraph>{description}</Paragraph>}
      {link && (
        <Link href={link.href} underline>
          <span className={`text-themeColor text-base`}>{link.text}</span>
        </Link>
      )}
    </Flex>
  );
}
