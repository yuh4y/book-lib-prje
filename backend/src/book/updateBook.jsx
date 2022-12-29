import Header from "../partner/header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import moment from 'moment'
import './addBook.css'

export default function UpdateBook(props) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [dateRelease, setDateRealse] = useState("");
    const [totalPage, setTotalPage] = useState("");
    const [typeBook, setTypeBook] = useState("");
    const [files, setFiles] = useState("");
    const [urls, setUrls] = useState([]);
    const [book, setBook] = useState({});
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    let { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8080/api/book/' + id)
            .then(data => {
                setBook(data.data.data);
                let temp = data.data.data;
                setTitle(temp.title)
                setAuthor(temp.author)
                setTotalPage(temp.totalPage)
                setDescription(temp.description)
                setDateRealse(temp.dateRelease)
                setTypeBook(temp.typeBook)
                console.log(temp)
                setImg("http://localhost:8080/api/files/" + temp.imageFeatureBooks[0].url)
            })
            .catch(err => console.log(err))
    }, []);
    function handleImg(e) {
        setFiles(e.target.files)
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    function Cancel() {
        window.location.href = 'http://localhost:3000/admin';
    }
    function submitForm(e) {
        e.preventDefault();
        let check = true
        if (!files) {
            check = false
            setErr("Vui lòng thêm ảnh bìa!")
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
        if (check == true) {
            let bodyFormData = new FormData();
            bodyFormData.append("title", title);
            bodyFormData.append("author", author);
            bodyFormData.append("description", description);
            bodyFormData.append("dateRelease", dateRelease);
            bodyFormData.append("totalPage", totalPage);
            bodyFormData.append("typeBook", typeBook);
            if (files != null) {
                for (let i = 0; i < files.length; i++) {
                    bodyFormData.append("files", files[i]);
                }
            }
            console.log(title)
            axios({
                method: 'put',
                url: 'http://localhost:8080/api/book/' + id,
                data: bodyFormData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
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
                        <h3>Cập nhật thông tin sách</h3>
                    </div>

                    <form class="body-page row">
                        <div class="col-6">
                            <div>
                                <div className="info-input">
                                    <TextField
                                        value={title}
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
                                        value={author}
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
                                        value={typeBook}
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
                                        value={totalPage}
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
                                        value={dateRelease}
                                        onChange={(e) => setDateRealse(e.target.value)}
                                        label="Ngày xuất bản *"
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
                                        value={description}
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
        </div >
    );
}