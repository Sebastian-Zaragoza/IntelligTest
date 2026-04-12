import {BrowserRouter, Routes, Route} from "react-router-dom";
import SectionLayout from "./layouts/SectionLayout.tsx";
import SectionView from "./views/SectionView.tsx";
import LoginUI from "./views/auth/LoginView.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import RegisterUI from "./views/auth/RegisterView.tsx";
import ConfirmAccountView from "./views/auth/ConfirmAccountView.tsx";
import RequestCodeView from "./views/auth/RequestCodeView.tsx";
import ForgetPasswordView from "./views/auth/ForgetPasswordView.tsx";
import NewPasswordView from "./views/auth/NewPasswordView.tsx";
import UploadNotes from "./components/notes/UploadNotes.tsx";
import UpdateNotes from "./components/notes/UpdateNotes.tsx";
import GenerateTest from "./components/notes/GenerateTest.tsx";
import EvaluateTestPage from "./components/notes/EvaluateTestPage.tsx";
import CreateSectionView from "./views/section/CreateSectionView.tsx";
import EditSectionView from "./views/section/EditSectionView.tsx";
import GoogleAuthSuccess from "./views/auth/GoogleAuthSuccess.tsx";
import PrivacyPolicyView from "./views/PrivacyPolicyView.tsx";
import TermsOfServiceView from "./views/TermsOfServiceView.tsx";
import LandingView from "./views/LandingView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LandingView/>}/>
                <Route element={<SectionLayout/>}>
                    <Route path="/dashboard" element={<SectionView/>} index></Route>
                    <Route path="/sections/create" element={<CreateSectionView/>}></Route>
                    <Route path="/sections/:sectionId/edit" element={<EditSectionView/>}></Route>
                    <Route path="/sections/:sectionId/upload" element={<UploadNotes/>}/>
                    <Route path="/sections/:sectionId/notes" element={<UpdateNotes/>}/>
                    <Route path="/sections/:sectionId/generate-test" element={<GenerateTest/>}/>
                    <Route path="/sections/:sectionId/evaluate-test" element={<EvaluateTestPage/>}/>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path={'/auth/login'} element={<LoginUI/>}/>
                    <Route path={'/auth/register'} element={<RegisterUI/>}/>
                    <Route path={'/auth/confirm-account'} element={<ConfirmAccountView/>}/>
                    <Route path={'/auth/request-code'} element={<RequestCodeView/>}/>
                    <Route path={'/auth/forget-password'} element={<ForgetPasswordView/>}/>
                    <Route path={'/auth/new-password'} element={<NewPasswordView/>}/>
                </Route>
                <Route path={'/auth/google/success'} element={<GoogleAuthSuccess/>}/>
                <Route path={'/privacy-policies'} element={<PrivacyPolicyView/>}/>
                <Route path={'/terms-of-service'} element={<TermsOfServiceView/>}/>
            </Routes>
        </BrowserRouter>
    )
}

