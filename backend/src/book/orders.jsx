import { useState } from 'react';
import { useEffect } from 'react'
import './orders.css'
import axios from 'axios';
export default function Orders(){
    function getStatus(status){
        switch (status) {
            case "INIT":
                return "Create order"
            case "DELAY":
                return "Delay order"
            case "CONFIRM":
                return "Confirm order"
            case "COMPELETE":
                return "Compelete order"
        }

    }
    const [carts, setCarts] = useState("")
    const [arr,setArr] = useState([])
    function checked(e){
        if(e.target.value == "init" && e.target.checked == true && arr.indexOf("INIT")==-1){
            let temp = arr
            temp.push("INIT")
            setArr(temp)
        }
        else if(e.target.value == "init" && e.target.checked == false && arr.indexOf("INIT")!=-1){
            let temp = arr
            temp = temp.filter( x => 
                x != "INIT"
            )
            setArr(temp)
            
        }
        else if(e.target.value == "confirm" && e.target.checked == true && arr.indexOf("CONFIRM")==-1){
            let temp = arr
            temp.push("CONFIRM")
            setArr(temp)
        }
        else if(e.target.value == "delay" && e.target.checked == true && arr.indexOf("DELAY")==-1){
            let temp = arr
            temp.push("DELAY")
            setArr(temp)
        }
        else if(e.target.value == "compelete" && e.target.checked == true && arr.indexOf("CONPELETE")==-1){
            let temp = arr
            temp.push("CONPELETE")
            setArr(temp)
        }
        console.log(arr)
    }
    useEffect(()=>{
    axios({
        method: 'get',
        url: 'http://localhost:8080/api/orders',
        headers: { 
            "Authorization":"Bearer "+localStorage.getItem("token")
        }})
        .then(data => {
            setCarts(data.data.data.reverse())
            console.log(data.data.data)
        })
        .catch(err => console.log(err));
    },[])
    return (
        <div class="container mt-5">
        <div className='filter-status'>
            <div className="row">
                <div class="form-check form-switch col-5">
                    <input class="form-check-input" type="checkbox" id="init"  value="init"  onChange={(e)=>checked(e)}/>
                    <label class="form-check-label" for="init">Init order</label>
                </div>
                <div class="form-check form-switch col-5">
                    <input class="form-check-input" type="checkbox" id="confirm" value="confirm"  onChange={(e)=>checked(e)}/>
                    <label class="form-check-label" for="confirm">Confirm order</label>
                </div> 
                <div class="form-check form-switch col-5">
                    <input class="form-check-input" type="checkbox" id="delay" value="delay"  onChange={(e)=>checked(e)} />
                    <label class="form-check-label" for="Delay">Delay order</label>
                </div>
                <div class="form-check form-switch col-5">
                    <input class="form-check-input" type="checkbox" id="compelete" value="compelete"  onChange={(e)=>checked(e)}/>
                    <label class="form-check-label" for="Compelete">Compelete order</label>
                </div>
            </div>
            <div className='mt-3 mb-2'>
                <button className="btn btn-success">
                    Filter
                </button>
            </div>
        </div>
        <div class="card-wrapper container row">
            <div class="col">
                {
                   carts && carts.map(cart => {
                        let orders = cart.orders
                        return orders.map(order => {
                            return (
                                <div class="card-customer row mt-2">
                                    <div class="col-2">
                                        <img class="img-product" src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`} alt=""/>
                                    </div>
                                    <div class="col-4 ml-3 pl-0">
                                        <div class="row pl-0">
                                            <div className="d-flex pl-0">
                                                <p>{order.book.title}</p>
                                                <span>-</span>
                                                <p>{order.book.author}</p>
                                            </div>
                                        </div>
                                        <div class="row text-justify ">
                                            {order.book.description}
                                        </div>
                                    </div>
                                    <div class="col-1 ml-2">
                                        <p className='text-center font-weight-bold'>
                                            Quantity
                                        </p>
                                        <p className='text-center'>
                                            {order.quantity}
                                        </p>
                                    </div>
                                    <div class="col-2">
                                        <p className='font-weight-bold'>
                                            Status
                                        </p>
                                        <div>
                                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                                <option selected value="INIT">{getStatus(order.status)}</option>
                                                <option value="CONFIRM">Confirm order</option>
                                                <option value="DELAY">Delay order</option>
                                                <option value="COMPELETE">Compelete order</option>
                                            </select>
                                            <button className="btn btn-success">Confirm</button>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <p className='font-weight-bold'> 
                                            Initialization time
                                        </p>
                                        <p>
                                            <div className="">
                                                {cart.date}
                                                {/* <input autocomplete="off" type="datetime-local" id="meeting-time" name="meeting-time" value={cart.date}/> */}
                                            </div>
                                        </p>
                                    </div>
                                    <div class="col">
                                        <p className='text-center font-weight-bold h4 text-success'> 
                                            Cart id
                                        </p>
                                        <p>
                                            <div className="text-center font-weight-bold h4 text-success">
                                                {cart.id}
                                            </div>
                                        </p>
                                    </div>
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