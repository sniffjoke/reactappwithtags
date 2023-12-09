import React, {FC, useContext, useEffect} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {SiSharp} from "react-icons/si";
import {CiLogout} from "react-icons/ci";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header: FC = () => {
    const navigation = [
        {name: 'Главная', href: '/', current: true},
        {name: 'Войти', href: 'login', current: false},
        {name: 'Регистрация', href: 'register', current: false}
    ]

    const navigate = useNavigate()

    const {store} = useContext(Context)

    const onLogout = async () => {
        await store.logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between p-4">
                <div>
                    <Link
                        to="http://localhost:3000/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <span className={'text-emerald-500 text-3xl'}><SiSharp/></span>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                        >
                        ReactAppTags
                    </span>
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <div
                        className="flex justify-between items-center p-4 md:p-0 font-medium rounded-lg bg-inherit dark:border-gray-700">
                        {navigation.map((item) => (
                            <NavLink
                                to={item.href}
                                key={item.name}
                                className={
                                    ({isActive}) => (
                                        isActive
                                            ?
                                            'w-28 text-center bg-emerald-500 text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
                                            :
                                            'w-28 text-center px-3 py-2 rounded-md text-sm font-medium text-emerald-500 hover:bg-green-200 hover:text-indigo-600')
                                }
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="flex items-center">
                    <div
                        className={'flex justify-between items-center p-4 md:p-0 font-medium rounded-lg bg-inherit dark:border-gray-700'}
                    >
                        <div className={'text-emerald-500 text-2xl'}>
                            <CiLogout/>
                        </div>
                        <div>
                            <NavLink
                                to={'login'}
                                className={'w-28 text-center bg-emerald-500 text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'}
                                onClick={onLogout}
                            >
                                Выйти
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default observer(Header);
