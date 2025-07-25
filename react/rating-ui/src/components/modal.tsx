import { useState } from "react";

type ModalProps = {
  rating: number;
  onClose?: () => void;
};
export function useModal({ rating, onClose }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClose = () => {
    closeModal();
    if (onClose) {
      onClose();
    }
  };

  const RatingModal = () => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 grid place-items-center">
            <div className="py-8 px-8 bg-white rounded-md flex flex-col items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Thank you for your feedback!
                </h2>
                <p>
                  Your rated is {rating} star{rating > 1 ? "s" : ""}
                </p>
              </div>
              <div className="mt-4">
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return {
    RatingModal,
    isOpen,
    openModal,
    closeModal,
  };
}
