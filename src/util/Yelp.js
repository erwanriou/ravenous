const clientId = 'XXLYEMuhpuU_nvxY0dfU7Q';
const secret = 'ryjFwtIDNuPfNQPXlh4JdxRL2m6QUwEvfnsOqc7Wusf1bXDEV7CWb6NHwo9H6F8r';
let accessToken;
const Yelp = {
  getAccessToken: function() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    // We will make a request to the /token endpoint of the Yelp API and pass
    // in our client ID and secret to obtain our access token.
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },
  search: function(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      // To retrieve businesses, you'll have to hit the /businesses endpoint of the Yelp API.
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            console.log(business);
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          });
        }
      });
    });
  }
};

export default Yelp;
