import { FC, useEffect, useState } from 'react'
import { instance } from '../api/axios.api'
import { IDoing } from '../types/types'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../helpers/date.hepler'

const Dashboard: FC = () => {
	const [doings, setDoings] = useState<IDoing[]>([])

	async function getDoings() {
		const response = await instance.get('doing')
		setDoings(response.data)
	}

	useEffect(() => {
		getDoings()
		console.debug('axios url = ' + instance.getUri())
	}, [])

	return (
		<>
			<h1>Events</h1>
			<div className="flex gap-5">
				{doings?.map((doing, idx) => (
					<div className="card rounded-md p-2" key={idx}>
						<h1>{doing.title}</h1>
						<p className="mb-3">{doing.desc}</p>
						<p>{formatDate(doing.date)}</p>
						<p>{doing.organizer}</p>
						<div className="my-2">
							<NavLink to={`doing/${doing.id}/members`} className="btn btn-blue m-1">
								Members
							</NavLink>
							<NavLink to={`doing/${doing.id}/registrate`} className="btn btn-green m-1">
								Registrate
							</NavLink>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Dashboard
