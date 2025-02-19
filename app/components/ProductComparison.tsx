import {useState} from 'react';
import {ConfigProvider, Flex, Select, Typography} from 'antd';

import {TitleDiv} from '~/components/TitleDiv';
import whiteArrow from '~/assets/white-arrow.svg';
import oilType from '~/assets/oil-type.svg';
import ikonicFlux from '~/assets/ikonic-flux.svg';
import ikonicArc from '~/assets/ikonic-arc.svg';
import buttonActivation from '~/assets/button-activation.svg';
import inhaleActivation from '~/assets/inhale-activation.svg';
import omniTwo from '~/assets/omni-2.svg';
import tankCapacity from '~/assets/tank-capacity.svg';
import mouthpiece from '~/assets/mouthpiece.png';
import powerCurve from '~/assets/power-curve.svg';
import resistance from '~/assets/resistance.svg';
import aperture from '~/assets/aperture.svg';
import usbC from '~/assets/usb-c.svg';

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
  const [selectedProductThree, setSelectedProductThree] =
    useState<ProductComparisonItem | null>(null);
  const [selectedProductFour, setSelectedProductFour] =
    useState<ProductComparisonItem | null>(null);

  return (
    <Flex
      vertical
      className={`comparisonContainer bg-lightGreyColor mb-20 lg:mb-40`}
    >
      <TitleDiv
        {...titleData}
        customClass={`bg-lightGreyColor pt-12 lg:w-full lg:min-w-max lg:max-w-screen-lg lg:mx-auto lg:pr-16 lg:flex lg:flex-col lg:justify-center lg:h-full lg:gap-y-4 lg:text-center lg:items-center`}
      />
      <Flex
        className={`w-full px-7 pb-12 bg-lightGreyColor gap-x-12 lg:w-full lg:min-w-max lg:max-w-screen-lg mx-auto lg:justify-center`}
      >
        <Flex vertical className={`w-1/2 lg:w-1/4 lg:items-center`}>
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
              className={`w-full`}
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
              options={productItems
                .filter(
                  (item) =>
                    item.id !== selectedProductRight?.id &&
                    item.id !== selectedProductThree?.id &&
                    item.id !== selectedProductFour?.id,
                )
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
              (selectedProductLeft ||
                selectedProductRight ||
                selectedProductThree ||
                selectedProductFour) &&
              'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                className={`lg:max-w-[200px]`}
                src={selectedProductLeft?.image}
                alt={selectedProductLeft?.name}
              />
              <Title level={5}>{selectedProductLeft?.name}</Title>
            </Flex>
            {selectedProductLeft &&
              Object.entries(selectedProductLeft.specs).map(([key, value]) => {
                if (value) {
                  return (
                    <Flex vertical key={key} className={`gap-y-3`}>
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
                      {key === 'recommendedOilType' && (
                        <>
                          <img
                            src={oilType}
                            alt="iKrusher"
                            width="60"
                            className={`mx-auto`}
                          />
                          {value.split('; ').map((oilItem: string) => (
                            <Text className={`leading-none`} key={oilItem}>
                              {oilItem}
                            </Text>
                          ))}
                        </>
                      )}
                      {key === 'heatingElement' && (
                        <>
                          <img
                            src={
                              value === 'iKonic Flux' ? ikonicFlux : ikonicArc
                            }
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>{value}</Text>
                          <Text className={`leading-none`}>
                            {value === 'iKonic Flux' && 'Postless'}
                            {''}
                            {value === 'iKonic Arc' && 'Center Post'}
                          </Text>
                        </>
                      )}
                      {key === 'activation' && (
                        <>
                          <img
                            src={
                              value === 'Button'
                                ? buttonActivation
                                : inhaleActivation
                            }
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>
                            Activation {value}
                          </Text>
                        </>
                      )}
                      {key === 'omniCompatibility' && (
                        <>
                          <img
                            src={omniTwo}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>
                            OMNI Connect {value}
                          </Text>
                        </>
                      )}
                      {key === 'maxFillVolume' && (
                        <>
                          <img
                            src={tankCapacity}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>Tank Capacity</Text>
                          <Text className={`leading-none tankCapacityValue`}>
                            {value.split(' / ').map((tankItem: string) => (
                              <span key={tankItem}>{tankItem}</span>
                            ))}
                          </Text>
                        </>
                      )}
                      {key === 'centerPost' && (
                        <>
                          <Text className={`leading-none`}>Center Post</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'mouthpiece' && (
                        <>
                          <img
                            src={mouthpiece}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>
                            Mouthpiece made with
                          </Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'outputPower' && (
                        <>
                          <img
                            src={powerCurve}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>
                            Default Power Curve
                          </Text>
                          {value.split('; ').map((powerItem: string) => (
                            <Text className={`leading-none`} key={powerItem}>
                              {powerItem}
                            </Text>
                          ))}
                        </>
                      )}
                      {key === 'outputVoltage' && (
                        <>
                          <Text className={`leading-none`}>Output Voltage</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'resistance' && (
                        <>
                          <img
                            src={resistance}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>Resistance</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'aperture' && (
                        <>
                          <img
                            src={aperture}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          <Text className={`leading-none`}>Aperture</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'chargePort' && (
                        <>
                          <img
                            src={usbC}
                            alt="iKrusher"
                            width="45"
                            className={`mx-auto`}
                          />
                          {value.split(' / ').map((chargeItem: string) => (
                            <Text key={chargeItem} className={`leading-none`}>
                              {chargeItem}
                            </Text>
                          ))}
                        </>
                      )}
                      {key === 'tankMaterial' && (
                        <>
                          <Text className={`leading-none`}>Tank Material</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'dimensions' && (
                        <>
                          <Text className={`leading-none`}>Dimensions</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                      {key === 'shellMaterial' && (
                        <>
                          <Text className={`leading-none`}>Shell Material</Text>
                          <Text className={`leading-none`}>{value}</Text>
                        </>
                      )}
                    </Flex>
                  );
                }
              })}
          </Flex>
        </Flex>
        <Flex vertical className={`w-1/2 lg:w-1/4 lg:items-center`}>
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
              className={`w-full`}
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
              options={productItems
                .filter(
                  (item) =>
                    item.id !== selectedProductThree?.id &&
                    item.id !== selectedProductLeft?.id &&
                    item.id !== selectedProductFour?.id,
                )
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
              (selectedProductLeft ||
                selectedProductRight ||
                selectedProductThree ||
                selectedProductFour) &&
              'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                className={`lg:max-w-[200px]`}
                src={selectedProductRight?.image}
                alt={selectedProductRight?.name}
              />
              <Title level={5}>{selectedProductRight?.name}</Title>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical className={`hidden lg:flex lg:w-1/4 lg:items-center`}>
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
              className={`w-full`}
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
              options={productItems
                .filter(
                  (item) =>
                    item.id !== selectedProductRight?.id &&
                    item.id !== selectedProductLeft?.id &&
                    item.id !== selectedProductFour?.id,
                )
                .map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              onChange={(value) => {
                const product = productItems.find((item) => item.id === value);
                if (product) {
                  setSelectedProductThree(product);
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
              (selectedProductLeft ||
                selectedProductRight ||
                selectedProductThree ||
                selectedProductFour) &&
              'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                className={`lg:max-w-[200px]`}
                src={selectedProductThree?.image}
                alt={selectedProductThree?.name}
              />
              <Title level={5}>{selectedProductThree?.name}</Title>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical className={`hidden lg:flex lg:w-1/4 lg:items-center`}>
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
              className={`w-full`}
              placeholder="Select Product"
              placement="bottomLeft"
              listHeight={160}
              options={productItems
                .filter(
                  (item) =>
                    item.id !== selectedProductRight?.id &&
                    item.id !== selectedProductLeft?.id &&
                    item.id !== selectedProductThree?.id,
                )
                .map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              onChange={(value) => {
                const product = productItems.find((item) => item.id === value);
                if (product) {
                  setSelectedProductFour(product);
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
              (selectedProductLeft ||
                selectedProductRight ||
                selectedProductThree ||
                selectedProductFour) &&
              'mt-16'
            }`}
          >
            <Flex vertical className={`gap-y-6`}>
              <img
                className={`lg:max-w-[200px]`}
                src={selectedProductFour?.image}
                alt={selectedProductFour?.name}
              />
              <Title level={5}>{selectedProductFour?.name}</Title>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
