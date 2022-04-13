import { useState } from "react";
import './App.css';
import Image from '../src/Images/46992.jpg';

function App() {

  const [name , setName ] = useState("");
  const[email , setEmail] = useState("");
  const[horoscope , setHoroscope] = useState("");
  const[date , setDate] = useState("");
  const[message , setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [isvisible, setisvisible] = useState(false);
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("called");
  
    try {
        
        let res = await fetch("https://azmal123.000webhostapp.com/Haroscopre/HoroscopeApi.php",{
            method: "POST",
            body: JSON.stringify({
              date: date,
              horoscope: horoscope,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200 && resJson[0] === "Success") {
            setVisible(false);
            setisvisible(true);
            setData("Dear "+name+",");
            setData1(resJson[1]);
            setData2("- ("+resJson[2]+") :"+resJson[3]);
            setData3("Color: "+resJson[4]+"      Lucky Number:"+resJson[5]);
            console.log("sucess function")
            setName("");
            setEmail("");
            setHoroscope("");
            setDate("");
            setMessage(resJson[1]);
            
          } else {
            setName("");
            setEmail("");
            setHoroscope("");
            setDate("");
            setMessage(resJson[1]);
          }
        } catch (err) {
          setName("");
          setEmail("");
          setHoroscope("");
          setDate("");
          setMessage(err);
        }
}
const goBack = () =>{
  setVisible(true);
            setisvisible(false);
            setMessage("");
}

  return (
    <div className="w3-black" style={{height:'100vh'}}>
      <div className="w3-row " style={{height:'90%'}}>
        <div className="w3-half">
          <img src={Image} alt="Logo" style={{height:'99vh'}} className="w3-image w3-small"/>
        </div>
        
        <div className="w3-half w3-container" >
          <div  className="w3-card-4 w3-white w3-round" style={{marginTop:'20%'}} >
          <div className="w3-container ">
          <h2 className="w3-text-black">Know Your Horoscope Now!!</h2>
        </div>
        {visible && <form className="w3-container" id="form" onSubmit={handleSubmit}>
        <p>      
            <label className="w3-text-black"><b>Horoscope  Sign</b></label>
            <input className="w3-input w3-border w3-round" name="horoscope" type="text" value={horoscope} onChange={(e)=>setHoroscope(e.target.value.toUpperCase())}/></p>
            <p>      
            <label className="w3-text-black"><b>Name</b></label>
            <input className="w3-input w3-border w3-round" name="name" type="text" value={name} onChange={(e)=>setName(e.target.value)}/></p>
            <p>      
            <label className="w3-text-black"><b>Email</b></label>
            <input className="w3-input w3-border w3-round" name="Email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/></p>
            <p>      
            <label className="w3-text-black"><b>Date</b></label>
            <input className="w3-input w3-border w3-round" name="Date" type="Date" value={date} onChange={(e)=>setDate(e.target.value)}/></p>
            <p>
            <button className="w3-btn w3-black w3-round w3-card-4" >Submit</button>
          </p>
          <div className="w3-text-red">{message ? <p>{message}</p> : null}</div>  

        </form>}

        {isvisible  && <div className="w3-container w3-card w3-white w3-round w3-padding-large">
          {data}<br/>Horoscope Sign:{data1}<br/>Today's Horoscope{data2}<br/>{data3}<br/><br/>
          <button className="w3-btn w3-round w3-card w3-black w3-small" onClick={goBack} type="submit">Go Back</button>
          </div>}
           </div> 
        
        </div>
      </div>
    </div>
  );
}

export default App;
