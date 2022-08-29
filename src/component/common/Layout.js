function Layout(props) {
  return (
    <div className={`layout ${props.className}`}>
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default Layout