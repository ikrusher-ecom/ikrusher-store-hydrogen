import {useRef} from 'react';

import {NewsLetterForm} from './NewsletterForm';

export default function FooterSubscribe() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`p-[0px_20px_20px] flex flex-col w-full mobile-border lg:p-0`}
    >
      <h4 className={`font-semibold text-[22px] m-0 leading-none`}>
        Subscribe here
      </h4>
      <p>for iKrusher latest news</p>
      <NewsLetterForm
        ref={formRef}
        placeholder="Your email address"
        buttonText="Subscribe"
      />
    </div>
  );
}
