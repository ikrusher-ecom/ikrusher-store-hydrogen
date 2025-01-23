declare module 'react-infinite-ticker' {
  import {ComponentType, ReactNode} from 'react';

  interface HorizontalTickerProps {
    duration?: number;
    reverse?: boolean;
    children: ReactNode;
  }

  export const HorizontalTicker: ComponentType<HorizontalTickerProps>;
}
