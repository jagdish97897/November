import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConsignmentForm() {
    const navigate = useNavigate();
  // Initialize form data with default values
  const [formData, setFormData] = useState({
    pan: '',
    gst: '',
    cin: '',
    grNo: '',
    date: '',
    from: '',
    to: '',
    mode: '',
    vehicleNo: '',
    vehicleType: '',
    eWayBillNo: '',
    eWayBillDate: '',
    validUpto: '',
    consignor: { name: '', address: '' },
    consignee: { name: '', address: '' },
    quantity: '',
    noOfPackages: '',
    typeOfPackages: '',
    contents: '',
    invoice: { no: '', date: '', value: '' },
    rate: '',
    freight: '',
    weight: '',
    dimensionalWeight: '',
    totalAmount: '',
    paymentTerms: '',
    gstType: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes, including nested objects
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {  // For nested objects
      const [parent, child] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parent]: { ...prevData[parent], [child]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };




const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.pan || !formData.gst) {
    alert('Please fill all required fields.');
    return;
  }
  
  try {
    const response = await axios.post('http://localhost:5000/transport-details', formData);
    console.log('API Response:', response.data);

    // Redirect or handle response after successful submission
    setSubmitted(true);
    navigate('/protected/componentop/sidebarop/bookingoperation/viewconsignment');
  } catch (error) {
    console.error('Error submitting data:', error);
    alert('An error occurred while submitting the form. Please try again.');
  }
};

  const handleListClick = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment');
};

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment / Create</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Buttons */}
            <div className="flex justify-between mb-4">
              <button type="submit" className="btn-primary">Submit</button>
              <button type="button" onClick={handleListClick} className="btn-secondary">List View</button>
            </div>

            {/* Form Fields */}
            <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Render each field dynamically */}
              {[
                { label: 'PAN', name: 'pan' },
                { label: 'GST', name: 'gst' },
                { label: 'CIN', name: 'cin' },
                { label: 'GR No.', name: 'grNo' },
                { label: 'Date', name: 'date', type: 'date' },
                { label: 'From', name: 'from' },
                { label: 'To', name: 'to' },
                { label: 'Mode', name: 'mode' },
                { label: 'Vehicle No.', name: 'vehicleNo' },
                { label: 'Vehicle Type', name: 'vehicleType' },
                { label: 'E-Way Bill No.', name: 'eWayBillNo' },
                { label: 'E-Way Bill Date', name: 'eWayBillDate', type: 'date' },
                { label: 'Valid Upto', name: 'validUpto', type: 'date' },
                { label: 'Consignor Name', name: 'consignor.name' },
                { label: 'Consignor Address', name: 'consignor.address' },
                { label: 'Consignee Name', name: 'consignee.name' },
                { label: 'Consignee Address', name: 'consignee.address' },
                { label: 'Quantity', name: 'quantity', type: 'number' },
                { label: 'No. of Packages', name: 'noOfPackages', type: 'number' },
                { label: 'Type of Packages', name: 'typeOfPackages' },
                { label: 'Contents', name: 'contents' },
                { label: 'Invoice No.', name: 'invoice.no' },
                { label: 'Invoice Date', name: 'invoice.date', type: 'date' },
                { label: 'Invoice Value', name: 'invoice.value', type: 'number' },
                { label: 'Rate', name: 'rate', type: 'number' },
                { label: 'Freight', name: 'freight', type: 'number' },
                { label: 'Weight', name: 'weight', type: 'number' },
                { label: 'Dimensional Weight', name: 'dimensionalWeight', type: 'number' },
                { label: 'Total Amount', name: 'totalAmount', type: 'number' },
                { label: 'Payment Terms', name: 'paymentTerms' }
              ].map((field, index) => (
                <div key={index} className="mb-4">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    id={field.name}
                    name={field.name}
                    value={field.name.includes('.') ? formData[field.name.split('.')[0]][field.name.split('.')[1]] : formData[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ))}

              {/* GST Type Dropdown */}
              <div className="mb-4">
                <label htmlFor="gstType" className="block text-sm font-medium text-gray-700">GST Type</label>
                <select
                  id="gstType"
                  name="gstType"
                  value={formData.gstType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select GST Type</option>
                  <option value="CGST">CGST</option>
                  <option value="SGST">SGST</option>
                  <option value="IGST">IGST</option>
                </select>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
        </div>
      )}
    </div>
  );
}

export default ConsignmentForm;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'react-tabs/style/react-tabs.css';

// const Consignment = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     pan: '',
//     gst: '',
//     cin: '',
//     grNo: '',
//     date: '',
//     from: '',
//     to: '',
//     mode: '',
//     vehicleNo: '',
//     vehicleType: '',
//     eWayBillNo: '',
//     eWayBillDate: '',
//     validUpto: '',
//     consignor: { name: '', address: '' },
//     consignee: { name: '', address: '' },
//     quantity: '',
//     noOfPackages: '',
//     typeOfPackages: '',
//     contents: '',
//     invoice: { no: '', date: '', value: '' },
//     rate: '',
//     freight: '',
//     weight: '',
//     dimensionalWeight: '',
//     totalAmount: '',
//     paymentTerms: '',
//     gstType: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => {
//       const keys = name.split('.');
//       if (keys.length > 1) {
//         return {
//           ...prevFormData,
//           [keys[0]]: {
//             ...prevFormData[keys[0]],
//             [keys[1]]: value,
//           },
//         };
//       } else {
//         return { ...prevFormData, [name]: value };
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     try {
//       const response = await axios.post('http://localhost:5000/transport-details', formData);
//       console.log('Registration created:', response.data);

//       setSubmitted(true);  // Set submitted state
//       alert('Form submitted successfully!');

//       // Redirect or reset form here if needed
//       navigate('/protected/componentop/sidebarop/bookingoperation/viewconsignment');
//     } catch (error) {
//       console.error('Error creating registration:', error.message);
//       alert('Error submitting form. Please try again.');
//     }
//   };


//     const handleListClick = () => {
//         navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment');
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? ( // Render form only if not submitted
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-1 mb-4 flex justify-between">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={handleListClick}
//                                 className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 List view
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                             <div className='sm:flex sm:flex-wrap gap-4'>
//                                 <div className="mb-4">
//                                     <label htmlFor="pan" className="block text-sm font-medium text-gray-700">pan</label>
//                                     <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="gst" className="block text-sm font-medium text-gray-700">gst</label>
//                                     <input type="text" id="gst" name="gst" value={formData.gst} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="cin" className="block text-sm font-medium text-gray-700">cin</label>
//                                     <input type="text" id="cin" name="cin" value={formData.cin} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="grNo" className="block text-sm font-medium text-gray-700">grNo</label>
//                                     <input type="text" id="grNo" name="grNo" value={formData.grNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="date" className="block text-sm font-medium text-gray-700">date</label>
//                                     <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
                               
//                                 <div className="mb-4">
//                                     <label htmlFor="from" className="block text-sm font-medium text-gray-700">from</label>
//                                     <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="to" className="block text-sm font-medium text-gray-700">to</label>
//                                     <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="mode" className="block text-sm font-medium text-gray-700">mode</label>
//                                     <input type="text" id="mode" name="mode" value={formData.mode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">vehicleNo</label>
//                                     <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">vehicleType</label>
//                                     <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="eWayBillNo" className="block text-sm font-medium text-gray-700">eWayBillNo</label>
//                                     <input type="text" id="eWayBillNo" name="eWayBillNo" value={formData.eWayBillNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="eWayBillDate" className="block text-sm font-medium text-gray-700">eWayBillDate</label>
//                                     <input type="date" id="eWayBillDate" name="eWayBillDate" value={formData.eWayBillDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="validUpto" className="block text-sm font-medium text-gray-700">validUpto</label>
//                                     <input type="date" id="validUpto" name="validUpto" value={formData.validUpto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>

//                                 <div className="mb-4 ">
//       <label htmlFor="consignor.name" className="block text-sm font-medium text-gray-700">Consignor Name</label>
//       <input 
//         type="text" 
//         id="consignor.name" 
//         name="consignor.name" 
//         value={formData.consignor.name} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="consignor.address" className="block text-sm font-medium text-gray-700">Consignor Address</label>
//       <input 
//         type="text" 
//         id="consignor.address" 
//         name="consignor.address" 
//         value={formData.consignor.address} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>

//                                 <div className="mb-4 ">
//       <label htmlFor="consignee.name" className="block text-sm font-medium text-gray-700">Consignee Name</label>
//       <input 
//         type="text" 
//         id="consignee.name" 
//         name="consignee.name" 
//         value={formData.consignee.name} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="consignee.address" className="block text-sm font-medium text-gray-700">Consignee Address</label>
//       <input 
//         type="text" 
//         id="consignee.address" 
//         name="consignee.address" 
//         value={formData.consignee.address} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">quantity</label>
//                                     <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="noOfPackages" className="block text-sm font-medium text-gray-700">noOfPackages</label>
//                                     <input type="number" id="noOfPackages" name="noOfPackages" value={formData.noOfPackages} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="typeOfPackages" className="block text-sm font-medium text-gray-700">typeOfPackages</label>
//                                     <input type="text" id="typeOfPackages" name="typeOfPackages" value={formData.typeOfPackages} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="contents" className="block text-sm font-medium text-gray-700">contents</label>
//                                     <input type="text" id="contents" name="contents" value={formData.contents} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>


//                                 <div className="mb-4 ">
//       <label htmlFor="invoice.no" className="block text-sm font-medium text-gray-700">invoice no</label>
//       <input 
//         type="text" 
//         id="invoice.no" 
//         name="invoice.no" 
//         value={formData.invoice.no} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>
//                                 <div className="mb-4 ">
//       <label htmlFor="invoice.date" className="block text-sm font-medium text-gray-700">invoice date</label>
//       <input 
//         type="date" 
//         id="invoice.date" 
//         name="invoice.date" 
//         value={formData.invoice.date} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>
//                                 <div className="mb-4 ">
//       <label htmlFor="invoice.value" className="block text-sm font-medium text-gray-700">invoice value</label>
//       <input 
//         type="number" 
//         id="invoice.value" 
//         name="invoice.value" 
//         value={formData.invoice.value} 
//         onChange={handleChange} 
//         className="input w-full border border-gray-300 rounded-md shadow-sm p-2" 
//       />
//     </div>

//                                 <div className="mb-4">
//                                     <label htmlFor="rate" className="block text-sm font-medium text-gray-700">rate</label>
//                                     <input type="number" id="rate" name="rate" value={formData.rate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="freight" className="block text-sm font-medium text-gray-700">freight</label>
//                                     <input type="number" id="freight" name="freight" value={formData.freight} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="weight" className="block text-sm font-medium text-gray-700">weight</label>
//                                     <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="dimensionalWeight" className="block text-sm font-medium text-gray-700">dimensionalWeight</label>
//                                     <input type="number" id="dimensionalWeight" name="dimensionalWeight" value={formData.dimensionalWeight} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">totalAmount</label>
//                                     <input type="number" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">paymentTerms</label>
//                                     <input type="text" id="paymentTerms" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>

//                                 <div className="mb-4">
//   <label htmlFor="gstType" className="block text-sm font-medium text-gray-700">
//     GST Type
//   </label>
//   <select
//     id="gstType"
//     name="gstType"
//     value={formData.gstType}
//     onChange={handleChange}
//     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//   >
//     <option value="">Select GST Type</option>
//     <option value="CGST">CGST</option>
//     <option value="SGST">SGST</option>
//     <option value="IGST">IGST</option>
//   </select>
// </div>

//                             </div>
//                         </div>
//                     </form>
//                 </>
//             ) : (
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Consignment;

// import React, { useState, useEffect } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Consignment = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         consignmentno: '',
//         jobOrder_no: '',
//         date: '',
//         customer: '',
//         customerGSTIN: '',
//         customerAddress: '',
//         from: '',
//         to: '',
//         dimensions: '',
//         weight: '',
//         quantumrate: '',
//         effectiverate: '',
//         cost: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         expectedDate: '',
//         employee: '',
//         consignor: '',
//         consignorGSTIN: '',
//         consignorAddress: '',
//         consignee: '',
//         consigneeGSTIN: '',
//         consigneeAddress: '',
//         charges: [],
//         container: {
//             linename: '',
//             date: '',
//             loc: '',
//             cgw: '',
//             loadingno: '',
//             loadingdate: '',
//             Remarks: '',
//         },
//         cod: {
//             favouring: '',
//             amount: 0,
//             mode: 'CASH',
//             cancelReason: '',
//         }
//     });

//     const [submitted, setSubmitted] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const keys = name.split('.');
//         if (keys.length > 1) {
//             setFormData((prevFormData) => {
//                 let updatedFormData = { ...prevFormData };
//                 let nestedField = updatedFormData;
//                 for (let i = 0; i < keys.length - 1; i++) {
//                     nestedField = nestedField[keys[i]];
//                 }
//                 nestedField[keys[keys.length - 1]] = value;
//                 return updatedFormData;
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };


//     const handleChargesChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedCharges = formData.charges.map((charge, i) => {
//             if (i === index) {
//                 const rate = parseFloat(value); // Convert rate to float
//                 const taxable = charge.taxable === 'true'; // Assuming taxable is a string 'true' or 'false'
//                 let amount = 0.00;
//                 let gst = 0.00;
//                 let total = 0.00;

//                 if (!isNaN(rate)) { // Check if rate is a valid number
//                     if (taxable) {
//                         amount = rate; // Example calculation based on taxable
//                         total = amount; // Example total calculation
//                     }
//                 } else {
//                     console.error('Invalid rate value:', value);
//                 }

//                 return {
//                     ...charge,
//                     [name]: value,
//                     amount: amount.toFixed(2), // Format amount to 2 decimal places
//                     gst: gst.toFixed(2), // Format GST to 2 decimal places
//                     total: total.toFixed(2) // Format total to 2 decimal places
//                 };
//             }
//             return charge;
//         });

//         setFormData({
//             ...formData,
//             charges: updatedCharges
//         });
//     };


//     const fetchJobOrderDetails = async (jobOrderNo) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
//             const { customer,customerGSTIN,customerAddress, from, to, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor,consignorGSTIN,consignorAddress, consignee,consigneeGSTIN,consigneeAddress } = response.data;
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 customer,
//                 customerGSTIN,
//                 customerAddress,
//                 from,
//                 to,
//                 orderNo,
//                 orderDate,
//                 orderMode,
//                 serviceMode,
//                 expectedDate,
//                 employee,
//                 consignor,
//                 consignorGSTIN,
//                 consignorAddress,
//                 consignee,
//                 consigneeGSTIN,
//                 consigneeAddress
//             }));
//         } catch (error) {
//             console.error('Error fetching job order details:', error);
//         }
//     };

//     useEffect(() => {
//         if (formData.jobOrder_no) {
//             fetchJobOrderDetails(formData.jobOrder_no);
//         }
//     }, [formData.jobOrder_no]);

//     const handleContainerChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };

//     const handleCODChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(formData);

//         try {
//             const response = await fetch('http://localhost:5000/goods-receipts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create registration');
//             }
//             console.log("response", response)
//             const data = await response.json();
//             console.log('Registration created:', data);

//             setSubmitted(true); // Set submitted to true after successful submission
//             // Add any further actions you want to take after successful submission
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//             // Handle error state or display error message to user
//         }
//     };

//     // Initialize charges state for each sundry
//     useEffect(() => {
//         const sundries = [
//             'STATISTICAL CHARGES',
//             'Loading Charge',
//             'OTHER CHARGES',
//             'LOADING DETENTION',
//             'ODC LENGTH',
//         ];
//         const initialCharges = sundries.map(sundry => ({
//             sundry: sundry,
//             taxable: 'true',
//             calcOn: 'FIXED',
//             addDed: 'A',
//             rate: 0.00,
//             amount: 0.00,
//             gst: 0.00,
//             total: 0.00,
//             remarks: ''
//         }));
//         setFormData(prevFormData => ({ ...prevFormData, charges: initialCharges }));
//     }, []);

//     const handleListClick = () => {
//         navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment');
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? ( // Render form only if not submitted
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-1 mb-4 flex justify-between">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={handleListClick}
//                                 className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 List view
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                             <div className='sm:flex sm:flex-wrap gap-4'>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                     <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No</label>
//                                     <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>

//                                 <div className="mb-4">
//                                     <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                     <input type="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
//                                     <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="customerGSTIN" className="block text-sm font-medium text-gray-700">Billing customer GSTIN</label>
//                                     <input type="text" id="customerGSTIN" name="customerGSTIN" value={formData.customerGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Billing customer Address</label>
//                                     <input type="text" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
//                                     <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignorGSTIN" className="block text-sm font-medium text-gray-700">consignor GSTIN</label>
//                                     <input type="text" id="consignorGSTIN" name="consignorGSTIN" value={formData.consignorGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignorAddress" className="block text-sm font-medium text-gray-700">consignor Address</label>
//                                     <input type="text" id="consignorAddress" name="consignorAddress" value={formData.consignorAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
//                                     <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consigneeGSTIN" className="block text-sm font-medium text-gray-700">consignee GSTIN</label>
//                                     <input type="text" id="consigneeGSTIN" name="consigneeGSTIN" value={formData.consigneeGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="consigneeAddress" className="block text-sm font-medium text-gray-700">consignee Address</label>
//                                     <input type="text" id="consigneeAddress" name="consigneeAddress" value={formData.consigneeAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
//                                     <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
//                                     <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No</label>
//                                     <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
//                                     <input type="text" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode</label>
//                                     <input type="text" id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode</label>
//                                     <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date</label>
//                                     <input type="text" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
//                                     <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                             </div>
//                         </div>
//                         <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
//                             <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Container</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">COD</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
//                             </TabList>
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-4">
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
//                                         <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Slot Validity Date</label>
//                                         <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Lot Of Container</label>
//                                         <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">Container Gross Weight</label>
//                                         <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
//                                         <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading/Shifting Date</label>
//                                         <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-4">
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
//                                         <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                                         <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
//                                         <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                             <option value="CHEQUE">CHEQUE</option>
//                                             <option value="ATM">ATM</option>
//                                             <option value="CASH">CASH</option>
//                                             <option value="DD">DD</option>
//                                             <option value="ECS">ECS</option>
//                                             <option value="NEFT">NEFT</option>
//                                             <option value="IMPS">IMPS</option>
//                                             <option value="RTGS">RTGS</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
//                                         <textarea id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="overflow-x-auto">
//                                     <table className="min-w-full bg-white border-collapse">
//                                         <thead>
//                                             <tr>
//                                                 <th className="px-4 py-2 border">Sundries</th>
//                                                 <th className="px-4 py-2 border">Taxable</th>
//                                                 <th className="px-4 py-2 border">Calc. On</th>
//                                                 <th className="px-4 py-2 border">Add/Ded</th>
//                                                 <th className="px-4 py-2 border">Rate</th>
//                                                 <th className="px-4 py-2 border">Amount</th>
//                                                 <th className="px-4 py-2 border">GST</th>
//                                                 <th className="px-4 py-2 border">Total</th>
//                                                 <th className="px-4 py-2 border">Remarks</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {formData.charges.map((charge, index) => (
//                                                 <tr key={index}>
//                                                     <td className="px-4 py-2 border">{charge.sundry}</td>
//                                                     <td className="px-4 py-2 border">
//                                                         <input type="text" name="taxable" value={charge.taxable} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" />
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         <select name="calcOn" value={charge.calcOn} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded">
//                                                             <option value="FIXED">FIXED</option>
//                                                         </select>
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         <select name="addDed" value={charge.addDed} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded">
//                                                             <option value="A">A</option>
//                                                             <option value="D">D</option>
//                                                         </select>
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         <input
//                                                             type="text"
//                                                             name="rate"
//                                                             value={charge.rate}
//                                                             onChange={(e) => handleChargesChange(index, e)}
//                                                             className="w-full p-2 border rounded"
//                                                         />

//                                                         {/* <input type="text" name="rate" value={charge.rate} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         {/* <input type="text" name="amount" value={charge.amount} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
//                                                         <input
//                                                             type="text"
//                                                             name="amount"
//                                                             value={charge.amount}
//                                                             readOnly // Make amount read-only as it's calculated
//                                                             className="w-full p-2 border rounded"
//                                                         />
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         {/* <input type="text" name="gst" value={charge.gst} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
//                                                         <input
//                                                             type="text"
//                                                             name="gst"
//                                                             value={charge.gst}
//                                                             readOnly // Make GST read-only as it's calculated
//                                                             className="w-full p-2 border rounded"
//                                                         />

//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         {/* <input type="text" name="total" value={charge.total} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
//                                                         <input
//                                                             type="text"
//                                                             name="total"
//                                                             value={charge.total}
//                                                             readOnly // Make total read-only as it's calculated
//                                                             className="w-full p-2 border rounded"
//                                                         />
//                                                     </td>
//                                                     <td className="px-4 py-2 border">
//                                                         <input type="text" name="remarks" value={charge.remarks} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" />
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </TabPanel>
//                         </Tabs>
//                     </form>
//                 </>
//             ) : (
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Consignment;

