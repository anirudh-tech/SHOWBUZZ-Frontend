import * as yup from 'yup'

export const selectMoviesValidation =  yup.object().shape({
  selectedDates: yup.array().min(1, 'Please select at least one date'),
  selectedLanguages: yup.array().min(1, 'Please select at least one language'),
  selectedFormats: yup.array().min(1,'Please select a format'),
  selectedTimes: yup.array().min(1, 'Please select at least one time'),
  selectedScreens: yup.array().min(1,'Please select a Screen')
})