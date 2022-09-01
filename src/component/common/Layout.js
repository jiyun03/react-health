import Nav from "./Nav"

function Layout(props) {
  return (
    <div className={`layout ${props.className || ""}`}>
      <div className="container">
        {props.children}
      </div>
      <Nav/>
    </div>
  )
}

export default Layout