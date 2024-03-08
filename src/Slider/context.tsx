import React from 'react';
import type {SliderClassNames, SliderStyles} from './interface';

export interface SliderContextProps {
  min: number;
  max: number;
  disabled?: boolean;
  keyboard?: boolean;
  // included?: boolean;
  step: number | null;
  // tabIndex: number | number[];
  classNames: SliderClassNames;
  styles: SliderStyles;
}

const SliderContext = React.createContext<SliderContextProps>({
    min: 0,
    max: 0,
    step: 1,
    // tabIndex: 0,
    keyboard: true,
    styles: {},
    classNames: {},
});

export default SliderContext;
