import React from 'react'

export const Footer = () => {
  let footerStyle = {
    position: "relative",
    margin: "10% 0 0",
    width: "100%",
    // border: "2px solid red"
  }
  return (
    <footer className="bg-dark text-light py-3" style= {footerStyle} >
        <p className="text-center">
          Copyright &copy;MyTodosList.com
          </p>
    </footer>
  )
}
