import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "../api/ChatApi";
import { ChatMessageDto, ChatRequestDto } from "../api/dto/ChatDto";

/**
 * Concrete implementation of the {@link ChatRepository} interface that uses
 * the HTTP {@link ChatApi} to transmit conversation histories and receive responses.
 */
export class HttpChatRepository implements ChatRepository {
  /** The HTTP API client instance used to make backend network calls. */
  private readonly chatApi: ChatApi;

  /**
   * Constructs a new {@link HttpChatRepository} instance.
   *
   * @param chatApi The API client instance handling network communication.
   */
  constructor(chatApi: ChatApi) {
    this.chatApi = chatApi;
  }

  /**
   * Maps domain message entities to DTO format, sends the conversation history
   * over HTTP via {@link ChatApi}, and returns the assistant's reply as a new {@link Message} entity.
   *
   * @param history The immutable list of historical domain {@link Message} entities to transmit.
   * @returns A promise resolving to the generated assistant {@link Message} entity.
   */
  public async sendConversation(
    history: readonly Message[]
  ): Promise<Message> {
    const chatMessageDtos: ChatMessageDto[] = history.map((message) => ({
      role: message.role === MessageRole.USER ? "user" : "assistant",
      content: message.content,
      metadata: {},
    }));

    const requestDto: ChatRequestDto = { history: chatMessageDtos };
    const responseDto = await this.chatApi.sendConversation(requestDto);

    return new Message(
      crypto.randomUUID(),
      MessageRole.ASSISTANT,
      responseDto.content,
      {}
    );
  }
}