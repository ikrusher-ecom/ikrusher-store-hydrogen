import {Flex, Typography} from 'antd';

const {Text, Link, Paragraph, Title} = Typography;

interface TitleDivProps {
  subTitle?: string;
  mainTitle: string | JSX.Element;
  description?: string | JSX.Element;
  descriptionHtml?: string;
  link?: {
    href: string;
    text: string;
  };
  customClass?: string;
  titleColor?: string;
  titleLevel?: number;
}

export function TitleDiv({
  subTitle,
  mainTitle,
  description,
  descriptionHtml,
  link,
  customClass,
  titleColor,
  titleLevel,
}: TitleDivProps): JSX.Element {
  return (
    <Flex
      vertical
      align="start"
      gap="small"
      className={`px-7 pt-0 pb-8 ${customClass}`}
    >
      {subTitle && (
        <Text className={`text-greyColor text-base font-medium`}>
          {subTitle}
        </Text>
      )}
      <Title
        level={titleLevel || 2}
        className={`pb-2 font-bold leading-none ${
          titleLevel === 3 ? 'pt-0' : 'pt-1'
        } ${titleColor === 'theme' ? 'text-themeColor' : 'text-black'}`}
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
        <Paragraph className={`overflow-hidden`} style={{height: '4.5rem'}}>
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}}></div>
        </Paragraph>
      )}
      {link && (
        <Link href={link.href} underline>
          <span className={`text-themeColor text-base block pt-2`}>
            {link.text}
          </span>
        </Link>
      )}
    </Flex>
  );
}
