interface ModalProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {
if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-50"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(0px)" }}
            // onClick={onClose}
        >
            <div className="relative p-10 rounded-lg shadow-lg w-[30%] text-center bg-yellow-500">
                {/* Close Button (X) - Now correctly positioned inside the modal */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-6 text-2xl font-bold hover:text-gray-500"
                >
                    ✕
                </button>

                <div className="my-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="tracking-wider">{description}</p>
                </div>
                <div> {children} </div>
            </div>
        </div>
    );
};

export default Modal;