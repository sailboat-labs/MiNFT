 class OpenSea{
   async getOpenSeaCollection(slug:string){
    try {
      
      const url = `https://api.opensea.io/api/v1/collection/${slug}`;
      const response = await fetch(url);
      const body = await response.text();
      const parsedBody = await JSON.parse(body);

      if (parsedBody.collection.slug != "undefined")
      return parsedBody.collection
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export const { getOpenSeaCollection } = new OpenSea();