import Auth from "@aws-amplify/auth"

export const getCognitoID = async () => {
    const cognitoId = (await Auth.currentAuthenticatedUser()).pool.clientId
    return cognitoId
}