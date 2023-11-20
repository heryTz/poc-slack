import { OmitType } from '@nestjs/swagger';
import { CreateMessageInput } from './create-message.input';

export class TypingMessageInput extends OmitType(CreateMessageInput, [
  'content',
] as const) {}
