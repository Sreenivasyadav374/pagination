import { useState,useEffect } from 'react';
import './styles.css'

function App() {
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);

  const fetching=async function(){
    const fetched=await fetch("https://dummyjson.com/products?limit=100");
    const res=await fetched.json();
    if(res&&res.products){setData(res.products);}
  
  }

  const handlePageChange=(number)=>{
    if(number>=1&&number<=data.length/10&&number!==page){
      setPage(number)
    }
  }
  useEffect(() => {
    fetching()
  }, [])


  return (
    <div>
      {data.length>0&&
      <div className='element'>
        {data.slice(page*10-10,page*10).map((a)=>{
        return <span className='single' key={a.id}><img src={a.thumbnail} alt={a.title}/><span>{a.title}</span></span>
        })}
      </div>}


      {data.length>0&&<div className='buttons'>
        <span className={page>1?"":"hidden"} onClick={()=>handlePageChange(page-1)}>⏮️</span>
      {[...Array(data.length/10)].map((_,i)=>{return <span key={i} className={page===i+1?"Active":""} onClick={()=>handlePageChange(i+1)}>{i+1}</span>})}
        <span className={page<data.length/10?"":"hidden"} onClick={()=>handlePageChange(page+1)}>⏭️</span>
      </div>}
    </div>
  );
}

export default App;
