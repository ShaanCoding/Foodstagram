interface Account {
	account_id: number
	name: string
	username: string
	bio: string
	password_hash: string
	email: string
	verified: boolean
	profile_picture_url: string | null
	'2fa': string | null
	using_2fa: number
}
