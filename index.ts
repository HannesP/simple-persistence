import { Entity, EntityState } from "./lib/Entity";

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
