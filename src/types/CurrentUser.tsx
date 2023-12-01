export interface CurrentUser {
    uid: string,
    name: string,
    nick: string,
    email: string,
    password: string,
    photoUrl: string,
    transport: string[]
}