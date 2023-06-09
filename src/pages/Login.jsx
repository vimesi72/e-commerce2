
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { isLoading } from "../../src/store/slice/loader.slice";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const tokens = useSelector(state => state.token)

  const {register , handleSubmit} = useForm()
  
  dispatch(isLoading(true))
 const login =  (data) =>  {
 
      axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`, data)
      .then(res => {
          // dispatch(setToken(res.data.token))
          localStorage.setItem("token", res.data.token)
          console.log(res.data.token)
          navigate("/")
      })
      .catch(err => {
        if (err.response.status === 401) {
          alert("Credenciales incorrectas")
        }
        console.log(err)
      }).finally(() => dispatch(isLoading(false)))
  };
return (
    <div className="login-box">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit(login)}>
        <div className="user-box">
          <input type="email" name="email" id="email" {...register("email")}  />
          <label>Correo Electrónico :</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" id="password" {...register("password")} />
          <label>Clave :</label>
        </div>
       <button type="submit">
        Ingresar
       </button>
      </form>
    </div>
  );
};

export default Login;
