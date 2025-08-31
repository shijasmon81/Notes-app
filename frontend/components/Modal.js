import { motion } from "framer-motion";

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          minWidth: "300px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}
