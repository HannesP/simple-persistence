import * as clone from "clone";

export interface EntityState {
  id?: string;
}

export class Entity<StateT extends EntityState> {
  readonly initialState: StateT;

  constructor(readonly state: StateT) {
    this.initialState = clone(state);
  }

  protected cloneState(state: StateT) {
    return clone(state);
  }
}
