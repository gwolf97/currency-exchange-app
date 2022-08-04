import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import currencies from '../currencies';
import CurrencyFlag from "react-currency-flags";
import {nanoid} from "nanoid"

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
        .then(response => {setRates(prev => [response.new_amount, ...prev])})
        .catch(err => console.error(err))
    })

  },[have, want])


  return (
    <Col xs={12} md={6} className="mb-4">
        <Card style={{ minWidth:"22rem", maxWidth:"50%", margin:"auto"}} className="d-flex py-3 px-4 flex-column align-items-start justify-content-start" >
            <Card.Title style={{fontFamily:"sans-serif", fontWeight:"700"}} className="font-weight-bold my-3">
                Convert {haveName} into {wantName}
            </Card.Title>
            <Row  className="d-flex flex-row align-items-center w-100 mb-3 justify-content-center">
                <Col className="d-flex align-items-start" sx={6}>
               <p style={{fontSize:"20px", fontWeight:"600"}}> {<CurrencyFlag currency={have} size="md"/>} {have}</p>
                </Col>
                <Col className="d-flex flex-column align-items-start" sx={6}>
                    <p style={{fontSize:"20px", fontWeight:"600"}}> {<CurrencyFlag currency={want} size="md"/>} {want}</p>            
                </Col>
            </Row>
            <Card style={{ minWidth:"22rem", maxWidth:"50%", margin:"-15px 0 20px -25px"}} ></Card>
            <Row className=" d-flex flex-row align-items-center w-100 justify-content-center">
                <Col className="d-flex flex-column align-items-start" sx={6}>
                    {quickRatesArr.map(x => <p style={{color:"hsl(210, 100%, 30%)", fontWeight:"500"}} key={`${x} quick`}>{x} {have} <i className="fa-solid fa-angles-right"></i></p>)}
                </Col>
                <Col className="d-flex flex-column align-items-start" sx={6}>
                    {rates.sort((a, b) => Number(a) - Number(b)).map(x => <p style={{fontFamily:"arial", fontWeight:"500"}} key={nanoid()}>{x}</p>)}
                </Col>
            </Row>
        </Card>
            
    </Col>
  )
}

export default QuickRates