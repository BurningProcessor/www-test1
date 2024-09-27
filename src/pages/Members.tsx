import { FC, useEffect, useState } from 'react'
import { instance } from '../api/axios.api'
import { IDoing, IRegistrationData } from '../types/types'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Members: FC = () => {
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
			<h1>Participants of {doing?.title}</h1>
			<div className="my-2 flex">
				<NavLink to={'/'} className="btn btn-blue ">
					Back to Dashboard
				</NavLink>
			</div>
			<div className="flex gap-5">
				{doing?.registers?.length != 0 ? (
					doing?.registers?.map((member, idx) => (
						<div className="card rounded-md" key={idx}>
							<h1>{member.name}</h1>
							<p>{member.email}</p>
						</div>
					))
				) : (
					<p>No members available</p>
				)}
			</div>
		</>
	)
}

export default Members

export const membersAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newMember: IRegistrationData = {
				name: formData.get('name'),
				email: formData.get('email'),
				dob: formData.get('dob'),
				find_event: formData.get('find_event'),
				doing: formData.get('doing'),
			}

			await instance.post('/registration', newMember)
			toast.success('Registrated!')
			return null
		}
	}
}
