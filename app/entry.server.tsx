import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      'self',
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://*.googleapis.com',
      'https://f.vimeocdn.com',
      'https://www.gstatic.com',
      'https://cdn.judge.me',
      'https://cache.judge.me',
      'https://judgeme.imgix.net',
      'https://tracking.aws.judge.me',
      'https://judgeme-public-images.imgix.net',
      'https://vimeo.com',
      'https://i.vimeocdn.com',
      'https://judge.me',
      'https://ae01.alicdn.com',
      'https://m.media-amazon.com',
      'https://i.etsystatic.com',
      `'unsafe-inline'`,
      `'unsafe-eval'`,
      'data:',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    connectSrc: [
      'self',
      'https://*.googleapis.com',
      'https://*.shopify.com',
      'https://*.myshopify.com',
      'https://cdn.shopify.com',
      'https://f.vimeocdn.com',
      'https://www.gstatic.com',
      'https://cdn.judge.me',
      'https://cache.judge.me',
      'https://judgeme.imgix.net',
      'https://tracking.aws.judge.me',
      'https://judgeme-public-images.imgix.net',
      'https://vimeo.com',
      'https://i.vimeocdn.com',
      'https://judge.me',
      'https://ae01.alicdn.com',
      'https://m.media-amazon.com',
      'https://i.etsystatic.com',
      `'unsafe-inline'`,
      `'unsafe-eval'`,
      'data:',
      'wss://conversely-moved-aardvark.ngrok-free.app:*',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    frameSrc: [
      'self',
      'https://*.shopify.com',
      'https://*.myshopify.com',
      'https://cdn.shopify.com',
      'https://player.vimeo.com',
      'https://www.gstatic.com',
      'https://cdn.judge.me',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    imgSrc: [
      'self',
      'https://*.shopify.com',
      'https://*.myshopify.com',
      'https://cdn.shopify.com',
      'https://i.vimeocdn.com',
      'https://f.vimeocdn.com',
      'https://placehold.co',
      'https://cdn.judge.me',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    styleSrc: [
      'self',
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://*.googleapis.com',
      'https://f.vimeocdn.com',
      'https://www.gstatic.com',
      'https://cdn.judge.me',
      'https://cache.judge.me',
      'https://judgeme.imgix.net',
      'https://tracking.aws.judge.me',
      'https://judgeme-public-images.imgix.net',
      'https://vimeo.com',
      'https://i.vimeocdn.com',
      'https://judge.me',
      'https://ae01.alicdn.com',
      'https://m.media-amazon.com',
      'https://i.etsystatic.com',
      `'unsafe-inline'`,
      `'unsafe-eval'`,
      'data:',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
