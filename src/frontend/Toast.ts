import Toastify from "toastify-js";
export default function toast(message: string, color: string) {
  Toastify({
    text: message,
    backgroundColor: color,
  }).showToast();
}
