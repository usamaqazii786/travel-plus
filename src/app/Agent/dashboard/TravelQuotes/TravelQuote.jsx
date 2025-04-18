import { useEffect, useState } from 'react'
import TableLeftDashboardAgent from '../TableLeftDashboardAgent.jsx'
import { getAllTravel } from '../../../../utils/Services/TravelquoteServices.js'
import Preloader from '../../../../components/Preloader.jsx'

export default function TravelQuote() {
  const [Data, setdata] = useState([])

  const [loading, setloading] = useState(false)

  useEffect(() => {
    getAllTravel(setdata, setloading)
  }, [])
  return (
    <>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <TableLeftDashboardAgent Data={Data} setdata={setdata} />
      )}
    </>
  )
}
