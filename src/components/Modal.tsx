import styles from "./Modal.module.css";
import type { ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const Modal = ({ children, onClose }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
