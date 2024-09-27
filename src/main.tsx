import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<App />
		<ToastContainer position="bottom-left" autoClose={2000} />
	</>,
)
