import { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import ResulRow from "./ResultRow";
import axios from 'axios';
import {sortBy} from 'lodash'
import  useDebouncedEffect  from  'use-debounced-effect'

type CachedResults = {
  providerName: string;
  btc: string;
  provider: string
}

type offersResult = {[key: string] : string}

const defaultAmount = '100'


function App() {
  const [prevAmount, setPrevAmount] = useState(defaultAmount)
  const [amount, setAmount] = useState(defaultAmount);
  const [cachedResults, setCachedResults] = useState<CachedResults[]>([]);
  const [offersResult, setOffersResult] = useState<offersResult>({})
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    axios.get('https://jpz3wf8vdw.us.aircode.run/cachedValues').then(res => {
        res.data;
        setCachedResults(res.data);
        setLoading(false)
    })
  },[]);

  useDebouncedEffect(()=>{
    if(amount === defaultAmount) return;
    if(amount !== prevAmount) {
      setLoading(true)
      // console.log('Check for ' + amount);
      axios.get(`https://jpz3wf8vdw.us.aircode.run/offers?amount=${amount}`)
      .then(res => {
        setLoading(false)
        setOffersResult(res.data);
        setPrevAmount(amount);
      })
    }
  },10,[amount]);



  const sortedCache : CachedResults[]  =  sortBy(cachedResults, 'btc').reverse()
  const sortedResults : CachedResults[] = sortBy(Object.keys(offersResult).map(provider => ({
    provider, 
    btc:offersResult[provider]
  })), 'btc').reverse();

  const showCache = amount === defaultAmount;

  const rows = showCache ? sortedCache : sortedResults

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-25%">
        Find cheapest BTC
      </h1>
      <div className=" flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mt-6">
        { loading && (
          <>
            <ResulRow loading={true}/>
            <ResulRow loading={true}/>
            <ResulRow loading={true}/>
            <ResulRow loading={true}/> 
          </>
        )}
        {!loading && rows.map(result => (
          <ResulRow 
          providerName={result.provider}  
          btc={result.btc}
          key={result.provider}
          />
        ))} 
      </div>
    </main>
  );
}

export default App;
