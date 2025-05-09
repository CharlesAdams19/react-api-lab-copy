// import { useState } from 'react'
// import { useNavigate } from 'react-router' 
// // on an action use navigate allows the user to move on from a step , like log in then move to home page
// import './ActivityRegister.css'
// import { registerActivity } from '../../services/activities'
// import Spinner from '../Spinner/Spinner'

// export default function ActivityRegister() {
//     // * State
//     const [formData, setFormData] = useState({
//         email: '',
//         username: '',
//         password: '',
//         passwordConfirmation: ''
//     })
//     const [error, setError] = useState({})
//     const [isLoading, setIsLoading] = useState(false)

//     // Location Variables

//     const navigate = useNavigate()

//     const handleChange = (evt) => {
//         setFormData({
//           ...formData,
//           [evt.target.name]: evt.target.value
//         })
//       }

//     return (
//         <section id="form-page">
//             <form className="form" onSubmit={handleSubmit}>
//                 <h1>Register</h1>

//                 {/* Email */}
//                 <div className="input-control">
//                     <label htmlFor="email">Email</label>
//                     <textarea name="email" id="email" rows="5" placeholder='Email ' onChange={handleChange} value={formData.email}></textarea>
//                     {error.email && <p className='error-message'>{error.email}</p>}
//                 </div>

//                 {/* Username */}
//                 <div className="input-control">
//                     <label htmlFor="username">Username</label>
//                     <input type="text" name="username" id="title" placeholder='username' onChange={handleChange} value={formData.username} required />
//                     {error.username && <p className='error-message'>{error.title}</p>}
//                 </div>

            

//                 {/* Password */}
//                 <div className="input-control">
//                     <label htmlFor="location">Location</label>
//                     <input type="text" name="location" id="location" placeholder='London, England' onChange={handleChange} value={formData.location} />
//                     {error.location && <p className='error-message'>{error.location}</p>}
//                 </div>

//                 {/* Password Confirmation  */}
//                 <div className="input-control">
//                     <label htmlFor="duration">Duration (mins)</label>
//                     <input type="number" name="duration" id="duration" placeholder='120' onChange={handleChange} value={formData.duration} />
//                     {error.duration && <p className='error-message'>{error.duration}</p>}
//                 </div>

//                 {/* Submit */}
//                 <button type="submit">{isLoading ? <Spinner /> : 'Create Activity'}</button>
//             </form>
//         </section>
//     );
// };



import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { register } from "../../services/auth";

export default function Register(){
  // * State
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})

  // * Location variables
  const navigate = useNavigate()

  // * Functions
  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData, 
      [name]: value
    })
    setError({ ...error, [name]: '' })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    try {
      await register(formData)
      navigate('/login')
    } catch (error) {
      setError(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create an account</h1>

        {/* Email */}
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email}/>
          { error.email && <p className="error-message">{error.email}</p>}
        </div>

        {/* Username */}
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} value={formData.username} />
          { error.username && <p className="error-message">{error.username}</p>}
        </div>

        {/* Password */}
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
          { error.password && <p className="error-message">{error.password}</p>}
        </div>

        {/* Password Confirmation */}
        <div className="input-control">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Password Confirmation" required onChange={handleChange} value={formData.passwordConfirmation} />
          { error.passwordConfirmation && <p className="error-message">{error.passwordConfirmation}</p>}
        </div>

        <button type="submit">
          { isLoading ? <Spinner /> : 'Register' }
        </button>

        <small>Already have an account? <Link to="/login">Log back in</Link></small>
      </form>
    </section>
  )
}
