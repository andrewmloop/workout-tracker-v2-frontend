import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useUserContext } from "../../../context/user-context";
import { FormEvent, useState } from "react";
import { ROUTES } from "../../../utils/route-enums";
import { UserDto } from "../../../entities/user";
import { fetchApi } from "../../../utils/fetch-util";

export default function SignUp() {
  const { setUserStore } = useUserContext();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });

  const navigate = useNavigate();

  const handleNameChange = (e: string) => {
    setFirstName(e);
    setErrors({
      ...errors,
      name: validateName(e),
    });
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
    setErrors({
      ...errors,
      email: validateEmail(e),
    });
  };

  const handlePasswordChange = (e: string) => {
    setPassword(e);
    setErrors({
      ...errors,
      password: validatePassword(e),
    });
  };

  const handleConfirmPasswordChange = (e: string) => {
    setConfirmPassword(e);
    setErrors({
      ...errors,
      confirmPassword: password === e ? "" : "Passwords do not match",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear out submit error before retying
    setErrors({
      ...errors,
      submit: "",
    });

    // Do nothing if there are any empty fields
    if (
      firstName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    // Do nothing if there are input errors
    for (let error in errors) {
      // Skip submit error
      if (error === "submit") continue;
      // Janky error typing here to satisfy compiler
      if (errors[error as keyof typeof errors]) {
        return;
      }
    }

    setLoading(true);

    await new Promise((f) => setTimeout(f, 1000));

    try {
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        firstName: firstName,
        email: email,
        password: password,
      });

      const response = await fetchApi(ROUTES.USER, {
        method: method,
        headers: headers,
        body: body,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const user: UserDto = data.user;
        setUserStore(user);
        navigate("/routines");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setErrors({
        ...errors,
        submit: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page page-container">
      <form onSubmit={(e) => handleSubmit(e)} className="sign-up-form">
        <div className="sign-up-container">
          <label className="sign-up-label">First Name</label>
          <input
            type="text"
            autoCapitalize="on"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <div className="sign-up-error-container">
            {errors.name.length > 0 && (
              <p className="sign-up-error-text">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="sign-up-container">
          <label className="sign-up-label">Email</label>
          <input
            type="email"
            autoComplete="email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <div className="sign-up-error-container">
            {errors.email.length > 0 && (
              <p className="sign-up-error-text">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="sign-up-container">
          <label className="sign-up-label">Password</label>
          <input
            type="password"
            autoComplete="new-password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <div className="sign-up-error-container">
            {errors.password.length > 0 && (
              <p className="sign-up-error-text">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="sign-up-container">
          <label className="sign-up-label">Confirm Password</label>
          <input
            type="password"
            autoComplete="new-password"
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
          <div className="sign-up-error-container">
            {errors.confirmPassword.length > 0 && (
              <p className="sign-up-error-text">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="sign-up-container">
          <button type="submit" className="sign-up-submit">
            {loading ? "Loading..." : "Submit"}
          </button>
          <div className="sign-up-error-container">
            {errors.submit.length > 0 && (
              <p className="sign-up-error-text">{errors.submit}</p>
            )}
          </div>
        </div>
      </form>
      <div className="sign-in-link-container">
        Already a user? <Link to={"/auth/signin"}>Sign In</Link>
      </div>
    </div>
  );
}

function validateName(name: string): string {
  if (name.length < 1) return "A name is required";
  if (name.length > 20) return "Name is too long";
  if (typeof name !== "string") return "Not a valid name";

  return "";
}

function validateEmail(email: string): string {
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    return "Invalid email";

  return "";
}

function validatePassword(password: string): string {
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!password.match(/.*[0-9].*/)) return "Password must include a number";
  if (!password.match(/.*[!@#$&\.].*/))
    return "Password must include a valid symbol";

  return "";
}
