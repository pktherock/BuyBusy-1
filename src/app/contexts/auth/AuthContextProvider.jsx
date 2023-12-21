import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { AuthProvider } from "./AuthContext";
import { alertService, authService } from "../../services";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (userName, email, password) => {
    // console.log(userName, email, password);
    setLoading(true);
    try {
      const user = await authService.createAccount(userName, email, password);
      setUser(user);
      alertService.success("User created and logged in successfully");
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // console.log(email, password);
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      // console.log(user);
      setUser(user);
      alertService.success("Logged In successfully");
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      alertService.success("logged out successfully");
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserFromDatabase = async (password) => {
    const isUserConfirm = confirm("Are you sure?");
    if (!isUserConfirm) return;

    setLoading(true);
    try {
      await authService.deleteUserFromDB(password);
      alertService.success("User has been deleted successfully");
      setUser(null);
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async (password, email) => {
    setLoading(true);
    try {
      const user = await authService.updateUserEmail(password, email);
      setUser(user);
      alertService.success(
        "Email has been sended to new email id please verify first and reload this page"
      );
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password, updatePassword) => {
    setLoading(true);
    try {
      const user = await authService.updateUserPassword(
        password,
        updatePassword
      );
      setUser(user);
      alertService.success("Password has been update successfully");
      return true;
    } catch (error) {
      alertService.error(error.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      const user = await authService.getCurrentUser();
      setUser(user);
      setLoading(false);
    }
    fetchUserData();
  }, []);

  if (user && !user.emailVerified) {
    return (
      <h1 className="text-3xl text-center">
        Please verify email first and do refresh (check your email for
        verification link)
      </h1>
    );
  }

  return (
    <AuthProvider
      value={{
        user,
        signUp,
        login,
        logout,
        updateEmail,
        updatePassword,
        deleteUserFromDatabase,
      }}
    >
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-20">
          <RingLoader
            loading={loading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            color="teal"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {children}
    </AuthProvider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
export default AuthContextProvider;
