const anyanime = require("anyanime");

 

 
// This will return an image with the `catgirl` category. If the `categories`
// argument is not specified, the image will be completely random (no specific
// categories).

export async function GET(req, res) {

    const data = await anyanime.getAnime({ type: "png", number: 10 });
    
    return Response.json(data)
    
  }