import React from 'react'
import Banner from './Banner'
import Stats from './Stats'
import UpcomingMatch from './UpcomingMatch'
import TopGoalsPlayer from './TopGoalsPlayer'

const Homes = () => {
  return (
    <div>
      <Banner/>
      <Stats/>
      <UpcomingMatch/>
      <TopGoalsPlayer/>
    </div>
  )
}

export default Homes
