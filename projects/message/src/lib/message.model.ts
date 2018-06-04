export class Message {
  msgCat: string;
  msgName: string;
  msgType: messageType;
  msgShortText: string;
  msgLongText: string;
  showLongText: boolean;
}

export enum messageType {
  Error = 'E',
  Warning = 'W',
  Success = 'S',
  Information = 'I',
  Exception = 'X',
}
