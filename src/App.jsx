import { useState } from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [symbols, allowSymbols] = useState(false);
  const [Numbers, allowNumbers] = useState(false);
  const [password, setPassword] = useState("Password");
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (symbols) str += "!@#$%^&*()_+'/.,";
    if (Numbers) str += '0123456789';

    for (let i = 0; i < length; i++) {  // Changed the loop to use a separate index variable
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
  }, [length, symbols, Numbers, setPassword]);  // Removed setPassword from dependency array

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])
useEffect(()=> {
  passwordGenerator()
},[length, symbols, Numbers, passwordGenerator]);

  return (
    <div className='p-20  text-white' >
      <h1 className='text-5xl text-center text-white'>Password Generator</h1>
      <div  className='mt-10 p-2 rounded-xl bg-white '>
        <div className='flex flex-row justify-center'>
        <input 
            type="text" 
            value={ password}
            placeholder="password" 
            style={{backgroundColor: "whitesmoke"}} 
            className="m-2 w-4/5 text-black font-medium h-full rounded-xl flex items-center p-5" 
            readOnly
            ref={passwordRef}
          />
        <button  onClick={copyPasswordToClipboard} className='text-center p-5 bg-blue-400 m-2 w-1/5 rounded-xl'>COPY</button>
      </div>
        <div className="text-black flex flex-row justify-around p-5">
        <div className="flex items-center space-x-2">
          <label> Length: {length} </label>
          <input type="range" min ={8} max={30} value={length} onChange={(e) => {
            setLength(e.target.value); 
           
          }} className='mt-1' />
        </div>
        <div className="flex items-center space-x-2">
          <input className='h-4 w-4' type="checkbox" checked={Numbers} onChange={(e) => allowNumbers(e.target.checked)}/>
          <label>Include Numbers</label>
        </div>
        <div className="flex items-center space-x-2">
          <input className='h-4 w-4' type="checkbox" checked={symbols} onChange={(e) => allowSymbols(e.target.checked)}/>
          <label>Include Symbols</label>
        </div>
       
      </div>
      </div>
    </div>
    
  )
}

export default App
