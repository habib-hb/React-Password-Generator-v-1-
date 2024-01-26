import { useState , useCallback , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
 
  const [length, setLength]= useState(4)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()"




    let forFunction=()=>{//the function for assignment
      let char=""
      for(let i=0; i<length; i++){ //point
       char= Math.floor(Math.random()*str.length+1);
       if (str.charAt(char)=="" || str.charAt(char)==undefined || str.charAt(char)==null || str.charAt(char)==" "){
        let problem= "";

        if(str.charAt(char)==""){
          problem= "empty"+char;
        }
        if(str.charAt(char)==undefined){
          problem= "undefined";
        }
        if(str.charAt(char)==null){
          problem= "null";
        }
        if(str.charAt(char)==" "){
          problem= "space";
        }


        alert("problem detected. Charecter is : "+ problem )
       }
        pass += str.charAt(char);
      }
      if(pass.length<length){
       let prevPass=pass
       char= Math.floor(Math.random()*str.length+1);
       pass+= str.charAt(char);
       alert("added 1" + prevPass)
      }
    }
  

    //the Number Checking Experiment
    while(true){//while loop start
      if(numberAllowed){// if numberAllowed
     let whileBreaker=false
  pass="";// again assigning the empty string
  forFunction();//calling the function


  for(let i=0; i<pass.length; i++){//checking numbers
    let numCheck= pass.charAt(i)
    if (numCheck == '0' || numCheck == '1' || numCheck == '2' || numCheck == '3' || numCheck == '4' || numCheck == '5' || numCheck == '6' || numCheck == '7' || numCheck == '8' || numCheck == '9'){
      console.log("Its a Number")

      
    
        setPassword(pass);//setting the password
        whileBreaker=true
         break;//breaking the loop
      
   


    }//if stateMent
    }//for loop

    if(whileBreaker){
      break;//breaking the while loop
    }//if stateMent

  }//main if statement
  else{
    forFunction();//calling the function
    setPassword(pass);//setting the password
    break;//breaking the while loop
    
  }
    // if(!numberAllowed){
    //   break;//breaking the while loop
    // }
  }//while loop


   


    
  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(()=>{
       passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my8 bg-gray-800">

      <h1 className="text-white text-center my-3">
        Password Generator
      </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >Copy</button>
     </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
          min={4}
          max={16}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}}
          />
          <label className='text-white'>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            value={numberAllowed}
            onChange={(e)=>{setNumberAllowed(e.target.checked)}}
            /><label className='text-white'>Number</label>
        </div>
      </div>

      </div>
    </>
  )
}

export default App
