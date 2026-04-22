import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { LoginInterface } from "@utils/interfaces/pages-interfaces/public-routes/InterfacesLogin";
import { formMessages } from "@constants/messages/formMessages";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [badRequest, setBadRequest] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit: handleSubmitLogin,
    register: registerLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginInterface>();

  const loginObligatoryFields = {
    email: { required: formMessages.requiredFieldMessage },
    password: { required: formMessages.requiredFieldMessage },
  };

  const onSubmitLogin: SubmitHandler<LoginInterface> = async (_data) => {
    setIsLoading(true);
    setBadRequest(false);
    // TODO: replace with real loginService.fetchLogin(data)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate("/home");
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background-public-pages">
      <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder={formMessages.emailPlaceholder}
            disabled={isLoading}
            {...registerLogin("email", loginObligatoryFields.email)}
          />
          {errorsLogin.email && <p>{errorsLogin.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              placeholder="**********"
              disabled={isLoading}
              {...registerLogin("password", loginObligatoryFields.password)}
            />
            {showPassword ? (
              <VisibilityIcon onClick={toggleVisibility} style={{ cursor: "pointer" }} />
            ) : (
              <VisibilityOffIcon onClick={toggleVisibility} style={{ cursor: "pointer" }} />
            )}
          </div>
          {errorsLogin.password && <p>{errorsLogin.password.message}</p>}
          {badRequest && <p>Credenciales incorrectas</p>}
        </div>
        <p className="text-center mb-[24px]">
          <Link to="/forgot-password" className="link">¿Olvidaste tu contraseña?</Link>
        </p>
        <button type="submit" disabled={isLoading} className="button-blue mb-[12px]">
          Iniciar sesión
        </button>
        <p className="text-center">
          ¿Eres nuevo? <Link to="/create-user" className="link">Crear usuario</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
