import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
    children: any;
}
const UnauthenticatedRoute = (props: ProtectedRouteProps) => {
    const isLoggedIn = useAppSelector((state) =>
        Boolean(state.session.user && state.session.token)
    );
    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return props.children;
};

export default UnauthenticatedRoute;
