// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// // import { loginUser } from '../../api/user'
// // import { storageSave } from '../../utils/storage'
// import { useNavigate } from 'react-router-dom'
// // import { useUser } from '../../context/UserContext'
// // import { STORAGE_KEY_USER } from '../../const/storageKeys'
//
// // To create an object in order to save it once and it will not be changed
// // Will be a second argument of the register function
// const usernameConfig = {
//     required: true,
//     minLength: 3,
// }
//
// const LoginForm = () => {
//     //Hooks. Register inputs to our form and gives error as a second argument of the register.
//     // register - to collect all the data from register function
//     const { register, handleSubmit, formState: { errors } } = useForm()
//
//     // const { user, setUser } = useUser()
//     const navigate = useNavigate()
//
//
//     //Local state
//     const [loading, setLoading] = useState(false)
//     const [apiError, setApiError] = useState(null)
//
//     // Side Effects
//     useEffect(() => {
//         if (user !== null) { navigate('/profile') }
//
//     }, [user, navigate])
//
//     //Event Handlers. Navigate to next function after we succesfully created a user
//     const onSubmit = async ({ username }) => {
//         // setLoading(true)
//         // const [error, userResponse] = await loginUser(username)
//         // if (error !== null) {
//         //     setApiError(error)
//         // }
//         // if (userResponse !== null) {
//         //     storageSave(STORAGE_KEY_USER, userResponse)
//         //     setUser(userResponse)
//         // }
//         // setLoading(false)
//     }
//
//     console.log(errors)
//
//     //invokes this function every time it is rendered
//     const errorMessage = (() => {
//         if (!errors.username) {
//             return null
//         }
//
//         if (errors.username.type === 'required') {
//             return <span>Username is required</span>
//         }
//         if (errors.username.type === 'minLength') {
//             return <span> Username is too short </span>
//         }
//     })()
//
//     return (
//         <>
//             <h2>What's your name?</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <fieldset>
//                     <label htmlFor="username">Username: </label>
//                     <input type="text"
//                            placeholder='johndoel'
//                         // the value of the input will be username
//                            {...register("username", usernameConfig)} />
//                     {(errors.username && errors.username.type === "required") && <span>Username is required </span>}
//                     {(errors.username && errors.username.type === "minLength") && <span>Username is too short </span>}
//                     {errorMessage}
//
//                 </fieldset>
//
//                 <button type="Submit" disabled={loading}>Continue</button>
//
//                 {loading && <p>Logging in...</p>}
//                 {apiError && <p>{apiError}</p>}
//             </form></>
//     )
// }
// export default LoginForm