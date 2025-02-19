/* eslint-disable eslint-comments/disable-enable-pair */
import {useEffect, useState} from 'react';

interface ImageTickerProps {
  imageUrls: string[];
}

export function ImageTicker({imageUrls}: ImageTickerProps) {
  //   const [isClient, setIsClient] = useState(false);

  //   useEffect(() => {
  //     setIsClient(true);
  //   }, []);

  //   if (!isClient) {
  //     return null;
  //   }

  return (
    <div className={`overflow-hidden w-full mb-20 lg:mb-40`}>
      <div className={`ticker-div flex -mx-4 lg:hidden`}>
        {imageUrls.length > 0 &&
          imageUrls
            .slice(0, Math.ceil(imageUrls.length / 2))
            .map((image, i) => {
              return <img key={image} src={image} alt="iKrusher" />;
            })}
      </div>
      <div className={`ticker-div-rev flex -mx-4 lg:hidden`}>
        {imageUrls.length > 0 &&
          imageUrls.slice(Math.ceil(imageUrls.length / 2)).map((image, i) => {
            return <img key={image} src={image} alt="iKrusher" />;
          })}
      </div>
      <div className={`ticker-div lg:flex hidden gap-x-4`}>
        {imageUrls.length > 0 &&
          imageUrls.map((image, i) => {
            return <img key={image} src={image} alt="iKrusher" />;
          })}
      </div>
      <div className={`ticker-div-rev lg:flex hidden gap-x-4`}>
        {imageUrls.length > 0 &&
          [...imageUrls].reverse().map((image, i) => {
            return <img key={image} src={image} alt="iKrusher" />;
          })}
      </div>
    </div>
  );
}
