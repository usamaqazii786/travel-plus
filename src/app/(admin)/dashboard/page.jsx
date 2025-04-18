import React, { useEffect, useState } from 'react'
import { GetAllAdminData } from '../../../utils/Services/AdminDashbaordServices'
import Preloader from '../../../components/Preloader'
import SubmittedCommission from './Commission/SubmittedCommission'

export default function AdminDashboard() {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    GetAllAdminData(setdata, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading && <Preloader />}
      <div className="container ">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Commission Summary</h4>
          </div>
          <div className="card-body">
            {/* Number of Submitted Commissions */}
            <div className="mb-3">
              <h5>Number of Submitted Commissions</h5>
              <p className="fs-5 text-muted">{data?.total_commission_count || 0} </p>
            </div>

            {/* Total Gross Revenue */}
            <div className="mb-3">
              <h5>Total Gross Revenue from Submitted Commissions</h5>
              <p className="fs-5 text-success">${data?.total_gross_revenue || 0}</p>
            </div>

            {/* Total Agent Revenue */}
            <div className="mb-3">
              <h5>Total Agent Revenue from Submitted Commissions</h5>
              <p className="fs-5 text-success">${data?.total_agent_revenue || 0}</p>
            </div>

            {/* Top 5 Supplier Types */}
            <div className="mb-3">
              <h5>Top 5 Supplier Types</h5>
              <ul className="list-group">
                {data?.top_supplier_type?.map((type, index) => (
                  <li key={index} className="list-group-item">
                    {type?.supplier_type || 'empty'}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top 5 Suppliers */}
            <div className="mb-3">
              <h5>Top 5 Suppliers</h5>
              <ul className="list-group">
                {data?.top_supplier?.map((supplier, index) => (
                  <li key={index} className="list-group-item">
                    {supplier?.supplier_name || 'empty'}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top 5 Agents */}
            <div>
              <h5>Top 5 Agents Based on Gross Revenue</h5>
              <ul className="list-group">
                {data?.top_agent_type?.map((agent, index) => (
                  <li key={index} className="list-group-item">
                    {agent?.fname + ' ' + agent?.lname || 'empty'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <SubmittedCommission />
      </div>
    </>
  )
}
