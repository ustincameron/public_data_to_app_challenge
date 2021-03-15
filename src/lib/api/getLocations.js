import axios from 'axios';

export const getLocations = async (requestParams) => {
   const apiURL = '../api/kansasLibraries.json'; // a "pretend backend" via the public folder
   try {
      const { data } = await axios.get(apiURL, {
         params: {
            ...requestParams,
         },
         headers: {
            "Content-type": "application/json",
         }
      }
      );
      return data;
   } catch (error) {
      console.error(error);
   }
};
