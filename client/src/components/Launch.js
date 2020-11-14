import React from 'react'
import moment from 'moment'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`

const Launch = ({ match }) => {
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: Number(match.params.flight_number) },
  })
  const {
    flight_number,
    mission_name,
    launch_success,
    launch_date_local,
    rocket,
  } = data?.launch || {}

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error :(</h3>
  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {flight_number}
        </li>
        <li className="list-group-item">
          Launch Date: {moment(launch_date_local).format('DD MMM YYYY hh:mm')}
        </li>
        <li className="list-group-item">
          Launch Successful:{' '}
          <span
            className={launch_success ? 'text-success' : 'text-danger'}
          >
            {launch_success ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>

      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket.rocket_id}</li>
        <li className="list-group-item">
          Rocket Name: {rocket.rocket_name}
        </li>
        <li className="list-group-item">
          Rocket Type: {rocket.rocket_type}
        </li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
                </Link>
    </div>
  )
}

export default Launch
