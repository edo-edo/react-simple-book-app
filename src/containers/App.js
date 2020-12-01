import React, { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import BookList from '../component/BookList/BookList';
import Classes from './App.module.css';
const LOCAL_STORAGE_KEY = 'book.app';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storageBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageBooks) setBooks(storageBooks)
    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books])

  const { register, handleSubmit, reset,  errors } = useForm()

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


  const handleAddBook = (data) =>{
    const newBook = { id:uuidv4(), complate:false, ...data }
   
    setBooks(prevBooks => {
      return [...prevBooks, newBook];
    })
    reset()
  }

  const displayErrors = inputName =>  (
      <div className={Classes.Errors} >
        {` ${inputName} is required.`}
      </div>
    )

  return (
    <>
      <form className={Classes.App} onSubmit={handleSubmit(handleAddBook)}>
        <h1>Enter a information about book</h1>
        <input ref={register({ required: true })}  type="text" name="name" placeholder="Enter a name" />
        <div className={Classes.ErrorsDisplay} >
          {errors.name && displayErrors(errors.name.ref.name)}
        </div>

        <input ref={register({ required: true })} type="text" name="author" placeholder="Enter a author"/>
        <div className={Classes.ErrorsDisplay} >
          {errors.author && displayErrors(errors.author.ref.name)}
        </div>

        <input ref ={register({ required: true })} type="number" name="price"  placeholder="Enter a price"/>
        <div className={Classes.ErrorsDisplay} >
          {errors.price && displayErrors(errors.price.ref.name)}
        </div>

        <input ref = {register({ required: true })} type="number" name="pages"  placeholder="Number of Pages"/>
        <div className={Classes.ErrorsDisplay} >
          {errors.pages && displayErrors(errors.pages.ref.name)}
        </div>

        <div >
          <div className={Classes.Green}>
            <button type="submit">add book</button>
          </div>

          <div className={Classes.Red}>
            <button className={Classes.Red} type="button"  onClick={handleClearBook}>remove books</button>
          </div>
        </div>
      </form>
    
    <BookList books={books} toggleBook={toggleBook} />
    </>
  )
}

export default App;
