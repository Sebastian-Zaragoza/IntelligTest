import {Link} from "react-router-dom";
import SectionForm from "../../components/section/SectionForm.tsx";
import {useNavigate} from "react-router";
import type {SectionFormData} from "../../types/Section.ts";
import {useMutation} from "@tanstack/react-query";
import {createSection} from "../../api/SectionApi.ts";
import {toast} from "sonner";
import {useForm} from "react-hook-form";

export default function CreateSectionView() {
    const navigate = useNavigate();
    const initialValues: SectionFormData = {
        name: "",
        subject: "",
        description: ""
    };

    const mutation = useMutation({
        mutationFn: createSection,
        onError: (error) =>{
            toast.error(error.message);
        },
        onSuccess: (msg) =>{
            toast.success(msg);
            navigate("/dashboard");
        }
    });

    const {register, handleSubmit, formState: {errors}} = useForm<SectionFormData>({defaultValues: initialValues})
    const onSubmit = (formData: SectionFormData) => {
        mutation.mutate(formData);
    }

    return (
        <div className="max-w-xl mx-auto py-8">

            <div className="mb-7">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-5"
                >
                    ← Back to Sections
                </Link>
                <h1
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    New Section
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Fill in the details to create a new section
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <SectionForm register={register} errors={errors} />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                    >
                        Create Section
                    </button>
                </form>
            </div>

        </div>
    );
}
