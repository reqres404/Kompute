import React from 'react'
import Efforts from '../../assets/Efforts'
import { Typography } from '@mui/material'
import BaseLine from '../../assets/BaseLine'

const Calculate = () => {
  return (
    <div>
      <Typography sx={{mx:22,my:2}}>Baseline- Efforts in PD per App</Typography>
        <BaseLine/>
        <br/>
        <br/>
        <Typography sx={{mx:22,my:2}}>Efforts in Person Days</Typography>
        <Efforts/>
    </div>
  )
}

export default Calculate