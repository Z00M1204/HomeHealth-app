import Auth from "@aws-amplify/auth"
import { DataStore } from "@aws-amplify/datastore";
import { UserInfo } from "../models";

export const getUsername = async () => {
    const userinf = await DataStore.query(UserInfo);
    return userinf[0].Username !== undefined ? userinf[0].Username : 'error in retrievel of username'
}