import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import currencies from "../currencies.js"
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import CurrencyFlag from "react-currency-flags";

const Hero = () => {

    const [haveReq, setHaveReq] = React.useState('USD')
    const [wantReq, setWantReq] = React.useState('EUR')
    const [amountHave, setAmountHave] = React.useState(1)
    const [amountWant, setAmountWant] = React.useState("")
    const [recentWants, setRecentWants] = React.useState([])
    
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
            .then(response => {setAmountWant(response.new_amount) ; console.log(response)})
            .catch(err => console.error(err));
        
        
    }, [haveReq, wantReq, amountHave])


    const getCurrenciesMui = currencies.map(
        x => (
            <MenuItem key={x.currency} value={x.currency}><span className="currency">{x.currency}</span><span className="name">{x.name}</span> </MenuItem>
        )
    )
    
  return (
    <div>
        <Card className="d-flex pt-3 px-5 justify-content-center align-items-center">
        <Row>
            <Col xs={12} sm={5}>
             <FormControl fullWidth>
                <InputLabel id="have">{<CurrencyFlag currency={haveReq} size="lg"/>}</InputLabel>
                <Select
                    labelId="have"
                    id="have"
                    label="have"
                    value={haveReq}
                    onChange={(e) => setHaveReq(e.target.value)}
                >
                    {getCurrenciesMui}
                </Select>
            </FormControl>
    <input className="form-control my-3 form-control-lg" type="text" onChange={(e) =>  setAmountHave(e.target.value ? e.target.value : 1)} placeholder={1}/>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" xs={12} sm={2}>
        <i onClick={() => {setHaveReq(wantReq) ; setWantReq(haveReq)}} className="fa-solid fa-repeat" style={{fontSize:"30px", margin:"0 10px 20px 10px", cursor:"pointer"}}></i>
        </Col>
        <Col xs={12} sm={5}>
        <FormControl fullWidth>
            <InputLabel id="want"><CurrencyFlag currency={wantReq} size="lg"/></InputLabel>
            <Select
                labelId="want"
                id="want"
                label="want"
                value={wantReq}
                onChange={(e) => setWantReq(e.target.value)}
            >
                <MenuItem disabled={true} divider={true}>Recent</MenuItem>   

                <MenuItem disabled={true} divider={true}></MenuItem>   
                {getCurrenciesMui}
            </Select>
        </FormControl>
    <input className="form-control my-3 form-control-lg" type="text" onChange={() =>{}} value={amountWant}/>
        </Col>
         </Row>
        </Card>
    </div>
  )
}

export default Hero