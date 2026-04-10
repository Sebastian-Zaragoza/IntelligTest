import type {CheckPasswordForm} from "../../types/Auth.ts";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {checkPassword} from "../../api/AuthApi.ts";
import {toast} from "sonner";
import {deleteSection} from "../../api/SectionApi.ts";
import {Fragment} from "react";
import {Transition} from "@headlessui/react";
import {Dialog} from "@headlessui/react";
import ErrorMessage from "../auth/ErrorMessage.tsx";

export default function DeleteSectionModal() {
    const initialValues: CheckPasswordForm = {
        password : ""
    }

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const deleteSectionId = queryParams.get("deleteSection");
    const show = deleteSectionId ? true : false;
    const queryClient = useQueryClient();

    const {register, handleSubmit, formState : {errors}} = useForm({defaultValues: initialValues})

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) =>{
            toast.error(error.message);
        },
    })

    const deleteSectionMutation = useMutation({
        mutationFn: deleteSection,
        onError: (error) =>{
            toast.error(error.message);
        },
        onSuccess: (msg) => {
            toast.success(msg);
            queryClient.invalidateQueries({queryKey: ["sections"]});
            navigate(location.pathname, {replace: true});
        }
    })

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData);
        await deleteSectionMutation.mutateAsync(deleteSectionId!);
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => navigate(location.pathname, { replace: true })}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">

                                {/* Danger stripe */}
                                <div className="bg-red-600 px-6 py-5">
                                    <Dialog.Title
                                        className="text-xl font-bold text-white"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        Delete Section
                                    </Dialog.Title>
                                    <p className="text-red-100 text-sm mt-1">
                                        This action is permanent and cannot be undone.
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="px-6 py-6 space-y-5">
                                    <p className="text-sm text-gray-600">
                                        Confirm deletion by entering your{' '}
                                        <span className="font-semibold text-gray-800">account password</span>.
                                    </p>

                                    <form onSubmit={handleSubmit(handleForm)} noValidate className="space-y-4">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                                                {...register("password", {
                                                    required: "Password is required",
                                                })}
                                            />
                                            {errors.password && (
                                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-md transition"
                                        >
                                            Delete Section
                                        </button>
                                    </form>

                                    <button
                                        type="button"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                        className="w-full text-center text-sm text-gray-400 hover:text-gray-600 hover:underline transition"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
