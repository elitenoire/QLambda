// useForm hook based on:
// https://upmostly.com/tutorials/form-validation-using-custom-react-hooks/
import { useState, useEffect } from 'react'
import validate from '../utils/validate'

const useForm = (initialValues, callback, isValidate = true) => {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCallback = async _ => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			return callback()
		}
	}
	// GetDerivedStateFromProps
	// This is needed to update values with the initialValues prop
	// as useState(initialValues) is only used for instantiation
	useEffect(
		_ => {
			setValues(initialValues)
		},
		[initialValues]
	)
	// Form submission via callback
	useEffect(
		_ => {
			let isSubscribed = true
			handleCallback().then(_ => {
				if (isSubscribed && isSubmitting) {
					setIsSubmitting(false)
				}
			})
			return () => (isSubscribed = false)
		},
		[errors]
	)
	// Input validation and submit form
	const handleSubmit = e => {
		if (e) e.preventDefault()
		setIsSubmitting(true)
		if (isValidate) {
			return setErrors(validate(values))
		}
		return setErrors({})
	}
	// Input Change
	const handleChange = e => {
		e.persist()
		const { name, value } = e.target
		// Update state with input
		if (name in values) {
			setValues(values => ({
				...values,
				[name]: value.trim(),
			}))
		}
		// Clear error if any
		if (errors[name]) {
			setErrors({ ...errors, [name]: '' })
		}
	}
	// Reset Form
	const resetForm = () => {
		setErrors({})
		setValues(initialValues)
	}

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
		resetForm,
		isSubmitting,
		setIsSubmitting,
	}
}

export default useForm
