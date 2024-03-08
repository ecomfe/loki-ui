import Checkbox from './Checkbox';
import Group from './Group';
const MergeCheckbox = Checkbox as typeof Checkbox & {
    Group: typeof Group;
};
MergeCheckbox.Group = Group;

export default MergeCheckbox;
