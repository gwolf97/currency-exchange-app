import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import currencies from "../currencies.js"
import {FormControl, InputLabel, Select,Input , MenuItem, Divider, Button} from "@mui/material"
import CurrencyFlag from "react-currency-flags";
import QuickRates from './QuickRates.jsx';

const HomePage = () => {

    const [haveReq, setHaveReq] = React.useState('USD')
    const [wantReq, setWantReq] = React.useState('EUR')
    const [amountHave, setAmountHave] = React.useState(1)
    const [amountWant, setAmountWant] = React.useState("")
    const [recentWants, setRecentWants] = React.useState([])
    const [recentHaves, setRecentHaves] = React.useState([])
    const [haveSearchText, setHaveSearchText] = React.useState("")
    const [wantSearchText, setWantSearchText] = React.useState("")
    
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
            .then(response => {setAmountWant(response.new_amount)})
            .catch(err => console.error(err))

            setRecentWants(prev =>[wantReq, ...prev].filter((val,id,array) =>  array.indexOf(val) === id))
            setRecentHaves(prev =>[haveReq, ...prev].filter((val,id,array) =>  array.indexOf(val) === id))
            
            recentWants.length > 3 && setRecentWants(prev => [...prev].slice(0,4))
            recentHaves.length > 3 && setRecentHaves(prev => [...prev].slice(0,4))

    }, [haveReq, wantReq, amountHave, recentWants.length, recentHaves.length])

    const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    const getHaveCurrenciesMui = currencies.filter(x => containsText(x.currency, haveSearchText)).map(
        x => (
            <MenuItem key={x.currency} value={x.currency}><span className="currency">{x.currency}</span><span className="name">{x.name}</span> </MenuItem>
        )
    )

    const getWantCurrenciesMui = currencies.filter(x => containsText(x.currency, wantSearchText)).map(
        x => (
            <MenuItem key={x.currency} value={x.currency}><span className="currency">{x.currency}</span><span className="name">{x.name}</span> </MenuItem>
        )
    )

    const getRecentHaves = currencies.filter(cur => recentHaves.find(x => x === cur.currency)).reverse()
    const getRecentWants = currencies.filter(cur => recentWants.find(x => x === cur.currency)).reverse()

    const recentHavesMui = getRecentHaves.filter(x => containsText(x.currency, wantSearchText)).map(
        x => (
            <MenuItem key={`${x.currency} ${x.currency.length}`} value={x.currency}><span className="currency">{x.currency}</span><span className="name">{x.name}</span> </MenuItem>
        )
    )

    const recentWantsMui = getRecentWants.filter(x => containsText(x.currency, wantSearchText)).map(
        x => (
            <MenuItem key={`${x.currency} ${x.currency.length}`} value={x.currency}><span className="currency">{x.currency}</span><span className="name">{x.name}</span> </MenuItem>
        )
    )
    
  return (
    <div style={{overflowX:"hidden"}} className='d-flex flex-column justify-content-center align-items-center'>
        <Card style={{width:"100vw"}} className="d-flex mb-5 py-5 px-5 justify-content-center align-items-center">
        <Row>
            <Col xs={12} sm={5}>
             <FormControl fullWidth>
                <InputLabel id="have">{<CurrencyFlag currency={haveReq} size="lg"/>}</InputLabel>
                <Select
                    MenuProps={{autoFocus: false}}
                    labelId="have"
                    id="have"
                    label="have"
                    value={haveReq}
                    onChange={(e) => setHaveReq(e.target.value)}
                    onClose={() => setHaveSearchText("")}
                >
                <MenuItem>
                    <Input
                    size="small"
                    autoFocus
                    placeholder="Type to search..."
                    fullWidth
                    onChange={(e) => setHaveSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                        e.stopPropagation();
                        }
                    }}
                    />
                </MenuItem>
                <MenuItem disabled={true} divider={true}>Recent</MenuItem>   
                    {recentHavesMui}
                <Divider/>
                <MenuItem disabled={true} divider={true}>All</MenuItem>   
                    {getHaveCurrenciesMui}
                </Select>
            </FormControl>
            <Row>
                {recentHaves.map(x => (
                    <Col key={`${x} recenthave`} xs={3}>
                        <Button 
                        size="small"
                        sx={{color:"black", borderRadius:"40%",marginBottom:"-10px", marginTop:"8px", cursor:"pointer"}} 
                        onClick={() => setHaveReq(x)}>{x}</Button>
                    </Col>
                ))}
            </Row>
        <input className="form-control my-3 form-control-lg" type="text" onChange={(e) =>  setAmountHave(e.target.value ? e.target.value : 1)} placeholder={1}/>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" xs={12} sm={2}>
        <i onClick={() => {setHaveReq(wantReq) ; setWantReq(haveReq)}} className="fa-solid fa-repeat" style={{fontSize:"30px", margin:"0 10px 20px 10px", cursor:"pointer"}}></i>
        </Col>
        <Col xs={12} sm={5}>
        <FormControl fullWidth>
            <InputLabel id="want"><CurrencyFlag currency={wantReq} size="lg"/></InputLabel>
            <Select
                MenuProps={{ autoFocus: false }}
                labelId="want"
                id="want"
                label="want"
                value={wantReq}
                onChange={(e) => {setWantReq(e.target.value)}}
                onClose={() => setWantSearchText("")}
            >
                <MenuItem>
            <Input
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              onChange={(e) => setWantSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
                </MenuItem>
                <MenuItem disabled={true} divider={true}>Recent</MenuItem>   
                    {recentWantsMui}
                <Divider/>
                <MenuItem disabled={true} divider={true}>All</MenuItem>   
                {getWantCurrenciesMui}
            </Select>
        </FormControl>
        <Row>
                {recentWants.map(x => (
                    <Col key={`${x} recentwant`} xs={3}>
                        <Button 
                        size="small"
                        sx={{color:"black", borderRadius:"40%",marginBottom:"-10px", marginTop:"8px", cursor:"pointer"}} 
                        onClick={() => setWantReq(x)}>{x}</Button>
                    </Col>
                ))}
        </Row>
         <input className="form-control my-3 form-control-lg" type="text" onChange={() =>{}} value={amountWant}/>
        </Col>
         </Row>
        </Card>
        <Row>
            <QuickRates want={wantReq} have={haveReq}/>
            <QuickRates want={haveReq} have={wantReq}/>
        </Row>
    
    </div>
  )
}

export default HomePage