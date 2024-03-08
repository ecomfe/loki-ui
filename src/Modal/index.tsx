import BaseModal from './Modal';
import staticApi from './staticApi';
import type {ModalProps, StaticModalFunction} from './types';


type ModalType = typeof BaseModal & StaticModalFunction;
const Modal = BaseModal as ModalType;

Object.assign(Modal, staticApi);

export default Modal;
export {ModalProps};
