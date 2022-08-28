import { Route } from "react-router-dom";

// component
import Header from "./component/common/Header"
import Nav from "./component/common/Nav"

import Main from "./component/main/Main"

import List from "./component/sub/List"
import Write from "./component/sub/Write"

// style
import "./scss/style.scss";

function App() {
	return (
		<>
			<Route exact path="/" render={() => <Header name="메인" type="header--main" />} />
			<Route path="/list" render={() => <Header name="리스트" type="header--back" />} />
			<Route path="/write" render={() => <Header name="작성" type="header--back" />} />

			<Route exact path="/" component={Main} />
			<Route path="/list" component={List} />
			<Route path="/write" component={Write} />

			<Nav />
		</>
	);
}

export default App;
