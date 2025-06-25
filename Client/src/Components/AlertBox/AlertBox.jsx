// src/components/AlertBox.jsx

const AlertBox = ({ type = "success", message, onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-400"
      : "bg-red-100 text-red-700 border-red-400";

  return (
    <div
      className={`fixed top-5 right-5 z-50 border px-4 py-3 rounded shadow-lg transition-all duration-300 ${bgColor}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="ml-4 font-bold text-xl">
          &times;
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
