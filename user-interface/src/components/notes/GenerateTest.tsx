import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {generateTest} from "../../api/TestApi.ts";
import {useForm} from "react-hook-form";
import ErrorMessage from "../auth/ErrorMessage.tsx";

export default function GenerateTest() {
    const {sectionId} = useParams<{sectionId:string}>();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["test", sectionId],
        queryFn: ()=> generateTest(sectionId!),
        enabled: Boolean(sectionId),
        refetchOnWindowFocus: false,
    })

    type FormValues = Record<`answer_${number}`, string>
    const {register, formState: {errors}} = useForm<FormValues>();


    if (isLoading) return <div>Loading</div>;
    if (isError || !data) return <p>Error loading test</p>;

    if (data) return (
       <form className="p-4 max-w-2xl mx-auto space-y-6">
           {data.questions.map((question, index) => {
               const fieldName = `answer_${index}` as const;
               return (
                   <div key={index} className="space-y-2">
                       <p className="font-medium">{`${index + 1}. ${question}`}</p>
                       <input
                           type="text"
                           placeholder=" "
                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           {...register(fieldName, {
                               required: "Answer the question",
                           })}
                       />
                       {errors[fieldName] && (
                           <ErrorMessage>{errors[fieldName]?.message}</ErrorMessage>
                       )}
                   </div>
               );
           })}
           <button
               type="submit"
               className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
           >
            Submit Test
           </button>
       </form>
    );
}

