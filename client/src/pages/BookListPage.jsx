import { useEffect, useState } from "react";
import BookCard from "../components/Shared/BookCard";
import DropDownList from "../components/Shared/DropDownList";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from 'antd';
import { toast } from "react-toastify";

function BookListPage(props) {
  const [searchParams]=useSearchParams()
  const navigate=useNavigate()
  const [data,setData]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [plan,setPlan]=useState("")
  const [genre,setGenre]=useState([])

  const value=searchParams.get('genre')
  let content;
  let bookData=[]
  if (props.content) {
    content = props.content;
  }

  useEffect(() => {
    async function getBooks(){
      setIsLoading(true);
      setData([])
      let response
      try{
        if(!value){
         response=await fetch(import.meta.env.VITE_SERVER_URL+'/book/allbook'+`?pageNumber=${pageNumber}`,{
          method:"GET",
          credentials:"include"
         })
      }else{
        response=await fetch(import.meta.env.VITE_SERVER_URL+'/book/genre'+`?genre=${value}`,{
          method:"GET",
          credentials:"include"
        })
      }
      if(response.status===401){
        toast.error('Token Expired')
      navigate('/login')
      }
      const bookData=await response.json()
      
      if(bookData.plan==='ADMIN' || bookData.plan==='MODERATE'|| bookData.plan==='BOOKWORM'){
        setGenre(['','Comics','Business','Motivation','Fiction','Biography','Mystery'])
        setPlan(bookData.plan)
      }else if(bookData.plan==='LITE'){
        setGenre(['','Comics','Motivation','Fiction','Biography','Mystery'])
        setPlan(bookData.plan)
      }else{
        setGenre(['','Comics','Motivation','Fiction','Biography','Mystery'])
        setPlan(bookData.plan)
      }
      if(bookData.count){
        setCount(bookData.count)
      }
        if(bookData.success){
          setData(bookData.books)
        }else{
          throw new Error(bookData.error)
        }
    }catch(error){
      setError(error.message);
    }
      setIsLoading(false);
    }
    getBooks()
  }, [value,pageNumber]);


  
  let mainContent;

  if (error) {
    mainContent = <h4 className="text-center">{error||  `Something went wrong`}</h4>;
  }

  if(data.length>0){
    bookData=  data.map((item)=>{
      return {
        id:item._id,
        image:item.image.url,
        title:item.title,
        price:item.price,
        author:item.author,
      }
    })
  }

  return (
    <section id="booklist">
      <div className="container my-5">
        
          {isLoading &&  <div className="text-center">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>}
        { bookData.length==0 && mainContent}
        {bookData.length>0 && <><div className="btn-group mb-5">
          <button
            className="btn btn-light btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Genre
          </button>
          <ul className="dropdown-menu">
            {genre.map(item=><DropDownList key={item} categories={item}/>)}
          </ul>
        </div>
        <div className="row row-cols-3 gap-3 justify-content-evenly">
          <BookCard books={bookData} content={content} />
        </div>
      {value===null && <div className="text-center my-5">
          <Pagination current ={pageNumber} total={count} onChange={(prev)=> setPageNumber(prev)} pageSize={3} />
       </div>}
        </>}
      </div>
      
    </section>
  );
}

export default BookListPage;
