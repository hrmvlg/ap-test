import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { fetchCountries, setSelectedCountry } from '../../slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CountryDropdown() {

    const dispatch = useDispatch();
    const {
        countries,
        selectedCountry,
        status,
    } = useSelector((state) => state.ui);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    const handleCountryClick = (country) => {
        dispatch(setSelectedCountry(country));
    };

    return (
        <Dropdown as={ButtonGroup}>
            <Button variant="outline-secondary" disabled>
                Country
            </Button>
            <Dropdown.Toggle className='d-flex align-items-center' variant="outline-secondary">
                {
                    selectedCountry ?
                        <div className='d-flex align-items-center' style={{ columnGap: '10px' }}>
                            <img src={selectedCountry.icon} alt={`${selectedCountry.country} flag`} width={20} height={15} />
                            {selectedCountry.name}
                        </div>
                        : ''
                }
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {countries.map((item) => (
                    <Dropdown.Item
                        key={item.id}
                        className='d-flex align-items-center'
                        style={{ columnGap: '10px' }}
                        onClick={() => { handleCountryClick(item) }}
                    >
                        <img src={item.icon} alt={`${item.country} flag`} width={20} height={15} />
                        {item.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}