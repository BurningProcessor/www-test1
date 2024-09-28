import { FC, useEffect, useState } from 'react'
import { instance } from '../api/axios.api'
import { IDoing } from '../types/types'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../helpers/date.hepler'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'

const Dashboard: FC = () => {
	const [doings, setDoings] = useState<IDoing[]>([])

	async function getDoings(sort?: string) {
		let uri = 'doing'
		if (sort) uri = uri + '?sort=' + sort
		const response = await instance.get(uri)
		setDoings(response.data)
	}

	useEffect(() => {
		getDoings()
		console.debug('axios url = ' + instance.getUri())
	}, [])

	return (
		<>
			<div className="flex justify-between px-2">
				<h1>Events</h1>
				<div className="flex gap-2">
					<fieldset id="sortset" className="flex flex-wrap gap-2">
						<legend>Order:</legend>
						<div>
							<button className="btn btn-blue mr-2" onClick={() => getDoings('titleDown')}>
								Title <SlArrowDown className="inline" />
							</button>
							<button className="btn btn-blue" onClick={() => getDoings('titleUp')}>
								Title <SlArrowUp className="inline" />
							</button>
						</div>
						<div>
							<button className="btn btn-blue mr-2" onClick={() => getDoings('dateDown')}>
								Date <SlArrowDown className="inline" />
							</button>
							<button className="btn btn-blue" onClick={() => getDoings('dateUp')}>
								Date <SlArrowUp className="inline" />
							</button>
						</div>
						<div>
							<button className="btn btn-blue mr-2" onClick={() => getDoings('organizerDown')}>
								Organizer <SlArrowDown className="inline" />
							</button>
							<button className="btn btn-blue" onClick={() => getDoings('organizerUp')}>
								Organizer <SlArrowUp className="inline" />
							</button>
						</div>
					</fieldset>
				</div>
			</div>
			<div className="flex flex-wrap gap-2 px-2 py-2">
				{doings?.map((doing, idx) => (
					<div className="card flex flex-col justify-between gap-3 rounded-md p-2" key={idx}>
						<div>
							<h2>{doing.title}</h2>
							<p>{doing.desc}</p>
						</div>
						<div>
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
					</div>
				))}
			</div>
		</>
	)
}

export default Dashboard
