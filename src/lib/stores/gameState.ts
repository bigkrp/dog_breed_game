export type GameStage = 'answer' | 'question' | 'final'

export interface GameState {
    readonly maxAttempts: number
    readonly attempt: number
    readonly stage: GameStage
}

export const getDefaultGameState = (maxAttempts: number): GameState => ({
    maxAttempts,
    attempt: 1,
    stage: 'question',
})

type GetCustomGameStateArgs = Pick<GameState, 'maxAttempts'> &
    Partial<Pick<GameState, 'attempt' | 'stage'>>

export const getCustomGameState = ({
    maxAttempts,
    attempt,
    stage,
}: GetCustomGameStateArgs): GameState => ({
    maxAttempts: maxAttempts,
    attempt: attempt ?? 0,
    stage: stage ?? 'question',
})

export const getNextGameState = (gameState: GameState): GameState => {
    if (gameState.attempt == gameState.maxAttempts && gameState.stage === 'answer') {
        return {
            ...gameState,
            attempt: gameState.maxAttempts,
            stage: 'final',
        }
    }

    if (gameState.stage === 'question') {
        return {
            ...gameState,
            stage: 'answer',
        }
    }

    return {
        ...gameState,
        stage: 'question',
        attempt: gameState.attempt + 1,
    }
}
