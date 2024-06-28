import React from 'react'
/* import { Button } from 'react-bootstrap'; */
import Dropdown from 'react-bootstrap/Dropdown';

const WeatherButton = ({cities, setCity}) => {
    console.log(cities)
    
  return ( 
    
    <div>
        {/* <Button variant="warning">variant</Button>{' '}
        {cities.map((item) => (
            <Button variant="warning">{item}</Button>
        ))} */}

    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Country
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {cities.map((item,index) => (
                <Dropdown.Item 
                href={`#/${item.replace(/ /g, '-').toLowerCase()}`} 
                key={index}
                onClick={() => setCity(item)}
                >
                    {item}
                </Dropdown.Item>
        ))}
                    </Dropdown.Menu>
    </Dropdown>
        
    </div>
  )
}

export default WeatherButton