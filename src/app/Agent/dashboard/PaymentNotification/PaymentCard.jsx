import React, { useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { PaymentDelete } from '../../../../utils/Services/PaymentServices'
import { handleOtpInput, SendOtpTravel } from '../../../../utils/Services/TravelquoteServices'
import { withSwal } from 'react-sweetalert2'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useNavigate } from 'react-router-dom'
const PaymentCard = withSwal((props) => {
  const { swal, data, id } = props

  const Data = data
  const [loading, setloading] = useState(false)
  const { showNotification } = useNotificationContext()
  const [deleteloading, setdeletelading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit } = useForm()
  const [check, setcheck] = useState(false)
  const SendOtp = () => {
    SendOtpTravel(setloading)
      .then((e) => {
        if (e?.response) {
          handleOtpInput(swal, setcheck)
        }
      })
      .catch(() => {
        showNotification({ message: ' sending failed', variant: 'error' })
      })
  }

  const HandleDelete = () => {
    PaymentDelete(setdeletelading, id, showNotification, navigate)
  }
  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-2">
          <form>
            <Button variant="primary" className="mx-2 mt-2" onClick={handleSubmit(SendOtp)}>
              Show Payment Information {loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
            <Button variant="danger" className="mx-2 mt-2" onClick={handleSubmit(HandleDelete)}>
              Delete Payment Information {deleteloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </form>
        </div>
        <h4 className="">Payment Information</h4>
        <Table striped bordered hover style={{ filter: check ? 'blur(0px)' : 'blur(4px)' }}>
          {Data?.map((e, index) => {
            return (
              <>
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Card Number</td>
                    <td>{e?.card_number}</td>
                  </tr>
                  <tr>
                    <td>CVC Code</td>
                    <td>{e?.cvc_code}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date</td>
                    <td>{e?.expiry_date}</td>
                  </tr>
                  {/* <tr>
                <td>Address</td>
                <td>{e?.address}</td>
              </tr>
              <tr>
                <td>Address 2</td>
                <td>{e?.second_address}</td>
              </tr> */}
                  {/* <tr>
                <td>City</td>
                <td>{e?.city}</td>
              </tr> */}
                  <tr>
                    <td>State</td>
                    <td>{e?.state}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{e?.country}</td>
                  </tr>
                  <tr>
                    <td>Zip Code</td>
                    <td>{e?.zip_code}</td>
                  </tr>
                  <tr>
                    <td>Name on Card</td>
                    <td>{e?.card_name}</td>
                  </tr>
                  <tr>
                    <td>Billing Address</td>
                    <td>{e?.billing_address}</td>
                  </tr>
                  {/* <tr>
                <td>Phone Number</td>
                <td>{e?.phone}</td>
                </tr> */}
                </tbody>

                {Data.length > 1 && index === 0 && <h4 className="p-2">Second Payment Information</h4>}
              </>
            )
          })}
        </Table>
      </div>
    </>
  )
})
export default PaymentCard
