import * as React from 'react';

import instagramIcon from '~/assets/instagram.svg';
import facebookIcon from '~/assets/facebook.svg';
import youtubeIcon from '~/assets/youtube.svg';
import linkedinIcon from '~/assets/linkedin.svg';
import visaIcon from '~/assets/visa.svg';
import mastercardIcon from '~/assets/mastercard.svg';
import amexIcon from '~/assets/amex.svg';
import discoverIcon from '~/assets/discover.svg';

export default function FooterSocialPayment() {
  return (
    <div className={`flex flex-col text-center items-center gap-y-4 pt-3`}>
      <div className={`flex gap-x-3`}>
        <img alt="iKrusher icon" src={instagramIcon} />
        <img alt="iKrusher icon" src={facebookIcon} />
        <img alt="iKrusher icon" src={youtubeIcon} />
        <img alt="iKrusher icon" src={linkedinIcon} />
      </div>
      <div className={`flex gap-x-3`}>
        <img alt="iKrusher icon" src={visaIcon} />
        <img alt="iKrusher icon" src={mastercardIcon} />
        <img alt="iKrusher icon" src={amexIcon} />
        <img alt="iKrusher icon" src={discoverIcon} />
      </div>
      <div className={`uppercase text-center text-xs font-light`}>
        © {new Date().getFullYear()} iKrusher. All Rights Reserved.
      </div>
    </div>
  );
}
