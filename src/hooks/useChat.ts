import { useCallback, useState } from "react";

import { createSendConversationUseCase } from "@/application/usecases/createSendConversationUseCase";
import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

/**
 * Custom React hook that manages chat conversation state, message history,
 * loading states, and error handling for user interaction with the assistant.
 *
 * @returns An object containing the current `messages` history array, `isLoading` indicator, `error` string state, and the `sendMessage` function.
 */
export function useChat() {
    const [messages, setMessages] = useState<readonly Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendConversationUseCase = createSendConversationUseCase();

    /**
     * Appends a new user message to the conversation history and sends the entire sequence to the assistant service.
     * Updates local state with the user message and the generated assistant response.
     *
     * @param content The raw text content of the message to be sent by the user.
     * @returns A promise that resolves when the transmission and state update sequence completes.
     */
    const sendMessage = useCallback(
        async (content: string): Promise<void> => {
            setIsLoading(true);
            setError(null);

            try {
                const userMessage = new Message(
                    crypto.randomUUID(),
                    MessageRole.USER,
                    content,
                );

                const history = [...messages, userMessage];

                setMessages(history);

                const assistantMessage =
                    await sendConversationUseCase.execute(history);

                setMessages([
                    ...history,
                    assistantMessage,
                ]);
            } catch {
                setError("Unable to communicate with the assistant.");
            } finally {
                setIsLoading(false);
            }
        },
        [messages, sendConversationUseCase],
    );

    return {
        messages,
        isLoading,
        error,
        sendMessage,
    };
}