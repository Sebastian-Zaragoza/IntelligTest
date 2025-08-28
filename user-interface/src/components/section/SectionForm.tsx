import ErrorMessage from "../auth/ErrorMessage.tsx";
import type {FieldErrors, UseFormRegister} from "react-hook-form";
import type {SectionFormData} from "../../types/Section.ts";

type SectionFormProps = {
    register: UseFormRegister<SectionFormData>;
    errors: FieldErrors<SectionFormData>;
}

export default function SectionForm({register, errors}: SectionFormProps) {
    return (
        <div className="space-y-6">
            <div>
                <label
                htmlFor="sectionName"
                className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                >Section Name</label>
                <input id="sectionName" type="text" placeholder="Enter the section name" className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    {...register("name", {
                        required: "The section name is required",
                    })}/>
                {errors.name && (
                    <ErrorMessage>(errors.name.message)</ErrorMessage>
                )}
            </div>
            <div>
                <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                    >Subject</label>
                <input id="subject" type="text" placeholder="Enter the subject name" className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    {...register("subject", {
                        required: "The subject is required"
                    })}/>
                {errors.subject && (
                    <ErrorMessage>(errors.subject.message)</ErrorMessage>
                )}
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                >Description</label>
                <input id="description" type="text" placeholder="Enter the description" className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                       {...register("description", {
                           required: "The description is required"
                       })}/>
                {errors.description && (
                    <ErrorMessage>(errors.description.message)</ErrorMessage>
                )}
            </div>
        </div>
    );
}