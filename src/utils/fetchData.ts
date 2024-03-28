import { commonRequest } from "../config/api";
import { config } from "../config/configuration";

const fetchData = async(url: string) => {
  try {
    console.log(url,'------body');
    
    const response = await commonRequest("get", url, config);
    if (response?.data?.success) {
      console.log(response?.data?.data,'data====...');
      
      return { data: response?.data?.data, loading: false };
    }
    throw new Error('Unsuccessful response');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default fetchData;