
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { getSingleActivity, updateActivity } from "../../services/activities"
import Spinner from "../Spinner/Spinner"

export default function ActivityUpdate(){
  // * State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: ''
  })
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // * Location variables
  const { activityId } = useParams()
  const navigate = useNavigate()

  // * Functions
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    try {
      // API Call
      await updateActivity(activityId, formData)
      navigate(`/activities/${activityId}`)
    } catch (error) {
      setError(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  // * Effects
  useEffect(() => {
    async function getActivityData(){
      try {
        const { data } = await getSingleActivity(activityId)
        setFormData(data)
      } catch (error) {
        console.log(error)
        setError({ ...error, preload: 'Failed to preload field values' })
      }
    }
    getActivityData()
  }, [activityId])

  return (
    <section id="form-page">
          <form className="form" onSubmit={handleSubmit}>
            <h1>Update Activity</h1>
    
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

            {error.message && <p className="error-message">{error.message}</p>}
            {error.preload && <p className="error-message">{error.preload}</p>}
    
            {/* Submit */}
            <button type="submit">{ isLoading ? <Spinner /> : 'Update Activity' }</button>
          </form>
        </section>
  )
}
