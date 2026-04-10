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
        <div className="max-w-xl mx-auto py-8">

            <div className="mb-7">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-5"
                >
                    ← Back to Sections
                </Link>
                <h1
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Edit Section
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Update the details for this section
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <SectionForm register={register} errors={errors} />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                    >
                        Update Section
                    </button>
                </form>
            </div>

        </div>
    );
}
