import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

function AuthProviderF() {
  const [user, setUser] = useLocalStorage("user", null);

  return {
    user
  };
}

AuthProviderF.defaultProps = {
  children: <span>default child</span>,
};

AuthProviderF.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const AuthProvider = AuthProviderF;

export const useAuth = () => useContext(AuthContext);
