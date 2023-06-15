import { Link } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import { ROUTES } from "../../../utils/route-enums";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        data;
        // Redirect to routines pages
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
    <div className="sign-in-page-container">
      <div className="sign-in-email-container">
        <input
          type="email"
          className="sign-in-email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="sign-in-password-container">
        <input
          type="password"
          className="sign-in-password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="sign-in-error-container">
        {error.length > 0 && <p className="sign-in-error-text">{error}</p>}
      </div>
      <div className="sign-in-submit-container">
        <button
          type="submit"
          className="sign-in-submit-button"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
      <div className="sign-up-link-container">
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
