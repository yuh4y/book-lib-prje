import { useState, useEffect } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './bookList.css';
import { useNavigate } from "react-router-dom";

export default function BookList({ itemsPerPage }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [idDelete, setIdDelete] = useState(null)
    const [username, setUsername] = useState(null);
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/" + post;
        return url;
    }
    function IdDelete(id) {
        setIdDelete(id);
    }
    function deleteBook() {
        if (idDelete != null) {
            axios({
                method: 'delete',
                url: 'http://localhost:8080/api/book/' + idDelete,
                data: null,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            })
                .then(response => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/admin"
                    // navigate("/admin")     
                })
                .catch(err => console.log(err))
            setIdDelete(null)
        }
    }
    function Items({ currentItems }) {
        return (
            <table class="table table-bordered">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">ID</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Ngày phát hành</th>
                        <th scope="col">Tổng số trang</th>
                        <th scope="col">Ảnh bìa</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {currentItems &&
                        currentItems.map(book => {
                            return (
                                <tr key={book.id}>
                                    <th scope="row">
                                        <Link to={`book/${book.id}`} style={{ textDecoration: "none", color: "black", fontWeight: "normal" }}>{book.id}</Link>
                                    </th>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.typeBook}</td>
                                    <td>{book.description}</td>
                                    <td scope="col">{book.dateRelease}</td>
                                    <td scope="col">{book.totalPage}</td>
                                    <td scope="col-2" >
                                        <img class="img-bd" src={
                                            linkImg(book.imageFeatureBooks[0].url)
                                        } alt="" />
                                    </td>
                                    <td scope="col" className="action">
                                        <Link style={{ display: username ? "inline-block" : "none" }} to={`update-book/${book.id
                                            }`} className="btn-view btn-cus">
                                            Sửa
                                        </Link>
                                        <button style={{ display: username ? "inline-block" : "none" }} onClick={() => IdDelete(book.id)} className="btn-delete btn-cus" data-toggle="modal" data-target={`#exampleModal${book.id}`}>
                                            Xoá
                                        </button>
                                        <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Xác nhận xoá</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        Bạn chắc chắn muốn xoá?
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
                                                        <button type="button" onClick={() => deleteBook()} data-dismiss="modal" class="btn btn-primary">Xoá</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        );
    }
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        axios.get('http://localhost:8080/api/books')
            .then(data => {
                setBooks(data.data.reverse())
                const endOffset = itemOffset + itemsPerPage;
                console.log(`Loading items from ${itemOffset} to ${endOffset}`);
                setCurrentItems(data.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(data.data.length / itemsPerPage));
            })
            .catch(err => console.log(err));
    }, [itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return (
        <div>
            <div className="container mt-5">
                <div class="d-flex justify-content-between">
                    <h2>Danh sách</h2>
                    <div className="btn-add-wrap">
                        <Link to="insert-book" className="btn-add">
                            + Thêm sách mới
                        </Link>
                        <Link to="orders" className="btn-order">
                            Orders
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <Items currentItems={currentItems} />
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}