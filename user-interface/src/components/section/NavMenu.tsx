import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
    ChevronDownIcon,
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
            <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 focus:outline-none transition">
                <span>{name}</span>
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
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-100 shadow-lg focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/"
                                    className={`${
                                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                                    } flex items-center gap-2 px-4 py-2 text-sm transition`}
                                >
                                    <DocumentTextIcon className="w-4 h-4" />
                                    <span>Sections</span>
                                </Link>
                            )}
                        </Menu.Item>
                        <div className="border-t border-gray-100 my-1" />
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logOut}
                                    className={`${
                                        active ? 'bg-red-50 text-red-600' : 'text-red-500'
                                    } flex items-center gap-2 w-full px-4 py-2 text-sm transition`}
                                >
                                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
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
