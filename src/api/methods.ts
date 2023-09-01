import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getIdFromUrl } from "../helpers";
import { errors } from "../constants/errors";
import cogoToast from "cogo-toast";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const getNewSelections = async (page: number, perPage?: number) => {
  const id = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}/show_new_object.php`,
      { id, page, itemOnPage: perPage },
      { headers }
    )
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const rate = async (like: number, id_object: string, type: string) => {
  const id = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}/object_state.php`,
      { id, like, id_object, type },
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data.error;
      if (errorCode === 0) {
        return errorCode;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errors[errorCode] ?? "Помилка");
        return errorCode;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getHistory = async (page: number, like?: number) => {
  const id = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}/show_history_object.php`,
      { id, page, itemOnPage: 20, like },
      { headers }
    )
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const getRieltor = async () => {
  const id = getIdFromUrl();
  return axios
    .post(`${baseUrl}/get_agency_name.php`, { id }, { headers })
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const getChat = async () => {
  const id = getIdFromUrl();
  return axios
    .post(`${baseUrl}/show_chat.php`, { id }, { headers })
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const sendMessage = async (
  messege?: string,
  file?: File,
  type_table?: string,
  show_object?: any,
  id_parent?: any
) => {
  const id = getIdFromUrl();
  const formData = new FormData();

  formData.append("id", id);
  messege && formData.append("messege", messege);
  file && formData.append("img", file);
  type_table && formData.append("type_table", type_table);
  show_object && formData.append("show_object", show_object);
  id_parent && formData.append("id_parent", id_parent);

  return axios
    .post(`${baseUrl}/add_messege_chat.php`, formData, { headers })
    .then((resp) => {
      const errorCode = resp?.data.error;
      if (errorCode === 0) {
        return resp;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errors[errorCode] ?? "Помилка");
        return resp;
      }
    })
    .catch((error) => console.log(error));
};

export const getInfoObject = async (id_object_hash: string, type: string) => {
  const folder = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}/get_info_object.php`,
      { folder, id_object_hash, type },
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data.error;
      if (errorCode === 0) {
        return resp;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errors[errorCode] ?? "Помилка");
        return resp;
      }
    })
    .catch((error) => console.log(error));
};
