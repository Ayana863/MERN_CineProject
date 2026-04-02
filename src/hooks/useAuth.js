import { useState, useEffect } from "react"

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }

    // update when login/logout
    const handleChange = () => {
      const token = localStorage.getItem("token")
      setIsAuth(!!token)
    }

    window.addEventListener("userChanged", handleChange)

    return () => {
      window.removeEventListener("userChanged", handleChange)
    }
  }, [])

  return isAuth
}