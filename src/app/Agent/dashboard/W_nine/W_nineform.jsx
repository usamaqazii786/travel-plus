/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
import SignatureCanvas from 'react-signature-canvas';
// import axiosInstance from '../../../utils/axios';

export default function W_nineform() {
  const inputsRef = useRef([]);
  const { state } = useLocation();
  console.log(state);
  const signatureCanvasRef = useRef(null);
  const [ setSignatureDataURL] = useState('');
  // console.log(signatureDataURL, 'signatureDataURL');
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

  const handleEnd = () => {
    const canvas = signatureCanvasRef.current.getTrimmedCanvas();
    const dataURL = canvas.toDataURL('image/png');
    // setSignatureDataURL(dataURL); // Set base64 string in state

    // Convert base64 to Blob immediately after setting the state
    const signatureBlob = base64ToBlob(dataURL);
    setSignatureDataURL(signatureBlob);
    // console.log(signatureBlob, 'Binary Signature Blob');
  };

  const inputsRefEmplyee = useRef([]);
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
  });
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  }; // Step 1: Define the number of inputs you want
  const inputsCount = 5;

  const [inputValues, setInputValues] = useState(Array(inputsCount).fill(''));
  const [inputValuesemp, setInputValuesEmp] = useState(Array(9).fill(''));

  // arr.push(state?.ss_number)
  // if(inputValuesemp?.length){
  //   alert(inputValuesemp?.length)
  // }
  // const navigate = useNavigate();
  console.log(inputValues);
  useEffect(() => {
    if (state?.ei_number) {
      const array = state?.ss_number?.split(',')?.map((item) => item?.trim()?.replace(/"/g, ''));
      setInputValues(array);
    }
    if (state?.ei_number) {
      const arrayone = state?.ei_number?.split(',')?.map((item) => item?.trim()?.replace(/"/g, ''));
      setInputValuesEmp(arrayone);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(array);
  // console.log(inputValuesemp?.join(''), 'inputValues');
  // console.log(formData, 'formData');
  const handleInputChange = (e, index) => {
    // eslint-disable-next-line prefer-destructuring
    const value = e.target.value;

    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
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
    // eslint-disable-next-line prefer-destructuring
    const value = e.target.value;

    // Use functional update to set state
    setInputValuesEmp((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    // Move focus to the next input if the length of the input is 1
    if (value.length === 1 && index < inputsRefEmplyee.current.length - 1) {
      inputsRefEmplyee.current[index + 1].focus();
    }
  };

  const handleKeyDownEmplyee = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputsRefEmplyee.current[index - 1].focus();
    }
  };
  // const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
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

    //   await axiosInstance.post('api/subadmin/agent/wform', formDatas).then((response) => {
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
          Form <span className="w_nine"> W-9 </span>
          <div>(Rev. March 2024) Department of the Treasury Internal Revenue Service</div>
        </div>
        <div className="col-md-8 border_right middle-header">
          <p className="text-center request">Request for Taxpayer</p>
          <p className="text-center request"> Identification Number and Certification</p>
          <p className="text-center fw-bold">
            {' '}
            Go to <span className="italic">www.irs.gov/FormW9</span> for instructions and the latest information.
          </p>
        </div>
        <div className="col-md-2 header-r">
          <div className="">Give form to the requester. Do not send to the IRS.</div>
        </div>
      </div>

      <div className="row" style={{ padding: '0' }}>
        <div
          className="col-md-12"
          style={{ padding: '0', fontSize: '15px', borderBottom: '2px solid black', borderColor: 'black' }}
        >
          <span style={{ fontWeight: '900' }}> Before you begin.</span> For guidance related to the purpose of Form W-9,
          see Purpose of Form, below
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {/* <p style={{transform:"rotate(-0.25turn)" ,width:"20px" , height:"200px" }}>Print or type. See Specific Instructions on page 3</p> */}
        <div style={{ width: '2px', backgroundColor: 'black' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">1</div>
              <div>
                {' '}
                Name of entity/individual. An entry is required. (For a sole proprietor or disregarded entity, enter the
                owner’s name on line 1, and enter the business/disregarded entity’s name on line 2.)
              </div>
            </div>
            <input
              className="input-s"
              name="entity_name"
              value={formData?.entity_name}
              // checked={formData.entity_name}
              onChange={handleChange}
              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">2</div>
              <div> Business name/disregarded entity name, if different from above</div>
            </div>
            <input
              className="input-s"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              style={{ border: 'none', backgroundColor: '#FAFAFA', height: '25px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid black',
                gap: '10px',
                width: '90%',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">3a</div>
                  <div>
                    Check the appropriate box for federal tax classification of the entity/individual whose name is
                    entered on line 1. Check only one of the following seven boxes.{' '}
                  </div>
                </div>
                <div style={{ display: 'flex', padding: '0 15px', gap: '30px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="checkbox"
                      name="individual_sole_proprietor"
                      checked={formData.individual_sole_proprietor}
                      onChange={handleChange}
                    />
                    Individual/sole proprietor
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="checkbox"
                      name="c_corporation"
                      checked={formData.c_corporation}
                      onChange={handleChange}
                    />
                    C corporation
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="checkbox"
                      name="a_corporation"
                      checked={formData.a_corporation}
                      onChange={handleChange}
                    />
                    S corporation
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="checkbox" name="partnership" checked={formData.partnership} onChange={handleChange} />
                    Partnership
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="checkbox"
                      value={formData?.trust_estate}
                      name="trust_estate"
                      checked={formData.trust_estate}
                      onChange={handleChange}
                    />
                    Trust/estate
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input type="checkbox" name="llc" checked={formData.llc} onChange={handleChange} />
                  LLC. Enter the tax classification (C = C corporation, S = S corporation, P = Partnership)
                  <hr /> . <hr /> . <hr /> . <hr />.<hr />{' '}
                  <span>
                    {' '}
                    <input
                      className="input-s"
                      name="tax_classification"
                      value={formData.tax_classification}
                      onChange={handleChange}
                      style={{
                        border: 'none',
                        backgroundColor: '#FAFAFA',
                        height: '25px',
                        outline: 'none',
                        borderBottom: '1px solid black',
                      }}
                    />
                  </span>
                </div>
                <p style={{ padding: '0 35px' }}>
                  {' '}
                  <bold className="bold">Note:</bold> Check the “LLC” box above and, in the entry space, enter the
                  appropriate code (C, S, or P) for the tax classification of the LLC, unless it is a disregarded
                  entity. A disregarded entity should instead check the appropriate box for the tax classification of
                  its owner.
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <input type="checkbox" name="other" checked={formData.other} onChange={handleChange} />
                  Other (see instructions)
                  <span>
                    {' '}
                    <input
                      name="instruction"
                      checked={formData.instruction}
                      onChange={handleChange}
                      className="input-s"
                      style={{
                        border: 'none',
                        backgroundColor: '#FAFAFA',
                        height: '25px',
                        outline: 'none',
                        width: '400px',
                      }}
                    />
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">3b</div>
                  <div>
                    {' '}
                    If on line 3a you checked “Partnership” or “Trust/estate,” or checked “LLC” and entered “P” as its
                    tax classification, and you are providing this form to a partnership, trust, or estate in which you
                    have an ownership interest, check this box if you have any foreign partners, owners, or
                    beneficiaries. See instructions &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp; .
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
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderBottom: '1px solid black',
                borderLeft: '1px solid black',
                width: '25%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="bold">4</div>
                <div>
                  Exemptions (codes apply only to certain entities, not individuals; see instructions on page 3):
                </div>
              </div>
              <span>
                Exempt payee code (if any)
                <input
                  className="input-s"
                  name="exemption"
                  value={formData.exemption}
                  onChange={handleChange}
                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: '25px',
                    borderBottom: '1px solid black',
                    width: '50px',
                    outline: 'none',
                  }}
                />
              </span>
              <span>
                Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any)
                <input
                  className="input-s"
                  name="exemption_fatca"
                  value={formData.exemption_fatca}
                  onChange={handleChange}
                  style={{
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    height: '25px',
                    borderBottom: '1px solid black',
                    width: '50px',
                    outline: 'none',
                  }}
                />
              </span>
              <span style={{ textAlign: 'center' }}>(Applies to accounts maintained outside the United States.)</span>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">5</div>
                  <div>Address (number, street, and apt. or suite no.). See instructions</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <span>
                    {' '}
                    <input
                      className="input-s"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      style={{
                        border: 'none',
                        backgroundColor: '#FAFAFA',
                        height: '25px',
                        outline: 'none',
                        width: '700px',
                      }}
                    />
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="bold">6</div>
                  <div>City, state, and ZIP code</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
                  <span>
                    {' '}
                    <input
                      className="input-s"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        border: 'none',
                        backgroundColor: '#FAFAFA',
                        height: '25px',
                        outline: 'none',
                        width: '700px',
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderBottom: '1px solid black',
                borderLeft: '1px solid black',
                width: '45%',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <div>Requester’s name and address (optional)</div>
              </div>

              <textarea
                rows={3}
                value={formData.requester_name}
                name="requester_name"
                onChange={handleChange}
                style={{ border: 'none', backgroundColor: '#FAFAFA', outline: 'none' }}
              />
            </div>
          </div>

          {/* <div></div>
  <div></div>
  <div></div>
  <div></div> */}
          <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid black', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="bold">7</div>
              <div>List account number(s) here (optional)</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'start', padding: '0 15px' }}>
              <span>
                {' '}
                <input
                  className="input-s"
                  name="account_list"
                  type='number'
                  value={formData.account_list}
                  onChange={handleChange}
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
            Part I
          </span>{' '}
          Taxpayer Identification Number (TIN)
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <p>
            Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid backup
            withholding. For individuals, this is generally your social security number (SSN). However, for a resident
            alien, sole proprietor, or disregarded entity, see the instructions for Part I, later. For other entities,
            it is your employer identification number (EIN). If you do not have a number, see How to get a TIN, later.
          </p>
          <p>
            <span className="bold">Note:</span> If the account is in more than one name, see the instructions for line
            1. See also What Name and Number To Give the Requester for guidelines on whose number to enter.
          </p>
        </div>
        <div style={{ width: '900px', padding: '0 10px', display: 'flex', flexDirection: 'column' }}>
          <div>
            <header className="bold" style={{ border: '1px solid black' }}>
              Social security number
            </header>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingTop: '2px' }}>
              {[...Array(3)].map((_, index) => (
                <input
                  key={index}
                  type="number"
                  value={inputValues[index]}
                  maxLength="1"
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{
                    width: '25px',
                    height: '40px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid black',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              ))}
              <div style={{ width: '10px', height: '2px', backgroundColor: 'black' }} />
              {[...Array(2)].map((_, index) => (
                <input
                  key={index + 3} // Adjust the index to avoid duplicate keys
                  type="number"
                  value={inputValues[index + 3]}
                  maxLength="1"
                  ref={(el) => (inputsRef.current[index + 3] = el)}
                  onChange={(e) => handleInputChange(e, index + 3)}
                  onKeyDown={(e) => handleKeyDown(e, index + 3)}
                  style={{
                    width: '25px',
                    height: '40px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid black',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              ))}
              <div style={{ width: '10px', height: '2px', backgroundColor: 'black' }} />
              {[...Array(4)].map((_, index) => (
                <input
                  key={index + 5} // Adjust the index to avoid duplicate keys
                  type="number"
                  maxLength="1"
                  value={inputValues[index + 5]}
                  ref={(el) => (inputsRef.current[index + 5] = el)}
                  onChange={(e) => handleInputChange(e, index + 5)}
                  onKeyDown={(e) => handleKeyDown(e, index + 5)}
                  style={{
                    width: '25px',
                    height: '40px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid black',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              ))}
            </div>
          </div>
          or
          <div>
            <header className="bold" style={{ border: '1px solid black' }}>
              Employer identification number
            </header>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingTop: '2px' }}>
              {[...Array(2)].map((_, index) => (
                <input
                  key={index} // Unique key for the first group
                  type="number"
                  maxLength="1"
                  value={inputValuesemp[index]} // Bind the value to state
                  ref={(el) => (inputsRefEmplyee.current[index] = el)} // Store reference
                  onChange={(e) => handleInputChangeEmplyee(e, index)} // Pass correct index
                  onKeyDown={(e) => handleKeyDownEmplyee(e, index)} // Pass correct index
                  style={{
                    width: '25px',
                    height: '40px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid black',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              ))}
              <div style={{ width: '10px', height: '2px', backgroundColor: 'black' }} />
              {[...Array(7)].map((_, index) => (
                <input
                  key={index + 2}
                  type="number"
                  maxLength="1"
                  value={inputValuesemp[index + 2]}
                  ref={(el) => (inputsRefEmplyee.current[index + 2] = el)}
                  onChange={(e) => handleInputChangeEmplyee(e, index + 2)} // Pass adjusted index
                  onKeyDown={(e) => handleKeyDownEmplyee(e, index + 2)} // Pass adjusted index
                  style={{
                    width: '25px',
                    height: '40px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid black',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              ))}
            </div>
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
            Part II
          </span>{' '}
          Certification
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <p>Under penalties of perjury, I certify that:</p>
          <p>
            <span className="bold">1:</span> The number shown on this form is my correct taxpayer identification number
            (or I am waiting for a number to be issued to me); and
          </p>
          <p>
            <span className="bold">2:</span> I am not subject to backup withholding because (a) I am exempt from backup
            withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to
            backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified
            me that I am no longer subject to backup withholding; and
          </p>
          <p>
            <span className="bold">3:</span>I am a U.S. citizen or other U.S. person (defined below); and
          </p>
          <p>
            <span className="bold">4:</span> The FATCA code(s) entered on this form (if any) indicating that I am exempt
            from FATCA reporting is correct.
          </p>
          <p>
            <span className="bold">Certification instructions:</span> TYou must cross out item 2 above if you have been
            notified by the IRS that you are currently subject to backup withholding because you have failed to report
            all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For
            mortgage interest paid, acquisition or abandonment of secured property, cancellation of debt, contributions
            to an individual retirement arrangement (IRA), and, generally, payments other than interest and dividends,
            you are not required to sign the certification, but you must provide your correct TIN. See the instructions
            for Part II, later.
          </p>
        </div>
      </div>
      <div
        className="col-md-12"
        style={{
          padding: '0',
          fontSize: '15px',
          border: '2px solid black',
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
              marginRight: '25px',
            }}
          >
            Sign Here
          </span>{' '}
          Signature of U.s. person:{' '}
          <SignatureCanvas
            penColor="black"
            onEnd={handleEnd}
            ref={signatureCanvasRef}
            canvasProps={{ width: 100, height: 50, className: 'sigCanvas' }}
          />
        </p>
        <p>
          Date:{' '}
          <input
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
          />
        </p>
      </div>

      <img src={'/assets/l111.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l2.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l3.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l4.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l5.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l6.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l7.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l8.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l9.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l10.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l11.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l12.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l13.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l14.png'} alt="imagess" style={{ width: '100%' }} />
      <img src={'/assets/l15.png'} alt="imagess" style={{ width: '100%' }} />
      {state ? (
        <button onClick={(e) => handleUpdate(e)} type="submit">
          Update
        </button>
      ) : (
        <button onClick={(e) => handleSubmit(e)} type="submit">
          Submit
        </button>
      )}
    </div>
  );
}
