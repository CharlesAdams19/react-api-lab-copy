import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router'
import './ActivityCreate.css'
import { createActivity } from '../../services/activities'
import Spinner from '../Spinner/Spinner'
import { UserContext } from '../../contexts/UserContext'

export default function ActivityCreate(){
  // * Context
  const { user } = useContext(UserContext)
  // * State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: ''
  })
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Location Variables
  const navigate = useNavigate()

  async function handleSubmit(evt){
    evt.preventDefault()
    setIsLoading(true) // start loading before call is made
    try {
      const { data } = await createActivity(formData)
      navigate(`/activities/${data._id}`)
    } catch (error) {
      setError(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleChange(evt){
    const copiedObject = { ...formData }
    copiedObject[evt.target.name] = evt.target.value
    setFormData(copiedObject)
  }

  if (!user) {
    return <Navigate to="/login" />
  }


  return (
    <section id="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Activity</h1>

        {/* Title */}
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder='Title' onChange={handleChange} value={formData.title} required />
          {error.title && <p className='error-message'>{error.title}</p>}
        </div>

        {/* Description */}
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows="5" placeholder='Lorem ipsum' onChange={handleChange} value={formData.description}></textarea>
          {error.description && <p className='error-message'>{error.description}</p>}
        </div>

        {/* Location */}
        <div className="input-control">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" placeholder='London, England' onChange={handleChange} value={formData.location} />
          {error.location && <p className='error-message'>{error.location}</p>}
        </div>

        {/* Duration */}
        <div className="input-control">
          <label htmlFor="duration">Duration (mins)</label>
          <input type="number" name="duration" id="duration" placeholder='120' onChange={handleChange} value={formData.duration} />
          {error.duration && <p className='error-message'>{error.duration}</p>}
        </div>

        {error.message && <p className='error-message'>{error.message}</p>}

        {/* Submit */}
        <button type="submit">{ isLoading ? <Spinner /> : 'Create Activity' }</button>
      </form>
    </section>
  )
}