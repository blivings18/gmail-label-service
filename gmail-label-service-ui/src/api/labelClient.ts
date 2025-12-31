import axios from "axios";

export interface Label {
  id: string;
  name: string;
  type: string;
  labelListVisibility: string | null;
  messageListVisibility: string | null;
}

const BASE = "http://localhost:8080/api/v1/label";

export const fetchLabels = async (): Promise<Label[]> => {
  const res = await axios.get(BASE);
  return res.data;
};

export const createLabel = async (
  name: string,
  type: string,
  labelListVisibility: string | null,
  messageListVisibility: string | null
): Promise<Label> => {
  const res = await axios.post(BASE, {
    name,
    type,
    labelListVisibility,
    messageListVisibility,
  });
  return res.data;
};

export const updateLabel = async (
  id: string,
  name: string,
  type: string,
  labelListVisibility: string | null,
  messageListVisibility: string | null
): Promise<Label> => {
  const res = await axios.put(`${BASE}/${id}`, {
    name,
    type,
    labelListVisibility,
    messageListVisibility,
  });
  return res.data;
};

export const deleteLabel = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`);
};
