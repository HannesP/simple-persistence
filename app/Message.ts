import { EntityState, Entity, addEntity } from "../lib/Entity";

interface AttachmentState extends EntityState {
  id: string;
  size: number;
  opened: boolean;
  filename: string;
}

export interface MessageState extends EntityState {
  senderId: string;
  receiverId: string;
  attachments: AttachmentState[];
}

type MessageEvent = {
  type: 'ATTACHMENT_OPENED'
  attachmentId: string,
} | {
  type: 'ATTACHMENT_REJECTED',
  attachmentId: string,
  reason: 'TOO_LARGE' | 'DUPLICATE';
}

export class Attachment extends Entity<AttachmentState> {
  static from(id: string, size: number, filename: string) {
    return new Attachment({
      id,
      size,
      filename,
      opened: false
    });
  }

  get id() {
    return this.state.id;
  }

  get size() {
    return this.state.size;
  }

  open() {
    this.state.opened = true;
  }
}

export class Message extends Entity<MessageState, MessageEvent> {
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
    const ids = this.attachments.map(att => att.id);
    if (ids.indexOf(attachment.id) !== -1) {
      return this.recordEvent({
        type: 'ATTACHMENT_REJECTED',
        attachmentId: attachment.id,
        reason: 'DUPLICATE'
      });
    }

    if (attachment.size >= 1024 * 1024) {
      return this.recordEvent({
        type: 'ATTACHMENT_REJECTED',
        attachmentId: attachment.id,
        reason: 'TOO_LARGE'
      });
    }

    addEntity(this.state.attachments, attachment);
  }

  openAttachment(id: string) {
    const attachment = this.attachments.find(att => att.id === id);
    if (attachment) {
      attachment.open();
      this.recordEvent({
        type: 'ATTACHMENT_OPENED',
        attachmentId: id
      });
    }
  }
}
