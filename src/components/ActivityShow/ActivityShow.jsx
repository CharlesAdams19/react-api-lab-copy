
import './ActivityShow.css'
import { Link, useParams } from 'react-router'
import { getSingleActivity } from '../../services/activities'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

// Custom components
import ActivityDelete from '../ActivityDelete/ActivityDelete'
import Spinner from '../Spinner/Spinner'

export default function ActivityShow(){
  // * Params
  const { activityId } = useParams()

  const { user } = useContext(UserContext)
  console.log(user)

  // * State
  const { data: activity, isLoading, error } = useFetch(
    getSingleActivity, // Service function
    {}, // Initial data value
    activityId
  )

  return (
    <>
      {error
        ? <p className='error-message'>{error}</p>
        : isLoading
          ? <Spinner />
          : (
            <section className="single-activity">
              <h1>{activity.title}</h1>
              <p>📍 {activity.location}</p>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration} mins</p>
              { user &&
                <div className="controls">
                  <Link className='edit-activity' to={`/activities/${activityId}/edit`}>Edit</Link>
                  <ActivityDelete />
                </div>
              }
            </section>
          )
      }
    </>
  )
}
