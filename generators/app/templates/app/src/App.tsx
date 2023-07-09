import { useEffect, useState } from "react";
import { useAppState } from "./context/main-context";
import { MTA } from "./mta";

function App() {
	// IMPORTANT: DONT REMOVE
	const { appState, appStateDispatch } = useAppState();
	(window as any).dispatch = appStateDispatch;
	//====================================================================

	const [theme, setTheme] = useState("");

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			setTheme(localTheme);
		} else {
			setTheme("light");
		}
	}, []);

	useEffect(() => {
		if (theme != "") {
			document.body.dataset.theme = theme;
			localStorage.setItem("theme", theme);
		}
	}, [theme]);

	const switchTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("light");
		}
	};

	return (
		<div className='demo-container'>
		  <h1 className='title'>Hello {appState?.devNameTest}, I'am a component!</h1>
		  <p className='description'>This is a MTA app template!</p>
		  <button className='button' onClick={()=>switchTheme()}>Change theme</button>
		  <p className='description'>v1.0.0</p>
		</div>
	);
}

export default App;
