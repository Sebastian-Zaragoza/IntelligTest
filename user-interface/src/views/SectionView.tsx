import { Link } from "react-router-dom";
import { Fragment, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getSections } from "../api/SectionApi";
import { getTest } from "../api/TestApi";
import { getNotes } from "../api/NotesApi.ts";
import DeleteSectionModal from "../components/section/DeleteSectionModal";
import { useNavigate } from "react-router";
import ErrorMessage from "../components/auth/ErrorMessage.tsx";

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
            <>
                <ErrorMessage><p className="text-sm text-red-500">Error loading sections</p></ErrorMessage>
            </>
        );
    }

    return (
        <>
            <div className="space-y-8">

                {/* Page header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h1
                            className="text-3xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            My Sections
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage your notes and AI-generated tests by section
                        </p>
                    </div>
                    {sections.length > 0 && (
                        <Link
                            to="/sections/create"
                            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-sm transition"
                        >
                            + New Section
                        </Link>
                    )}
                </div>

                {sections.length > 0 ? (
                    <ul
                        role="list"
                        className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {sections.map((section) => {
                            const hasTest = hasTestById.get(section._id) ?? false;
                            const hasNotes = hasNotesById.get(section._id) ?? false;
                            const initial = section.name.charAt(0).toUpperCase();

                            return (
                                <li
                                    key={section._id}
                                    className="flex flex-col rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {/* Dark header strip */}
                                    <div className="bg-gray-900 px-5 py-5 rounded-t-xl">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                                            <span
                                                className="text-white text-lg font-bold"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {initial}
                                            </span>
                                        </div>
                                        <Link
                                            to={`/sections/${section._id}/upload`}
                                            className="block text-white text-base font-semibold leading-snug hover:text-gray-200 transition-colors line-clamp-2"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {section.name}
                                        </Link>
                                    </div>

                                    {/* Card body */}
                                    <div className="bg-white flex flex-col flex-1 px-5 py-4 gap-3 rounded-b-xl">
                                        <div>
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                {section.subject}
                                            </span>
                                            <p className="mt-1 text-sm text-gray-600 leading-relaxed line-clamp-2">
                                                {section.description}
                                            </p>
                                        </div>

                                        {/* Status badges */}
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                                                hasNotes
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${hasNotes ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                                Notes
                                            </span>
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                                                hasTest
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${hasTest ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                                Test
                                            </span>
                                        </div>

                                        {/* Action menu */}
                                        <div className="flex justify-end mt-auto pt-1">
                                            <Menu as="div" className="relative">
                                                <Menu.Button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
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
                                                    <Menu.Items className="absolute right-0 mt-1 w-52 rounded-md bg-white border border-gray-100 shadow-lg focus:outline-none z-10">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) =>
                                                                    hasNotes ? (
                                                                        <Link
                                                                            to={`/sections/${section._id}/notes`}
                                                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-50' : ''}`}
                                                                        >
                                                                            Update Notes
                                                                        </Link>
                                                                    ) : (
                                                                        <span
                                                                            className={`block px-4 py-2 text-sm text-gray-300 cursor-not-allowed ${active ? 'bg-gray-50' : ''}`}
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
                                                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-50' : ''}`}
                                                                        >
                                                                            View Test
                                                                        </Link>
                                                                    ) : (
                                                                        <span
                                                                            className={`block px-4 py-2 text-sm text-gray-300 cursor-not-allowed ${active ? 'bg-gray-50' : ''}`}
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
                                                                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-50' : ''}`}
                                                                    >
                                                                        Edit Section
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <div className="border-t border-gray-100 my-1" />

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => navigate(location.pathname + `?deleteSection=${section._id}`)}
                                                                        className={`w-full text-left px-4 py-2 text-sm text-red-500 ${active ? 'bg-red-50' : ''}`}
                                                                    >
                                                                        Delete Section
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center mb-5">
                            <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
                        </div>
                        <h3
                            className="text-xl font-bold text-gray-800 mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            No sections yet
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Create your first section to start uploading notes and generating tests.
                        </p>
                        <Link
                            to="/sections/create"
                            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition"
                        >
                            + New Section
                        </Link>
                    </div>
                )}
            </div>

            <DeleteSectionModal />
        </>
    );
}

export default SectionView;
