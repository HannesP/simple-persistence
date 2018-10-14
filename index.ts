import * as clone from "clone";

interface EntityState {
  id?: string;
}

class Entity<StateT extends EntityState> {
  readonly initialState: StateT;

  constructor(readonly state: StateT) {
    this.initialState = clone(state);
  }

  protected cloneState(state: StateT) {
    return clone(state);
  }
}

function addEntity<StateT, EntityT extends Entity<StateT>>(
  list: StateT[],
  entity: EntityT
) {
  list.push(entity.state);
}

interface AttachmentState extends EntityState {
  size: number;
  opened: boolean;
  filename: string;
}

interface MessageState extends EntityState {
  senderId: string;
  receivedId: string;
  attachments: AttachmentState[];
}

class Attachment extends Entity<AttachmentState> {}

class Message extends Entity<MessageState> {
  get attachments() {
    return this.state.attachments.map(state => new Attachment(state));
  }

  addAttachment(attachment: Attachment) {
    addEntity(this.state.attachments, attachment);
  }
}
