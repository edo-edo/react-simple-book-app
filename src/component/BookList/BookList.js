import React from 'react'
import Book from './Book/Book';
import Style from './BookList.css'
const bookList = ({books, toggleBook}) => {
    return (
        <div className={Style}>
            <table>
            <tr>
            <th>Complate</th>
            <th>Name of book</th>
            <th>Author</th>
            <th>Price</th>
            <th>Number of pages</th>
            </tr>
            {
                books.map(book => {
                    return <Book key={book.id} toggleBook={toggleBook} book={book} />
                })
            }
            </table>
        </div>
    )
}
export default bookList;