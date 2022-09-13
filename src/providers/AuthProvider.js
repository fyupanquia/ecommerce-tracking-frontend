import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

function AuthProviderF() {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return value; /* <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; */
}

AuthProviderF.defaultProps = {
  children: <span>default child</span>,
};

AuthProviderF.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const AuthProvider = AuthProviderF;

export const useAuth = () => useContext(AuthContext);
