import React, {FC, useContext, useState} from 'react';
import {FaUser} from "react-icons/fa";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {SiSharp} from "react-icons/si";
import {toast} from "react-toastify";

const RegisterForm: FC = () => {
        const [name, setName] = useState<string>('')
        const [email, setEmail] = useState<string>('')
        const [password, setPassword] = useState<string>('')
        const [confirmPassword, setConfirmPassword] = useState<string>('')

        const {store} = useContext(Context)


        const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
            e.preventDefault()
            if (password === confirmPassword) {
                try {
                    await store.registration(name, email, password)
                } catch (e) {
                    const error = e as Error
                    toast.error(error.message)
                }
            } else {
                toast.error('Пароли должны совпадать')
            }
        }


        return (
            <>
                {
                    store.isAuth
                        ?
                        <section className={'flex justify-center'}>
                            <div className={'pt-10'}>
                                <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                                    <SiSharp/>&nbsp;Вы авторизованы:&nbsp;
                                    <Link to={'/'} className={'text-bold underline'}>Перейти на главную</Link>
                                </h1>
                                <div role="status" className={'flex justify-center'}>
                                    <svg aria-hidden="true"
                                         className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </section>
                        :
                        <>
                            <section className={'flex justify-center'}>
                                <div className={'pt-10'}>
                                    <h1 className={'flex justify-center text-3xl font-serif text-indigo-600'}>
                                        <FaUser/>&nbsp;Регистрация
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
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Ваше Имя
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Имя"
                                            required
                                        />
                                    </div>

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

                                    <div className="mb-5">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Введите пароль еще раз
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        Зарегистрироваться
                                    </button>
                                </form>
                            </section>
                        </>
                }
            </>
        );
    }
;

export default observer(RegisterForm);
