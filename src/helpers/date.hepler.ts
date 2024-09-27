export const formatDate = (dateOrig: Date): string => {
	const date = new Date(dateOrig)
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	return date.toLocaleDateString('us-US', options)
}
