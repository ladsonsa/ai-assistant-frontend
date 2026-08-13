import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "../api/ChatApi";
import { ChatMessageDto, ChatRequestDto } from "../api/dto/ChatDto";

/**
 * Concrete implementation of the {@link ChatRepository} interface that relies on
 * the HTTP {@link ChatApi} to send conversation histories and map assistant responses.
 */
export class HttpChatRepository implements ChatRepository {
  /** The HTTP API client instance used to handle network operations. */
  private readonly chatApi: ChatApi;

  /**
   * Constructs a new {@link HttpChatRepository} instance.
   *
   * @param chatApi The HTTP API client handling underlying network communications.
   */
  constructor(chatApi: ChatApi) {
    this.chatApi = chatApi;
  }

  /**
   * Transforms domain message entities and their associated metadata into DTO payloads,
   * sends the history via {@link ChatApi.sendConversation}, and maps the returned response
   * into a new assistant {@link Message} domain entity.
   *
   * @param history The immutable list of historical domain {@link Message} entities to transmit.
   * @returns A promise resolving to the generated assistant {@link Message} domain entity.
   */
  public async sendConversation(
    history: readonly Message[]
  ): Promise<Message> {
    const chatMessageDtos: ChatMessageDto[] = history.map((message) => ({
      role: message.role === MessageRole.USER ? "user" : "assistant",
      content: message.content,
      metadata: message.metadata,
    }));

    const requestDto: ChatRequestDto = { history: chatMessageDtos };
    const responseDto = await this.chatApi.sendConversation(requestDto);

    return new Message(
      crypto.randomUUID(),
      MessageRole.ASSISTANT,
      responseDto.content,
      responseDto.metadata
    );
  }
}