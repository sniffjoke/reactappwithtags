import React, {useContext, useEffect, useState} from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
            navigate('/')
        }

    }, [store.isAuth])

    const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        await store.login(email, password)
    }

    return (
        <>
            <section className={'flex justify-center'}>
                <div className={'pt-10'}>
                    <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                        <FaSignInAlt/>&nbsp;Войдите
                    </h1>
                    <div className={'py-5'}>
                        <p className={'font-sans'}>Пожалуйста, заполните все поля</p>
                    </div>
                </div>

            </section>
            <section>
                <form className="max-w-sm mx-auto" onSubmit={onFormSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Ваш Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Введите пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={'Пароль'}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-black bg-indigo-500 font-medium rounded-lg text-sm w-full sm:w-[200px] px-5 py-2.5 text-center
                    hover:bg-indigo-700
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                    >
                        Войти
                    </button>
                </form>
            </section>
        </>
    );
};

export default observer(LoginForm);
