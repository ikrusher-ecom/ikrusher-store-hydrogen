import {useFetcher} from '@remix-run/react';
import clsx from 'clsx';
import {forwardRef} from 'react';
import {Button} from 'antd';

import type {CustomerApiPlayload} from '~/routes/($locale).api.customer';

interface NewsLetterInputProps {
  placeholder: string;
  buttonText: string;
  successText?: string;
  className?: string;
}

export const NewsLetterForm = forwardRef<HTMLDivElement, NewsLetterInputProps>(
  function NewsLetterForm(
    {buttonText, placeholder, successText, className, ...rest},
    ref,
  ) {
    const fetcher = useFetcher();
    const {state, Form} = fetcher;
    const data = fetcher.data as CustomerApiPlayload;
    const {ok, errorMessage} = data || {};

    return (
      <div ref={ref} {...rest} className={`w-full mt-4`}>
        <Form
          method="POST"
          action="/api/customer"
          className={`w-full`}
          data-motion="fade-up"
        >
          <div className={`inline`}>
            <input
              name="email"
              type="email"
              required
              placeholder={placeholder}
              className={`bg-white text-black border-0 rounded-l-lg px-4 py-2 leading-6 h-10 w-2/3 outline-none`}
              style={{
                boxShadow: '6px 1px 18.9px 4px rgba(0, 0, 0, 0.25) inset',
              }}
            />
          </div>
          <Button
            htmlType="submit"
            className={`bg-themeColor text-contrast leading-6 text-base mb-2 mt-1 px-6 py-2 border-0 rounded-lg font-semibold h-10 ml-[-15px]`}
            loading={state === 'submitting'}
            style={{width: 'calc(100%/3 + 15px)'}}
          >
            {buttonText}
          </Button>
        </Form>
        <div
          className={clsx(
            'mx-auto mt-4 font-normal text-center',
            state === 'idle' && data ? 'visible' : 'invisible h-0 mt-0',
            ok ? 'text-themeColor' : 'text-red-700',
          )}
        >
          {ok ? successText : errorMessage || 'Something went wrong'}
        </div>
      </div>
    );
  },
);

interface SchemaInput {
  type: string;
  name: string;
  label: string;
  defaultValue: string | number;
  placeholder?: string;
  configs?: {
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  };
}

interface SchemaInspector {
  group: string;
  inputs: SchemaInput[];
}

interface ComponentSchema {
  type: string;
  title: string;
  inspector: SchemaInspector[];
}

export const schema: ComponentSchema = {
  type: 'newsletter-form',
  title: 'Form',
  inspector: [
    {
      group: 'Form',
      inputs: [
        {
          type: 'range',
          name: 'width',
          label: 'Input width',
          configs: {
            min: 300,
            max: 600,
            step: 10,
            unit: 'px',
          },
          defaultValue: 500,
        },
        {
          type: 'text',
          name: 'placeholder',
          label: 'Placeholder',
          defaultValue: 'Enter your email',
          placeholder: 'Enter your email',
        },
        {
          type: 'richtext',
          name: 'helpText',
          label: 'Help text',
          defaultValue:
            '<div>We care about the protection of your data. Read our <a href="/policies/privacy-policy" style="color: #007AFF; text-decoration: underline;">Privacy Policy</a>.</div>',
        },
        {
          type: 'text',
          name: 'successText',
          label: 'Success message',
          placeholder: '🎉 Thank you for subscribing!',
          defaultValue: '🎉 Thank you for subscribing!',
        },
        {
          type: 'text',
          name: 'buttonText',
          label: 'Button text',
          placeholder: 'Subscribe',
          defaultValue: 'Subscribe',
        },
      ],
    },
  ],
};
