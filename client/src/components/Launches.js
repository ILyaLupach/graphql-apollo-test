import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_success
      launch_date_local
    }
  }
`

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY)
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error :(</h3>
  return (
    <Fragment>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {data?.launches?.map(item => (
        <LaunchItem key={item.flight_number} {...item} />
      ))}
    </Fragment>
  )
}

export default Launches
