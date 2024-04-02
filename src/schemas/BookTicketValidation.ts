
import * as yup from "yup";

export const BookTicketValidation = yup.object().shape({
  selectedTheatre: yup.string().required("Please select a theatre"),

  selectedScreen: yup.string().required("Select a screen"),

  selectedDate: yup.string().required("Select a date"),

  selectedTime: yup.object().shape({
    hour: yup
      .number()
      .required("Hour is required")
      .min(0, "Hour must be between 0 and 23")
      .max(23, "Hour must be between 0 and 23"),
    min: yup
      .number()
      .required("Minute is required")
      .min(0, "Minute must be between 0 and 59")
      .max(59, "Minute must be between 0 and 59"),
  }),
});
