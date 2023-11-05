"use client";
import { useState, useEffect } from "react";

const Toast = ({
  message,
  duration,
  onClose,
}: {
  message: string;
  duration: number;
  onClose: () => void;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 transform transition-transform ${
        visible ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-300 bg-black text-white p-4 rounded shadow-md`}
    >
      {message}
    </div>
  );
};

export default Toast;
