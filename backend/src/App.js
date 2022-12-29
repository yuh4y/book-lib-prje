import BookDetail from './book/bookDetail';
import BookList from './book/bookList';
import Login from './user/login';
import SignUp from './user/signup';
import AddBook from './book/addBook';
import PaginatedItems from './book/test';
import UpdateBook from './book/updateBook';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Header from './partner/header';
import CLientListBook from './client/CLientListBook';
import ClientBookDetail from './client/ClientBookDetail';
import CartList from './client/CartList';
import PurchaseHistory from './client/PurchaseHistory';
import Orders from './book/orders';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Header></Header>
        {/* <BookList itemsPerPage={5}></BookList> */}
        {/* <Login></Login> */}
        {/* <AddBook></AddBook> */}
        {/* <UpdateBook></UpdateBook> */}
        <Routes>
          {/* Client */}
          <Route exact path="/" element={<CLientListBook itemsPerPage={6}/>} />
          <Route path="/book/:id" element={<ClientBookDetail/>} />
          <Route path="/cart" element={<CartList/>} />
          <Route path="/purchase-history" element={<PurchaseHistory/>} />
          {/* Admin */}
          <Route exact path="/admin" element={<BookList itemsPerPage={5}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="admin/insert-book" element={<AddBook/>} />
          <Route path="admin/update-book/:id" element={<UpdateBook/>} />
          <Route path="admin/book/:id" element={<BookDetail/>} />
          <Route path="admin/orders" element={<Orders/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
