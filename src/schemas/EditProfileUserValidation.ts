import * as yup from 'yup';

export const UpdateUserValidation = yup.object().shape({
    username: yup.string().min(2).max(25).matches(/^\S*$/, 'Username cannot contain spaces').required("User name is required"),
})