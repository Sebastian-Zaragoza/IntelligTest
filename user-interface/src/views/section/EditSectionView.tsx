import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getSectionById} from "../../api/SectionApi.ts";
import {Navigate} from "react-router";
import EditSectionForm from "../../components/section/EditSectionForm.tsx";

export default function EditSectionView() {
    const params = useParams();
    const sectionId = params.sectionId!;

    const {data, isError} = useQuery({
        queryKey: ["editSection", sectionId],
        queryFn: ()=> getSectionById(sectionId),
        retry: false
    });

    if (isError) return <Navigate to="/404"/>;
    if (data) return <EditSectionForm data={data} sectionId={sectionId}/>;
}

