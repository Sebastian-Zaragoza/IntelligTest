import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleAuthSuccess() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            localStorage.setItem("IntelligTestToken", token);
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/auth/login", { replace: true });
        }
    }, []);

    return null;
}
