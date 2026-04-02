import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // logged in
  return children
}

export default ProtectedRoute