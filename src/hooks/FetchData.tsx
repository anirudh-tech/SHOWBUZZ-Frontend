import { useEffect, useState } from "react"
import { commonRequest } from "../config/api";
import { config } from "../config/configuration";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const response = await commonRequest("get",url,config)
        console.log(response,'respones')
        if(response.data.success) { 
          setData(response.data.data)
        }
      }
      fetchData()
  },[url])

  return {data, loading }
}

export default useFetchData;