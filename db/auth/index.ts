const refreshTokens = new Set<string>();

export function addRefreshToken(token: string) {
    refreshTokens.add(token);
}

export function refreshTokenExists(token: string) {
    return refreshTokens.has(token);
}

export function removeRefreshToken(token: string) {
    refreshTokens.delete(token);
}
