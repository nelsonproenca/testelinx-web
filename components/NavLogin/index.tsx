import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import ChangePassword from "./ChangePassword";
import ForgotPassaword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

import styles from "./styles.module.scss";
import TokenConfirmation from "./TokenConfirmation";

const NavLogin = () => {
  const [verLogin, setVerLogin] = useState<boolean>(true);
  const [verRegister, setVerRegister] = useState<boolean>();
  const [verChangePassword, setVerChangePassword] = useState<boolean>();
  const [verForgotPassaword, setVerForgotPassaword] = useState<boolean>();
  const [verTokenConfirmation, setVerTokenConfirmation] = useState<boolean>();
  const [verResetPassword, setVerResetPassword] = useState<boolean>();
  const [obterPrimeiroAcesso, setObterPrimeiroAcesso] = useState<boolean>();
  const [obterAccessToken, setObterAccessToken] = useState<string>();

  const onViewChangePassword = () => {
    setVerLogin(false);
    setVerChangePassword(true);
    setVerRegister(false);
    setVerForgotPassaword(false);
    setVerTokenConfirmation(false);
    setVerResetPassword(false);
  };

  const onViewRegister = () => {
    setVerLogin(false);
    setVerChangePassword(false);
    setVerRegister(true);
    setVerForgotPassaword(false);
    setVerTokenConfirmation(false);
    setVerResetPassword(false);
  };

  const onViewLogin = () => {
    setVerLogin(true);
    setVerChangePassword(false);
    setVerRegister(false);
    setVerForgotPassaword(false);
    setVerTokenConfirmation(false);
    setVerResetPassword(false);
  };

  const onViewForgotPassaword = () => {
    setVerLogin(false);
    setVerChangePassword(false);
    setVerRegister(false);
    setVerForgotPassaword(true);
    setVerTokenConfirmation(false);
    setVerResetPassword(false);
  };

  const onViewTokenConfirmation = (primeiroAcesso: boolean) => {
    setVerLogin(false);
    setVerChangePassword(false);
    setVerRegister(false);
    setVerForgotPassaword(false);
    setVerTokenConfirmation(true);
    setObterPrimeiroAcesso(primeiroAcesso);
    setVerResetPassword(false);
  };

  const onViewResetPassword = (accessToken: string) => {
    setVerLogin(false);
    setVerChangePassword(false);
    setVerRegister(false);
    setVerForgotPassaword(false);
    setVerTokenConfirmation(false);
    setVerResetPassword(true);
    setObterAccessToken(accessToken);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles["moldura-login"]}>
        <div className="row">
          <div className="col-md-12 col-12 text-center">
            <img id="logo_rvc" src="/logo-rvc.png" alt="Intranet 4 Logo" />
          </div>
          <div className="col-md-12 col-12 text-center">
            <span id="intranet40">Intranet 4.0</span>
          </div>
          <div className="col-md-12 col-12 mt-3">
            {verLogin && (
              <Login
                onViewChangePassword={onViewChangePassword}
                onViewRegister={onViewRegister}
                onViewForgotPassaword={onViewForgotPassaword}
                onViewTokenConfirmation={onViewTokenConfirmation}
              />
            )}
            {verRegister && <Register onViewLogin={onViewLogin} />}
            {verChangePassword && <ChangePassword onViewLogin={onViewLogin} />}
            {verForgotPassaword && (
              <ForgotPassaword
                onViewLogin={onViewLogin}
                onViewTokenConfirmation={onViewTokenConfirmation}
              />
            )}
            {verTokenConfirmation && (
              <TokenConfirmation
                onViewChangePassword={onViewChangePassword}
                onViewLogin={onViewLogin}
                onViewResetPassword={onViewResetPassword}
                primeiroAcesso={obterPrimeiroAcesso!}
              />
            )}
            {verResetPassword && (
              <ResetPassword
                accessToken={obterAccessToken!}
                onViewLogin={onViewLogin}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLogin;
