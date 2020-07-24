import React from 'react'

const book = ({book, toggleBook}) => {
    function changeBook() {
        toggleBook(book.id)
    }
    return (
            <tr>
                <td>{<input type="checkbox" checked={book.complate} onChange={changeBook}></input>}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.price + "$"}</td>
                <td>{book.pages}</td>
            </tr>
    )
}
export default book;