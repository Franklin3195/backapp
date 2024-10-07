export interface IAttachment {
  encoding: 'base64';
  filename: string;
  content: string; // base64 value
  contentType: 'text/plain' | 'application/pdf' | 'image/gif';
}
