// https://upmostly.com/tutorials/form-validation-using-custom-react-hooks/
import { useState, useEffect } from 'react'

const useForm = (initialValues, callback, validate) => {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Form submission via callback
	useEffect(
		_ => {
			if (Object.keys(errors).length === 0 && isSubmitting) {
				callback()
			} else setIsSubmitting(false)
		},
		[errors]
	)
	// Input validation and submit form
	const handleSubmit = e => {
		if (e) e.preventDefault()
		setErrors(validate(values))
		setIsSubmitting(true)
	}
	// Input Change
	const handleChange = e => {
		e.persist()
		const { name, value } = e.target
		setValues(values => ({
			...values,
			[name]: value.trim(),
		}))
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
