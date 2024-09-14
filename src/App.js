import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers'
import { useState } from 'react'

import MINT_NFT_ABI from './abis/mint_nft_abi.json'
function App() {
  const [textValue, setTextValue] = useState('0x4D1f96A3B324F1320CD519187D1Af4F296061991')

  const rpcProvider = new ethers.JsonRpcProvider('https://rpc.mainnet.taiko.xyz')
  const mintContract = new ethers.Contract('0x07E6a074FA3E731b6Cc34D0f7A543aD3fFaB789d', MINT_NFT_ABI, rpcProvider)

  const checkMintAmount = async () => {

    if (!textValue) {
      alert("please input address")
      return
    }
    else if (!ethers.isAddress(textValue)) {
      alert("invalid address")
      return
    }
    else {

      try {
        const result = await mintContract?.minters(textValue)
        alert('mint amount: ' + ethers.toNumber(result[1]))
      }
      catch (err) {
        console.log('check mint amount failed: ', err);
      }
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <input type="text" value={textValue} onChange={e => setTextValue(e.target.value)} style={{ minWidth: '400px' }} />
        <button onClick={checkMintAmount}>
          Check mint amount
        </button>
      </header>
    </div>
  );
}

export default App;
