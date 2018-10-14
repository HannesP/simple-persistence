import { EntityState, Entity, addEntity } from "../lib/Entity";

interface AttachmentState extends EntityState {
  size: number;
  opened: boolean;
  filename: string;
}

export interface MessageState extends EntityState {
  senderId: string;
  receiverId: string;
  attachments: AttachmentState[];
}

export class Attachment extends Entity<AttachmentState> {
  static from(size: number, filename: string) {
    return new Attachment({
      size,
      filename,
      opened: false
    });
  }

  get size() {
    return this.state.size;
  }
}

export class Message extends Entity<MessageState> {
  static from(senderId: string, receiverId: string) {
    return new Message({
      senderId,
      receiverId,
      attachments: []
    });
  }

  get attachments() {
    return this.state.attachments.map(state => new Attachment(state));
  }

  addAttachment(attachment: Attachment) {
    if (attachment.size < 1024*1024) {
      addEntity(this.state.attachments, attachment);
    }
  }
}
