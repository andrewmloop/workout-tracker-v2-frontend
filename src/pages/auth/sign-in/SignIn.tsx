import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { FormEvent, useState } from "react";
import { ROUTES } from "../../../utils/route-enums";
import { useUserContext } from "../../../context/user-context";
import { UserDto } from "../../../entities/user";

export default function SignIn() {
  const { setUserStore } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please provide a valid email");
      return;
    }

    if (!validatePassword(password)) {
      setError("Please provide a password");
      return;
    }

    setLoading(true);
    try {
      const signInUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.SIGN_IN;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await fetch(signInUrl, {
        method: method,
        headers: headers,
        body: body,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const user: UserDto = data.user;
        setUserStore(user);
        navigate("/routines");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-page page-container">
      <form onSubmit={(e) => handleSubmit(e)} className="sign-in-form">
        <div className="sign-in-container">
          <label>Email</label>
          <input
            type="username"
            autoComplete="username"
            className="sign-in-email-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sign-in-container">
          <label>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            className="sign-in-password-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-in-container">
          <button type="submit" className="sign-in-submit-button">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <div className="sign-in-error-container">
        {error.length > 0 && <p className="error-text">{error}</p>}
      </div>
      <div className="sign-in-link-container">
        Not a user? <Link to={"/auth/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

function validateEmail(email: string): boolean {
  const isLength = email.length > 0;
  return isLength;
}

function validatePassword(password: string): boolean {
  const isLength = password.length > 0;
  return isLength;
}
