// export default function Filters({ filters, setFilters }) {
//   const departments = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Mathematics', 'Physics'];
//   const statusOptions = ['open', 'assigned', 'resolved'];
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value
//     });
//   };

//   const clearFilters = () => {
//     setFilters({
//       department: '',
//       status: '',
//       month: '',
//       year: '',
//       fromDate: '',
//       toDate: ''
//     });
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-lg font-medium mb-3">Filters</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//           <select
//             name="department"
//             value={filters.department}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Departments</option>
//             {departments.map(dept => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//           <select
//             name="status"
//             value={filters.status}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Statuses</option>
//             {statusOptions.map(status => (
//               <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//           <select
//             name="month"
//             value={filters.month}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Months</option>
//             {months.map(month => (
//               <option key={month} value={month}>
//                 {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>

//         {/* New Date Range Filters */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
//           <input
//             type="date"
//             name="fromDate"
//             value={filters.fromDate || ''}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
//           <input
//             type="date"
//             name="toDate"
//             value={filters.toDate || ''}
//             onChange={handleChange}
//             className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
      
//       <div className="mt-3">
//         <button
//           onClick={clearFilters}
//           className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { formatISO, parseISO } from 'date-fns';

export default function Filters({ filters, setFilters }) {
  const departments = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Mathematics', 'Physics'];
  const statusOptions = ['open', 'assigned', 'resolved'];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For date inputs, format to ISO string
    if (name === 'fromDate' || name === 'toDate') {
      const newFilters = {
        ...filters,
        [name]: value ? formatISO(new Date(value), { representation: 'date' }) : '',
        // Clear month/year when using date range
        month: '',
        year: ''
      };
      setFilters(newFilters);
    } 
    // For month/year selects
    else if (name === 'month' || name === 'year') {
      const newFilters = {
        ...filters,
        [name]: value,
        // Clear date range when using month/year
        fromDate: '',
        toDate: ''
      };
      setFilters(newFilters);
    }
    // For other filters
    else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  // Convert ISO date strings back to YYYY-MM-DD format for input values
  const getInputDateValue = (dateString) => {
    if (!dateString) return '';
    try {
      return parseISO(dateString).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      status: '',
      month: '',
      year: '',
      fromDate: '',
      toDate: ''
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-3">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            name="month"
            value={filters.month}
            onChange={handleChange}
            disabled={!!filters.fromDate || !!filters.toDate}
            className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              filters.fromDate || filters.toDate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>
                {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div> */}
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            disabled={!!filters.fromDate || !!filters.toDate}
            className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              filters.fromDate || filters.toDate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div> */}

        {/* Date Range Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={getInputDateValue(filters.fromDate)}
            onChange={handleChange}
            max={getInputDateValue(filters.toDate) || ''}
            disabled={!!filters.month || !!filters.year}
            className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              filters.month || filters.year ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            name="toDate"
            value={getInputDateValue(filters.toDate)}
            onChange={handleChange}
            min={getInputDateValue(filters.fromDate) || ''}
            disabled={!!filters.month || !!filters.year}
            className={`block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              filters.month || filters.year ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>
      
      <div className="mt-3">
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}