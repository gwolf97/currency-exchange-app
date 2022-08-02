import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import currencies from '../currencies';

const QuickRates = ({have, want}) => {  

  const [rates, setRates] = React.useState([])

  const haveName = currencies.filter(x => x.currency === have)[0].name
  const wantName = currencies.filter(x => x.currency === want)[0].name 

  const quickRatesArr = [1,5,10,25,50,100,500,1000,5000,10000,50000]

  React.useEffect(() => {

    setRates([])

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c933348c15mshf224bd49aee5258p1121c9jsn39e8cfa0a0b2',
            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    quickRatesArr.map( x => {
                fetch(`https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${have}&want=${want}&amount=${x}`, options)
        .then(response => response.json())
        .then(response => {setRates(prev => [response.new_amount, ...prev].filter((val,id,array) =>  array.indexOf(val) === id))})
        .catch(err => console.error(err))
    })

  },[have, want])


  return (
    <Col xs={12} md={6} className="mb-4">
        <Card style={{ minWidth:"25rem", maxWidth:"40%", margin:"auto"}} className="d-flex py-3 px-4 flex-column align-items-start justify-content-start" >
            <Card.Title>
                Convert {haveName} into {wantName}
            </Card.Title>
            <Row>
                <Col sx={6}>
                    <p>{have}</p>
                </Col>
                <Col sx={6}>
                    <p>{want}</p>            
                </Col>
            </Row>
            <Row>
                <Col>
                    {quickRatesArr.map(x => <p key={`${x} quick`}>{x}</p>)}
                </Col>
                <Col>
                    {rates.sort((a, b) => Number(a) - Number(b)).map(x => <p key={x}>{x}</p>)}
                </Col>
            </Row>
        </Card>
            
    </Col>
  )
}

export default QuickRates