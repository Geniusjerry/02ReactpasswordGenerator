import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [characterAllowed, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordReference = useRef(null)



  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*_-|/;:"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  
  },
  [length,numberAllowed,characterAllowed])


  const copyPasswoedToClipBoard = useCallback(() => {
    passwordReference.current?.select();
    window.navigator.clipboard.writeText(password)
  },
  [password])


  useEffect (() => {
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 
    text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        value={password}
        readOnly
        ref={passwordReference}
        />
        <button 
        className='outline-none px-3 py-0.5 shrink-0 bg-blue-700 text-white'
        onClick={copyPasswoedToClipBoard}
        >
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(event) => {setLength(event.target.value)}}
          />
          <label >Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          id="numberInput" 
          defaultChecked = {setNumber}
          onChange={() => { setNumber((prev) => !prev)}}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          id="charInput" 
          defaultChecked = {setCharacter}
          onChange={() => { setCharacter((prev) => !prev)}}
          />
          <label htmlFor="charInput">Character</label>
        </div>



      </div>
    </div>
    <div>
      value is {}
    </div>
    </>
  )
}

export default App
