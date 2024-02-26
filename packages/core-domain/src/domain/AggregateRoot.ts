import { DomainEvents, IDomainEvent } from "./DomainEvents";
import { Entity } from "./Entity";
import { ID } from "./ID";

export abstract class AggregateRoot<T extends object> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): ID<string | number> {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
    DomainEvents.registerEvent(this);
    this.logDomainEventAdded(event);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      "==>",
      domainEventClass.constructor.name,
    );
  }
}
