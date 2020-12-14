import React,{useState, useEffect} from 'react'
import styled from 'styled-components';

function InspirationQuotes() {
    const [quote, setQuote] = useState({quote:"",author:""})
    useEffect(()=>{
        fetch('/getQuote')
        .then(res =>{
            return res.json()
           })
        .then(json =>{
            console.log('getquotes', json)
            setQuote(json.data)
        })
    },[])
    return (
        <Wrapper>
            <Quote>{quote.quote}</Quote>
            <Author>{quote.author}</Author>
        </Wrapper>
    )
}

export default InspirationQuotes

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
   
    height: 300px;
    width:400px;
   
    position:sticky;
    display: inline-block;
    top:50px;
    border-radius: 10px;
    
`;
const Quote = styled.div`
font-size:50px;
`;
const Author = styled.div`
    position: relative;
    top:50px;
`;
