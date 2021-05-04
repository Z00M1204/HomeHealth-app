export type RootStackParams = {
    Main: undefined,
    SignIn: undefined,
    SignUp: undefined,
    ConfirmUser: {
        username: string,
        password: string
    } | undefined,
}
