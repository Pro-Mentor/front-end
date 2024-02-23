import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalProvider from './context/global.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</BrowserRouter>
)
