import { ref } from "vue";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message?: string;
  duration?: number;
}

type ToastPayload = Omit<Toast, "id">;

const toasts = ref<Toast[]>([]);

export function useToast() {
  const notify = (payload: ToastPayload) => {
    const id = Math.random().toString(36).substring(2, 9);

    const toast: Toast = {
      id,
      ...payload,
    };

    toasts.value.push(toast);

    if (payload.duration) {
      setTimeout(() => {
        remove(id);
      }, payload.duration);
    }
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts,
    notify,
    remove,
  };
}
