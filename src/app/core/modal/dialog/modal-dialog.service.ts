import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { ModalDialog } from './modal-dialog.model';

@Injectable()
export class ModalDialogService {
  private state = new BehaviorSubject<ModalDialog>(null);

  open(dialog: ModalDialog): void {
    this.state.next(dialog);
  }

  close(): void {
    this.state.next(null);
  }

  onStateChanged(listener: (dialog: ModalDialog) => void): Subscription {
    return this.state.subscribe(listener);
  }
}
