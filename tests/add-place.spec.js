const { test, expect } = require('@playwright/test');

test('Add Place API - POST Request', async ({ request }) => {

  // 1. POST request
  const response = await request.post('https://rahulshettyacademy.com/maps/api/place/add/json', {
    params: {
      key: 'qaclick123'                  // Query Parameter
    },
    data: {                              // Request Body
      location: {
        lat: -38.383494,
        lng: 33.427362
      },
      accuracy: 50,
      name: "Frontline house",
      phone_number: "(+91) 983 386 039",
      address: "70 winter walk, USA",
      types: [
        "shoe park",
        "shop"
      ],
      website: "http://google.com",
      language: "French-IN"
    }
  });

  // 2. Status code check
  console.log("Status Code:", response.status());
  expect(response.status()).toBe(200);

  // 3. Response body ghe
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);

  const placeId = responseBody.place_id;

  // 4. Important Validations
  expect(responseBody.status).toBe("OK");
  expect(responseBody.place_id).toBeTruthy();        // place_id generate zhala ka
  expect(responseBody.scope).toBe("APP");
  expect(responseBody.reference).toBeTruthy();


  const getResponse = await request.get('https://rahulshettyacademy.com/maps/api/place/get/json', {
    params: {
        key: 'qaclick123',
        place_id: placeId,
    }
  })

    // 2. Status code check
  console.log("Status Code:", getResponse.status());
  expect(getResponse.status()).toBe(200);

  // 3. Response body ghe
  const getResponseBody = await getResponse.json();
  console.log("Response Body:", getResponseBody);
  
});