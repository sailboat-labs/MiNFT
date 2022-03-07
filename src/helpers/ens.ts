class ENS {
  async getEnsAddressNfts(address: string) {
    try {
      const url = `https://minft.eth.xyz/nfts/${address}`;
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
}

export const { getEnsAddressNfts } = new ENS();
