import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
    ChevronDownIcon,
    UserCircleIcon,
    DocumentTextIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

type NavMenuProps = { name: string };

export default function NavMenu({ name }: NavMenuProps) {
    const queryClient = useQueryClient();
    const logOut = () => {
        localStorage.removeItem('IntelligTestToken');
        queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* Trigger: modern rectangular button */}
            <Menu.Button className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none transition">
                <UserCircleIcon className="w-5 h-5" />
                <span className="font-medium">{name}</span>
                <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/profile"
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-800'
                                    } flex items-center px-4 py-2 space-x-2 text-sm transition`}
                                >
                                    <UserCircleIcon className="w-5 h-5" />
                                    <span>Profile</span>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/sections"
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-800'
                                    } flex items-center px-4 py-2 space-x-2 text-sm transition`}
                                >
                                    <DocumentTextIcon className="w-5 h-5" />
                                    <span>Sections</span>
                                </Link>
                            )}
                        </Menu.Item>
                        <div className="border-t border-gray-200 my-1" />
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logOut}
                                    className={`${
                                        active ? 'bg-gray-100 text-red-600' : 'text-red-500'
                                    } flex items-center w-full px-4 py-2 space-x-2 text-sm transition`}
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>Log out</span>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
