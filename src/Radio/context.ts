import React from 'react';
import type {RadioGroupContextProps} from './interface';

const RadioContext = React.createContext<RadioGroupContextProps>({} as RadioGroupContextProps);

export default RadioContext;
