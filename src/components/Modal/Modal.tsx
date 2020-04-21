import { createPortal } from 'react-dom';

import './Modal.less';

const Modal: React.FC<{}> = ({ children }) => {
    console.log(document.querySelector('.modal-container')!);

    return createPortal(
        <div className="modal visible">
            <div>{children}</div>
        </div>,
        document.querySelector('.modal-container')!
    );
};

export default Modal;
