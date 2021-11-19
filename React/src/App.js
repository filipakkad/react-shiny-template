import { useState } from "react";
import logo from "./logo.svg";
import shinyLogo from "./shiny_logo.png";
import "./App.css";

function App() {
	const [shinyMessage, setShinyMessage] = useState("");
	const [shinyUrls, setShinyUrls] = useState("");
	const [data, setData] = useState([]);

	/* Receiving the data through websocket */
	window.Shiny.addCustomMessageHandler("message_from_shiny", (msg) => {
		setShinyMessage(msg);
	});

	/* Sending the message to Shiny through websocket */
	const sendMessage = (e) => {
		window.Shiny.setInputValue("message_from_react", e.target.value);
	};

	/* Receiving REST API URLs */
	window.Shiny.addCustomMessageHandler("urls", (urls) => {
		setShinyUrls(urls);
		fetchData(urls);
	});

	const fetchData = async (urls) => {
		const fetchedData = await fetch(urls.example_get_data_url).then((data) =>
			data.json()
		);
		setData(fetchedData);
	};

	const item_list = data.map((item) => (
		<li key={item.PID}>{`${item.county} (${item.state})`}</li>
	));

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<img src={logo} className="App-logo" alt="logo" />
					<img src={shinyLogo} className="App-logo" alt="logo" />
				</div>
				<p>
					I AM THE MESSAGE FROM REACT
					<br />
					<i>whereas</i>
					<br />
					{shinyMessage}
					<br />
					<i>but hey, you can send message back to Shiny (check your logs):</i>
					<br />
					<input type="text" onChange={sendMessage} />
				</p>
				<p>
					And here <code>ggplot</code> fetched from Shiny through REST API:
				</p>
				<img src={shinyUrls.ggplot_url_svg} alt="GGPLOT2" />
				<p>
					And below counties from <code>midwest</code> dataset fetched from Shiny through REST API:
				</p>
				<ul>{item_list}</ul>
			</header>
		</div>
	);
}

export default App;
