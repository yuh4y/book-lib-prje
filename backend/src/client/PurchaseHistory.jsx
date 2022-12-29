import { useState } from 'react';
import { useEffect } from 'react'
import './purchaseHistory.css'
import axios from 'axios';
export default function () {
    function getStatus(status) {
        switch (status) {
            case "INIT":
                return "Đã thanh toán"
            case "DELAY":
                return "Delay"
            case "CONFIRM":
                return "Đã xác nhận"
            case "COMPELETE":
                return "Hoàn thành"
        }

    }
    const [carts, setCarts] = useState("")
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/orders',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {
                setCarts(data.data.data.reverse())
                console.log(data.data.data)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <div class="container mt-5">
            <div class="card-wrapper container row">
                <div class="col">
                    {
                        carts && carts.map(cart => {
                            let orders = cart.orders
                            return orders.map(order => {
                                return (
                                    <div class="card-customer row mt-2">
                                        <div class="col-2">
                                            <img class="img-product" src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`} alt="" />
                                        </div>
                                        <div class="straight-line col-4 ml-3 pl-0">
                                            <div class="row pl-3">
                                                <h5>{order.book.title}</h5>
                                                <div>Tác giả: {order.book.author}</div>
                                            </div>
                                        </div>
                                        <div class="col-1 mr-5">
                                            <p className='text-center font-weight-bold'>
                                                Số lượng
                                            </p>
                                            <p className='text-center'>
                                                {order.quantity}
                                            </p>
                                        </div>
                                        <div class="col">
                                            <p className='font-weight-bold'>
                                                Trạng thái
                                            </p>
                                            <p>
                                                <div className="status-alert">
                                                    <span className="icon-buy-check"></span>
                                                    {getStatus(order.status)}
                                                </div>
                                            </p>
                                        </div>
                                        <div class="col">
                                            <p className='font-weight-bold'>
                                                Thời gian đặt hàng
                                            </p>
                                            <p>
                                                <div className="">
                                                    {cart.date}
                                                </div>
                                            </p>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                )
                            })
                        })
                    }
                </div>
            </div>
        </div>
    )
}