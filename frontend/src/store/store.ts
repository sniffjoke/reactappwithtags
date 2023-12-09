import {IUser} from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import {API_URL} from "../interceptors";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
// import axios from "axios";
// import {AuthResponse} from "../models/response/AuthResponse";
// import {API_URL} from "../interceptors";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async registration(name: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(name, email, password)
            console.log(response)
            localStorage.setItem('accessToken', response.data.tokens.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('accessToken', response.data.tokens.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }

    async addNote(text: string, tagsArray: string[]) {
        try {
            await UserService.addNote(text, tagsArray)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('accessToken', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }
}
