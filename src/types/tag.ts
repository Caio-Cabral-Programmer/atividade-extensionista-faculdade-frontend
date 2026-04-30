export interface ITag {
  tagId: string;
  name: string;
  color: string;
}

export interface ICreateTagRequest {
  name: string;
  color: string;
}

export interface IUpdateTagRequest {
  name: string;
  color: string;
}
