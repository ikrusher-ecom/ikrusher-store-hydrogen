import {useState} from 'react';
import {ConfigProvider, Flex, Select, Typography} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import whiteArrow from '~/assets/white-arrow.svg';

const {Text, Link, Paragraph, Title} = Typography;

interface ProductComparisonItem {
  id: string;
  name: string;
  image: string;
  specs: SpecItem;
}

interface SpecItem {
  id: string;
  name: string;
  type: string;
  batteryCapacity?: string;
  oilTypes?: string;
  centerPost?: string;
  activation?: string;
  omniCompatibility?: string;
  maxFillVolume?: string;
  mouthpiece?: string;
  outputVoltage?: string;
  resistance?: string;
  heatingElement?: string;
  aperture?: string;
  tankMaterial?: string;
  chargePort?: string;
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
    useState<ProductComparisonItem | null>(null);
  const [selectedProductRight, setSelectedProductRight] =
    useState<ProductComparisonItem | null>(null);

  return (
    <Flex vertical className={`comparisonContainer mb-20`}>
      <TitleDiv {...titleData} customClass={`bg-lightGreyColor pt-12`} />
      <Flex className={`px-7 pb-12 bg-lightGreyColor gap-x-12`}>
        <Flex vertical className={`w-1/2`}>
          <ConfigProvider
            theme={{
              token: {
                colorText: 'rgb(var(--color-contrast))',
                colorBgBase: 'rgb(var(--color-primary))',
                colorTextPlaceholder: 'rgb(var(--color-contrast))',
                borderRadius: 12,
              },
              components: {
                Select: {
                  activeBorderColor: 'rgb(var(--color-theme))',
                  activeOutlineColor: 'rgb(var(--color-contrast))',
                  hoverBorderColor: 'rgb(var(--color-theme))',
                  optionSelectedColor: 'rgb(var(--color-contrast))',
                  optionSelectedBg: 'rgba(62, 177, 200, 0.3)',
                  optionActiveBg: 'rgb(var(--color-primary))',
                  selectorBg: 'rgb(var(--color-primary))',
                },
              },
            }}
          >
            <Select
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
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
              //   defaultValue={selectedProductLeft?.id}
              suffixIcon={<img src={whiteArrow} alt="iKrusher" />}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
            />
          </ConfigProvider>
          <Flex
            vertical
            className={`items-center justify-center text-center gap-y-12 ${
              (selectedProductLeft || selectedProductLeft) && 'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                src={selectedProductLeft?.image}
                alt={selectedProductLeft?.name}
              />
              <Title level={5}>{selectedProductLeft?.name}</Title>
            </Flex>
            {selectedProductLeft &&
              Object.entries(selectedProductLeft.specs).map(([key, value]) => (
                <Flex vertical key={key}>
                  {/* {key === 'type' && <Text>{value}</Text>} */}
                  {key === 'batteryCapacity' && (
                    <Flex vertical className={`items-center`}>
                      <Flex className={`items-end gap-x-1`}>
                        <Text
                          strong
                          style={{fontSize: '32px', lineHeight: '32px'}}
                        >
                          {value.split(' ')[0]}
                        </Text>
                        <Text strong>{value.split(' ')[1]}</Text>
                      </Flex>
                      <Text>Battery Capacity</Text>
                    </Flex>
                  )}
                  {key === 'heatingElement' && <Text>{value}</Text>}
                  {key === 'centerPost' && <Text>{value}</Text>}
                  {key === 'maxFillVolume' && <Text>{value}</Text>}
                  {key === 'activation' && <Text>{value}</Text>}
                  {key === 'outputVoltage' && <Text>{value}</Text>}
                  {key === 'resistance' && <Text>{value}</Text>}
                  {key === 'aperture' && <Text>{value}</Text>}
                  {key === 'tankMaterial' && <Text>{value}</Text>}
                  {key === 'chargePort' && <Text>{value}</Text>}
                  {key === 'mouthpiece' && <Text>{value}</Text>}
                </Flex>
              ))}
          </Flex>
        </Flex>
        <Flex vertical className={`w-1/2`}>
          <ConfigProvider
            theme={{
              token: {
                colorText: 'rgb(var(--color-contrast))',
                colorBgBase: 'rgb(var(--color-primary))',
                colorTextPlaceholder: 'rgb(var(--color-contrast))',
                borderRadius: 12,
              },
              components: {
                Select: {
                  activeBorderColor: 'rgb(var(--color-theme))',
                  activeOutlineColor: 'rgb(var(--color-contrast))',
                  hoverBorderColor: 'rgb(var(--color-theme))',
                  optionSelectedColor: 'rgb(var(--color-contrast))',
                  optionSelectedBg: 'rgba(62, 177, 200, 0.3)',
                  optionActiveBg: 'rgb(var(--color-primary))',
                  selectorBg: 'rgb(var(--color-primary))',
                },
              },
            }}
          >
            <Select
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
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
              //   defaultValue={selectedProductRight?.id}
              suffixIcon={<img src={whiteArrow} alt="iKrusher" />}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
            />
          </ConfigProvider>
          <Flex
            vertical
            className={`items-center justify-center text-center gap-y-12 ${
              (selectedProductLeft || selectedProductRight) && 'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                src={selectedProductRight?.image}
                alt={selectedProductRight?.name}
              />
              <Title level={5}>{selectedProductRight?.name}</Title>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
