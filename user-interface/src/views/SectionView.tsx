import { Link } from "react-router-dom";
import  { Fragment, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getSections } from "../api/SectionApi";
import { getTest } from "../api/TestApi";
import {getNotes} from "../api/NotesApi.ts";
import DeleteSectionModal from "../components/section/DeleteSectionModal";
import {useNavigate} from "react-router";

const getTestSafe = async (sectionId: string) => {
    try {
        return await getTest(sectionId);
    } catch {
        return null;
    }
};
const getNotesSafe = async (sectionId: string) => {
    try {
        return await getNotes(sectionId);
    } catch {
        return null;
    }
};

function SectionView() {
    const {
        data: sections,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["sections"],
        queryFn: getSections,
    });

    const testQueries = useQueries({
        queries: (sections ?? []).map((s) => ({
            queryKey: ["test", s._id],
            queryFn: () => getTestSafe(s._id),
            retry: false,
            staleTime: 60_000,
            enabled: Boolean(sections),
        })),
    });

    const notesQueries = useQueries({
        queries: (sections ?? []).map((s) => ({
            queryKey: ["notes", s._id],
            queryFn: () => getNotesSafe(s._id),
            retry: false,
            staleTime: 60_000,
            enabled: Boolean(sections),
        })),
    });

    const hasTestById = useMemo(() => {
        const m = new Map<string, boolean>();
        (sections ?? []).forEach((s, idx) => {
            const q = testQueries[idx];
            m.set(s._id, Boolean(q?.data));
        });
        return m;
    }, [sections, testQueries]);

    const hasNotesById = useMemo(() => {
        const m = new Map<string, boolean>();
        (sections ?? []).forEach((s, idx) => {
            const q = notesQueries[idx];
            const d = q?.data;
            const hasNotes = Array.isArray(d) ? d.length > 0 : Boolean(d);
            m.set(s._id, hasNotes);
        });
        return m;
    }, [sections, notesQueries]);

    const navigate = useNavigate();

    if (isLoading) return null;
    if (isError || !sections) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full px-8 py-8">
                <p className="text-red-600">Error loading sections.</p>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-screen-2xl mx-auto w-full space-y-8 px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My sections</h1>
                        <p className="mt-1 text-gray-500">Manage your notes by sections</p>
                    </div>
                    <Link
                        to="/sections/create"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition"
                    >
                        New Section
                    </Link>
                </div>

                {sections.length > 0 ? (
                    <ul
                        role="list"
                        className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {sections.map((section) => {
                            const hasTest = hasTestById.get(section._id) ?? false;
                            const hasNotes = hasNotesById.get(section._id) ?? false;

                            return (
                                <li
                                    key={section._id}
                                    className="flex flex-col justify-between bg-white rounded-lg shadow p-6 hover:shadow-lg transition w-full"
                                >
                                    <div>
                                        <Link
                                            to={`/sections/${section._id}/upload`}
                                            className="block text-xl font-semibold text-gray-800 hover:text-gray-900"
                                        >
                                            {section.name}
                                        </Link>
                                        <p className="mt-2 text-gray-600 text-sm">
                                            {section.description}
                                        </p>
                                        <p className="mt-1 text-gray-500 text-xs">
                                            {section.subject}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <Menu as="div" className="relative">
                                            <Menu.Button className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition">
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
                                                <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) =>
                                                            hasNotes ? (
                                                                <Link
                                                                    to={`/sections/${section._id}/notes`}
                                                                    className={`block px-4 py-2 text-sm ${
                                                                        active ? "bg-gray-100" : ""
                                                                    }`}
                                                                >
                                                                    Update Notes
                                                                </Link>
                                                            ) : (
                                                                <span
                                                                    className={`block px-4 py-2 text-sm text-gray-400 cursor-not-allowed ${
                                                                        active ? "bg-gray-100" : ""
                                                                    }`}
                                                                    onClick={(e) => e.preventDefault()}
                                                                >
                                                              Update Notes
                                                            </span>
                                                            )
                                                        }
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) =>
                                                            hasTest ? (
                                                                <Link
                                                                    to={`/sections/${section._id}/generate-test`}
                                                                    className={`block px-4 py-2 text-sm ${
                                                                        active ? "bg-gray-100" : ""
                                                                    }`}
                                                                >
                                                                    View Test
                                                                </Link>
                                                            ) : (
                                                                <span
                                                                    className={`block px-4 py-2 text-sm text-gray-400 cursor-not-allowed ${
                                                                        active ? "bg-gray-100" : ""
                                                                    }`}
                                                                    onClick={(e) => e.preventDefault()}
                                                                >
                                                                  View Test
                                                                </span>
                                                            )
                                                        }
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={`/sections/${section._id}/edit`}
                                                                className={`block px-4 py-2 text-sm ${
                                                                    active ? "bg-gray-100" : ""
                                                                }`}
                                                            >
                                                                Edit Section
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                type="button"
                                                                onClick={() => navigate(location.pathname + `?deleteSection=${section._id}`)}
                                                                className={`w-full text-left px-4 py-2 text-sm ${
                                                                    active ? "bg-gray-100" : ""
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
                            );
                        })}
                    </ul>
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-gray-500">
                            No sections yet. Click “New Section” to get started.
                        </p>
                    </div>
                )}
            </div>
            <DeleteSectionModal />
        </>
    );
}

export default SectionView;
