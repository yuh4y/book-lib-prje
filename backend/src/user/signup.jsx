import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import './form.css';

export default function SignUp() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState("");
    const roles = ["user"];
    function signUpForm(e) {
        e.preventDefault();
        let check = true
        if (!password) {
            check = false
            setMessage("Vui lòng điền mật kh!")
        }
        if (!email) {
            check = false
            setMessage("Vui lòng điền email!")
        }
        if (!username) {
            check = false
            setMessage("Vui lòng điền username!")
        }
        if (check == true) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signup',
                data: {
                    username: username,
                    password: password,
                    roles: roles,
                    email: email
                }
            })
                .then((response) => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/login"
                })
                .catch(error => {
                    setMessage("Đăng ký không thành công !!!!");
                });
        }

    }
    return (
        <div>
            <div className="wrap signup-wrap">
                <h1 className="text-center h1-cus">Đăng kí</h1>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 offset-xl-1">
                                <form autocomplete="off" id="formSignup">
                                    <div class="form-wrap">
                                        <TextField className="form" label="Username *" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div class="form-wrap">
                                        <TextField className="form" label="Email *" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div class="form-wrap">
                                        <TextField type="password" className="form" label="Mật khẩu *" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-wrap">
                                        <small id="emailHelp" class="error-msg">{message}</small>
                                    </div>

                                    <div className="form-wrap form-req">
                                        <div className="btn-wrap">
                                            <Link to="/login">
                                                <button type="submit" className="btn btn-lg btn-cus btn-signup" >Đăng nhập</button>
                                            </Link>
                                        </div>

                                        <div className="btn-wrap">
                                            <button type="button" className="btn btn-lg btn-cus btn-signin" onClick={signUpForm}>Đăng kí</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </div>
    );
}