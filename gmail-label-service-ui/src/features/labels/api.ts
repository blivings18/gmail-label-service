import axios from "axios";
import { Label, LabelFormValues } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/label",
});

export const fetchLabels = async (): Promise<Label[]> => {
  const { data } = await api.get("");
  return data;
};

export const createLabel = async ({
  name,
  type,
  labelListVisibility,
  messageListVisibility,
}: LabelFormValues) => {
  const { data } = await api.post("", {
    name,
    type,
    labelListVisibility,
    messageListVisibility,
  });
  return data;
};

export const updateLabel = async ({
  id,
  name,
  type,
  labelListVisibility,
  messageListVisibility,
}: LabelFormValues & { id: string }) => {
  const { data } = await api.put(`${id}`, {
    name,
    type,
    labelListVisibility,
    messageListVisibility,
  });
  return data;
};

export const deleteLabel = async ({ id }: { id: string }) => {
  await api.delete(`${id}`);
};
