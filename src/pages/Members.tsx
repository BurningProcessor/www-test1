import { FC, useEffect, useRef, useState } from 'react'
import { instance } from '../api/axios.api'
import { IDoing, IRegistration, IRegistrationData } from '../types/types'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'

const Members: FC = () => {
	const { doingId } = useParams()

	const [doing, setDoing] = useState<IDoing>()
	const [members, setMembers] = useState<IRegistration[]>([])

	const fieldNameRef = useRef<HTMLInputElement>(null)
	const fieldEmailRef = useRef<HTMLInputElement>(null)

	async function getDoing() {
		const response: AxiosResponse<IDoing> = await instance.get(`doing/${doingId}`)
		setDoing(response.data)
	}
	async function getMembers(addData?: string) {
		let requestData = `registration?doing=${doingId}`
		if (addData) requestData = requestData + addData
		const response: AxiosResponse<IRegistration[]> = await instance.get(requestData)
		setMembers(response.data)
	}

	function getSearch() {
		const nameValue = fieldNameRef.current?.value
		const emailValue = fieldEmailRef.current?.value

		let requestData = '&'
		if (nameValue) requestData = requestData + `name=${nameValue}`
		if (nameValue && emailValue) requestData = requestData + '&'
		if (emailValue) requestData = requestData + `email=${emailValue}`

		if (requestData != '&') setReq(requestData)
		if (requestData != '&') getMembers(requestData)
		else getMembers()
	}

	useEffect(() => {
		getDoing()
		getMembers()
	}, [])

	return (
		<>
			<h1 className="m-2">Participants of {doing?.title}</h1>
			<div className="m-2 flex items-center justify-between gap-2">
				<div>
					<NavLink to={'/'} className="btn btn-blue text-nowrap">
						Back to Dashboard
					</NavLink>
				</div>
				{members.length != 0 ? (
					<fieldset id="member-search" className="flex flex-wrap justify-start gap-2 ">
						<legend>Search</legend>
						<label htmlFor="name">
							<span>Name</span>
							<input ref={fieldNameRef} type="search" name="name" />
						</label>
						<label htmlFor="email">
							<span>Email</span>
							<input ref={fieldEmailRef} type="email" name="email" />
						</label>
						<button className="btn btn-green" onClick={() => getSearch()}>
							Search
						</button>
					</fieldset>
				) : null}
			</div>
			<div className="m-2 flex flex-wrap gap-2">
				{members.length != 0 ? (
					members.map((member, idx) => (
						<div className="card rounded-md" key={idx}>
							<h2>{member.name}</h2>
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
