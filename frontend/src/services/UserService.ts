import $api from "../interceptors";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/users/me')
    }

    static async addNote(text: string, tagsArray: string[]) {
        return $api.post('/goals', {text, tagsArray})
    }
}
