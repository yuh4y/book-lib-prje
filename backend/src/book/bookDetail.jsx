import Header from "../partner/header";
import { useState,useEffect } from "react";
import axios from "axios";
import './bookDetail.css'
import { useParams } from "react-router-dom";
function linkImg(img) {
  let url = "http://localhost:8080/api/files/"+img;
  return url;
}

export default function BookDetail(){
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [dateRelease,setDateRealse] = useState("");
    const [totalPage,setTotalPage] = useState("");
    const [typeBook,setTypeBook] = useState("");
    const [files,setFiles] = useState("");
    const [urls,setUrls] = useState([]);
    const [book,setBook] = useState({});
    const [img,setImg]= useState("")
    const [err,setErr]= useState("")
    let { id } = useParams();
    function previewFiles(e) {
      setFiles(e.target.files)
      setImg(URL.createObjectURL(e.target.files[0])); 
    }
    useEffect( ()=>{
      axios.get('http://localhost:8080/api/book/'+id)
      .then(data => 
        {
          setBook(data.data.data);
          let temp = data.data.data;
          setTitle(temp.title)
          setAuthor(temp.author)
          setTotalPage(temp.totalPage)
          setDescription(temp.description)
          setDateRealse(temp.dateRelease)
          setTypeBook(temp.typeBook)
          console.log(temp)
          setImg("http://localhost:8080/api/files/"+temp.imageFeatureBooks[0].url)
        })
      .catch(err => console.log(err))
    },[]);
    return (
      <div>
        {/* <Header></Header> */}
        <div class="container mt-5">
          <div className="row mt-5">
              <h3>
                Detail book
              </h3>
          </div>
              <form class="mt-5">
                <div class="wrapper row">
                    <div class="left col-6">
                        <div class="row d-flex justify-content-between">
                            <div class="col-5">
                                <label for="exampleInputEmail1">Title</label>
                                <input value={title}  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                            <div class="col-5">
                                <label for="exampleInputEmail1">Author</label>
                                <input value={author} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div className="col-12">
                            <label for="validationTextarea">Description</label>
                            <textarea value={description} class="form-control is-invalid"  id="validationTextarea" placeholder="Required description" rows="10"></textarea>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-between mt-2">
                            <div class="col-5">
                                <label for="exampleInputPassword1">Date release</label>
                                <input value={dateRelease} type="date" class="form-control" id="exampleInputPassword1" placeholder=""/>
                            </div>
                            <div class="col-5">
                                <label for="exampleInputPassword1">Total page</label>
                                <input value={totalPage} type="text" class="form-control" id="exampleInputPassword1" placeholder="Total page"/>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <label for="exampleInputPassword1">Type of book</label>
                                <select value={typeBook} class="custom-select custom-select-lg mb-3" placeholder="Enter type of book">
                                    <option selected value="Giải trí">Giải trí</option>
                                    <option value="Học Tập">Học tập</option>
                                    <option value="Khoa học">Khoa học</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="right col-6">
                        <label for="exampleInputPassword1">Image</label>
                        {/* <div class="custom-file">
                            <input type="file" class="custom-file-input" id="validatedCustomFile" multiple onChange={previewFiles} required/>
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                            <div class="invalid-feedback">Example invalid custom file feedback</div>
                        </div> */}
                        <div id="preview">
                            <img className="mt-3" src={img} alt="" />
                        </div>
                    </div>
                </div>
                {/* <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button> */}
            </form>
        </div>
      </div>
    );
}