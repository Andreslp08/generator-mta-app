import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StateProvider } from './context/main-context'
import './styles/style.scss'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StateProvider>
			<App />
		</StateProvider>
	</React.StrictMode>
);

