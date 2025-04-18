/* eslint-disable no-nested-ternary */

// import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useLocation,
  //  useNavigate
   } from 'react-router';
// import { useNavigate } from 'react-router';
// import axiosInstance from '../../../utils/axios';

// eslint-disable-next-line arrow-body-style
const MiskForm = () => {
  const { state } = useLocation();
  const user = JSON.parse(localStorage.getItem('user_new'));

  // console.log(state);

  const [formData, setFormData] = useState({
    payer_detail: state?.payer_detail || '',
    payer_tin: state?.payer_tin || '',
    recipient_tin: state?.recipient_tin || '', 
    recipient_name: state?.recipient_name || '', 
    complete_address: state?.complete_address || '',
    fatca_requirement: state?.fatca_requirement || 0,
    account_number: state?.account_number || '', 
    second_tin_not: state?.second_tin_not || 0,
    rent: state?.rent || '', 
    royalty: state?.royalty || '',
    other_income: state?.other_income || '',
    federal_income_tax: state?.federal_income_tax || '', 
    fishing_boat_proceed: state?.fishing_boat_proceed || '',
    medical_health_care_payment: state?.medical_health_care_payment || '',
    payer_direct_sale: state?.payer_direct_sale || 0,
    substitute_payment: state?.substitute_payment || '',
    crop_insurance_proceed: state?.crop_insurance_proceed || '',
    gross_proceed_paid: state?.gross_proceed_paid || '',
    fish_purchased_for_resale: state?.fish_purchased_for_resale || '',
    section_deferral: state?.section_deferral || '',
    excess_golden_parachute_payment: state?.excess_golden_parachute_payment || '',
    nonqualified_deferred_compensation: state?.nonqualified_deferred_compensation || '',
    state_tax_a: state?.state_tax_a || '',
    state_tax_b: state?.state_tax_b || '',
    payer_state_number_a: state?.payer_state_number_a || '',
    payer_state_number_b: state?.payer_state_number_b || '',
    state_income_a: state?.state_tax_a || '',
    state_income_b: state?.state_tax_b || '',
    void: state?.void || 0,
    checked: state?.checked || 0,
    street_address: state?.street_address || '',
    for_calender_year: state?.for_calender_year || '',
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };
  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const formDatas = new FormData();
    //   Object.keys(formData).forEach((key) => {
    //     formDatas.append(key, formData[key]);
    //   });
    //   formDatas.append('_method', 'Put');
    //   await axiosInstance.post(`api/admin/agent/miscform/${state?.id}`, formDatas).then((response) => {
    //     if (response?.data?.response) {
    //       enqueueSnackbar(response?.data?.response);
    //       navigate('/dashboard/pdf_irsshow');
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
  // console.log(formData,'fromdata')
  return (
    <>
      <img src="/assets/r1.png" alt="irs" style={{ width: '100%' }} />
      <div>
        <p>
          Copy A of this form is provided for informational purposes only. Copy A appears in red, similar to the
          official IRS form. The official printed version of Copy A of this IRS form is scannable, but the online
          version of it, printed from this website, is not. Do not print and file copy A downloaded from this website; a
          penalty may be imposed for filing with the IRS information return forms that can’t be scanned. See part O in
          the current General Instructions for Certain Information Returns, available at{' '}
          <a href="https://irs.gov/Form1099">IRS.gov/Form1099</a>, for more information about penalties.
        </p>
        <p>
          Please note that Copy B and other copies of this form, which appear in black, may be downloaded and printed
          and used to satisfy the requirement to provide the information to the recipient.
        </p>
        <p>
          If you have 10 or more information returns to file, you may be required to file e-file. Go to
          <a href="https://IRS.gov/InfoReturn">IRS.gov/InfoReturn</a> for e-file options.
        </p>
        <p>
          If you have fewer than 10 information returns to file, we strongly encourage you to e-file. If you want to
          file them on paper, you can place an order for the official IRS information returns, which include a scannable
          Copy A for filing with the IRS and all other applicable copies of the form, at{' '}
          <a href="https://IRS.gov/EmployerForms">IRS.gov/EmployerForms.</a> We’ll mail you the forms you request and
          their instructions, as well as any publications you may order.
        </p>
        <p>
          See Publications <a href="https://irs.gov/pub1141">1141</a>, <a href="https://irs.gov/pub1167">1167</a>, and{' '}
          <a href="https://irs.gov/pub1179">1179</a> for more information about printing these forms.
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: '\n        table, th, td {\n        font-size: 11px;\n        }\n        ',
        }}
      />
      <div id="sidebar">
        <div id="outline" />
      </div>
      <div id="page-container">
        <div id="pf1" className="pf w0 h0" data-page-no={0}>
          <div className="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}' />
        </div>
        <br />
        <br />
        <br />
        <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <div style={{ width: 100 }}>
                  <strong> &nbsp; 9595</strong>
                </div>
              </td>
              <td>
                <div style={{ width: 100 }}>
                  <input
                    style={{ marginBottom: '-7px' }}
                    type="checkbox"
                    name="void"
                    checked={formData.void}
                    onChange={handleChange}
                    id=""
                  />
                  <strong style={{ color: '#eb1014' }}> &nbsp; VOID</strong>
                </div>
              </td>
              <td>
                <div style={{ width: 100 }}>
                  <input
                    style={{ marginBottom: '-7px' }}
                    type="checkbox"
                    name="checked"
                    checked={formData.checked}
                    onChange={handleChange}
                  />
                  <strong style={{ color: '#eb1014' }}> &nbsp; CORRECTED</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="pf2" className="pf w0 h0" data-page-no={2}>
          <table style={{ color: '#eb1014', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div>
                    PAYER’S name, street address, city or town, state or province, country, ZIP or foreign postal code,
                    and telephone no.
                  </div>
                  <textarea
                    type="text"
                    name="payer_detail"
                    value={formData.payer_detail}
                    onChange={handleChange}
                    rows={5}
                    draggable={false}
                    style={{ width: '100%', resize: 'none' }}
                  />
                </td>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>1 Rents</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <span>
                        <input
                          type="number"
                          name="rent"
                          checked={formData.rent}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </span>{' '}
                    </div>
                  </div>
                  <div style={{ color: '#eb1014' }}>
                    <div>2 Royalties</div>
                    <div style={{ display: 'flex', backgroundColor: '#FAFAFA' }}>
                      ${' '}
                      <span>
                        <input
                          type="number"
                          name="royalty"
                          value={formData.royalty}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </span>{' '}
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>OMB No. 1545-0115</div>
                    <div>
                      Form <strong>1099-MISC</strong>
                    </div>
                    <div>(Rev. January 2024)</div>
                  </div>
                  <div style={{ color: '#eb1014' }}>
                    <div style={{ textAlign: 'center' }}>For calendar year</div>
                    <div
                      style={{
                        width: 60,
                        textAlign: 'center',
                        marginBottom: 5,
                        marginLeft: 40,
                        borderBottom: '1px solid #eb1014',
                      }}
                    >
                      <input
                        type="date"
                        name="for_calender_year"
                        value={formData.for_calender_year}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <h2>Miscellaneous Information</h2>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: 100,
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #eb1014' }}>
                    <div style={{ width: 300 }}>
                      <span style={{ marginRight: 82 }}>PAYER’S TIN</span>
                      <span style={{ borderLeft: '1px solid #eb1014' }}>RECIPIENT’S TIN</span>{' '}
                    </div>
                    <div
                      style={{
                        width: 300,
                        backgroundColor: 'rgb(233, 185, 201)',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <span>
                        <input
                          type="text"
                          name="payer_tin"
                          value={formData.payer_tin}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </span>
                      <span style={{ borderLeft: '1px solid #eb1014', paddingLeft: 30 }}>
                        <input
                          type="text"
                          name="recipient_tin"
                          checked={formData.recipient_tin}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </span>{' '}
                    </div>
                  </div>
                  <div style={{ color: '#eb1014' }}>
                    <div>RECIPIENT’S name</div>
                    <div>
                      <p>
                        <input
                          type="text"
                          name="recipient_name"
                          checked={formData.recipient_name}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </p>
                    </div>
                  </div>
                  <div style={{ color: '#eb1014' }}>
                    <div>Street address (including apt. no.)</div>
                    <div>
                      <p>
                        <input
                          type="text"
                          name="street_address"
                          value={formData.street_address}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </p>
                    </div>
                  </div>
                  <div style={{ color: '#eb1014', borderBottom: '1px solid #eb1014' }}>
                    <div>City or town, state or province, country, and ZIP or foreign postal code</div>
                    <div>
                      <p>
                        <input
                          type="text"
                          name="complete_address"
                          value={formData.complete_address}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: 5 }}>
                    <span style={{ width: 300, backgroundColor: '#e4b0b1' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span style={{ borderLeft: '1px solid #eb1014', paddingLeft: 10 }}>
                      13 FATCA filing requirement{' '}
                    </span>{' '}
                    <span>
                      <input
                        style={{ marginBottom: '-9px' }}
                        type="checkbox"
                        name="fatca_requirement"
                        checked={formData.fatca_requirement}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    width: 110,
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div
                      style={{
                        borderBottom: '1px solid #eb1014',
                        color: '#eb1014',
                      }}
                    >
                      <div>3 Other income</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input
                          type="number"
                          name="other_income"
                          value={formData.other_income}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </div>
                    </div>
                    <div>5 Fishing boat proceeds</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="fishing_boat_proceed"
                        checked={formData.fishing_boat_proceed}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>
                      <span>
                        7 Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                      </span>{' '}
                      &nbsp;{' '}
                      <input
                        style={{ marginTop: 7, marginBottom: '-4px' }}
                        type="checkbox"
                        name="payer_direct_sale"
                        checked={formData.payer_direct_sale}
                        onChange={handleChange}
                        id=""
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: '1px solid #eb1014',
                      width: 130,
                      color: '#eb1014',
                    }}
                  >
                    <div>9 Crop insurance proceeds</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="crop_insurance_proceed"
                        checked={formData.crop_insurance_proceed}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>11 Fish purchased for resale</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="fish_purchased_for_resale"
                        checked={formData.fish_purchased_for_resale}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ color: '#eb1014' }}>
                    <div>14 Excess golden parachute payments</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="excess_golden_parachute_payment"
                        checked={formData.excess_golden_parachute_payment}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div
                      style={{
                        borderBottom: '1px solid #eb1014',
                        color: '#eb1014',
                      }}
                    >
                      <div>4 Federal income tax withheld</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input
                          type="number"
                          name="federal_income_tax"
                          checked={formData.federal_income_tax}
                          onChange={handleChange}
                          style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                        />
                      </div>
                    </div>
                    <div>6 Medical and health care payments</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="medical_health_care_payment"
                        checked={formData.medical_health_care_payment}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>8 Substitute payments in lieu of dividends or interest</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="substitute_payment"
                        checked={formData.substitute_payment}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>10 Gross proceeds paid to an attorney</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="gross_proceed_paid"
                        checked={formData.gross_proceed_paid}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid #eb1014', color: '#eb1014' }}>
                    <div>12 Section 409A deferrals</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="section_deferral"
                        checked={formData.section_deferral}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ color: '#eb1014', width: 130 }}>
                    <div>15 Nonqualified deferred compensation</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="nonqualified_deferred_compensation"
                        checked={formData.nonqualified_deferred_compensation}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    borderRight: 'none',
                    color: '#eb1014',
                    borderCollapse: 'collapse',
                    textAlign: 'right',
                  }}
                >
                  <div>
                    <strong>Copy A</strong>
                  </div>
                  <div>
                    <strong>For</strong>
                  </div>
                  <div>
                    <strong>Internal Revenue</strong>
                  </div>
                  <div>
                    <strong>Service Center</strong>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div>
                    <strong>File with Form 1096.</strong>
                  </div>
                  <div>For Privacy Act and Paperwork Reduction Act Notice, see the</div>
                  <div>
                    <strong>current General Instructions for Certain Information Returns</strong>
                  </div>
                  <div />
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #eb1014', color: '#eb1014' }}>
                  <div style={{}}>
                    <span style={{}}>Account number (see instructions)</span>${' '}
                    <input
                      type="number"
                      name="account_number"
                      checked={formData.account_number}
                      onChange={handleChange}
                      style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                    />
                    <span style={{ borderLeft: '1px solid #eb1014', paddingLeft: 10 }}>2nd TIN not. </span>{' '}
                    <span>
                      <input
                        style={{ marginTop: 5 }}
                        type="checkbox"
                        name="second_tin_not"
                        checked={formData.second_tin_not}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                  <p style={{ width: 200 }} />
                </td>
                <td style={{ border: '1px solid #eb1014', color: '#eb1014' }}>
                  <div style={{ color: '#eb1014' }}>
                    <div>16 State tax withheld</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #eb1014' }}>
                      ${' '}
                      <input
                        type="number"
                        name="state_tax_a"
                        checked={formData.state_tax_a}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="state_tax_b"
                        checked={formData.state_tax_b}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
                <td style={{ border: '1px solid #eb1014', color: '#eb1014' }}>
                  <div style={{ color: '#eb1014' }}>
                    <div>17 State/Payer’s state no.</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #eb1014' }}>
                      ${' '}
                      <input
                        type="number"
                        name="payer_state_number_a"
                        checked={formData.payer_state_number_a}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="payer_state_number_b"
                        checked={formData.payer_state_number_b}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid #eb1014',
                    borderRight: 'none',
                    color: '#eb1014',
                  }}
                >
                  <div style={{ color: '#eb1014' }}>
                    <div>18 State income</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #eb1014' }}>
                      ${' '}
                      <input
                        type="number"
                        name="state_income_a"
                        checked={formData.state_income_a}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <input
                        type="number"
                        name="state_income_b"
                        checked={formData.state_income_b}
                        onChange={handleChange}
                        style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ color: '#eb1014' }}>
            <tbody>
              <tr>
                <td style={{ width: 170 }}>
                  <div>
                    Form <strong>1099-MISC</strong> (Rev. 1-2024)
                  </div>
                </td>
                <td style={{ width: 90 }}>
                  <div>
                    Cat. No. <span> 14425J</span>
                  </div>
                </td>
                <td style={{ width: 150 }}>
                  <div>www.irs.gov/Form1099MISC</div>
                </td>
                <td>
                  <div>Department of the Treasury - Internal Revenue Service</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ color: '#eb1014' }}>
            <strong>Do Not Cut or Separate Forms on This Page — Do Not Cut or Separate Forms on This Page</strong>
            {user?.role === 'admin' && (
              <button onClick={(e) => handleSubmit(e)} type="submit">
                Update
              </button>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td>
                  <div style={{ width: 100 }} />
                </td>
                <td>
                  <div style={{ width: 100 }}>
                    <input
                      style={{ marginBottom: '-7px' }}
                      type="checkbox"
                      name="void"
                      checked={formData.void}
                      onChange={handleChange}
                      id=""
                    />
                    <strong style={{ color: '#000' }}> &nbsp; VOID</strong>
                  </div>
                </td>
                <td>
                  <div style={{ width: 300 }}>
                    <input
                      style={{ marginBottom: '-7px' }}
                      type="checkbox"
                      name="void"
                      checked={formData.void}
                      onChange={handleChange}
                    />
                    <strong style={{ color: '#000' }}> &nbsp; CORRECTED</strong>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="pf2" className="pf w0 h0" data-page-no={2}>
            <table style={{ color: '#000', borderCollapse: 'collapse' }}>
              <tbody style={{ color: 'black' }}>
                <tr>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div>
                      PAYER’S name, street address, city or town, state or province, country, ZIP or foreign postal
                      code, and telephone no.
                    </div>
                    <textarea type="text" rows={5} draggable={false} style={{ width: '100%', resize: 'none' }} />
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>1 Rents</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <span>
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </span>{' '}
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>2 Royalties</div>
                      <div style={{ display: 'flex', backgroundColor: '#FAFAFA' }}>
                        ${' '}
                        <span>
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </span>{' '}
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>OMB No. 1545-0115</div>
                      <div>
                        Form <strong>1099-MISC</strong>
                      </div>
                      <div>(Rev. January 2024)</div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div style={{ textAlign: 'center' }}>For calendar year</div>
                      <div
                        style={{
                          width: 60,
                          textAlign: 'center',
                          marginBottom: 5,
                          marginLeft: 40,
                          borderBottom: '1px solid black',
                        }}
                      >
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <h2>Miscellaneous Information</h2>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: 100,
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black' }}>
                      <div style={{ width: 300 }}>
                        <span style={{ marginRight: 82 }}>PAYER’S TIN</span>
                        <span style={{ borderLeft: '1px solid black' }}>RECIPIENT’S TIN</span>{' '}
                      </div>
                      <div
                        style={{
                          width: 300,
                          backgroundColor: 'rgb(233, 185, 201)',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <span>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </span>
                        <span style={{ borderLeft: '1px solid black', paddingLeft: 30 }}>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </span>{' '}
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>RECIPIENT’S name</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>Street address (including apt. no.)</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ color: 'black', borderBottom: '1px solid black' }}>
                      <div>City or town, state or province, country, and ZIP or foreign postal code</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ marginTop: 5 }}>
                      <span style={{ width: 300, backgroundColor: 'black' }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>
                        13 FATCA filing requirement{' '}
                      </span>{' '}
                      <span>
                        <input
                          style={{ marginBottom: '-9px' }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      width: 110,
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div
                        style={{
                          borderBottom: '1px solid black',
                          color: 'black',
                        }}
                      >
                        <div>3 Other income</div>
                        <div style={{ display: 'flex' }}>
                          ${' '}
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </div>
                      </div>
                      <div>5 Fishing boat proceeds</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>
                        <span>
                          7 Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                        </span>{' '}
                        &nbsp;{' '}
                        <input
                          style={{ marginTop: 7, marginBottom: '-4px' }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                          id=""
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: '1px solid black',
                        width: 130,
                        color: 'black',
                      }}
                    >
                      <div>9 Crop insurance proceeds</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>11 Fish purchased for resale</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>14 Excess golden parachute payments</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div
                        style={{
                          borderBottom: '1px solid black',
                          color: 'black',
                        }}
                      >
                        <div>4 Federal income tax withheld</div>
                        <div style={{ display: 'flex' }}>
                          ${' '}
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </div>
                      </div>
                      <div>6 Medical and health care payments</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>8 Substitute payments in lieu of dividends or interest</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>10 Gross proceeds paid to an attorney</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>12 Section 409A deferrals</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ color: 'black', width: 130 }}>
                      <div>15 Nonqualified deferred compensation</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderRight: 'none',
                      color: 'black',
                      borderCollapse: 'collapse',
                      textAlign: 'right',
                    }}
                  >
                    <div>
                      <strong>Copy A</strong>
                    </div>
                    <div>
                      <strong>For</strong>
                    </div>
                    <div>
                      <strong>Internal Revenue</strong>
                    </div>
                    <div>
                      <strong>Service Center</strong>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                      <strong>File with Form 1096.</strong>
                    </div>
                    <div>For Privacy Act and Paperwork Reduction Act Notice, see the</div>
                    <div>
                      <strong>current General Instructions for Certain Information Returns</strong>
                    </div>
                    <div />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{}}>
                      <span style={{}}>Account number (see instructions)</span>
                      <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>2nd TIN not. </span>{' '}
                      <span>
                        <input
                          style={{ marginTop: 5 }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                    <p style={{ width: 200 }} />
                  </td>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{ color: 'black' }}>
                      <div>16 State tax withheld</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>

                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{ color: 'black' }}>
                      <div>17 State/Payer’s state no.</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>

                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderRight: 'none',
                      color: 'black',
                    }}
                  >
                    <div style={{ color: 'black' }}>
                      <div>18 State income</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ color: '#000' }}>
              <tbody>
                <tr>
                  <td style={{ width: 200 }}>
                    <div>
                      Form <strong>1099-MISC</strong> (Rev. 1-2024)
                    </div>
                  </td>
                  <td style={{ width: 200 }}>
                    <div>www.irs.gov/Form1099MISC</div>
                  </td>
                  <td>
                    <div>Department of the Treasury - Internal Revenue Service</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <br />
        <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <div style={{ width: 100 }} />
              </td>
              <td>
                <div style={{ width: 100 }} />
              </td>
              <td>
                <div style={{ width: 300 }}>
                  <input
                    style={{ marginBottom: '-7px' }}
                    type="checkbox"
                    name="void"
                    checked={formData.void}
                    onChange={handleChange}
                  />
                  <strong style={{ color: '#000' }}> &nbsp; CORRECTED (if checked)</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="pf2" className="pf w0 h0" data-page-no={2}>
          <div id="pf2" className="pf w0 h0" data-page-no={2}>
            <table style={{ color: '#000', borderCollapse: 'collapse' }}>
              <tbody style={{ color: 'black' }}>
                <tr>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div>
                      PAYER’S name, street address, city or town, state or province, country, ZIP or foreign postal
                      code, and telephone no.
                    </div>
                    <textarea type="text" rows={5} draggable={false} style={{ width: '100%', resize: 'none' }} />
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>1 Rents</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <span>
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </span>{' '}
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>2 Royalties</div>
                      <div style={{ display: 'flex', backgroundColor: '#FAFAFA' }}>
                        ${' '}
                        <span>
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </span>{' '}
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>OMB No. 1545-0115</div>
                      <div>
                        Form <strong>1099-MISC</strong>
                      </div>
                      <div>(Rev. January 2024)</div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div style={{ textAlign: 'center' }}>For calendar year</div>
                      <div
                        style={{
                          width: 60,
                          textAlign: 'center',
                          marginBottom: 5,
                          marginLeft: 40,
                          borderBottom: '1px solid black',
                        }}
                      >
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <h2>Miscellaneous Information</h2>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: 100,
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black' }}>
                      <div style={{ width: 300 }}>
                        <span style={{ marginRight: 82 }}>PAYER’S TIN</span>
                        <span style={{ borderLeft: '1px solid black' }}>RECIPIENT’S TIN</span>{' '}
                      </div>
                      <div
                        style={{
                          width: 300,
                          backgroundColor: 'rgb(233, 185, 201)',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <span>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </span>
                        <span style={{ borderLeft: '1px solid black', paddingLeft: 30 }}>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </span>{' '}
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>RECIPIENT’S name</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>Street address (including apt. no.)</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ color: 'black', borderBottom: '1px solid black' }}>
                      <div>City or town, state or province, country, and ZIP or foreign postal code</div>
                      <div>
                        <p>
                          <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                        </p>
                      </div>
                    </div>
                    <div style={{ marginTop: 5 }}>
                      <span style={{ width: 300, backgroundColor: 'black' }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>
                        13 FATCA filing requirement{' '}
                      </span>{' '}
                      <span>
                        <input
                          style={{ marginBottom: '-9px' }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      width: 110,
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div
                        style={{
                          borderBottom: '1px solid black',
                          color: 'black',
                        }}
                      >
                        <div>3 Other income</div>
                        <div style={{ display: 'flex' }}>
                          ${' '}
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </div>
                      </div>
                      <div>5 Fishing boat proceeds</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>
                        <span>
                          7 Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                        </span>{' '}
                        &nbsp;{' '}
                        <input
                          style={{ marginTop: 7, marginBottom: '-4px' }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                          id=""
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: '1px solid black',
                        width: 130,
                        color: 'black',
                      }}
                    >
                      <div>9 Crop insurance proceeds</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>11 Fish purchased for resale</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ color: 'black' }}>
                      <div>14 Excess golden parachute payments</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      color: 'black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div
                        style={{
                          borderBottom: '1px solid black',
                          color: 'black',
                        }}
                      >
                        <div>4 Federal income tax withheld</div>
                        <div style={{ display: 'flex' }}>
                          ${' '}
                          <input
                            type="number"
                            style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }}
                          />
                        </div>
                      </div>
                      <div>6 Medical and health care payments</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>8 Substitute payments in lieu of dividends or interest</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>10 Gross proceeds paid to an attorney</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                      <div>12 Section 409A deferrals</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div style={{ color: 'black', width: 130 }}>
                      <div>15 Nonqualified deferred compensation</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderRight: 'none',
                      color: 'black',
                      borderCollapse: 'collapse',
                      textAlign: 'right',
                    }}
                  >
                    <div>
                      <strong>Copy A</strong>
                    </div>
                    <div>
                      <strong>For</strong>
                    </div>
                    <div>
                      <strong>Internal Revenue</strong>
                    </div>
                    <div>
                      <strong>Service Center</strong>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                      <strong>File with Form 1096.</strong>
                    </div>
                    <div>For Privacy Act and Paperwork Reduction Act Notice, see the</div>
                    <div>
                      <strong>current General Instructions for Certain Information Returns</strong>
                    </div>
                    <div />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{}}>
                      <span style={{}}>Account number (see instructions)</span>
                      <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>2nd TIN not. </span>{' '}
                      <span>
                        <input
                          style={{ marginTop: 5 }}
                          type="checkbox"
                          name="void"
                          checked={formData.void}
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                    <p style={{ width: 200 }} />
                  </td>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{ color: 'black' }}>
                      <div>16 State tax withheld</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>

                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ border: '1px solid black', color: 'black' }}>
                    <div style={{ color: 'black' }}>
                      <div>17 State/Payer’s state no.</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>

                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderRight: 'none',
                      color: 'black',
                    }}
                  >
                    <div style={{ color: 'black' }}>
                      <div>18 State income</div>
                      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ color: '#000' }}>
              <tbody>
                <tr>
                  <td style={{ width: 170 }}>
                    <div>
                      Form <strong>1099-MISC</strong> (Rev. 1-2024)
                    </div>
                  </td>
                  <td style={{ width: 120 }}>
                    <div>(keep for your records)</div>
                  </td>
                  <td style={{ width: 150 }}>
                    <div>www.irs.gov/Form1099MISC</div>
                  </td>
                  <td>
                    <div>Department of the Treasury - Internal Revenue Service</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: 340 }}>
                  <h2>Instructions for Recipient</h2>
                  <div>
                    <strong>Recipient’s taxpayer identification number (TIN).</strong> For your protection, this form
                    may show only the last four digits of your social security number (SSN), individual taxpayer
                    identification number (ITIN), adoption taxpayer identification number (ATIN), or employer
                    identification number (EIN). However, the payer has reported your complete TIN to the IRS.
                  </div>
                  <div>
                    <strong>Account number. </strong> May show an account or other unique number the payer assigned to
                    distinguish your account.
                  </div>
                  <div>
                    <strong>Amounts shown may be subject to self-employment (SE) tax. </strong> Individuals should see
                    the Instructions for Schedule SE (Form 1040). Corporations, fiduciaries, or partnerships must report
                    the amounts on the appropriate line of their tax returns
                  </div>
                  <div>
                    <strong>Form 1099-MISC incorrect? </strong> If this form is incorrect or has been issued in error,
                    contact the payer. If you cannot get this form corrected, attach an explanation to your tax return
                    and report your information correctly.
                  </div>
                  <div>
                    <strong>Box 1. </strong> Report rents from real estate on Schedule E (Form 1040). However, report
                    rents on Schedule C (Form 1040) if you provided significant services to the tenant, sold real estate
                    as a business, or rented personal property as a business. See Pub. 527.
                  </div>
                  <div>
                    <strong>Box 2. </strong> Report royalties from oil, gas, or mineral properties; copyrights; and
                    patents on Schedule E (Form 1040). However, report payments for a working interest as explained in
                    the Schedule E (Form 1040) instructions. For royalties on timber, coal, and iron ore, see Pub. 544.
                  </div>
                  <div>
                    <strong>Box 3. </strong> Generally, report this amount on the “Other income” line of Schedule 1
                    (Form 1040) and identify the payment. The amount shown may be payments received as the beneficiary
                    of a deceased employee, prizes, awards, taxable damages, Indian gaming profits, or other taxable
                    income. See Pub. 525. If it is trade or business income, report this amount on Schedule C or F (Form
                    1040).
                  </div>
                  <div>
                    <strong>Box 4.</strong> Shows backup withholding or withholding on Indian gaming profits. Generally,
                    a payer must backup withhold if you did not furnish your TIN. See Form W-9 and Pub. 505 for more
                    information. Report this amount on your income tax return as tax withheld.
                  </div>
                  <div>
                    <strong>Box 5. </strong> Shows the amount paid to you as a fishing boat crew member by the operator,
                    who considers you to be self-employed. Self-employed individuals must report this amount on Schedule
                    C (Form 1040). See Pub. 334.
                  </div>
                </td>
                <td style={{ paddingLeft: 7, width: 370 }}>
                  <div>
                    <strong>Box 6.</strong>For individuals, report on Schedule C (Form 1040).
                  </div>
                  <div>
                    <strong>Box 7. </strong> Shows substitute payments in lieu of dividends or tax-exempt interest
                    received by your broker on your behalf as a result of a loan of your securities. Report on the
                    “Other income” line of Schedule 1 (Form 1040).
                  </div>
                  <div>
                    <strong>Box 8. </strong> Shows substitute payments in lieu of dividends or tax-exempt interest
                    received by your broker on your behalf as a result of a loan of your securities. Report on the
                    “Other income” line of Schedule 1 (Form 1040).
                  </div>
                  <div>
                    <strong>Box 9. </strong> Report this amount on Schedule F (Form 1040).
                  </div>
                  <div>
                    <strong>Box 10. </strong> Shows gross proceeds paid to an attorney in connection with legal
                    services. Report only the taxable part as income on your return.
                  </div>
                  <div>
                    <strong>Box 11. </strong> Shows the amount of cash you received for the sale of fish if you are in
                    the trade or business of catching fish.
                  </div>
                  <div>
                    <strong>Box 12. </strong> . May show current year deferrals as a nonemployee under a nonqualified
                    deferred compensation (NQDC) plan that is subject to the requirements of section 409A plus any
                    earnings on current and prior year deferrals.
                  </div>
                  <div>
                    <strong>Box 13. </strong> If the FATCA filing requirement box is checked, the payer is reporting on
                    this Form 1099 to satisfy its account reporting requirement under chapter 4 of the Internal Revenue
                    Code. You may also have a filing requirement. See the Instructions for Form 8938.
                  </div>
                  <div>
                    <strong>Box 14. </strong> Shows your total compensation of excess golden parachute payments subject
                    to a 20% excise tax. See your tax return instructions for where to report.
                  </div>
                  <div>
                    <strong>Box 15. </strong> Shows income as a nonemployee under an NQDC plan that does not meet the
                    requirements of section 409A. Any amount included in box 12 that is currently taxable is also
                    included in this box. Report this amount as income on your tax return. This income is also subject
                    to a substantial additional tax to be reported on Form 1040, 1040-SR, or 1040-NR. See the
                    instructions for your tax return.
                  </div>
                  <div>
                    <strong>Boxes 16–18. </strong> . Show state or local income tax withheld from the payments
                  </div>
                  <div>
                    <strong>Future developments. </strong> For the latest information about developments related to Form
                    1099-MISC and its instructions, such as legislation enacted after they were published, go to
                    www.irs.gov/Form1099MISC.
                  </div>
                  <div>
                    <strong>Free File Program. </strong> Go to www.irs.gov/FreeFile to see if you qualify for no-cost
                    online federal tax preparation, e-filing, and direct deposit or payment options.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <div style={{ width: 100 }} />
              </td>
              <td>
                <div style={{ width: 80 }} />
              </td>
              <td>
                <div style={{ width: 300 }}>
                  <input
                    style={{ marginBottom: '-7px' }}
                    type="checkbox"
                    name="void"
                    checked={formData.void}
                    onChange={handleChange}
                  />
                  <strong style={{ color: '#000' }}> &nbsp; CORRECTED (if checked)</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="pf2" className="pf w0 h0" data-page-no={2}>
          <table style={{ color: '#000', borderCollapse: 'collapse' }}>
            <tbody style={{ color: 'black' }}>
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div>
                    PAYER’S name, street address, city or town, state or province, country, ZIP or foreign postal code,
                    and telephone no.
                  </div>
                  <textarea type="text" rows={5} draggable={false} style={{ width: '100%', resize: 'none' }} />
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>1 Rents</div>
                    <div style={{ display: 'flex' }}>
                      ${' '}
                      <span>
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </span>{' '}
                    </div>
                  </div>
                  <div style={{ color: 'black' }}>
                    <div>2 Royalties</div>
                    <div style={{ display: 'flex', backgroundColor: '#FAFAFA' }}>
                      ${' '}
                      <span>
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </span>{' '}
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>OMB No. 1545-0115</div>
                    <div>
                      Form <strong>1099-MISC</strong>
                    </div>
                    <div>(Rev. January 2024)</div>
                  </div>
                  <div style={{ color: 'black' }}>
                    <div style={{ textAlign: 'center' }}>For calendar year</div>
                    <div
                      style={{
                        width: 60,
                        textAlign: 'center',
                        marginBottom: 5,
                        marginLeft: 40,
                        borderBottom: '1px solid black',
                      }}
                    >
                      <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <h2>Miscellaneous Information</h2>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: 100,
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid black' }}>
                    <div style={{ width: 300 }}>
                      <span style={{ marginRight: 82 }}>PAYER’S TIN</span>
                      <span style={{ borderLeft: '1px solid black' }}>RECIPIENT’S TIN</span>{' '}
                    </div>
                    <div
                      style={{
                        width: 300,
                        backgroundColor: 'rgb(233, 185, 201)',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <span>
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </span>
                      <span style={{ borderLeft: '1px solid black', paddingLeft: 30 }}>
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </span>{' '}
                    </div>
                  </div>
                  <div style={{ color: 'black' }}>
                    <div>RECIPIENT’S name</div>
                    <div>
                      <p>
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </p>
                    </div>
                  </div>
                  <div style={{ color: 'black' }}>
                    <div>Street address (including apt. no.)</div>
                    <div>
                      <p>
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </p>
                    </div>
                  </div>
                  <div style={{ color: 'black', borderBottom: '1px solid black' }}>
                    <div>City or town, state or province, country, and ZIP or foreign postal code</div>
                    <div>
                      <p>
                        <input type="text" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: 5 }}>
                    <span style={{ width: 300, backgroundColor: 'black' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>13 FATCA filing requirement </span>{' '}
                    <span>
                      <input
                        style={{ marginBottom: '-9px' }}
                        type="checkbox"
                        name="void"
                        checked={formData.void}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    width: 110,
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div
                      style={{
                        borderBottom: '1px solid black',
                        color: 'black',
                      }}
                    >
                      <div>3 Other income</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div>5 Fishing boat proceeds</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>
                      <span>
                        7 Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                      </span>{' '}
                      &nbsp;{' '}
                      <input
                        style={{ marginTop: 7, marginBottom: '-4px' }}
                        type="checkbox"
                        name="void"
                        checked={formData.void}
                        onChange={handleChange}
                        id=""
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: '1px solid black',
                      width: 130,
                      color: 'black',
                    }}
                  >
                    <div>9 Crop insurance proceeds</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>11 Fish purchased for resale</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ color: 'black' }}>
                    <div>14 Excess golden parachute payments</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    borderCollapse: 'collapse',
                  }}
                >
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div
                      style={{
                        borderBottom: '1px solid black',
                        color: 'black',
                      }}
                    >
                      <div>4 Federal income tax withheld</div>
                      <div style={{ display: 'flex' }}>
                        ${' '}
                        <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                      </div>
                    </div>
                    <div>6 Medical and health care payments</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>8 Substitute payments in lieu of dividends or interest</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>10 Gross proceeds paid to an attorney</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid black', color: 'black' }}>
                    <div>12 Section 409A deferrals</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                  <div style={{ color: 'black', width: 130 }}>
                    <div>15 Nonqualified deferred compensation</div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderRight: 'none',
                    color: 'black',
                    borderCollapse: 'collapse',
                    textAlign: 'right',
                  }}
                >
                  <div>
                    <strong>Copy A</strong>
                  </div>
                  <div>
                    <strong>For</strong>
                  </div>
                  <div>
                    <strong>Internal Revenue</strong>
                  </div>
                  <div>
                    <strong>Service Center</strong>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div>
                    <strong>File with Form 1096.</strong>
                  </div>
                  <div>For Privacy Act and Paperwork Reduction Act Notice, see the</div>
                  <div>
                    <strong>current General Instructions for Certain Information Returns</strong>
                  </div>
                  <div />
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', color: 'black' }}>
                  <div style={{}}>
                    <span style={{}}>Account number (see instructions)</span>
                    <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>2nd TIN not. </span>{' '}
                    <span>
                      <input
                        style={{ marginTop: 5 }}
                        type="checkbox"
                        name="void"
                        checked={formData.void}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                  <p style={{ width: 200 }} />
                </td>
                <td style={{ border: '1px solid black', color: 'black' }}>
                  <div style={{ color: 'black' }}>
                    <div>16 State tax withheld</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>

                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
                <td style={{ border: '1px solid black', color: 'black' }}>
                  <div style={{ color: 'black' }}>
                    <div>17 State/Payer’s state no.</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>

                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderRight: 'none',
                    color: 'black',
                  }}
                >
                  <div style={{ color: 'black' }}>
                    <div>18 State income</div>
                    <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                      $ <input type="number" style={{ backgroundColor: '#FAFAFA', outline: 'none', border: 'none' }} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ color: '#000' }}>
            <tbody>
              <tr>
                <td style={{ width: 200 }}>
                  <div>
                    Form <strong>1099-MISC</strong> (Rev. 1-2024)
                  </div>
                </td>
                <td style={{ width: 200 }}>
                  <div>www.irs.gov/Form1099MISC</div>
                </td>
                <td>
                  <div>Department of the Treasury - Internal Revenue Service</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MiskForm;
