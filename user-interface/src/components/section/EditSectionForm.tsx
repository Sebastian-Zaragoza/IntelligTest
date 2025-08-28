import type {Section, SectionFormData} from "../../types/Section.ts";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {updateSection} from "../../api/SectionApi.ts";
import {toast} from "sonner";
import {Link} from "react-router-dom";
import SectionForm from "./SectionForm.tsx";

type EditSectionFormProps = {
    data: Section;
    sectionId: Section["_id"]
}

export default function EditSectionForm({data, sectionId} : EditSectionFormProps) {
    const initialValues: SectionFormData = {
        name: data.name,
        subject: data.subject,
        description: data.description
    };

    const {register, handleSubmit, formState: {errors}} = useForm<SectionFormData>({defaultValues: initialValues});
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate} = useMutation({
        mutationFn: updateSection,
        onError : (error) => {
            toast.error(error.message);
        },
        onSuccess: (msg) =>{
            queryClient.invalidateQueries({queryKey: ["sections"]});
            queryClient.invalidateQueries({queryKey: ["editSection", sectionId]});
            toast.success(msg);
            navigate('/');
        },
    });

    const onSubmit = (formData: SectionFormData)=>{
        mutate({formData, id : sectionId});
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Edit Section
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Complete the following form to edit the section
                </p>
                <Link
                    to="/"
                    className="inline-block mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
                >
                    Back to Sections
                </Link>
            </header>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white rounded-lg shadow-md border-l-4 border-gray-600 p-8 space-y-6"
            >
                <SectionForm register={register} errors={errors} />
                <button
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
                >
                    Update Section
                </button>
            </form>
        </div>
    );
}
