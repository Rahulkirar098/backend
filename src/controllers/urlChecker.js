const axios = require("axios");
const { URLSearchParams, url } = require("url");

//Google Cred
const API_KEY = "AIzaSyA-TjrerLTXlCs29QZ_rYpiUyqB2f7D5mE";
const SAFE_BROWSING_URL =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + API_KEY;
//Google Cred

//virustotal Cred
const virusTotalApiKey =
  "c288c9fbc0d7a8760e973c45e3f78c6d46fa45f056ff28dea3f093918f296b1b";
const virusTotalURL = "https://www.virustotal.com/api/v3/urls";

//virustotal Cred

const checkDomainReputation = async (domain) => {
  const url = `https://www.virustotal.com/vtapi/v2/url/report?apikey=${virusTotalApiKey}&resource=${domain}`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    if (data.response_code === 1) {
      const positives = data.positives;
      const total = data.total;
      const percentage = ((positives / total) * 100).toFixed(2);
      let result = {
        percentage,
        recommendation: percentage > 50 ? false : true,
      };

      return result;
    } else {
      return "No information available for this domain.";
    }
  } catch (error) {
    return "Error fetching reputation";
  }
};

///////// Https
const checkHttps = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:";
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return false;
  }
};
///////// Https

//////// domin
const getDomainName = (inputUrl) => {
  try {
    const parsedUrl = new URL(inputUrl);
    return parsedUrl.hostname;
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
};
//////// domin

const checkURLGenrator = async (url) => {
  let result = await checkDomainReputation(url);
  
  let safeUrl = {
    ssl: checkHttps(url),
    domin: getDomainName(url),
    recommendation: result.recommendation,
    percentage: "100%",
  };

  let unSafeUrl = {
    ssl: checkHttps(url),
    domin: getDomainName(url),
    recommendation: result.recommendation,
    percentage: Math.floor(Math.random() * 50),
  };

  let rest = result.recommendation ? safeUrl : unSafeUrl;

  return {
    recommendation: result,
    https: checkHttps(url),
    domin: getDomainName(url),
    ...rest,
  };
};

const checkURL = async (request, response) => {
  try {
    let url = request.body.url;
    let result = await checkURLGenrator(url);
    response.status(200).send({ status: true, result });
  } catch (error) {
    return response
      .status(500)
      .send({ status: false, message: error?.message });
  }
};

module.exports = {
  checkURL,
};
