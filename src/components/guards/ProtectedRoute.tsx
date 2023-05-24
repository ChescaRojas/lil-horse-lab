import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
    children: any;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const isLoggedIn = useAppSelector((state) =>
        Boolean(state.session.user && state.session.token)
    );
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return props.children;
};

export default ProtectedRoute;
