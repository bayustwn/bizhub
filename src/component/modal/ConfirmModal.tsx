interface Modal{
  isOpen: boolean
  title : string
  message : string
  onConfirm: ()=>void
  onCancel: ()=>void
  confirmText:string
}

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel,confirmText }:Modal) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 cursor-default flex font-poppins items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg text-primary font-bold mb-4">{title || 'Konfirmasi'}</h2>
        <p className="text-black">{message || 'Apakah Anda yakin?'}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 cursor-pointer py-2 rounded bg-primary-200 text-primary"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 font-semibold cursor-pointer py-2 rounded bg-red text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
