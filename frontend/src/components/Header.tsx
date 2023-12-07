import React, {FC} from 'react';
import {Link, NavLink} from "react-router-dom";
import {SiSharp} from "react-icons/si";
import {HiMiniViewfinderCircle} from "react-icons/hi2";

const Header: FC = () => {
    const navigation = [
        {name: 'Главная', href: '/', current: true},
        {name: 'Войти', href: 'login', current: false},
        {name: 'Регистрация', href: 'register', current: false}
    ]

    return (


        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="http://localhost:3000/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className={'text-emerald-500 text-3xl'}><SiSharp/></span>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >
                        ReactAppTags
                    </span>
                </Link>
                <div className="flex md:order-2">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <HiMiniViewfinderCircle/>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Поиск..."
                        />
                    </div>
                    <button data-collapse-toggle="navbar-search" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <div
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
            </div>
        </nav>

    );
};

export default Header;
