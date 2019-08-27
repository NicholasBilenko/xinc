import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class SubscriptionHelperComponent implements OnDestroy {
  protected readonly subscriptions: Subscription[] = [];

  protected addSubscription(...subscription: Subscription[]): void {
    this.subscriptions.push(...subscription);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.splice(0, this.subscriptions.length);
  }
}
