import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import './header.css'

export default function Header() {
    const [username, setUsername] = useState("")
    function logOut() {
        localStorage.clear();
        localStorage.clear()
        window.location.href = "/"
    }
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
    }, []);

    const currentREF = window.location.href;
    let btnDisplay;
    if (currentREF === 'http://localhost:3000/login' || currentREF === 'http://localhost:3000/sign-up') {
        btnDisplay = "";
    }
    else {
        btnDisplay = <div style={{ display: !username ? "block" : "none" }}>
            <a onClick={() => { window.location.href = "/login" }} className="login-btn">Đăng nhập</a>
            <a onClick={() => { window.location.href = "/sign-up" }} className="singup-btn">Đăng kí</a>
        </div>;
    }

    let headerDisplay;
    if (currentREF === 'http://localhost:3000/insert-book') {
        headerDisplay = <div ></div>;
    }
    else {
        headerDisplay =
            <nav className="header row">
                <div className="logo col-3">
                    <a href="http://localhost:3000/">
                        <img src={logo} alt="Logo hiệu sách" />
                    </a>
                    <h4>Thư viện PTIT</h4>
                </div>
                <div class="col-6 row" id="navbarNav">
                    <div class="nav-item-custom col-2">
                        <Link class="nav-link-custom" to="/">Trang chủ <span class="sr-only">(current)</span></Link>
                    </div>
                    <div class="nav-item-custom col-3">
                        <Link class="nav-link-custom" to="purchase-history">Lịch sử đặt hàng<span class="sr-only">(current)</span></Link>
                    </div>
                    <div class="nav-item-custom col-2">
                        <Link class="nav-link-custom" to="cart">Giỏ hàng<span class="sr-only">(current)</span></Link>
                    </div>
                </div>

                <div className="btn-action-wrap col-3">
                    {btnDisplay}
                    <div style={{ display: username ? "block" : "none" }}>
                        <button onClick={logOut} className="btn-logout">Đăng xuất</button>
                    </div>
                </div>
            </nav>;
    }

    return (
        <div>
            {headerDisplay}
        </div>
    );
}