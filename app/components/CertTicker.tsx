/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */

interface CertTickerProps {
  imageUrls: string[];
}

export function CertTicker({imageUrls}: CertTickerProps) {
  return (
    <div className="overflow-hidden w-full mb-4 certTicker">
      <div className="ticker-div-cert flex -mx-4 md:hidden">
        {/* Original set */}
        {imageUrls.map((image, i) => (
          <img key={`ticker-1-${i}`} src={image} alt="iKrusher" />
        ))}
        {/* Duplicate set for seamless loop */}
        {imageUrls.map((image, i) => (
          <img key={`ticker-2-${i}`} src={image} alt="iKrusher" />
        ))}
      </div>
      <div className="hidden md:flex justify-center gap-x-8">
        {imageUrls.map((image, i) => (
          <img key={`ticker-1-${i}`} src={image} alt="iKrusher" />
        ))}
      </div>
    </div>
  );
}
