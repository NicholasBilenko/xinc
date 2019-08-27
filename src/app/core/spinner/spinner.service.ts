import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {
  private activationsCount = 0;
  private activatedState = new Subject<boolean>();

  start(): void {
    this.activationsCount++;
    this.updateState();
  }

  stop(): void {
    if (this.isActivated()) {
      this.activationsCount--;
      this.updateState();
    }
  }

  get activated(): Observable<boolean> {
    return this.activatedState;
  }

  private isActivated(): boolean {
    return this.activationsCount > 0;
  }

  private updateState(): void {
    this.activatedState.next(this.isActivated());
  }
}
