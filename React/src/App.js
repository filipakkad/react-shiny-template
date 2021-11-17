import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {

	const [shinyMessage, setShinyMessage] = useState('');
	const [shinyUrls, setShinyUrls] = useState('');

	useEffect(() => {
		window.Shiny.addCustomMessageHandler("hello_react", (msg) => {
			setShinyMessage(msg);
		});

		window.Shiny.addCustomMessageHandler("urls", (urls) => {
			setShinyUrls(urls);
		});
	});

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					I AM THE MESSAGE FROM REACT
					<br/>
					<i>whereas</i>
					<br/>
					{shinyMessage}
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<img src={shinyUrls.ggplot_url_svg} className="App-logo" alt="GGPLOT2" />
			</header>
		</div>
	);
}

export default App;
