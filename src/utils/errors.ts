export const ERROR_MESSAGE_FALLBACK = 'Unknown error'

interface ErrorWithResponse {
    response?: {
        data?: Record<string, string | undefined>
    }
}

export function getErrorMessages(error: unknown): string {
    const maybeResponse = (error as ErrorWithResponse).response
    const maybeData = maybeResponse?.data

    if (!maybeData || typeof maybeData !== 'object' || Array.isArray(maybeData)) {
        return ERROR_MESSAGE_FALLBACK
    }

    const messages = Object.values(maybeData).filter(
        (msg): msg is string => typeof msg === 'string' && msg.trim().length > 0
    )

    return messages.length > 0 ? messages.join('. ') : ERROR_MESSAGE_FALLBACK
}
