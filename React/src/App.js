import { useState } from 'react';
import logo from './logo.svg';
import shinyLogo from './shiny_logo.png';
import './App.css';
import PeopleTable from './Table';

function App() {
	const [shinyMessage, setShinyMessage] = useState('');
	const [shinyUrls, setShinyUrls] = useState('');
	const [ggplotTitle, setGgplotTitle] = useState('');
	const [ggplotUrl, setGgplotUrl] = useState(null);
	const [peopleData, setPeopleData] = useState([]);
	const [isLoadingPeopleData, setIsLoadingPeopleData] = useState(false);

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
		updatePlot(urls.ggplot_url_svg)
	});

	const fetchPeopleData = async (urls) => {
		setIsLoadingPeopleData(true);
		await fetch(urls.example_get_people_url).then((data) => data.json()).then((data) => {
			setPeopleData(data);
		}).finally(() => setIsLoadingPeopleData(false));
	}

	const updateData = () => {
		fetchPeopleData(shinyUrls);
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
				<p>HELLO FROM REACT</p>
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
							And below randomly generated data using <code>randomNames</code> package
							fetched from Shiny through REST API:
						</p>
						<button
							type='button'
							onClick={updateData}
							className='shiny-button'
						>
							Generate list
						</button>
						{isLoadingPeopleData ? <p>Generating 500,000 rows</p>: peopleData.length ? <PeopleTable data={peopleData}/> : null}
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
