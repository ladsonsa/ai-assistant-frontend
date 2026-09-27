import { useCallback, useMemo, useState } from "react";

import { sendConversationUseCase } from "@/application/container";
import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

/**
 * Interface representing a chat conversation record.
 */
interface Conversation {
    /** Unique identifier for the conversation. */
    readonly id: string;

    /** Display title for the conversation history entry. */
    readonly title: string;
}

/**
 * Type map associating unique conversation IDs to their respective message histories.
 */
type ConversationMessages = Readonly<Record<string, readonly Message[]>>;

/**
 * Return type interface for the {@link useChat} hook.
 */
interface UseChatReturn {
    /** Available conversation sessions. */
    readonly conversations: readonly Conversation[];

    /** The active message history for the currently selected conversation. */
    readonly messages: readonly Message[];

    /** The unique identifier of the currently selected active conversation. */
    readonly currentConversationId: string;

    /** Indicates whether a request to the assistant is in flight. */
    readonly isLoading: boolean;

    /** Error message string if the transmission fails, or null otherwise. */
    readonly error: string | null;

    /** Sends a user message to the active conversation session. */
    readonly sendMessage: (content: string) => Promise<void>;

    /** Creates a new conversation session entry and selects it as active. */
    readonly createConversation: (conversationId: string) => void;

    /** Changes the currently active conversation to the specified ID. */
    readonly selectConversation: (conversationId: string) => void;

    /** Deletes a specific conversation and its message history. */
    readonly deleteConversation: (conversationId: string) => void;

    /** Clears all stored conversation histories and resets active state. */
    readonly clearConversations: () => void;
}

/**
 * Custom React hook managing multi-conversation chat state, message history mapping,
 * active conversation selection, loading indicators, error handling, and invocation of the conversation use case.
 *
 * @returns An object conforming to {@link UseChatReturn} with state properties and action handlers.
 */
export function useChat(): UseChatReturn {
    const [conversations, setConversations] = useState<
        readonly Conversation[]
    >([
        {
            id: "1",
            title: "Conversa principal",
        },
    ]);

    const [conversationMessages, setConversationMessages] =
        useState<ConversationMessages>({
            "1": [],
        });

    const [currentConversationId, setCurrentConversationId] =
        useState<string>("1");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messages = useMemo(
        () => conversationMessages[currentConversationId] ?? [],
        [conversationMessages, currentConversationId],
    );

    /**
     * Initializes a new conversation and selects it as active.
     *
     * @param conversationId The unique identifier for the new conversation session.
     */
    const createConversation = useCallback(
        (conversationId: string): void => {
            setConversations((previous) => [
                {
                    id: conversationId,
                    title: `Conversa ${previous.length + 1}`,
                },
                ...previous,
            ]);

            setConversationMessages((previous) => ({
                ...previous,
                [conversationId]: [],
            }));

            setCurrentConversationId(conversationId);
            setError(null);
        },
        [],
    );

    /**
     * Sets the active conversation pointer to the provided ID.
     *
     * @param conversationId The unique identifier of the target conversation.
     */
    const selectConversation = useCallback(
        (conversationId: string): void => {
            setCurrentConversationId(conversationId);
            setError(null);
        },
        [],
    );

    /**
     * Removes a conversation and its message history.
     *
     * If the deleted conversation is active, the first remaining conversation
     * becomes active. If no conversations remain, the active ID is cleared.
     *
     * @param conversationId The unique identifier of the conversation to remove.
     */
    const deleteConversation = useCallback(
        (conversationId: string): void => {
            setConversations((previous) => {
                const updated = previous.filter(
                    (conversation) =>
                        conversation.id !== conversationId,
                );

                setCurrentConversationId((currentId) => {
                    if (currentId !== conversationId) {
                        return currentId;
                    }

                    return updated[0]?.id ?? "";
                });

                return updated;
            });

            setConversationMessages((previous) => {
                const updated = { ...previous };

                delete updated[conversationId];

                return updated;
            });

            setError(null);
        },
        [],
    );

    /**
     * Clears all stored conversations and resets active state.
     */
    const clearConversations = useCallback((): void => {
        setConversations([]);
        setConversationMessages({});
        setCurrentConversationId("");
        setError(null);
    }, []);

    /**
     * Sends a new message in the context of the current active conversation,
     * updates local message history, and appends the assistant's response.
     *
     * @param content The plain text message content.
     * @returns A promise that resolves when the message pipeline finishes.
     */
    const sendMessage = useCallback(
        async (content: string): Promise<void> => {
            if (!currentConversationId) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userMessage = new Message(
                    crypto.randomUUID(),
                    MessageRole.USER,
                    content,
                );

                const history = [
                    ...messages,
                    userMessage,
                ];

                setConversationMessages((previous) => ({
                    ...previous,
                    [currentConversationId]: history,
                }));

                const assistantMessage =
                    await sendConversationUseCase.execute(history);

                setConversationMessages((previous) => ({
                    ...previous,
                    [currentConversationId]: [
                        ...history,
                        assistantMessage,
                    ],
                }));
            } catch {
                setError(
                    "Unable to communicate with the assistant.",
                );
            } finally {
                setIsLoading(false);
            }
        },
        [
            currentConversationId,
            messages,
        ],
    );

    return {
        conversations,
        messages,
        currentConversationId,
        isLoading,
        error,
        sendMessage,
        createConversation,
        selectConversation,
        deleteConversation,
        clearConversations,
    };
}