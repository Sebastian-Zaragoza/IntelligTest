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
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white border-l-4  shadow-xl transition-all p-8 sm:p-10 text-left">

                                <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-4">
                                    Delete Project
                                </Dialog.Title>

                                <p className="text-gray-700 mb-6">
                                    Confirm project deletion by{" "}
                                    <span className="text-gray-600 font-semibold">
                                  entering your password
                                </span>
                                </p>

                                <form
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                    className="space-y-6"
                                >
                                    <div className="space-y-3">
                                        <label
                                            htmlFor="password"
                                            className="text-sm uppercase font-bold"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Login password"
                                            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg shadow focus:outline-none transition-colors"
                                    >
                                        Delete Section
                                    </button>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

