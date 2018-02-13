const apiKey = 'DH3GeTmG7C5N9R5yrVNvV2d3GIeVXzN-zno8m5URxTIpeLX57LIi_aPlNoFJHHyxOuvYg7I1ZkWdMMidguGDwCEDqR9QAlnvH4w6xpRjQ2LHlJ1GdbZtSomwZKiCWnYx';
const Yelp = {
  search (term, location, sortBy) {
    const path = 	`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;

    return
      fetch(path, {headers: {Authorization: `Bearer ${apiKey}`}})
      .then(response =>
        {response.json();}
      )
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
              id: business.id,
              imageScr: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.category[0].title,
              rating: business.rating,
              reviewCount: business.reviewCount
          }));
        }
      });
  }
};



export default Yelp;
