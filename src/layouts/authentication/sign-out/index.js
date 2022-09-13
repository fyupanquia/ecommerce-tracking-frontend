import { useState, useRef, useEffect } from "react";
import { AuthProvider, useAuth } from "providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "providers/useLocalStorage";

function SignOut() {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(null);
    } else {
      navigate("/authentication/sign-in");
    }
  }, [user]);

  return <h1>logout</h1>;
}

export default SignOut;
