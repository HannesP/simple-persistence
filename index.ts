import { InMemoryMessageRepository } from "./app/InMemoryMessageRepository";
import { MessageRepository } from "./app/MessageRepository";
import { Message, Attachment } from "./app/Message";

async function start() {
  const messageRepository: MessageRepository = new InMemoryMessageRepository();

  const message = Message.from("Hannes", "Sofia");
  message.addAttachment(Attachment.from("att_923478", 23423, "image.png"));
  message.openAttachment("att_923478");

  const id = await messageRepository.persist(message);
  const revived = await messageRepository.fetchById(id);

  if (revived == null) {
    console.log("Not found");
  } else {
    console.log(revived.attachments);
  }
}

start();
