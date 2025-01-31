import {useFetcher} from '@remix-run/react';
import {useRef} from 'react';

import type {action} from '~/routes/klaviyo.submit';

import {NewsLetterForm} from './NewsletterForm';

export default function FooterSubscribe() {
  // const fetcher = useFetcher<typeof action>();

  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`p-[0px_20px_20px] flex flex-col w-full mobile-border`}>
      <h4 className={`font-semibold text-[22px] m-0 leading-none`}>
        Subscribe here
      </h4>
      <p>for iKrusher latest news</p>
      {/* <fetcher.Form
        method="post"
        action="/klaviyo/submit"
        className={`w-full mt-2`}
      >
        <input type="hidden" id="list_id" name="list_id" value="XGcz2a" />
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className={`bg-white border-0 rounded-lg px-4 py-2 leading-6 h-10 w-2/3 outline-none`}
          style={{boxShadow: '6px 1px 18.9px 4px rgba(0, 0, 0, 0.25) inset'}}
        />
        <button
          type="submit"
          disabled={fetcher.state === 'loading'}
          className={`bg-themeColor text-contrast leading-6 text-base mb-2 mt-1 px-6 py-2 border-0 rounded-lg font-semibold ml-[-15px] h-[42px] w-[35%]`}
        >
          {fetcher.state === 'idle' ? 'Subscribe' : 'Signing Up...'}
        </button>
      </fetcher.Form> */}
      <NewsLetterForm
        ref={formRef}
        placeholder="Your email address"
        buttonText="Subscribe"
      />
    </div>
  );
}
