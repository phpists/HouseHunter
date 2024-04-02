import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getIdFromUrl, handleToFormData } from "../helpers";
import { errors } from "../constants/errors";
import cogoToast from "cogo-toast";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const getNewSelections = async (page: number, perPage?: number) => {
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        mod: "notepad_client",
        action: "view_folder_client",
        item_on_page: 20,
      }),
      { headers }
    )
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const rate = async (like: number, id: string, type: string) => {
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        mod: "notepad_client",
        action: "add_choise_to_object",
        choise: like,
        id_object: id,
      }),
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data?.error;
      const errorMessege = resp?.data.messege;

      if (errorCode === 0) {
        return errorCode;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errorMessege ?? errors[errorCode] ?? "Помилка");
        return errorCode;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getHistory = async (page: number, like?: number) => {
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        mod: "notepad_client",
        action: "view_folder_client_choise_object",
        item_on_page: 20,
        current_page: page,
      }),
      { headers }
    )
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const getRieltor = async () => {
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        mod: "system_info",
        action: "get_info_agency",
      }),
      { headers }
    )
    .then((resp) => resp)
    .catch((error) => console.log(error));
};

export const getChat = async () => {
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        mod: "notepad_chat_client",
        action: "show_chat",
      }),
      { headers }
    )
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
  const id_request_group = getIdFromUrl();
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_request_group,
        action: "add_messege_to_chat_client",
        mod: "notepad_chat_client",
        ...(messege ? { messege } : {}),
        ...(show_object ? { show_object } : {}),
        ...(file ? { img: file } : {}),
        ...(id_parent ? { id_parent } : {}),
      }),
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data.error;
      if (errorCode === 0) {
        return "success";
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(
          // @ts-ignore: Unreachable code error
          errors[errorCode]
            ? // @ts-ignore: Unreachable code error
              errors[errorCode]
            : resp?.data?.messege ?? "Помилка"
        );
        return null;
      }
    })
    .catch((error) => console.log(error));
};

export const getInfoObject = async (id_hash: string, type: string) => {
  const id_request_group = getIdFromUrl();

  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        id_object: id_hash,
        mod: "notepad_client",
        action: "get_info_object",
        id_request_group,
      }),
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data.error;
      const errorMessege = resp?.data.messege;

      if (errorCode === 0) {
        return resp;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errorMessege ?? errors[errorCode] ?? "Помилка");
        return resp;
      }
    })
    .catch((error) => console.log(error));
};

export const getPhonesCodes = async () => {
  return axios
    .post(
      `${baseUrl}`,
      handleToFormData({
        mod: "system_info",
        action: "get_phone_codes",
      }),
      { headers }
    )
    .then((resp) => {
      const errorCode = resp?.data.error;
      const errorMessege = resp?.data.messege;

      if (errorCode === 0) {
        return resp;
      } else {
        // @ts-ignore: Unreachable code error
        cogoToast.error(errorMessege ?? errors[errorCode] ?? "Помилка");
        return resp;
      }
    })
    .catch((error) => console.log(error));
};
