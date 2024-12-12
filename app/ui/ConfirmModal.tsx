import Modal from "./Modal";

type ConfirmDeactivateModalProps = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  status: boolean;
  cancelText?: string;
  confirmText?: string;
};

const ConfirmModal = ({
  title,
  onCancel,
  onConfirm,
  status,
  cancelText = "Cancel",
  confirmText = "Confirm",
}: ConfirmDeactivateModalProps) => {
  if (!status) return null;

  return (
    <Modal status={status} onClose={onCancel}>
      <h2 className="font-bold text-xl mt-4">{title}</h2>
      <div className="flex gap-4 justify-end mt-8">
        <button
          onClick={onCancel}
          className="bg-white border-slate-800 border text-slate-800 font-bold py-2 px-2 text-sm rounded"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 text-sm rounded"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
