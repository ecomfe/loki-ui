import Radio from './Radio';
import RadioGroup from './RadioGroup';
import type {RadioProps} from './interface';

const MergeCheckbox = Radio as typeof Radio & {
    Group: typeof RadioGroup;
};
MergeCheckbox.Group = RadioGroup;

export default MergeCheckbox;
export {RadioProps};
