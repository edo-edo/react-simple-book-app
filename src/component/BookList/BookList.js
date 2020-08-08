import React from 'react'
import Book from './Book/Book';
import Style from './BookList.css'
const bookList = ({books, toggleBook}) => {
    return (
        <div className={Style}>
            <table>
                <thead>
                    <tr>
                    <th>Complate</th>
                    <th>Name of book</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Number of pages</th>
                    </tr>
                 </thead>
            <tbody>
            {
                books.map(book => {
                    return <Book key={book.id} toggleBook={toggleBook} book={book} />
                })
            }
            </tbody>
            </table>
        </div>
    )
}
export default bookList;
