/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import {setKey, setLanguage, fromLatLng} from 'react-geocode';

import iphoneIcon from '~/assets/iphone.svg';
import emailIcon from '~/assets/email.svg';

setKey('AIzaSyAXPdYeizLvhCpF48KBT7TGjnhNgC05Iio');
setLanguage('en');

interface AddressComponent {
  long_name: string;
  types: string[];
}

interface GeocodeResponse {
  results: {
    address_components: AddressComponent[];
  }[];
}

export default function FooterLocations() {
  const [postalCode, setPostalCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          fromLatLng(latitude, longitude).then(
            (response: GeocodeResponse) => {
              const addressComponents =
                response.results[0].address_components || [];
              const stateComponent = addressComponents.find((component) =>
                component.types.includes('administrative_area_level_1'),
              );
              const postalCodeComponent = addressComponents.find((component) =>
                component.types.includes('postal_code'),
              );
              setState(stateComponent?.long_name || null);
              setPostalCode(postalCodeComponent?.long_name || null);
            },
            (error) => {
              console.error('Error getting postal code:', error);
            },
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const renderLocationDetails = () => {
    if (!state || !postalCode) {
      return (
        <div className="location-address">
          <p>Loading...</p>
        </div>
      );
    }

    const locationMap: {[key: string]: JSX.Element} = {
      californiaLow: (
        <>
          <p>13100 Spring St., Baldwin Park, CA 91706</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+16262563449">(626) 256-3449</a>
          </p>
        </>
      ),
      californiaHigh: (
        <>
          <p>710 Alfred Nobel Dr., Hercules, CA 94547</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+14159360663">(415) 936-0663</a>
          </p>
        </>
      ),
      washington: (
        <>
          <p>220 S Findlay St, Seattle, WA 98108</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+12069443115">(206) 944-3115</a>
          </p>
        </>
      ),
      arizona: (
        <>
          <p>20815 N 25th Pl., #A107, Phoenix, AZ 85050</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+16026753255">(602) 675-3255</a>
          </p>
        </>
      ),
      colorado: (
        <>
          <p>791 Southpark Dr., #600, Littleton, CO 80120</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+17205191348">(720) 519-1348</a>
          </p>
        </>
      ),
      michigan: (
        <>
          <p>23430 Industrial Park Ct., Farmington Hills, MI 48335</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+13137658008">(313) 765-8008</a>
          </p>
        </>
      ),
      newJersey: (
        <>
          <p>3575 Kennedy Rd, South Plainfield, NJ 07080</p>
          <p
            className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
          >
            <img
              src={iphoneIcon}
              className={`px-0.5 flex flex-row items-center justify-center object-contain h-5`}
              alt="iKrusher icon"
            />
            <a href="tel:+19083328676">(908) 332-8676</a>
          </p>
        </>
      ),
    };

    if (state === 'California' && Number(postalCode) <= 93200)
      return locationMap.californiaLow;
    if (state === 'California' && Number(postalCode) > 93200)
      return locationMap.californiaHigh;
    if (
      state == 'Alaska' ||
      state == 'Arizona' ||
      state == 'Hawaii' ||
      state == 'Nevada' ||
      state == 'New Mexico' ||
      state == 'Texas' ||
      state == 'Utah'
    )
      return locationMap.washington;
    if (
      state == 'Alaska' ||
      state == 'Arizona' ||
      state == 'Hawaii' ||
      state == 'Nevada' ||
      state == 'New Mexico' ||
      state == 'Texas' ||
      state == 'Utah'
    )
      return locationMap.arizona;
    if (
      state == 'Arkansas' ||
      state == 'Colorado' ||
      state == 'Iowa' ||
      state == 'Kansas' ||
      state == 'Missouri' ||
      state == 'Nebraska' ||
      state == 'North Dakota' ||
      state == 'Oklahoma' ||
      state == 'South Dakota' ||
      state == 'Wyoming'
    )
      return locationMap.colorado;
    if (
      state == 'Alabama' ||
      state == 'Georgia' ||
      state == 'Illinois' ||
      state == 'Indiana' ||
      state == 'Kentucky' ||
      state == 'Louisiana' ||
      state == 'Michigan' ||
      state == 'Minnesota' ||
      state == 'Mississippi' ||
      state == 'North Carolina' ||
      state == 'Ohio' ||
      state == 'Puerto Rico' ||
      state == 'South Carolina' ||
      state == 'Tennessee' ||
      state == 'Virginia' ||
      state == 'West Virginia' ||
      state == 'Wisconsin'
    )
      return locationMap.michigan;
    if (
      state == 'New Jersey' ||
      state == 'Connecticut' ||
      state == 'District of Columbia' ||
      state == 'Delaware' ||
      state == 'Massachusetts' ||
      state == 'Maryland' ||
      state == 'Maine' ||
      state == 'New Hampshire' ||
      state == 'New York' ||
      state == 'Pennsylvania' ||
      state == 'Rhode Island' ||
      state == 'Vermont'
    )
      return locationMap.newJersey;

    // return locationMap.californiaLow;
    return null;
  };

  return (
    <div
      className={`flex flex-col w-full p-[10px_20px_20px] gap-3 mobile-border`}
    >
      <h4 className={`font-semibold text-[22px] m-0`}>
        iKrusher Location Near Me
      </h4>
      <div className={`flex flex-col gap-3`}>{renderLocationDetails()}</div>
      <p
        className={`font-medium text-[16px] leading-[1.75] flex flex-row items-center gap-2.5`}
      >
        <img
          className={`flex flex-row items-center justify-center object-contain h-5`}
          src={emailIcon}
          alt="iKrusher icon"
        />
        <a href="mailto:inquiry@ikrusher.com">inquiry@ikrusher.com</a>
      </p>
    </div>
  );
}
