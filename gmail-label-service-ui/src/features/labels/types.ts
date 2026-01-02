export interface Label {
  id: string;
  name: string;
  type: string;
  labelListVisibility?: string;
  messageListVisibility?: string;
}

export interface LabelFormValues {
  name: string;
  type: string;
  labelListVisibility: string;
  messageListVisibility: string;
}
