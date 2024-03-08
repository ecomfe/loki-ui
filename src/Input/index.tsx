import Input from './InputCom';
import TextArea from './Textarea';
import type {InputProps} from './interface';

const MergeInput = Input as typeof Input & {
    TextArea: typeof TextArea;
};

if (process.env.NODE_ENV !== 'production') {
    MergeInput.displayName = 'Input';
}

MergeInput.TextArea = TextArea;

export default MergeInput;
export {InputProps};
