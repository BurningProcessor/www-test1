import { FC, useEffect, useState } from 'react'
import { instance } from '../api/axios.api'
import { IDoing } from '../types/types'
import { Form, NavLink, useParams } from 'react-router-dom'

const Registrate: FC = () => {
	const { doingId } = useParams()
	const [doing, setDoing] = useState<IDoing>()

	async function getDoing() {
		const response = await instance.get(`doing/${doingId}`)
		setDoing(response.data)
	}

	useEffect(() => {
		getDoing()
	}, [])

	return (
		<>
			<div className="my-2">
				<NavLink to="/" className="btn btn-blue ">
					Back to Dashboard
				</NavLink>
			</div>
			<h1 className="mb-4">Registrate from {doing?.title}</h1>
			<div className="card">
				<Form method="post" action={`/doing/${doingId}/members`} className="grid gap-2">
					<label htmlFor="name">
						<span className="block">Name</span>
						<input type="text" placeholder="Name" name="name" required />
					</label>
					<label htmlFor="email">
						<span>Email</span>
						<input type="email" placeholder="Email" name="email" required />
					</label>
					<label htmlFor="Date of Birth">
						<span>Date of Birth</span>
						<input type="date" placeholder="Date of Birth" name="dob" required />
					</label>
					<fieldset className="flex gap-5">
						<legend>Where did you hear about this event?</legend>
						<label htmlFor="Social media">
							<input type="radio" name="find_event" value={'Social media'} required />
							<span>Social media</span>
						</label>
						<label htmlFor="Friends">
							<input type="radio" name="find_event" value={'Friends'} required />
							<span>Friends</span>
						</label>
						<label htmlFor="Found myself">
							<input type="radio" name="find_event" value={'Found myself'} required />
							<span>Found myself</span>
						</label>
					</fieldset>
					<input type="text" name="doing" value={doingId} hidden readOnly />
					<div>
						<button type="submit" className="btn btn-green">
							Registrate
						</button>
					</div>
				</Form>
			</div>
		</>
	)
}

export default Registrate
