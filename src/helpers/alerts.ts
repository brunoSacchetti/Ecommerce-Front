import Swal from "sweetalert2";

export const alertError = (title: string, text: string) => {
  return Swal.fire(title, text, "error");
};
