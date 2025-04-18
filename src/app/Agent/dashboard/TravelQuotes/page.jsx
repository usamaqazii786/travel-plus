// import { useEffect, useState } from 'react'
import TableLeftDashboardAgent from '../TableLeftDashboardAgent.jsx'
// import { getAllTravel } from '../../../../utils/Services/TravelquoteServices.js'
import Preloader from '../../../../components/Preloader.jsx'

export default function TravelQuotes({loading,Data,setdata}) {

  return (
    <>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <TableLeftDashboardAgent Data={Data} setdata={setdata}  />
      )}
    </>
  )
}
