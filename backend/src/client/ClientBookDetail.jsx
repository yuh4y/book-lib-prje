import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser'
import Header from '../partner/header'
import './clientBookDetail.css'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { TextField } from '@mui/material'

export default function () {
    const [book, setBook] = useState("")
    const [ratings, setRatings] = useState("")
    const [comment, setComment] = useState(null)
    const [star, setStar] = useState(null)
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    const [message, setMessage] = useState("")
    const [count, setCount] = useState("1")
    let { id } = useParams();
    function linkImg(img) {
        let url = "http://localhost:8080/api/files/" + img;
        return url;
    }
    function getStar(ratings) {
        // let total = 0
        // let avg = 0
        // // ratings.forEach(rating =>{
        // //     total+=rating.star;
        // // })
        // return total
        // console.log("rating",ratings)
        console.log("1")
    }

    function test(rating) {
        let res = ""

        for (let i = 1; i <= parseInt(rating.star); i++) {
            res += "<span class='fa fa-star checked'></span>";
        }
        for (let i = parseInt(rating.star) + 1; i <= 5; i++) {
            res += "<span class='fa fa-star'></span>";
        }
        return res;
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
    function submitForm(e) {
        e.preventDefault()
        let check = true

        if (!comment) {
            setErr("Vui lòng thêm nhận xét")
            check = false
        }
        if (!star) {
            setErr("Vui lòng thêm đánh giá!")
            check = false
        }
        if (check == true) {
            let bodyFormData = new FormData();
            bodyFormData.append("comment", comment)
            bodyFormData.append("star", star)
            axios({
                method: 'post',
                url: `http://localhost:8080/api/book/${id}/comments`,
                data: bodyFormData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data"
                },
            })
                .then(response => {
                    console.log(response)
                    window.location.href = `http://localhost:3000/book/${id}`
                })
                .catch(err => console.log(err))
        }
    }
    function chooseStar(e) {
        var x = parseFloat(e.target.dataset.star)
        var liStars = document.getElementsByClassName("star")
        for (let item of liStars) {
            if (item.classList.contains("selected"))
                item.classList.remove("selected")
        }
        for (let item of liStars) {
            if (parseFloat(item.dataset.star) <= x)
                item.classList.add("selected")
        }
        setStar(x)

    }
    function addToCart() {
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"))
            if (count < 1) {
                setMessage("Số lượng không hợp lệ")
            }
            else {
                let check = false
                cart.forEach(product => {
                    if (product.book.id == book.id) {
                        check = true
                        product.quantity = String(parseInt(product.quantity) + parseInt(count));
                        console.log(product)
                    }
                })
                if (check == true) {
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
                else {
                    cart.push({
                        "book": book,
                        "quantity": count
                    })
                    localStorage.setItem("cart", JSON.stringify(cart))
                }

                // console.log(JSON.stringify(cart))
            }
        }
        else {
            let cart = []
            let product = {
                "book": book,
                "quantity": count
            }
            cart.push(product)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/book/' + id)
            .then(data => {
                setBook(data.data.data)
                // console.log(data.data.data)
                setImg(`http://localhost:8080/api/files/${data.data.data.imageFeatureBooks[0].url}`)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:8080/api/book/${id}/comments`)
            .then(data => {
                setRatings(data.data.data)
                // console.log(data.data.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div class="container mt-5">
            <div class="row">
                <div class="col-6">
                    <img class="img-custom" src={img} alt="" />
                </div>
                <div class="wrapper-info col-6">
                    <div class="info-part row">
                        <div className="d-flex">
                            <h4 class="title text-truncate mr-3">{book.title}</h4>
                        </div>
                        <h7 class="title text-truncate">Tác giả: {book.author}</h7>
                        <div className="inline-block">
                            <span class="rating">
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </span>
                            <span className="straight-line"></span>
                            <a href='#review-history' class="qlt view-review">
                                {`(Xem ${ratings.length} đánh giá)`}
                            </a>
                        </div>
                        <div className="line"></div>
                    </div>
                    <div class="info-part row">
                        <h5>Thông tin chi tiết</h5>
                        <div class="type-book">
                            Thể loại: {book.typeBook}
                        </div>
                    </div>
                    <div class="info-part row mt-1">
                        <div class="mr-3">
                            Ngày phát hành: {book.dateRelease}
                        </div>
                        <div className='mt-1'>
                            Số trang: {book.totalPage} trang
                        </div>
                    </div>
                    <div class="info-part row mt-1">
                        <div class="text-justify des">
                            Mô tả chi tiết: {book.description}
                        </div>
                    </div>
                    <div className="line"></div>
                    <div class="row">
                        <div className="d-flex">
                            <span className='temp'>Số lượng </span>
                            <div class="mr-3 col-2">
                                <input defaultValue={1} type="number" onChange={e => setCount(e.target.value)} class="form-custom" min={0} />
                            </div>
                            <button class="btn-add-to-cart" onClick={addToCart} data-toggle="modal" data-target={`#exampleModal${book.id}`}>Thêm vào giỏ hàng</button>

                            <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Thông báo</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Thêm vào giỏ hàng thành công
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Quay lại</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="wrapper-review">
                    <div class="row">
                        <h5 id='review-history' className='heading-review'>
                            Đánh giá - Nhận xét từ khách hàng
                        </h5>
                    </div>
                    {
                        ratings && ratings.map(rating => {
                            return (
                                <div class="row mt-2 ml-3">
                                    <div className="col-2">
                                        <div className="d-flex pl-0">
                                            <h6 class="rating-username col-1 pl-0">{rating.user.username}</h6>
                                            <p style={{ color: 'rgb(128, 128, 137)' }} class='ml-0 mt-4'>{`(Đã viết đánh giá)`}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div class="ratings">
                                            {
                                                parse(test(rating))
                                            }
                                        </div>
                                        <div className="status-buy">
                                            <span className="icon-buy-check"></span>
                                            <span className="result">
                                                Đã mua hàng</span>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        Nhận xét <span className="straight-line"></span>
                                        {rating.comment}
                                    </div>
                                    <div className="line"></div>
                                </div>
                            )
                        })
                    }
                </div>
                <div class="wrapper-review pt-2">
                    <h5 className=''>Đánh giá chất lượng sản phẩm</h5>
                    <div>{err}</div>
                    <form id="usrform" className="pl-0 form-cmt">
                        <div className="">
                            <div className="fomt-cmtt">
                                <span>Chất lượng sản phẩm</span>
                                <span className="straight-line"></span>
                                <div className='star-wrap'>
                                    <ul style={{ direction: 'rtl' }} class="ratings">
                                        <li class="star" onClick={chooseStar} data-star="5"></li>
                                        <li class="star" onClick={chooseStar} data-star="4"></li>
                                        <li class="star" onClick={chooseStar} data-star="3"></li>
                                        <li class="star" onClick={chooseStar} data-star="2"></li>
                                        <li class="star" onClick={chooseStar} data-star="1"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="cmt-wrap">
                            <TextField
                                className='cmt'
                                label='Chia sẻ nhận xét về sản phẩm'
                                multiline
                                rows={4}
                                onChange={e => setComment(e.target.value)}>
                            </TextField>
                        </div>
                        <div className="cmt-wrap cmt">
                            <button class="btn-comment" onClick={submitForm}>
                                Hoàn thành
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}