import { ChatApi } from "@/infrastructure/api/ChatApi";

export function createChatApi(): ChatApi {
    return new ChatApi();
}