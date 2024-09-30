const virusTotalApiKey =
  "c288c9fbc0d7a8760e973c45e3f78c6d46fa45f056ff28dea3f093918f296b1b";
const virusTotalURL = "https://www.virustotal.com/api/v3/urls";


const virusTotalGenrateUrl = async (url) => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("url", url);
  
      const options = {
        method: "POST",
        url: virusTotalURL,
        headers: {
          accept: "application/json",
          "x-apikey": virusTotalApiKey,
          "content-type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };
  
      let result = await axios
        .request(options)
        .then((response) => response.data)
        .catch((error) => error);
  
      if (result.data) {
        let response = await virusTotalGenrateUrlCheck(result.data.links.self);
        return response.data.attributes.stats;
      } else {
        result({ error: result });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const virusTotalGenrateUrlCheck = async (url) => {
    try {
      const axios = require("axios");
  
      const options = {
        method: "GET",
        url: url,
        headers: {
          accept: "application/json",
          "x-apikey": virusTotalApiKey,
          "content-type": "application/x-www-form-urlencoded",
        },
      };
  
      let result = await axios
        .request(options)
        .then((response) => response.data)
        .catch((error) => error);
  
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  