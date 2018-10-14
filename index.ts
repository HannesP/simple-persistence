import { Entity, EntityState, addEntity } from "./lib/Entity";
import { Repository } from "./lib/Repository";
import uuid from "uuid";

abstract class MessageRepository extends Repository<Message> {}

class InMemoryMessageRepository extends MessageRepository {
  private table: { [key: string]: MessageState } = {};

  async fetchById(id: string) {
    const state = this.table[id];
    return state == null ? undefined : new Message(state);
  }

  async persist(message: Message) {
    const id = message.id || uuid.v4();
    this.table[id] = message.state;
    return true;
  }
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
