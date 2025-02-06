import {useState} from 'react';
import {Flex, Select, Typography} from 'antd';

import {TitleDiv} from './TitleDiv';

const {Text, Link, Paragraph, Title} = Typography;

interface ProductComparisonItem {
  id: string;
  name: string;
  image: string;
  specs: SpecItem[];
}

interface SpecItem {
  title: string;
  value: string;
}

interface ProductComparisonProps {
  productItems: ProductComparisonItem[];
  titleData: {
    subTitle: string;
    mainTitle: string | JSX.Element;
    description: string | JSX.Element;
  };
}

export function ProductComparison({
  productItems,
  titleData,
}: ProductComparisonProps) {
  const [selectedProductLeft, setSelectedProductLeft] =
    useState<ProductItem | null>(productItems[0]);
  const [selectedProductRight, setSelectedProductRight] =
    useState<ProductItem | null>(productItems[1]);

  return (
    <Flex vertical>
      <TitleDiv {...titleData} />
      <Flex>
        <Flex vertical>
          <Select
            options={productItems
              .filter((item) => item.id !== selectedProductRight?.id)
              .map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            onChange={(value) => {
              const product = productItems.find((item) => item.id === value);
              if (product) {
                setSelectedProductLeft(product);
              }
            }}
            defaultValue={selectedProductLeft?.id}
          />
          <Flex vertical>
            <img
              src={selectedProductLeft?.image}
              alt={selectedProductLeft?.name}
            />
            <Title level={5}>{selectedProductLeft?.name}</Title>
          </Flex>
        </Flex>
        <Flex vertical>
          <Select
            options={productItems
              .filter((item) => item.id !== selectedProductLeft?.id)
              .map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            onChange={(value) => {
              const product = productItems.find((item) => item.id === value);
              if (product) {
                setSelectedProductRight(product);
              }
            }}
            defaultValue={selectedProductRight?.id}
          />
          <Flex vertical>
            <img
              src={selectedProductRight?.image}
              alt={selectedProductRight?.name}
            />
            <Title level={5}>{selectedProductRight?.name}</Title>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
