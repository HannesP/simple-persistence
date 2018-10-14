import clone from "clone";

export interface EntityState {
  id?: string;
}

export interface EntityEvent {
  type: string;
}

export class Entity<StateT extends EntityState, EventT = EntityEvent> {
  readonly initialState: StateT;
  readonly events: EventT[] = [];

  constructor(readonly state: StateT) {
    this.initialState = clone(state);
  }

  get id(): string | undefined {
    return this.state.id;
  }

  protected cloneState(state: StateT): StateT {
    return clone(state);
  }

  protected recordEvent(event: EventT) {
    this.events.push(event);
  }
}

export function addEntity<StateT, EntityT extends Entity<StateT>>(
  arr: StateT[],
  entity: EntityT
) {
  arr.push(entity.state);
}
