import { useCallback, useState } from "react";

import { createSendConversationUseCase } from "@/application/usecases/createSendConversationUseCase";
import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

export function useChat() {
    const [messages, setMessages] = useState<readonly Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendConversationUseCase = createSendConversationUseCase();

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