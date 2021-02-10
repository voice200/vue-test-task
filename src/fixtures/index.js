import { required, email, sameAs, between, maxLength, maxLength, decimal } from 'vuelidate/lib/validators';

export const registrationForm = [
	{
		type: 'text',
		name: 'name',
		label: 'Your Name',
		placeholder: 'Rob Stark',
	},
	{
		type: 'number',
		name: 'phone',
		label: 'Your phone',
		placeholder: '79996543245',
		minValue: 10,
		maxValue: 10
	},
	{
		type: 'email',
		name: 'email',
		label: 'Your email',
		placeholder: 'email@com.ru',
	},
	{
		type: 'password',
		name: 'password',
		label: 'Your password',
		placeholder: 'Password',
		minValue: 6,
		maxValue: 40
	},
	{
		type: 'password',
		name: 'confirmPassword',
		label: 'Confirm password',
		placeholder: 'Confirm password',
		minValue: 6,
		maxValue: 40
	}
];

export const validationForm = {
	registration: {
			name: {
				required
			},
			phone: {
				required,
				decimal,
				minLength: 10,
				maxLength: 10
			},
			email:{
				required,
				email
			},
			password: {
				required,
				between: between(6, 40)
			},
			confirmPassword: {
				required,
				sameAs: sameAs('password')
			}
	},
	login: {
			email:{
				required,
				email
			},
			password: {
				required,
				between: between(6, 40)
			},
	}

}
export const returnValidationForm = (type) =>{
	const validationForm = {
		registration: {
				name: {
					required
				},
				phone: {
					required
				},
				email:{
					required,
					email
				},
				password: {
					required,
					// between: between(6, 40)
					maxLength: 40,
					minLength: 6
				},
				confirmPassword: {
					required,
					sameAs: sameAs('password')
				}
		},
		login: {
				email:{
					required,
					email
				},
				password: {
					required,
					maxLength: 40,
					minLength: 6
					// between: between(6, 40)
				},
			}

	}
		return validationForm[type]
}

export const loginForm = [
	{
		type: 'email',
		name: 'email',
		label: 'Your email',
		placeholder: 'email@com.ru'
	},
	{
		type: 'password',
		name: 'password',
		label: 'Your password',
		placeholder: 'Password',
		minValue: 6,
		maxValue: 40
	},
];

export const additionalInformation = [
	{
		label: 'Name',
		value: 'name'
	},
	{
		label: 'Phone',
		value: 'phone'
	},
	{
		label: 'Email',
		value: 'email'
	}
];
