import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import './form.css'
import { TextField } from "@mui/material";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useState("");
    const [message, setMessage] = useState("");
    function loginForm(e) {
        e.preventDefault()
        let check = true
        if (!password) {
            check = false
            setMessage("Vui lòng điền mật khẩu!")
        }
        if (!username) {
            check = false
            setMessage("Vui lòng điền username!")
        }
        if (check == true) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signin',
                data: {
                    username: username,
                    password: password
                }
            })
                .then((response) => {

                    console.log(response)
                    setJwt(response.data.accessToken)
                    localStorage.setItem("token", response.data.accessToken)
                    localStorage.setItem("username", response.data.username)
                    window.location.href = "http://localhost:3000/"
                }, (error) => {
                    setMessage("Tài khoản hoặc mật khẩu không chính xác !!!");
                });
        }

    }
    return (
        <div>
            <div className="wrap login-wrap">
                <h1 className="text-center mb-4 h1-cus">Đăng nhập</h1>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 offset-xl-1">
                                <form id="formSignup">
                                    <div className="form-wrap form-outline">
                                        <TextField className="form" label="Username *" onChange={(e) => setUsername(e.target.value)} />
                                    </div>

                                    <div className="form-wrap form-outline">
                                        <TextField type="password" className="form" label="Mật khẩu *" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <small id="emailHelp" class="error-msg">{message}</small>
                                    </div>

                                    <div className="form-wrap form-req">
                                        <div className="btn-wrap">
                                            <Link to="/sign-up">
                                                <button type="submit" className="btn btn-lg btn-cus btn-signup" >Đăng kí</button>
                                            </Link>
                                        </div>

                                        <div className="btn-wrap">
                                            <button type="button" className="btn btn-lg btn-cus btn-signin" onClick={loginForm}>Đăng nhập</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}