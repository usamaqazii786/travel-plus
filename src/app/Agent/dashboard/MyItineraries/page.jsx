import React, { useEffect } from 'react'
import TableRightDashboardAgent from '../TableRightDashboardAgent'
import { getAllIt } from '../../../../utils/Services/Itenary'

export default function MyItinaries() {
  const [datait, setdatait] = React.useState([])
  const [loadingit, setloadingit] = React.useState(false)
  useEffect(() => {
    getAllIt(setdatait, setloadingit)
  }, [])

  return <TableRightDashboardAgent Data={datait} setCommission={setdatait} loading={loadingit} />
}
