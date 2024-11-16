
import React, { useState, useCallback, useEffect ,useRef} from 'react'

const App = () => {
  const [length,setLength]=useState(8)
  const [number,setNumber]=useState(false)
  const [char, setChar]=useState(false)
  const [password,setPassword]=useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const generatorPassword=useCallback(()=>{ 
    let pass=""
    let str = "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str +="0123456789"
    if(char) str +="!@#$%^&*+-_~`"

    for(let i=1;i<=length ;i++)
    {
      let char =Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)

    }


setPassword(pass)
  },[length,number,char,setPassword])

  const copyPassword =useCallback(()=>{
    passwordRef.current?.select()

    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
 generatorPassword()
  }, [length, number,char,generatorPassword])



  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-4 py-2 text-orange-500 bg-gray-600'>
      <h1 className='text-white text-center  bg-gray-600'>  Password generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>

  <input type="text" 
  value={password}
  placeholder='password'
  readOnly 
  ref={passwordRef}
  className='outline-none w-full py-1 px-3 bg-slate-200'/>
  <button  
  onClick={copyPassword}
  className='outline-none bg-green-500 active:scale-95 text-white px-3 shrink-0'>Copy</button>

</div>
<div className=' flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
    <input  onChange={(e)=>{
      setLength(e.target.value)
    }} type="range" min={6}
    max={50}  value={length}
    className='cursor-pointer'/>
    <label >Length:{length}</label>

  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" defaultChecked={number}
    id='numberInput' onChange={()=>{
      setNumber((prev)=> !prev)
    }} />
    <label htmlFor="numberInput">Numbers</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" defaultChecked={char}
    id='charInput' onChange={()=>{
      setChar((prev)=> !prev)
    }} />
    <label htmlFor="charInput">Charecters</label>
  </div>

</div>
    </div>
  )
}

export default App