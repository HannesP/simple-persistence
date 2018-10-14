import { Repository } from "../lib/Repository";
import { Message } from "./Message";

export abstract class MessageRepository extends Repository<Message> {
}
