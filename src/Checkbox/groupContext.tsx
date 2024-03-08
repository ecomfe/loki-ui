import React from 'react';
import type {CheckboxOptionType} from './interface';

export interface CheckboxGroupContext {
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
}

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
