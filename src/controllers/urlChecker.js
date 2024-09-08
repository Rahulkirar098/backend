const axios = require("axios");

//Google Cred
const API_KEY = "AIzaSyA-TjrerLTXlCs29QZ_rYpiUyqB2f7D5mE";
const SAFE_BROWSING_URL =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + API_KEY;
//Google Cred

//virustotal Cred
const virusTotalApiKey =
  "c288c9fbc0d7a8760e973c45e3f78c6d46fa45f056ff28dea3f093918f296b1b";
const virusTotalURL = "https://www.virustotal.com/api/v3/urls";

const virusTotalGenrateUrl = async (url) => {
  try {
    const axios = require("axios");
    const { URLSearchParams } = require("url");

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

      console.log(result)

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

//virustotal Cred

const checkURLGenrator = async (url) => {
  let result = await virusTotalGenrateUrl(url);
  return result;
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
