const { create } = require("axios");
const https = require("https");
const { parseDescribeDomainsResponse } = require("./ogcParser");

const BASE_URL = "https://view.eumetsat.int/geoserver";
const TIMEOUT = 3000;

const geoserverRequest = create({
  timeout: TIMEOUT,
  baseURL: BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

class MetsatService {
  static async wmtsDescribeDomains(layer) {
    const url = "/gwc/service/wmts";

    const params = {
      service: "WMTS",
      version: "1.0.0",
      request: "DescribeDomains",
      layer: layer,
    };

    return geoserverRequest
      .get(url, { params })
      .then((res) => {
        return parseDescribeDomainsResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = MetsatService;
