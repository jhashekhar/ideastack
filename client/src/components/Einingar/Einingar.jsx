import React, { useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import { Link, useHistory, useParams } from "react-router-dom"
import { TopBar, SideBar } from "../Dashboard/Dashboard.jsx"


const FETCH_BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`

const FETCH_BOOK = gql`
  query ($id: ID!){
    getBook(id: $id) {
      id
      title
      author
    }
  }
`

const ADD_BOOK = gql`
  mutation ($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`

// styles
const linkStyle = "font-mono text text-blue-600 hover:text-blue-400 tracking-normal"
const inputStyle = "h-8 w-64 px-1 bg-gray-100 border border-gray-400 focus:outline-none focus:border focus:border-blue-500 rounded-sm"
const buttonSytle = "h-8 px-2 my-0.25 bg-blue-600 rounded-sm"


export function EditBook() { 
  const { id } = useParams()
  const { loading, error, data } = useQuery(FETCH_BOOK, { variables: { id }})

  if (loading) return "Loading..."
  if (error) return `Error ${error.message}`
  
  const book = data.getBook
  
  return (
    <div>
      <p>{book.id}</p> <p>{book.title}</p> <p>{book.author}</p>
    </div>
  )
}


const STATUS = {
  active: {text: "Active", color: "text-green-700"},
  complete: {text: "Complete", color: "text-purple-700"},
  procrastination: {text: "Procrastination", color: "text-red-700"}
}


export function GetBooks() {
  const { loading, error, data } = useQuery(FETCH_BOOKS, { fetchPolicy: "network-only" })
  
  let history = useHistory()
  
  if (loading) return "Loading..."
  if (error) return `Error ${error.message}`
  
  console.log(data.books)

  const handleClick = (event, id) => {
    event.preventDefault()
    history.push(`/edit/${id}`)
  }

  return (
      <div className="px-10 pt-10">
        <p className="pb-10"><span className="font-mono text-lg">List of Books</span></p>
        <div className="grid grid-rows pb-3 gap-2 shadow-lg">
          <div className="grid grid-cols-4 h-10 w-full px-4 py-2 bg-gray-100 gap-2 rounded-t-md ">
            <div className="col-span-1 place-self-center"><span className="font-sans text-sm text-gray-600 font-bold tracking-wide">TITLE & AUTHOR</span></div>
            <div className="col-span-1 place-self-center"><span className="font-sans text-sm text-gray-600 font-bold tracking-wide">TAGS</span></div>
            <div className="col-span-1 place-self-center"><span className="font-sans text-sm text-gray-600 font-bold tracking-wide">PERMISSIONS</span></div>
            <div className="col-span-1 place-self-center"><span className="font-sans text-sm text-gray-600 font-bold tracking-wide">STATUS</span></div>
          </div>
        {data.books.map((book) => { 
          return (
            <div key={book.id}>
              <div className="grid grid-cols-4 h-9 w-full px-4 py-1 gap-2">
                <div className="col-span-1 pl-5 place-self-left text-sm tracking-wide">
                  <button className="text-blue-700" onClick={(event) => handleClick(event, book.id)}>{book.title}</button>
                </div> 
                <div className="col-span-1 place-self-center text-sm tracking-wide">Tags</div>
                <div className="col-span-1 place-self-center text-sm tracking-wide">Arya, Sansa</div>
                <div className="col-span-1 place-self-center">
                  <span className="bg-white font-sans text-green-700 text-sm tracking-wide">Active</span>
                </div>
              </div>
            </div>
          )}
        )}
      </div>
      </div>
  )
}


export function AddBook() {
  const [addToRL, { data }] = useMutation(ADD_BOOK)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [toggleForm, setToggleForm] = useState(true)
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorAuthor, setErrorAuthor] = useState(false)

  const handleTitle = (event) => {
    if (event.target.value !== '') { 
      setErrorTitle(false)
      setTitle(event.target.value)
    } 
  }

  const handleAuthor = (event) => {
    if (event.target.value !== '') {
      setErrorAuthor(false)
      setAuthor(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (title === '' && title === '') {
      setErrorTitle(true)
    } else if (author === '') {
      setErrorAuthor(true)
    } else if (title === '') {
      setErrorAuthor(tr)
      setErrorTitle(true)
    } else {
      addToRL(
        { variables: { title: bookTitle, author: bookAuthor }}
      ).catch(err => console.log(err))
    
      setMessage("🎉 Book added Successfully!")
      setToggleForm(!toggleForm)

      //history.push("/rl")
      console.log("After mutation: ", data)
    }
  }

  return (
    <div className="pt-8">
      { toggleForm?
      <form>
        <p className="pb-5 font-mono ">Add a new book that you've read</p>
        <p className="pt-2">
          <input className={inputStyle} type="text" name="title" placeholder="Title" onChange={handleTitle}/>
          {errorTitle? <span className="font-mono text-red-600 text-sm"> Title field is empty!</span> : null}
        </p>

        <p className="pt-2">
          <input className={inputStyle} type="text" name="author" placeholder="Author" onChange={handleAuthor}/>
          {errorAuthor? <span className="font-mono text-red-600 text-sm"> Author field is empty!</span> : null}
        </p>
        
        <p className="pt-4">
          <button className={buttonSytle} onClick={handleSubmit}>
            <span className="font-sans text-white">
              Add
            </span>
          </button>
        </p>
      </form>
      :
      <p><span className="font-mono text-md text-green-600 tracking-wide">{message}</span></p>
      }
    </div>
  )
}


function Books() {
  const [updateToggle, setUpdateToggle] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setUpdateToggle(!updateToggle)
  }

  const style = "font-mono text hover:text-blue-400 tracking-normal"

  return (
    <div className="mx-10 mt-10">
      <div>
        <TopBar />
        <SideBar />
      </div>
      
      <div className="grid grid-cols-3">
        <div className="col-span-2 pt-10">
          <p className="pt-2"><Link className={linkStyle} to="/rl">My Reading List</Link></p>
          <p className="pt-2">
            <button 
              onClick={handleClick} 
              className={updateToggle? "text-blue-400 " + style : "text-blue-600 " + style }>Update the Reading List</button></p>
           {updateToggle? <AddBook /> : null}
        </div>
      </div>
      </div>
  )
}

export default Books
