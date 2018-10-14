import { InMemoryMessageRepository } from "./app/InMemoryMessageRepository";
import { MessageRepository } from "./app/MessageRepository";
import { Message, Attachment } from "./app/Message";

const messageRepository: MessageRepository = new InMemoryMessageRepository();

const message = Message.from("Hannes", "Sofia");
message.addAttachment(Attachment.from(23423, "image.png"));
messageRepository.persist(message);

