import { Navigate } from "react-router";

export function ProtectedRoute({ condition, element, redirect }) {
    return (
        condition ? element
            : <Navigate to={redirect} replace={true} />
    );
}