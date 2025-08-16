import { Notify } from "quasar";


export const showNotification = (message: string, type: 'positive' | 'negative' | 'warning' | 'info' = 'negative') => {
  Notify.create({
    type,
    message,
    position: 'top',
    timeout: 2500
  });
};