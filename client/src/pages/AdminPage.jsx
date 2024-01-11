
import { useSelector } from "react-redux";
import BookListPage from "./BookListPage";

function AdminPage(){
    let content={
        color:"btn btn-warning me-3",
        textDelete:"Delete",
        textEdit:"Edit",
        role:"admin"
    }
    
    return <>
    <BookListPage  content={content}/>
    </>
}

export default AdminPage