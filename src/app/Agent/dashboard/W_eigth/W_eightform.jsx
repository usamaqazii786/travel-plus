/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack'; // Ensure this is installed and properly configured
import { useLocation, useNavigate } from 'react-router'; // Ensure you have `react-router` configured
import SignatureCanvas from 'react-signature-canvas';
// import axiosInstance from '../../../../utils/axios';
import './style.css';
import { axiosInstance } from '../../../../utils/AxiosInstance';

export default function W_eightform() {
  const inputsRef = useRef([]);
  const inputsRefEmplyee = useRef([]);
  const signatureCanvasRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [signatureDataURL, setSignatureDataURL] = useState('');
  const [inputValues, setInputValues] = useState(Array(5).fill(''));
  const [inputValuesEmp, setInputValuesEmp] = useState(Array(9).fill(''));
  const [formData, setFormData] = useState({
    entity_name: state?.entity_name || '',
    business_name: state?.business_name || '',
    individual_sole_proprietor: state?.individual_sole_proprietor || '',
    c_corporation: state?.c_corporation || '',
    a_corporation: state?.a_corporation || '',
    partnership: state?.partnership || '',
    trust_estate: state?.trust_estate || '',
    llc: state?.llc || '',
    federal_tax_b: state?.federal_tax_b || '',
    exemption: state?.exemption || '',
    tax_classification: state?.tax_classification || '',
    other: state?.other || '',
    requester_name: state?.requester_name || '',
    instruction: state?.instruction || '',
    address: state?.address || '',
    city: state?.city || '',
    account_list: state?.account_list || '',
    date: state?.date || '',
    exemption_fatca: state?.exemption_fatca || '',
    City_or_town: state?.City_or_town || '',
    Country: state?.Country || '',
    Mailing_address: state?.Mailing_address || '',
    City_or_town_state_or_province: state?.City_or_town_state_or_province || '',
    Mailing_Country: state?.Mailing_Country || '',
    United_States: state?.United_States || '',
    specify_type_of_income: state?.specify_type_of_income || '',
    Explain_the_additional: state?.Explain_the_additional || '',
    Explain_the_additional_conditions: state?.Explain_the_additional_conditions || '',
  });

  useEffect(() => {
    if (state?.ss_number) {
      const ssArray = state?.ss_number
        ?.split(',')
        ?.map((item) => item.trim().replace(/"/g, ''));
      setInputValues(ssArray);
    }

    if (state?.ei_number) {
      const eiArray = state?.ei_number
        ?.split(',')
        ?.map((item) => item.trim().replace(/"/g, ''));
      setInputValuesEmp(eiArray);
    }
  }, [state]);

  const handleEnd = () => {
    const canvas = signatureCanvasRef.current.getTrimmedCanvas();
    const dataURL = canvas.toDataURL('image/png');
    const signatureBlob = base64ToBlob(dataURL);
    setSignatureDataURL(signatureBlob);
  };

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    setInputValues((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleInputChangeEmplyee = (e, index) => {
    const value = e.target.value;
    setInputValuesEmp((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    if (value.length === 1 && index < inputsRefEmplyee.current.length - 1) {
      inputsRefEmplyee.current[index + 1].focus();
    }
  };

  const handleKeyDownEmplyee = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputsRefEmplyee.current[index - 1].focus();
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append('signature', signatureDataURL);
    formDatas.append('ss_number', inputValues.join(','));
    formDatas.append('ei_number', inputValuesEmp.join(','));

    Object.keys(formData).forEach((key) => {
      formDatas.append(key, formData[key]);
    });

    try {
      const response = await axiosInstance.post('api/subadmin/agent/wform', formDatas);
      if (response?.data?.response) {
        enqueueSnackbar(response.data.response, { variant: 'success' });
        navigate('/dashboard/pdf_w_nineshow');
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Submission failed', { variant: 'error' });
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    // e.preventDefault();
    // const formDatas = new FormData();
    // try {
    //   // formDatas.append('ss_number', inputValues);
    //   formDatas.append('signature', signatureDataURL);
    //   if (inputValues?.length !== 0) {
    //     formDatas.append('ss_number', inputValues);
    //   }
    //   if (inputValuesemp?.length !== 0) {
    //     formDatas.append('ei_number', inputValuesemp);
    //   }

    //   Object.keys(formData).forEach((key) => {
    //     formDatas.append(key, formData[key]);
    //   });
    //   formDatas.append('_method', 'Put');

    //   await axiosInstance.post(`api/admin/agent/wform/${state?.id}`, formDatas).then((response) => {
    //     if (response?.data?.response) {
    //       enqueueSnackbar(response?.data?.response);
    //       navigate('/dashboard/pdf_w_nineshow');
    //     }
    //   });
    // } catch (error) {
    //   enqueueSnackbar(error?.message, {
    //     variant: 'error',
    //   });
    //   console.error(error);
    // }

    // console.log(formData);
  };
  return (
    <div className="container-fluid">
      <div className="row first">
        <div className="col-md-2 border_right">
          Form <span className="w_nine"> W-8BEN </span>
          <div>(Rev. October 2021) Department of the Treasury
            Internal Revenue Service</div>
        </div>
        <div className="col-md-8 border_right middle-header">
          <p className="text-center request">Certificate of Foreign Status of Beneficial Owner for United</p>
          <p className="text-center request"> States Tax Withholding and Reporting (Individuals)</p>
          <p className="text-center fw-bold">
            {' '}
            ▶ For use by individuals. Entities must use Form W-8BEN-E.
          </p>

          <p className="text-center fw-bold">
            {' '}
            ▶ Go to www.irs.gov/FormW8BEN for instructions and the latest information.
          </p>
          <p className="text-center fw-bold">
            {' '}
            ▶ Give this form to the withholding agent or payer. Do not send to the IRS.
          </p>
        </div>
        <div className="col-md-2 header-r-eight">
          <div className="">OMB No. 1545-1621</div>
        </div>
      </div>

      {/* <div className="row" style={{ padding: '0' }}>
        <div
          className="col-md-12"
          style={{ padding: '0', fontSize: '15px', borderBottom: '2px solid black', borderColor: 'black' }}
        >
          <span style={{ fontWeight: '900' }}> Before you begin.</span> For guidance related to the purpose of Form W-9,
          see Purpose of Form, below
        </div>
      </div> */}
      <div style={{ display: 'flex' }}>
        {/* <p style={{transform:"rotate(-0.25turn)" ,width:"20px" , height:"200px" }}>Print or type. See Specific Instructions on page 3</p> */}
        {/* <div style={{ width: '2px', backgroundColor: 'black' }} /> */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <div className='col-md-2' style={{ justifyContent: 'start' }}>
              <h5>Do NOT use this form if: </h5>
            </div>
            <div className='col-md-6'></div>
            <div className='col-md-2' style={{ justifyContent: 'end', textAlign: 'right' }}>
              <h5>Instead, use Form: </h5>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">•</div>
              <div>
                {' '}
                You are NOT an individual . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8BEN-E
              </div>
            </div>
            <input
              className="border"
              name="entity_name"
              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">•</div>
              <div>You are a U.S. citizen or other U.S. person, including a resident alien individual . . . . . . . . . . . . . . . . . . . W-9</div>
            </div>
            <input
              className="border"
              name="business_name"

              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>

          {/*  */}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">•</div>
              <div>You are a beneficial owner claiming that income is effectively connected with the conduct of trade or business within the United States
                (other than personal services) &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; .
                &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . W-8ECI</div>
            </div>
            <input
              className="border"
              name="individual_sole_proprietor"

              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">•</div>
              <div>You are a beneficial owner who is receiving compensation for personal services performed in the United States . . . . . . . 8233 or W-4 </div>
            </div>
            <input
              className="border"
              name="a_corporation"

              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">•</div>
              <div>You are a person acting as an intermediary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8IMY</div>
            </div>
            <input
              className="border"
              name="partnership"

              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>

          {/*  */}
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">Note: </div>
              <div>If you are resident in a FATCA partner jurisdiction (that is, a Model 1 IGA jurisdiction with reciprocity), certain tax account information may be
                provided to your jurisdiction of residence.</div>
            </div>
            {/* <input
              className="border"
              name="business_name"
            
              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            /> */}
          </div>

          <div className="row" style={{ padding: '0' }}>
            <div
              className="col-md-12"
              style={{ padding: '0', fontSize: '15px', display: 'flex', borderBottom: '2px solid black', borderColor: 'black' }}
            >
              <span
                style={{
                  fontWeight: '900',
                  color: 'white ',
                  backgroundColor: 'black',
                  padding: '2px 8px',
                  marginRight: '25px',
                }}
              >
                Part I
              </span>{' '}
              <h5>Identification of Beneficial Owner</h5> (see instructions)
            </div>
          </div>


          <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">1</div>
                  <div>Name of individual who is the beneficial owner</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input
                    className="border"
                    name="trust_estate"

                    style={{
                      border: 'none',
                      backgroundColor: '#FAFAFA',
                      height: '25px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {/* <span>
                    {' '}
                  </span> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: '1px solid black',
                padding: '5px',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">2</div>
                <div>Country of citizenship</div>
              </div>

              <input
                className="border"
                name="llc"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '25px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              {/* <span>
                    {' '}
                  </span> */}
            </div>
          </div>
          {/*  */}

          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">3</div>
                <div>Permanent residence address (street, apt. or suite no., or rural route). <b>Do not use a P.O. box or in-care-of address.</b></div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                <input
                  className="border"
                  name="address"

                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: '25px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
                {/* <span>
                    {' '}
                  </span> */}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold"></div>
                  <div>City or town, state or province. Include postal code where appropriate. </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input
                    className="border"
                    name="City_or_town"

                    style={{
                      border: 'none',
                      backgroundColor: '#FAFAFA',
                      height: '25px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {/* <span>
                    {' '}
                  </span> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: '1px solid black',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold"></div>
                <div>Country</div>
              </div>

              <input
                className="border"
                name="Country"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '25px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              {/* <span>
                    {' '}
                  </span> */}
            </div>
          </div>

          {/*  */}

          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">4</div>
                <div>Mailing address (if different from above) </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                <input
                  className="border"
                  name="Mailing_address"

                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: '25px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <span>
                  {' '}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold"></div>
                  <div>City or town, state or province. Include postal code where appropriate. </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input
                    className="border"
                    name="City_or_town_state_or_province"

                    style={{
                      border: 'none',
                      backgroundColor: '#FAFAFA',
                      height: '25px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {/* <span>
                    {' '}
                  </span> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: '1px solid black',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold"></div>
                <div>Country</div>
              </div>

              <input
                className="border"
                name="Mailing_Country"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '25px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              {/* <span>
                    {' '}
                  </span> */}
            </div>
          </div>

          {/* <div></div>
  <div></div>
  <div></div>
  <div></div> */}
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">5</div>
              <div>U.S. taxpayer identification number (SSN or ITIN), if required (see instructions)</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
              <span>
                {' '}
                <input
                  className="border"
                  name="account_list"
                  
                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: '25px',
                    outline: 'none',
                    width: '800px',
                  }}
                />
              </span>
            </div>
          </div>

          {/*  */}

          <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">6a</div>
                  <div>Foreign tax identifying number (see instructions) </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input
                    className="border"
                    type='number'

                    name="exemption_fatca"

                    style={{
                      border: 'none',
                      backgroundColor: '#FAFAFA',
                      height: '25px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {/* <span>
                    {' '}
                  </span> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: '1px solid black',
                padding: '5px',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">6b</div>
                <div>
                  {' '}
                  Check if FTIN not legally required &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; .
                  &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; .
                  &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; .{' '}
                  <input
                    type="checkbox"
                    name="federal_tax_b"
                    checked={formData.federal_tax_b}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <input
                className="border"
                name="tax_classification"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '25px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              {/* <span>
                    {' '}
                  </span> */}
            </div>
          </div>

          {/*  */}

          <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">7</div>
                  <div>Reference number(s) (see instructions) </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input
                    className="border"
                    name="other"
                    type='number'
                    style={{
                      border: 'none',
                      backgroundColor: '#FAFAFA',
                      height: '25px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {/* <span>
                    {' '}
                  </span> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: '1px solid black',
                padding: '5px',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">8</div>
                <div>Date of birth (MM-DD-YYYY) (see instructions)</div>
              </div>

              <input
                className="border"
                name="requester_name"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '25px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              {/* <span>
                    {' '}
                  </span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ padding: '0' }}>
        <div
          className="col-md-12"
          style={{ padding: '0', fontSize: '15px', borderBottom: '2px solid black', borderColor: 'black' }}
        >
          <span
            style={{
              fontWeight: '900',
              color: 'white ',
              backgroundColor: 'black',
              padding: '2px 8px',
              marginRight: '25px',
            }}
          >
            Part II
          </span>{' '}
          <b>Claim of Tax Treaty Benefits </b> (for chapter 3 purposes only) (see instructions)
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">9</div>
              <div>I certify that the beneficial owner is a resident of</div>
            </div>

            <span>
              {' '}
              <input
                className="border"
                name="instruction"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '20px',
                  outline: 'none',
                  borderBottom: '1px solid black',
                  width: '200px',
                }}
              />
            </span>
            within the meaning of the income tax
            treaty between the United States and that country.
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div className="bold">10</div>
              <div><b>Special rates and conditions </b> (if applicable—see instructions): The beneficial owner is claiming the provisions of Article and paragraph</div>
            </div>
            <input
              className="border"
              name="city"

              style={{
                border: 'none',
                backgroundColor: '#FAFAFA',
                height: '20px',
                outline: 'none',
                borderBottom: '1px solid black',
                width: '200px',
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>

            <div>
              within the meaning of the income tax treaty between the United States and that country.
            </div>

            <input
              className="border"
              name="United_States"

              style={{
                border: 'none',
                backgroundColor: '#FAFAFA',
                height: '20px',
                outline: 'none',
                borderBottom: '1px solid black',
                width: '40px',
              }}
            />
            <div>
              % rate of withholding on (specify type of income):
            </div>
          </div>

          <div>
            <span>
              {' '}
              <input
                className="border"
                name="specify_type_of_income"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '20px',
                  outline: 'none',
                  borderBottom: '1px solid black',
                  width: '100%',
                }}
              />
            </span> .
          </div>

          <div style={{ display: 'flex' }}>

            <div>
              Explain the additional conditions in the Article and paragraph the beneficial owner meets to be eligible for the rate of withholding:
            </div>

            <input
              className="border"
              name="Explain_the_additional_conditions"

              style={{
                border: 'none',
                backgroundColor: '#FAFAFA',
                height: '20px',
                outline: 'none',
                borderBottom: '1px solid black',
                width: '90px',
              }}
            />
          </div>
          <div>
            <span>
              {' '}
              <input
                className="border"
                name="Explain_the_additional"

                style={{
                  border: 'none',
                  backgroundColor: '#FAFAFA',
                  height: '20px',
                  outline: 'none',
                  borderBottom: '1px solid black',
                  width: '100%',
                }}
              />
            </span> .
          </div>
        </div>
      </div>
      <div className="row" style={{ padding: '0' }}>
        <div
          className="col-md-12"
          style={{ padding: '0', fontSize: '15px', border: '2px solid black', borderColor: 'black' }}
        >
          <span
            style={{
              fontWeight: '900',
              color: 'white ',
              backgroundColor: 'black',
              padding: '2px 8px',
              marginRight: '25px',
            }}
          >
            Part III
          </span>{' '}
          Certification
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <p>Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:</p>
          <p>
            <span className="bold">• </span> I am the individual that is the beneficial owner (or am authorized to sign for the individual that is the beneficial owner) of all the income or proceeds to which this form
            relates or am using this form to document myself for chapter 4 purposes;
          </p>
          <p>
            <span className="bold">•</span> The person named on line 1 of this form is not a U.S. person;
          </p>
          <p>
            <span className="bold">•</span> This form relates to:
          </p>
          <p>
            <span className="bold"> &nbsp;  &nbsp; </span> (a) income not effectively connected with the conduct of a trade or business in the United States;
          </p>
          <p>
            <span className="bold"> &nbsp;  &nbsp; </span> (b) income effectively connected with the conduct of a trade or business in the United States but is not subject to tax under an applicable income tax treaty;
          </p>
          <p>
            <span className="bold"> &nbsp;  &nbsp; </span> (c) the partner’s share of a partnership’s effectively connected taxable income; or
          </p>
          <p>
            <span className="bold"> &nbsp;  &nbsp; </span> (d) the partner’s amount realized from the transfer of a partnership interest subject to withholding under section 1446(f);
          </p>
          <p>
            <span className="bold">•</span> The person named on line 1 of this form is a resident of the treaty country listed on line 9 of the form (if any) within the meaning of the income tax treaty between the United States and that country; and
          </p>
          <p>
            <span className="bold">•</span> For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in the instructions.
          </p>
          <p>
            Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which I am the beneficial owner or any withholding agent that can
            disburse or make payments of the income of which I am the beneficial owner. <b>  I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect.</b>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input
          type="checkbox"
          name="c_corporation"
          checked={formData.c_corporation}
          onChange={handleChange}
        />
        I certify that I have the capacity to sign for the person identified on line 1 of this form
      </div>

      <div
        className="col-md-12"
        style={{
          padding: '0',
          fontSize: '15px',
          borderColor: 'black',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p>
          <span
            style={{
              fontWeight: '900',
              fontSize: '20px',
              // color: 'white ',
              // backgroundColor: 'black',
              padding: '2px 8px',
              // marginRight: '25px',
            }}
          >
            Sign Here
          </span>{' '}

        </p>
        <h1>▶</h1>
        <p>
          <SignatureCanvas
            penColor="black"
            onEnd={handleEnd}
            ref={signatureCanvasRef}
            canvasProps={{ width: '450px', height: 50, className: 'sigCanvas' }}
          />
          <p style={{ borderTop: '1px solid black' }}>
            Signature of beneficial owner (or individual authorized to sign for beneficial owner)
          </p>
          <input
            className="border"
            name="exemption"
            style={{
              border: 'none',
              backgroundColor: '#FAFAFA',
              height: 50,
              width: '300px',
              outline: 'none',
            }}
          />
          <p style={{ borderTop: '1px solid black' }}>
            Print name of signer
          </p>
        </p>
        <p style={{ gap: '10px' }}>
          {/* <input
                  className="border"
                  name="exemption"
                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: 50,
                    borderBottom: '1px solid black',
                    width: '300px',
                    outline: 'none',
                  }}
                /> */}
          {/* <p> */}
          Date:{' '}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              width: '250px',
              height: '40px',
              background: '##f7f9fb',
              border: 'none',
              borderBottom: '1px solid black',
              fontSize: '20px',
              textAlign: 'center',
            }}
          />
          {/* </p> */}
          {/* <p>Date (MM-DD-YYYY) </p> */}
          {/* <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              width: '250px',
              height: '40px',
              // backgroundColor: '#FAFAFA',
              border: 'none',
              fontSize: '20px',
              textAlign: 'center',
            }}
          /> */}
        </p>

        <button type='button' onClick={(e)=>handleSubmit(e)}>submit</button>
      </div>

      <div style={{ display: 'flex', gap: '260px' }}>
        <p><b>For Paperwork Reduction Act Notice, see separate instructions. </b></p>
        <p>Cat. No. 25047Z </p>
        <p>Form <b>W-8BEN</b> (Rev. 10-2021)</p>
      </div>

    </div>
  );
}
