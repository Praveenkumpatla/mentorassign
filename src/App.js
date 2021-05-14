import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mname,setmname] = useState("")
  const [sname,setsname] = useState("")
  const [msname,setmsname] = useState("")
  const [ssname,setssname] = useState("")
  const [mens,setmens] = useState("")
  const [menss,setmenss] = useState("")
  const [mensss,setmensss] = useState("")
  const [stuss,setstuss] = useState("")
  const [data,setdata] = useState([])
  const [sam,setsam] = useState([])
  const [res,setres] = useState([])
  useEffect(() => {
    async function fact(){
      let data = await axios.get("https://booking-node-server.herokuapp.com/some")
      setdata(data.data)
    }
    fact()
  }, [])
  let result = []
  if(data.length>0){
    data.forEach((val)=>{
      val.students.forEach((item)=>{
        result.push(item)
      })
    })
  return (
    <div className="App">
      <div className="row">
        <div className="col-4" style={{minWidth:"360px"}}>
          <div>API for Creating Mentor</div>
          <form className="text-left m-2" onSubmit={async (e)=>{
            e.preventDefault()
            let check = true
            data.forEach((item)=>{
              if(item.mentor === (mname+" "+msname))
              check = false
            })
            if(check){
              let msg = await axios.post("https://booking-node-server.herokuapp.com/newmentor",{mentor:mname+" "+msname})
              alert(msg.data.msg)
              let data = await axios.get("https://booking-node-server.herokuapp.com/some")
              setdata(data.data)
            }
            else{
              alert("Mentor already created")
            }
            setmname("")
            setmsname("")
          }}>
            <label htmlFor="name">Name :</label>
            <input required id="name" className="form-control" value={mname} onChange={(e)=>{setmname(e.target.value)}}/>
            <label htmlFor="sname">Surname :</label>
            <input required id="sname" className="form-control" value={msname} onChange={(e)=>{setmsname(e.target.value)}}/>
            <button className="btn-sm btn-primary m-3" type="submit">Create</button>
          </form>
          <hr/>
          <div>API for Creating Student</div>
          <form className="text-left m-2" onSubmit={async (e)=>{
            e.preventDefault()
            let check = true
            let stu = sname+" "+ssname
            data.forEach((item)=>{
              if(item.students.includes(stu))
              check = false
            })
            if(check){
              let msg = await axios.post("https://booking-node-server.herokuapp.com/createStu",{student:stu})
              alert(msg.data.msg)
              let data = await axios.get("https://booking-node-server.herokuapp.com/some")
              setdata(data.data)
            }
            else{
              alert("Student already created")
            }
            setsname("")
            setssname("")
          }}>
            <label htmlFor="ssname">Name :</label>
            <input required id="ssname" className="form-control" value={sname} onChange={(e)=>{setsname(e.target.value)}}/>
            <label htmlFor="sssname">Surname :</label>
            <input required id="sssname" className="form-control" value={ssname} onChange={(e)=>{setssname(e.target.value)}}/>
            <button className="btn-sm btn-primary m-3" type="submit">Create</button>
          </form>
        </div>
        <div className="col-4" style={{minWidth:"360px"}}>
        <div>API for assigning mentor to student</div>
          <form className="text-left m-2" onSubmit={async (e)=>{
            e.preventDefault()
            let some = await axios.post("https://booking-node-server.herokuapp.com/assignmulti",{mentor:mens,sname:res})
            let data = await axios.get("https://booking-node-server.herokuapp.com/some")
            setdata(data.data)
            if(some.data.msg === "Assigned")
            alert("Students assigned")
            setmens("")
            setres([])
          }}>
            <label htmlFor="smen">Select Mentor :</label>
            <select required={true} className="form-control" value={mens} onChange={(e)=>{setmens(e.target.value)}}>
              {
                data.map((item,index)=>{
                  if(item.mentor !== "Mentor not assigned")
                  return <option key={index}>{item.mentor}</option>
                  else
                  return <option key={index} style={{visibility:"hidden"}}></option>
                })
              }
            </select>
            <label htmlFor="stu">Select Student :</label>
            <div className="form-control text-left" style={{height:"15vh",overflow:"auto"}}>
            {
              data[0].students.map((i,x)=>{
                return (<div key={x}>
                   <input type="checkbox" className="ml-1" value={i} onChange={(e)=>{if(e.target.checked){setres([...res,i]) }else{let ind = res.indexOf(i);res.splice(ind,1);setres([...res])}}}/>
                   <label>{i}</label>
                </div>)
              })
            }
          </div>
            <button className="btn-sm btn-primary m-3" type="submit">Assign</button>
          </form>
          <hr/>
          <div>API for changing student's mentor</div>
          <form className="text-left m-2" onSubmit={async (e)=>{
            e.preventDefault()
            let some = await axios.post("https://booking-node-server.herokuapp.com/assign",{mentor:menss,sname:stuss})
            let data = await axios.get("https://booking-node-server.herokuapp.com/some")
            setdata(data.data)
            if(some.data.msg === "Present")
            alert("Student assigned")
            setmenss("")
            setstuss("")
          }}>
            <label htmlFor="menname">Select Mentor :</label>
            <select requried={true} id="menname" className="form-control" value={menss} onChange={(e)=>{setmenss(e.target.value)}}>
              {
                data.map((item,index)=>{
                  if(item.mentor !== "Mentor not assigned")
                  return <option key={index}>{item.mentor}</option>
                  else
                  return <option key={index} style={{visibility:"hidden"}}></option>
                })
              }
            </select>
            <label htmlFor="stuss">Select Student :</label>
            <select requried={true} id="stuss" className="form-control" value={stuss} onChange={(e)=>{setstuss(e.target.value)}}>
            <option style={{visibility:"hidden"}}></option>
              {
                result.map((item,index)=>{
                  return <option key={index}>{item}</option>
                })
              }
            </select>
            <button className="btn-sm btn-primary m-3" type="submit">Assign</button>
          </form>
        </div>
        <div className="col-4" style={{minWidth:"360px"}}>
        <div>API for Particular</div>
          <form className="text-left m-2" onSubmit={async (e)=>{
            e.preventDefault()
            let some = await axios.post("https://booking-node-server.herokuapp.com/mentors",{mentor:mensss})
            setsam(some.data)
            setmensss("")
          }}>
            <label htmlFor="tor">Select Mentor :</label>
            <select requried={true} id="tor" className="form-control" value={mensss} onChange={(e)=>{setmensss(e.target.value)}}>
              {
                data.map((item,index)=>{
                  if(item.mentor !== "Mentor not assigned")
                  return <option key={index}>{item.mentor}</option>
                  else
                  return <option key={index} style={{visibility:"hidden"}}></option>
                })
              }
            </select>
            <button className="btn-sm btn-primary m-3" type="submit">Search</button>
          </form>
          <hr/>
          {
            sam.map((item,ind)=>{
              return (<div key={ind}>
              <div>Mentor : {item.mentor}</div>
              <div>Students : </div>
              {
                item.students.map((lis,indx)=>{
                  return <div key={indx}>{lis}</div>
                })
              }
              </div>)
            })
          }
        </div>
      </div>
    </div>
  );}
  else{
    return <div>Loading</div>
  }
}

export default App;
