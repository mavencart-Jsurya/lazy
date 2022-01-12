import { useState,useEffect } from "react";
import { Skeleton,Card,Dropdown,Menu} from 'antd';
import Axios from "axios";
import "./card.css";
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';





const PageNum = 0;




export default function Cards() {
    const [store, setStore] = useState([])
    const [page,setPage] = useState(PageNum)
    const [isloading,setLoading] = useState(false)
    const[limit,setLimit] = useState(10)
    
    useEffect(()=>{
        const res = async () =>{

          setLoading(true)

          try{

            let {data }= await Axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`)
            
            setStore([...store, ...data.data])

          }catch(err){
            
          }
           setLoading(false)
        } ;
        res();    
             
    },[page])



    const scrollToEnd = () =>{
      setPage(page + 1)
      
    }

    
    
    window.onscroll = function(){
      if(
        window.innerHeight + document.documentElement.scrollTop === 
        document.documentElement.scrollHeight
      ){
        scrollToEnd()
      }
    }



    return (
       <>
    
      <div className="store-Main"
      >
        
          
            {store.map((i , Index)=>{
               
                return(
                
                  <Skeleton active loading={isloading} style={{ width:200}} paragraph={{rows:2}}>
                  <Card size="small" key={i._id} style={{ width:300}}>
                    <div className="main">  
                    
           
            <p >{i._id}</p>

            <p>{i.name}</p>  
            <span>{Index}</span>         
                  </div>    
                     
                      </Card>
                      </Skeleton>
            )
        })}
        
        </div>
      </>
      
    )
    
}
