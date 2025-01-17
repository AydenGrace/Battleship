import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../apis/users";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import style from "./Login.module.scss";

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const { setConnectedUser } = useContext(UserContext);

  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  const defaultValues = {
    username: "",
    password: "",
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
    // console.log(values);
    try {
      const response = await signin(values);
      console.log(response);
      if (!response.message) {
        toast.success(`Bienvenue ${response.user.username}`);
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        setFeedback("Connexion réussie");
        navigate("/");
        reset(defaultValues);
      } else {
        toast.error(response.message);
        setFeedback(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const togglePwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <div className="f-center flex-column flex-fill">
      <h1 className="mb-10">Connexion</h1>
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
            Mot de passe
          </label>
          <div className="relative d-flex">
            <input
              {...register("password")}
              type={showPwd ? "text" : "password"}
              id="password"
              className="mb-10 input input_and_btn"
            />
            <div
              className={`${style.showBtn} btn btn-primary input_btn`}
              onClick={(e) => togglePwd()}
            >
              {showPwd ? (
                <i className="fa-solid fa-eye-slash fa-xl"></i>
              ) : (
                <i className="fa-solid fa-eye fa-xl"></i>
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-error c-p">{errors.password.message}</p>
          )}
        </div>
        <NavLink to="/register" className="mb-20 feedbackText">
          Pas encore inscrit ?
        </NavLink>
        <button className="btn btn-primary">Valider</button>
      </form>
    </div>
  );
}
