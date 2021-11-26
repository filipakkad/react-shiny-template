import { useState } from 'react';
import logo from './logo.svg';
import shinyLogo from './shiny_logo.png';
import './App.css';

function App() {
	const [shinyMessage, setShinyMessage] = useState('');
	const [shinyUrls, setShinyUrls] = useState('');
	const [ggplotTitle, setGgplotTitle] = useState('');
	const [ggplotUrl, setGgplotUrl] = useState(null);
	const [data, setData] = useState([]);

	/* Receiving the data through websocket */
	window.Shiny.addCustomMessageHandler('message_from_shiny', (msg) => {
		setShinyMessage(msg);
	});

	/* Sending the message to Shiny through websocket */
	const sendMessage = (e) => {
		window.Shiny.setInputValue('message_from_react', e.target.value);
	};

	/* Receiving REST API URLs */
	window.Shiny.addCustomMessageHandler('urls', (urls) => {
		setShinyUrls(urls);
		fetchData(urls);
		updatePlot(urls.ggplot_url_svg)
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

	const updateData = () => {
		fetchData(shinyUrls);
	};

	const updatePlot = (url) => {
		setGgplotUrl(`${url}&title=${ggplotTitle}`);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<div>
					<img src={logo} className='App-logo' alt='logo' />
					<img src={shinyLogo} className='App-logo' alt='logo' />
				</div>
				<p>I AM THE MESSAGE FROM REACT</p>
				<i>whereas</i>
				<p>{shinyMessage}</p>
				<p>but hey, you can send message back to Shiny (check your logs or notification):</p>
				<input type='text' onChange={sendMessage} />
				<div className='shiny-sections'>
					<div className='shiny-section'>
						<p>
							And here <code>ggplot</code> fetched from Shiny through REST API:
						</p>
						<input
							type='text'
							placeholder='New title'
							onChange={(e) => setGgplotTitle(e.target.value)}
						/>
						<button
							type='button'
							onClick={() => updatePlot(shinyUrls.ggplot_url_svg)}
							className='shiny-button'
						>
							Update title!
						</button>
						{ggplotUrl ? <img src={ggplotUrl} alt='GGPLOT2'/> : null}
					</div>
					<div className='shiny-section'>
						<p>
							And below random counties from <code>midwest</code> dataset
							fetched from Shiny through REST API:
						</p>
						<button
							type='button'
							onClick={updateData}
							className='shiny-button'
						>
							Reload list
						</button>
						<ul>{item_list}</ul>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
