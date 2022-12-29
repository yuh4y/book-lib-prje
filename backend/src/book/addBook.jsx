import Header from "../partner/header";
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import moment from 'moment'
import './addBook.css'

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [dateRelease, setDateRealse] = useState("");
    const [totalPage, setTotalPage] = useState("");
    const [typeBook, setTypeBook] = useState("");
    const [files, setFiles] = useState("");
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")

    function handleImg(e) {
        setFiles(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));

        const lableImg = document.querySelector('.js-label-img');
        document.getElementById("title-prev").innerHTML = "";
        lableImg.classList.add('hide-border');
    }

    function Cancel() {
        window.location.href = 'http://localhost:3000/admin';
    }

    function submitForm(e) {
        let check = true
        if (!files) {
            check = false
            setErr("Vui lòng thêm ảnh bìa !")
        }
        if (!totalPage) {
            check = false
            setErr("Vui lòng điền số trang !")
        }
        if (!dateRelease) {
            check = false
            setErr("Vui lòng điền ngày phát hành !")
        }
        if (!description) {
            check = false
            setErr("Vui lòng điền mô tả !")
        }
        if (!author) {
            check = false
            setErr("Vui lòng điền tác giả !")
        }
        if (!title) {
            check = false
            setErr("Vui lòng điền tiêu đề !")
        }
        e.preventDefault();
        let bodyFormData = new FormData();
        if (check == true) {
            bodyFormData.append("title", title);
            bodyFormData.append("author", author);
            bodyFormData.append("description", description);
            bodyFormData.append("dateRelease", dateRelease);
            bodyFormData.append("totalPage", totalPage);
            bodyFormData.append("typeBook", typeBook);
            for (let i = 0; i < files.length; i++) {
                bodyFormData.append("files", files[i]);
            }

            console.log(bodyFormData.entries, files)
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/book/insert',
                data: bodyFormData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data"
                },
            })
                .then(response => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/admin"
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div class="wrapper">
                <div class="book-container">
                    <div class="heading">
                        <h3>Thêm sách</h3>
                    </div>

                    <form class="body-page row">
                        <div class="col-6">
                            <div>
                                <div className="info-input">
                                    <TextField
                                        onChange={(e) => setTitle(e.target.value)}
                                        label="Tiêu đề *"
                                        variant="standard"
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                                <div className="info-input">
                                    <TextField
                                        onChange={(e) => setAuthor(e.target.value)}
                                        label="Tác giả *"
                                        variant="standard"
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                                <div className="info-input">
                                    <TextField
                                        onChange={(e) => setTypeBook(e.target.value)}
                                        label="Thể loại *"
                                        variant="standard"
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                                <div className="info-input">
                                    <TextField
                                        onChange={(e) => setTotalPage(e.target.value)}
                                        type="number"
                                        label="Số trang *"
                                        variant="standard"
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                                <div className="info-input">
                                    <TextField
                                        onChange={(e) => setDateRealse(e.target.value)}
                                        label="Ngày xuất bản *"
                                        defaultValue={moment().format("yyyy-MM-DD")}
                                        variant="standard"
                                        type={"date"}
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                                <div class="desc-cus info-input">
                                    <TextField
                                        multiline
                                        rows={5}
                                        onChange={(e) => setDescription(e.target.value)}
                                        label="Mô tả"
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                    >
                                    </TextField>
                                </div>

                            </div>
                        </div>
                        <div class="img-field col-6">
                            <input type="file" id="input" multiple onChange={handleImg} required accept="image/*" />
                            <label for="input" class="label-img js-label-img">
                                <div className="img-cus image-container img-cus-hov">
                                    <img id="preview" src={img} alt="" width="100%" height="100%" />
                                </div>
                                <span id="title-prev">Click to upload image</span>
                            </label>
                        </div>
                        <div className="err">
                            {err}
                        </div>
                        <div className="btn-submit-wrap">
                            <button type="submit" class="btn-cancel" onClick={Cancel}>Huỷ</button>
                            <button type="submit" class="btn-save" onClick={submitForm}>Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}