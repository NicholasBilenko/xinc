export interface ModalDialog {
  actions: ModalDialogAction[];
  content: string;
  header?: string;
  imgUrl?: string;
  styleClasses?: {
    [className: string]: string;
  };
}

export class ModalDialogAction {
  constructor(
    public titleKey: string,
    public callback: () => void,
    public main: boolean = false
  ) {}
}
