import React from 'react'
import { DropdownButton, Dropdown, Card, Col, Row } from 'react-bootstrap';
import currencies from "../currencies.js"

const Hero = () => {

    const [haveReq, setHaveReq] = React.useState('USD')
    const [wantReq, setWantReq] = React.useState('EUR')
    const [amountHave, setAmountHave] = React.useState(100)
    const [amountWant, setAmountWant] = React.useState(0)
    
    React.useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c933348c15mshf224bd49aee5258p1121c9jsn39e8cfa0a0b2',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        fetch(`https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${haveReq}&want=${wantReq}&amount=${amountHave}`, options)
            .then(response => response.json())
            .then(response => setAmountWant(response.new_amount))
            .catch(err => console.error(err));
    }, [haveReq, wantReq, amountHave])

    const getCurrencies = currencies.map(
        x => (
            <Dropdown.Item key={x.currency} eventKey={x.currency}>{x.currency} | {x.name}</Dropdown.Item>
        )
    )

    console.log(amountWant)
    
  return (
    <div>
        <Card className="d-flex justify-content-center align-items-center">
        <Row>
            <Col>
            <DropdownButton
      title={haveReq}
      id="haveReq"
      onSelect={(e) => setHaveReq(e)}
    >
        {getCurrencies}
    </DropdownButton>
    <input className="form-control form-control-lg" type="text" onChange={(e) => setAmountHave(e.target.value ? e.target.value : 1)} placeholder={1}/>
        </Col>
        <Col>
            <DropdownButton
      title={wantReq}
      id="wantReq"
      onSelect={(e) => setWantReq(e)}
    >
        {getCurrencies}
    </DropdownButton>
    <input className="form-control form-control-lg" type="text" value={amountWant}/>
    </Col>
         </Row>
        </Card>
    </div>
  )
}

export default Hero