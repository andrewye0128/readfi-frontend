// 簡化的 toast 實作，替代 sonner
type ToastOptions = {
  duration?: number;
};

let toastContainer: HTMLDivElement | null = null;

function createToastContainer() {
  if (toastContainer) return toastContainer;

  toastContainer = document.createElement("div");
  toastContainer.className =
    "fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md";
  document.body.appendChild(toastContainer);
  return toastContainer;
}

function showToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  const container = createToastContainer();
  const toast = document.createElement("div");

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  toast.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-out", "slide-out-to-bottom");
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
        toastContainer = null;
      }
    }, 300);
  }, 3000);
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    showToast(message, "success");
  },
  error: (message: string, options?: ToastOptions) => {
    showToast(message, "error");
  },
  info: (message: string, options?: ToastOptions) => {
    showToast(message, "info");
  },
};
