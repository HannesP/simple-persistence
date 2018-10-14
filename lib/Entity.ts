import clone from "clone";

export interface EntityState {
  id?: string;
}

export class Entity<StateT extends EntityState> {
  readonly initialState: StateT;

  constructor(readonly state: StateT) {
    this.initialState = clone(state);
  }

  get id(): string | undefined {
    return this.state.id;
  }

  protected cloneState(state: StateT): StateT {
    return clone(state);
  }
}

export function addEntity<StateT, EntityT extends Entity<StateT>>(
  arr: StateT[],
  entity: EntityT
) {
  arr.push(entity.state);
}
