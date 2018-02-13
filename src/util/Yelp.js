const apiKey = 'DH3GeTmG7C5N9R5yrVNvV2d3GIeVXzN-zno8m5URxTIpeLX57LIi_aPlNoFJHHyxOuvYg7I1ZkWdMMidguGDwCEDqR9QAlnvH4w6xpRjQ2LHlJ1GdbZtSomwZKiCWnYx';
const Yelp = {};

let search (term, location, sortBy) => {
  const path = 	`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;

  return
    fetch(path, {headers:{Authorization: `Bearer ${apiKey}`}})
    .then(response =>
      {response.json()}
    )
    .then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map( business => {
          return {
            id: business.id,
            imageScr: business.image_url,
            name: business.name,
            adress: business.adress,
            city: business.city,
            state: business.state,
            category: business.category,
            rating: business.rating,
            reviewCount: business.reviewCount
          }
        })
      }
    });
}

export default Yelp;
