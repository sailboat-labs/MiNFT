import axios from "axios";

class OpenSea {
  async getOpenSeaCollection(slug: string) {
    try {
      const url = `https://api.opensea.io/api/v1/collection/${slug}`;
      const response = await fetch(url);
      const body = await response.text();
      const parsedBody = await JSON.parse(body);

      if (parsedBody.collection.slug != "undefined")
        return parsedBody.collection;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getOpenSeaCollectionAssets(address: string) {
    try {
      // const url = `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=10&asset_contract_address=${address}`;
      // const response = await fetch(url);
      // const body = await response.text();
      // const parsedBody = await JSON.parse(body);

      const config: any = {
        method: "get",
        // mode: "no-cors",

        url: "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=2&asset_contract_address=0xCcc441ac31f02cD96C153DB6fd5Fe0a2F4e6A68d",
        headers: {
          "x-apikey": "0049b5bd4c93415587b4562d52779776",
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

      return 'done';
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export const { getOpenSeaCollection, getOpenSeaCollectionAssets } =
  new OpenSea();
