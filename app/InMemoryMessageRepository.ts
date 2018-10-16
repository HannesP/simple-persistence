import { MessageRepository } from "./MessageRepository";
import { Message, MessageState } from "./Message";
import uuid from "uuid";

export class InMemoryMessageRepository extends MessageRepository {
  private table: { [key: string]: MessageState } = {};

  async fetchById(id: string) {
    const state = this.table[id];
    return state == null ? undefined : new Message(state);
  }

  async persist(message: Message) {
    const id = message.id || uuid.v4();
    message.state.id = id;
    this.table[id] = message.state;
  }
}
