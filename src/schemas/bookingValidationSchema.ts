import * as yup from 'yup'

export  const bookingValidationSchema = yup.object().shape({
  selectedTheatre: yup.string().min(2).max(30).required("Select a Theatre"),
})