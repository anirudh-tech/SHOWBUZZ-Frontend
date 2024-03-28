import { commonRequest } from "../config/api";
import { config } from "../config/configuration";

const postData = async (url: string, body: any) => {
  try {
    console.log(url,body,'------body');
    
    const response = await commonRequest("post", url, config, body);
    if (response.data.success) {
      return { data: response.data.data, loading: false };
    }
    throw new Error('Unsuccessful response');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postData;