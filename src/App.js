import { Route } from "react-router-dom";

// component
import Header from "./component/common/Header"

import Main from "./component/main/Main"

import List from "./component/sub/List"
import View from "./component/sub/View"
import Write from "./component/sub/Write"
import Calender from "./component/sub/Calender"
import Setting from "./component/sub/Setting"

// style
import "./scss/style.scss";

function App() {
	return (
		<>
			<Route exact path="/" render={() => <Header name="나의 건강일지" type="header--main" />} />
			<Route path="/list" render={() => <Header name="리스트" type="header--back" />} />
			<Route path="/view" render={() => <Header name="상세" type="header--back" />} />
			<Route path="/write" render={() => <Header name="작성" type="header--back" />} />
			<Route path="/calender" render={() => <Header name="달력" type="header--back" />} />
			<Route path="/setting" render={() => <Header name="설정" type="header--back" />} />

			<Route exact path="/" component={Main} />
			<Route path="/list" component={List} />
			<Route path="/view" component={View} />
			<Route path="/write" component={Write} />
			<Route path="/calender" component={Calender} />
			<Route path="/setting" component={Setting} />
		</>
	);
}

export default App;
