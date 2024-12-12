import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  status: boolean;
  onClose: () => void;
};

const Modal = ({
  children,
  status,
  onClose,
}: ModalProps) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return

    if (status) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [status])

  if (!modalRoot) {
    console.warn("Modal root element not found.");
    return null;
  }

  return createPortal(
    <>
      <dialog
        ref={dialogRef}
        className="top-1/4 p-6 max-w-screen-md z-20 relative rounded-md"
        onClose={onClose}
      >
        <div className="absolute right-0 top-0 p-1 leading-tight">
          <button
            className="font-bold text-xl block w-8 h-8"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        {children}
      </dialog>
    </>,
    modalRoot
  );
};

export default Modal;
