import React, { useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import BookList from '../component/BookList/BookList';
import Classes from './App.module.css';
const LOCAL_STORAGE_KEY = 'book.app';

function App() {
  const [books, setBooks] = useState([]);
  const bookNameRef = useRef();
  const bookAuthorRef = useRef();
  const bookPriceRef = useRef();
  const bookPagesRef = useRef()

  const toggleBook = (id) => {
    const newBooks = [...books];
    const book = newBooks.find(book => book.id === id);
    book.complate = !book.complate;
    setBooks(newBooks)
  }

  const handleClearBook = () => {
    const newBooks = books.filter(book => !book.complate);
    setBooks(newBooks)
  }


  useEffect(() => {
    const storageBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageBooks) setBooks(storageBooks)
    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books])

  const handleAddBook = (e) =>{
    const name = bookNameRef.current.value;
    const author = bookAuthorRef.current.value;
    const price = bookPriceRef.current.value;
    const pages = bookPagesRef.current.value;
    setBooks(prevBooks => {
      return [...prevBooks, {id:uuidv4(), name:name, author:author, price:price, pages:pages, complate:false }];
    })
    bookNameRef.current.value = null;
    bookAuthorRef.current.value = null;
    bookPriceRef.current.value = null;
    bookPagesRef.current.value = null;
  }

  return (
    <>
    
    <div className={Classes.App}>
    <h1>Enter a information about book</h1>
    <input ref={bookNameRef} type="text" placeholder="Enter a name" />
    <input ref={bookAuthorRef} type="text" placeholder="Enter a author"/>
    <input ref ={bookPriceRef}type="number"  placeholder="Enter a price"/>
    <input ref = {bookPagesRef}type="number" placeholder="Number of Pages"/>
    <div className={Classes.Green}>
    <button onClick={handleAddBook}>add book</button>
    </div>
    <div className={Classes.Red}>
    <button className={Classes.Red} onClick={handleClearBook}>remove books</button>
    </div>
    </div>
    
    <BookList books={books} toggleBook={toggleBook} />
    </>
  )
}

export default App;
