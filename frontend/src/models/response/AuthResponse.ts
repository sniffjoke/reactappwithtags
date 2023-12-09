import {IUser} from "../IUser";

type tokensResponse = {
    accessToken: string
    refreshToken?: string
}

export interface AuthResponse {
    tokens: tokensResponse
    user: IUser
}
