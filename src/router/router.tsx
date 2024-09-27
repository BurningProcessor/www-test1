import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dasboard'
import Members, { membersAction } from '../pages/Members'
import Registrate from '../pages/Registrate'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
		],
	},
	{
		path: '/doing/:doingId/members',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Members />,
			},
		],
		action: membersAction,
	},
	{
		path: '/doing/:doingId/registrate',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Registrate />,
			},
		],
	},
])
