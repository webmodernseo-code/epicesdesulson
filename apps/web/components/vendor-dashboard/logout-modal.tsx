"use client";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onLogout,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="active-modal visible opacity-100 transition-all duration-250 max-w-[356px] w-full bg-white rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-10 text-center">
          <h5 className="mb-2">Logout Information</h5>
          <p className="text-light-disabled-text">
            Are you sure you want to logout?
          </p>
          <div className="flex items-center justify-end gap-x-4 mt-8">
            <button
              onClick={onClose}
              className="btn btn-default outline btn-large md:px-[33px] w-[45%] md:w-auto py-2.5 rounded-[100px] shadow-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="btn btn-warning btn-large md:px-[41px] w-[45%] md:w-auto py-[11px] rounded-[100px] cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
