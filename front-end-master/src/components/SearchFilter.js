import React, { useState } from 'react';
import './SearchFilter.css';
import { useNavigate } from 'react-router-dom';

const SearchFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        minAge: '',
        maxAge: '',
        caste: '',
        religion: '',
        location: '',
        // educationLevel: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };
    
    const handleFilterChange = () => {
        
        navigate(`/Homepage?minage=${filters.minAge}&maxage=${filters.maxAge}&caste=${filters.caste}&religion=${filters.religion}&location=${filters.location}`,{ state: { } });
        //&educationlevel=${filters.educationLevel}
};

    return (
        <div className='Search-filter'>
            <h2>Search Filters</h2>
            <div className='filter'>
                <label>Age Range:</label>
                <input
                    type="number"
                    name="minAge"
                    placeholder="Min Age"
                    value={filters.minAge}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="maxAge"
                    placeholder="Max Age"
                    value={filters.maxAge}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Religion:</label>
                <select
                    name="religion"
                    value={filters.religion}
                    onChange={handleInputChange}
                >
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Christian">Christian</option>
                    <option value="Kirat">Kirat</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Other">Other</option>
                    {/* Add more religion options */}
                </select>
            </div>
            <div>
                <label>Caste:</label>
                <select
                    name="caste"
                    value={filters.caste}
                    onChange={handleInputChange}
                >
                    <option value="">Select Caste</option>
                    <option value="Brahmin">Brahmin</option>
                    <option value="chhetri">Chhetri</option>
                    <option value="Newar">Newar</option>
                    <option value="Rai">Rai</option>
                    <option value="Magar">Magar</option>
                    <option value="other">Other</option>
                    {/* Add more caste options */}
                </select>
            </div>
            
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={handleInputChange}
                />
            </div>
            {/* <div>
                <label>Education Level:</label>
                <input
                    type="text"
                    name="educationLevel"
                    placeholder="Qualifications"
                    value={filters.educationLevel}
                    onChange={handleInputChange}
                />
            </div> */}
            <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
    );
};

export default SearchFilter;
