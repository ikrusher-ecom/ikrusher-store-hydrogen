import React, {CSSProperties} from 'react';
import type {CollapseProps} from 'antd';
import {Collapse, Flex, Typography} from 'antd';

import arrowOpened from '~/assets/arrow-opened.svg';
import arrowClosed from '~/assets/arrow-closed.svg';

const {Title} = Typography;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle,
) => [
  {
    key: '1',
    label: 'Question 1',
    children: <p>Answer 1</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'Question 2',
    children: <p>Answer 2</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'Question 3',
    children: <p>Answer 3</p>,
    style: panelStyle,
  },
];

export function FaqAccordion() {
  const panelStyle: React.CSSProperties = {
    borderRadius: '16px',
    border: 'none',
    backgroundColor: '#F0F0F0',
    marginBottom: '8px',
  };

  return (
    <Flex
      vertical
      className={`mx-8 mb-20 gap-y-4 lg:mb-40 lg:max-w-screen-lg lg:mx-auto`}
    >
      <Title level={2} className={`text-center`}>
        FAQ
      </Title>
      <Collapse
        accordion
        bordered={false}
        items={getItems(panelStyle)}
        expandIconPosition="end"
        expandIcon={({isActive}) =>
          isActive ? (
            <img src={arrowOpened} alt="iKrusher" />
          ) : (
            <img src={arrowClosed} alt="iKrusher" />
          )
        }
        style={{background: 'transparent'}}
        className={`faqAccordion`}
      />
    </Flex>
  );
}
