import {Flex, Typography} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface TitleDivProps {
  subTitle?: string;
  mainTitle: string | JSX.Element;
  description?: string;
  descriptionHtml?: string;
  link?: {
    href: string;
    text: string;
  };
  customClass?: string;
  titleColor?: string;
}

export function TitleDiv({
  subTitle,
  mainTitle,
  description,
  descriptionHtml,
  link,
  customClass,
  titleColor,
}: TitleDivProps): JSX.Element {
  return (
    <Flex
      vertical
      align="start"
      gap="small"
      className={`px-7 pt-6 pb-4 ${customClass}`}
    >
      {subTitle && (
        <Text className={`text-greyColor text-base font-medium`}>
          {subTitle}
        </Text>
      )}
      <Title
        level={2}
        className={`py-2 font-bold leading-none ${
          titleColor === 'theme' ? 'text-themeColor' : 'text-black'
        }`}
        style={{
          margin: '0',
          fontWeight: '700',
          lineHeight: '1',
          color: `${
            titleColor === 'theme' ? 'rgb(var(--color-theme))' : '#000'
          }`,
        }}
      >
        {mainTitle}
      </Title>
      {description && <Paragraph>{description}</Paragraph>}
      {descriptionHtml && (
        <Paragraph className={`h-16 overflow-hidden`}>
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}}></div>
        </Paragraph>
      )}
      {link && (
        <Link href={link.href} underline>
          <span className={`text-themeColor text-base`}>{link.text}</span>
        </Link>
      )}
    </Flex>
  );
}
