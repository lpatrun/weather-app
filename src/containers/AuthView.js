import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";
import { UserContext } from "../App";
import MenuComponent from "../components/MenuComponent";

export default function AuthView() {
  const { state, dispatch } = useContext(UserContext);
  const [proces, setProces] = useState("signin");
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("");
  const errorCodes = {
    "auth/credential-already-in-use":
      "Ovi podatci se već koriste na drugom korisničkom računu.",
    "auth/email-already-in-use": "Navedena email adresa je već u uporabi.",
    "auth/invalid-email": "Navedena email adresa nije ispravno napisana.",
    "auth/wrong-password":
      "Upisana lozinka nije ispravna ili korisnik ne postoji.",
    "auth/too-many-requests":
      "Zabilježena neuobičajena aktivnost. Molimo pokušajte kasnije.",
  };

  const handleSignIn = (data) => {
    setError("");
    auth
      .signInWithEmailAndPassword(data.signinEmail, data.signinPassword)
      .then((response) => {
        dispatch({ type: "userLogin", payload: { response } });
      })
      .catch((error) => {
        document.getElementById("signin").reset();
        setError(errorCodes[error.code]);
      });
  };

  const handleSignUp = (data) => {
    setError("");
    auth
      .createUserWithEmailAndPassword(data.signupEmail, data.signupPassword)
      .then((response) => {
        dispatch({ type: "userSignup", payload: { response } });
      })
      .catch((error) => {
        document.getElementById("signup").reset();
        setError(errorCodes[error.code]);
      });
  };

  return (
    <div className="main-container">
      {state.userData && <Redirect to="/" />}
      <div className="main-funcs">
        <MenuComponent />
      </div>

      <div className="form-container">
        <svg
          id="Capa_1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m184.743 95.179c8.284 0 15-6.716 15-15v-30.205c0-8.284-6.716-15-15-15s-15 6.716-15 15v30.205c0 8.284 6.716 15 15 15z" />
          <path d="m48.661 150.086-26.159-15.103c-7.175-4.144-16.349-1.684-20.49 5.49-4.142 7.175-1.684 16.349 5.49 20.49l26.159 15.103c7.158 4.134 16.339 1.701 20.49-5.49 4.142-7.175 1.684-16.349-5.49-20.49z" />
          <path d="m33.661 315.881-26.159 15.102c-7.174 4.142-9.632 13.315-5.49 20.49 4.163 7.21 13.35 9.614 20.49 5.49l26.159-15.103c7.174-4.142 9.632-13.315 5.49-20.49-4.142-7.173-13.314-9.634-20.49-5.489z" />
          <path d="m335.824 176.066 26.159-15.103c7.174-4.142 9.632-13.315 5.49-20.49-4.142-7.174-13.314-9.634-20.49-5.49l-26.159 15.103c-7.174 4.142-9.632 13.315-5.49 20.49 4.163 7.21 13.35 9.614 20.49 5.49z" />
          <path d="m398.906 267.268c-17.171-42.432-58.823-70.488-104.645-70.29-18.777-41.809-60.796-71.005-109.519-71.005-66.168 0-119.999 53.832-119.999 120 0 42.451 22.168 79.809 55.525 101.147-35.567 56.188 4.873 129.853 71.41 129.853 236.012-.246 223.098.604 227.208-.672 52.427-5.913 93.114-50.379 93.114-104.327 0-61.607-52.642-109.441-113.094-104.706zm-304.163-21.294c0-49.626 40.374-90 90-90 33.465 0 62.705 18.37 78.211 45.547-47.399 13.889-80.31 57.162-80.838 106.81-14.9 1.635-28.949 7.202-41.049 16.301-27.605-15.389-46.324-44.874-46.324-78.658zm318.469 200.742c-5.343.434-141.464.182-221.534.258-49.461 0-73.564-61.31-36.763-94.916 11.046-10.087 25.755-15.454 41.783-13.996 9.669.872 17.548-7.493 16.213-17.02-6.954-49.631 31.479-94.068 81.689-94.068 37.144 0 69.882 25.002 79.612 60.801 2.08 7.649 9.753 12.356 17.512 10.755 46.753-9.669 90.276 26.071 90.276 73.444 0 38.756-30.215 71.587-68.788 74.742z" />
        </svg>

        <div className="form-menu">
          <button
            className={`${
              proces === "signin" ? "btn-secondary btn-active" : "btn-primary"
            } btn btn-small`}
            onClick={() => setProces("signin")}
          >
            prijavi se
          </button>
          <button
            className={`${
              proces === "signup" ? "btn-secondary btn-active" : "btn-primary"
            } btn btn-small`}
            onClick={() => setProces("signup")}
          >
            registriraj se
          </button>
        </div>
        <div className="error-container">{error && <p>{error}</p>}</div>

        {proces === "signin" ? (
          <form id="signin" onSubmit={handleSubmit(handleSignIn)}>
            <div className="inputs-container">
              <input
                type="email"
                name="signinEmail"
                placeholder="Vaš email..."
                ref={register({
                  required: "Molimo unesite mail formata ivan.ivic@mail.com.",
                })}
              />
              <input
                type="password"
                name="signinPassword"
                placeholder="Vaša lozinka..."
                ref={register({
                  required: "Lozinka je obavezna.",
                  minLength: {
                    value: 6,
                    message: "Lozinka mora imati najmanje 6 znakova.",
                  },
                })}
              />
            </div>
            {errors.signinEmail && (
              <div className="error-container">
                {error && <p>{errors.signinEmail.message}</p>}
              </div>
            )}
            {errors.signinPassword && (
              <div className="error-container">
                {error && <p>{errors.signinPassword.message}</p>}
              </div>
            )}

            <input
              type="submit"
              className="btn btn-secondary center"
              value="Prijavi se"
            />
          </form>
        ) : (
          <form id="signup" onSubmit={handleSubmit(handleSignUp)}>
            <div className="inputs-container">
              <input
                type="email"
                name="signupEmail"
                placeholder="Vaš email..."
                ref={register({
                  required: "Molimo unesite mail formata ivan.ivic@mail.com.",
                })}
              />
              <input
                type="password"
                name="signupPassword"
                required
                placeholder="Vaša lozinka..."
                ref={register({
                  required: "Lozinka je obavezna.",
                  minLength: {
                    value: 6,
                    message: "Lozinka mora imati najmanje 6 znakova.",
                  },
                })}
              />
            </div>

            {errors.signupEmail && (
              <div className="error-container">
                {error && <p>{errors.signupEmail.message}</p>}
              </div>
            )}
            {errors.signupPassword && (
              <div className="error-container">
                {error && <p>{errors.signupPassword.message}</p>}
              </div>
            )}
            <input
              type="submit"
              className="btn btn-secondary center"
              value="Registriraj se"
            />
          </form>
        )}
      </div>
    </div>
  );
}
