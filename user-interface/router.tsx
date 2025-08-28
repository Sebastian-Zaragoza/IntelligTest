import {BrowserRouter, Routes, Route} from "react-router-dom";
import SectionLayout from "./src/layouts/SectionLayout.tsx";
import SectionView from "./src/views/SectionView.tsx";
import LoginUI from "./src/views/auth/LoginView.tsx";
import AuthLayout from "./src/layouts/AuthLayout.tsx";
import RegisterUI from "./src/views/auth/RegisterView.tsx";
import ConfirmAccountView from "./src/views/auth/ConfirmAccountView.tsx";
import RequestCodeView from "./src/views/auth/RequestCodeView.tsx";
import ForgetPasswordView from "./src/views/auth/ForgetPasswordView.tsx";
import NewPasswordView from "./src/views/auth/NewPasswordView.tsx";
import UploadNotes from "./src/components/notes/UploadNotes.tsx";
import UpdateNotes from "./src/components/notes/UpdateNotes.tsx";
import GenerateTest from "./src/components/notes/GenerateTest.tsx";
import EvaluateTestPage from "./src/components/notes/EvaluateTestPage.tsx";
import CreateSectionView from "./src/views/section/CreateSectionView.tsx";
import EditSectionView from "./src/views/section/EditSectionView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SectionLayout/>}>
                    <Route path="/" element={<SectionView/>} index></Route>
                    <Route path="/sections/create" element={<CreateSectionView/>} index></Route>
                    <Route path="/sections/:sectionId/edit" element={<EditSectionView/>} index></Route>
                    <Route path="/sections/:sectionId/upload" element={<UploadNotes/>}/>
                    <Route path="/sections/:sectionId/notes" element={<UpdateNotes/>}/>
                    <Route path="/sections/:sectionId/generate-test" element={<GenerateTest/>}/>
                    <Route path="/sections/:sectionId/evaluate-test" element={<EvaluateTestPage/>}/>
                </Route>
            </Routes>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path={'/auth/login'} element={<LoginUI/>}/>
                    <Route path={'/auth/register'} element={<RegisterUI/>}/>
                    <Route path={'/auth/confirm-account'} element={<ConfirmAccountView/>}/>
                    <Route path={'/auth/request-code'} element={<RequestCodeView/>}/>
                    <Route path={'/auth/forget-password'} element={<ForgetPasswordView/>}/>
                    <Route path={'/auth/new-password'} element={<NewPasswordView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

