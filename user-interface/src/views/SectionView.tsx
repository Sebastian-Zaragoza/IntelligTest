import {Link} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {getSections} from "../api/SectionApi.ts";

function DashboardView() {
    const {data, isLoading} = useQuery({
        queryKey: ['sections'],
        queryFn: getSections
    })
    /**const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: deleteProject,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projects']})
        }
    })**/
    if(isLoading)return
    if (data) return (
        <div className="max-w-screen-2xl mx-auto w-full space-y-8 px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My sections</h1>
                    <p className="mt-1 text-gray-500">Manage your notes by sections</p>
                </div>
                <Link
                    to="/sections/create"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold
                   px-5 py-2 rounded-lg shadow-sm transition"
                >
                    New Section
                </Link>
            </div>

            {data.length > 0 ? (
                <ul
                    role="list"
                    className="grid w-full gap-6
                   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {data.map((section) => (
                        <li
                            key={section._id}
                            className="flex flex-col justify-between bg-white rounded-lg shadow
                       p-6 hover:shadow-lg transition w-full"
                        >
                            <div>
                                <Link
                                    to={`/sections/${section._id}/upload`}
                                    className="block text-xl font-semibold text-gray-800 hover:text-gray-900"
                                >
                                    {section.name}
                                </Link>
                                <p className="mt-2 text-gray-600 text-sm">{section.description}</p>
                                <p className="mt-1 text-gray-500 text-xs">{section.subject}</p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Menu as="div" className="relative">
                                    <Menu.Button
                                        className="p-2 rounded-full text-gray-500 hover:text-gray-900
                             hover:bg-gray-100 transition"
                                    >
                                        <span className="sr-only">Options</span>
                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white
                                         shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            {[
                                                { label: 'Update Notes', to: `/sections/${section._id}/upload` },
                                                { label: 'View Test',   to: `#` },
                                                { label: 'Edit Section', to: `/projects/${section._id}/edit` },
                                            ].map((item) => (
                                                <Menu.Item key={item.label}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={item.to}
                                                            className={`block px-4 py-2 text-sm ${
                                                                active ? 'bg-gray-100' : ''
                                                            }`}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="button"
                                                        className={`w-full text-left px-4 py-2 text-sm ${
                                                            active ? 'bg-gray-100' : ''
                                                        }`}
                                                    >
                                                        Delete Section
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="py-10 text-center">
                    <p className="text-gray-500">No sections yet. Click “New Section” to get started.</p>
                </div>
            )}
        </div>
    );
}
export default DashboardView;