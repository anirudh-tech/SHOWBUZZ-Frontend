import { useEffect, useState } from "react"
import { commonRequest } from "../config/api";
import { config } from "../config/configuration";

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const response = await commonRequest("get",url,config)
        console.log(response,'respones')
        if(response.data.success) { 
          setLoading(false);
          setData(response.data.data)
        }
      }

      fetchData()

      return () => {
        // Abort fetch if component unmounts before fetch completes
        // Implement this if required based on your use case
      };

      
  },[url])

  return {data, loading, error }
}

export default useFetchData;