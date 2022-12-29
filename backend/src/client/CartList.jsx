import { useEffect } from 'react'
import { useState } from 'react'
import './cartList.css'
import axios from 'axios';

export default function () {
    const [cart, setCart] = useState("")
    function addToCart() {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let ids = []
        let quantities = []
        for (var i = 0; i < cart.length; i++) {
            ids.push(cart[i].book.id)
            quantities.push(cart[i].quantity)
        }
        console.log(ids.join(" "), quantities.join(" "))
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/cart/add',
            data: {
                "id": ids.join(" "),
                "quantity": quantities.join(" ")
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {
                localStorage.removeItem("cart")
                setCart([])
                console.log(data)
                window.location.href = 'http://localhost:3000/purchase-history';
            })
            .catch(err => console.log(err));
    }
    function minus(id) {
        console.log(id)
        let qltInput = document.getElementsByClassName(`input-qty-${id}`)[0]
        let number = Number(qltInput.value)
        if (number > 1) {
            number -= 1
            qltInput.value = number
            let cart = JSON.parse(localStorage.getItem("cart"))
            let check = false
            cart.forEach(product => {
                if (product.book.id == id) {
                    check = true
                    product.quantity = String(number);
                }
            })
            if (check == true) {
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        }
    }
    function plus(id) {
        let qltInput = document.getElementsByClassName(`input-qty-${id}`)[0]
        let number = Number(qltInput.value)
        number += 1
        qltInput.value = number
        let cart = JSON.parse(localStorage.getItem("cart"))
        let check = false
        cart.forEach(product => {
            if (product.book.id == id) {
                check = true
                product.quantity = String(number);
            }
        })
        if (check == true) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/" + post;
        return url;
    }
    function removeProduct(id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart = cart.filter(product => product.book.id != id)
        setCart(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        setCart(cart)
    }, [])
    return (
        <div class="container mt-5">
            <div class="card-wrapper container row">
                <div class="col">
                    {
                        cart && cart.map(product => {
                            return (
                                <div class="card-customer row mt-2">
                                    <div class="col-2">
                                        <img class="img-product" src={linkImg(product.book.imageFeatureBooks[0].url)} alt="" />
                                    </div>
                                    <div class="wrap-info col-6">
                                        <div class="row pl-0">
                                            <div className="d-flex pl-0">
                                                <h5 className='mr-2'>{product.book.title}</h5>
                                            </div>
                                            <div>Tác giả: {product.book.author}</div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="row ml-1">
                                            <div className="d-flex">
                                                <div class="buttons_added">
                                                    <input class="minus is-form" type="button" value="-" onClick={() => minus(product.book.id)} />
                                                    <input aria-label="quantity" class={`input-qty-${product.book.id} input-qty`} type="text" value={product.quantity} />
                                                    <input class="plus is-form" type="button" value="+" onClick={() => plus(product.book.id)} />
                                                </div>
                                                <div class="col ml-2">
                                                    <button class="btn-remove" data-toggle="modal" data-target={`#exampleModal${product.book.id}`}>Xoá</button>
                                                    <div class="modal fade" id={`exampleModal${product.book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="exampleModalLabel">Xoá khỏi giỏ hàng</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    Xoá thành công
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button style={{ display: cart.length >= 1 ? "block" : "none" }} type="button" onClick={() => removeProduct(product.book.id)} class="btn btn-primary" data-dismiss="modal">Quay lại</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            )
                        })
                    }
                    <div className="row mt-3 ">
                        <div className="col-12 flex-row-reverse d-flex">
                            <button className="btn-pay" onClick={addToCart}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}