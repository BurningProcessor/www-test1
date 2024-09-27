export interface IDoing {
	id: number
	title: string
	desc: string
	date: Date
	organizer: string
	registers?: IRegistration[]
}

export interface IRegistrationData {
	name: string
	email: string
	dob: Date
	find_event: string
	doing: number
}

export interface IRegistration extends IRegistrationData {
	id: number
}
