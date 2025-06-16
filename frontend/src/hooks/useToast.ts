import { useState, useCallback } from "react";
import type { ToastType } from "../components/common/Toast";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      addToast(message, "success");
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string) => {
      addToast(message, "error");
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string) => {
      addToast(message, "warning");
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      addToast(message, "info");
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
