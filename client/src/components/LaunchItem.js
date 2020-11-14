import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'


const LaunchItem =
  ({ flight_number, mission_name, launch_success, launch_date_local }) => {
    return (
      <div className='card card-body mb-3'>
        <div className="row">
          <div className="col-md-9">
            <h4>
              Mission:{' '}
              <span
                className={classnames('text-success', !launch_success && 'text-danger')}>
                {mission_name}
              </span>
            </h4>
            <p>{moment(launch_date_local).format('DD MMM YYYY hh:mm')}</p>
          </div>
          <div className="col-md-3">
            <Link
              to={`/launch/${flight_number}`}
              className='btn btn-secondary'
            >
              Launch Details
            </Link>
          </div>
        </div>
      </div>
    )
  }

export default LaunchItem
