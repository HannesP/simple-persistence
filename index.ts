import { InMemoryMessageRepository } from "./app/InMemoryMessageRepository";
import { MessageRepository } from "./app/MessageRepository";
import { Message, Attachment } from "./app/Message";

async function start() {
  const messageRepository: MessageRepository = new InMemoryMessageRepository();

  const message = Message.from("Hannes", "Sofia");
  message.addAttachment(Attachment.from(23423, "image.png"));

  const id = await messageRepository.persist(message);
  const revived = await messageRepository.fetchById(id);

  console.log(revived);
}

start();
