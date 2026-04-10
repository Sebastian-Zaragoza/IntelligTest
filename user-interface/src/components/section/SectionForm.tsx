import ErrorMessage from "../auth/ErrorMessage.tsx";
import type {FieldErrors, UseFormRegister} from "react-hook-form";
import type {SectionFormData} from "../../types/Section.ts";

type SectionFormProps = {
    register: UseFormRegister<SectionFormData>;
    errors: FieldErrors<SectionFormData>;
}

export default function SectionForm({register, errors}: SectionFormProps) {
    return (
        <div className="space-y-5">
            <div>
                <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700 mb-1">
                    Section Name
                </label>
                <input
                    id="sectionName"
                    type="text"
                    placeholder="e.g. Calculus I"
                    className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register("name", {
                        required: "The section name is required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                </label>
                <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Mathematics"
                    className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register("subject", {
                        required: "The subject is required"
                    })}
                />
                {errors.subject && (
                    <ErrorMessage>{errors.subject.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    id="description"
                    type="text"
                    placeholder="A short description of this section"
                    className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register("description", {
                        required: "The description is required"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </div>
    );
}
