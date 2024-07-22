import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../apis/users";
import style from "./Register.module.scss";

export default function Register() {
  const [feedback, setFeedback] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Champs requis")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{12,}$/,
        "Votre mot de passe doit contenir au moins :\n1 lettre capitale\n1 lettre minuscule\n1 chiffre\n1 caractère spécial (&@$#!%*?&)"
      ),
    confirmPassword: yup
      .string()
      .required("Champs requis")
      .oneOf([yup.ref("password"), ""], "Le mot de passe doit être identique"),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et les conditions"),
  });

  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    console.log(values);
    try {
      const response = await signup(values);
      console.log(response);
      setFeedback(response.message);
      if (response.message !== "Email déjà existant") {
        navigate("/login");
        reset(defaultValues);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const togglePwd = (isConf) => {
    isConf ? setShowConfPwd(!showConfPwd) : setShowPwd(!showPwd);
  };

  return (
    <div className="f-center flex-column flex-fill">
      <h1 className="mb-10">Inscription</h1>
      <form className="d-flex flex-column card" onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10 ">
          <label htmlFor="username" className="mb-10">
            Pseudo
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="mb-10 input"
          />
          {errors.username && (
            <p className="text-error c-p">{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="password" className="mb-10">
            Mot de passe{" "}
            <div className={`${style.ToolBox}`}>
              <i className={`fa-solid c-p fa-circle-info ${style.ToolTip}`}></i>
              <div className={`${style.ToolArea}`}>Hello</div>
            </div>
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPwd ? "text" : "password"}
              id="password"
              className="mb-10 input w-100"
            />
            <div
              className={`${style.showBtn} btn btn-primary`}
              onClick={(e) => togglePwd(false)}
            >
              {showPwd ? (
                <i className="fa-solid fa-eye-slash fa-xl"></i>
              ) : (
                <i className="fa-solid fa-eye fa-xl"></i>
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-error c-p" style={{ maxWidth: "300px" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="confirmPassword" className="mb-10">
            Confirmation de mot de passe
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfPwd ? "text" : "password"}
              id="confirmPassword"
              className="mb-10 input w-100"
            />
            <div
              className={`${style.showBtn} btn btn-primary`}
              onClick={(e) => togglePwd(true)}
            >
              {showConfPwd ? (
                <i className="fa-solid fa-eye-slash fa-xl"></i>
              ) : (
                <i className="fa-solid fa-eye fa-xl"></i>
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-error c-p">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="rgpd" className="mb-10">
            <input
              {...register("rgpd")}
              type="checkbox"
              className="mr-15"
              id="rgpd"
            />
            En soumettant ce formulaire j'accepte ...
          </label>
          {errors.rgpd && (
            <p className="text-error c-p">{errors.rgpd.message}</p>
          )}
        </div>
        <NavLink to="/login" className="mb-20 feedbackText">
          Déjà inscrit ?
        </NavLink>
        <button className="btn btn-primary">Valider</button>
      </form>
    </div>
  );
}
