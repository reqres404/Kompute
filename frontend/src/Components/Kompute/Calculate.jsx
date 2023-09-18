import React from 'react'
import DisplayTable from '../Table'
import { Typography } from '@mui/material'

const Calculate = () => {
  return (
    <div>
      <Typography sx={{mx:22,my:2}}>Baseline- Efforts in PD per App</Typography>
        <DisplayTable/>
        <br/>
        <br/>
        <Typography sx={{mx:22,my:2}}>Efforts in Person Days</Typography>
        <DisplayTable/>
    </div>
  )
}

export default Calculate