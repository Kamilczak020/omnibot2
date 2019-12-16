export interface IHandlingContext {
  color: string;
  title: string;
  description: string;
  fields?: [{
    name: string,
    value: string,
    inline: boolean,
  }];
}
