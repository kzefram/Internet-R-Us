const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log("Request Object: ", req)
  // find all categories
  // be sure to include its associated Products

  res.status(200).json({ message: 'categories' });
});

router.get('/:id', (req, res) => {
  console.log("Request Params: ", req.params)
  // find one category by its `id` value
  // be sure to include its associated Products
  
});

router.post('/', (req, res) => {
  console.log("Request Object: ", req.body)
  // create a new category
  
  res.status(200).json({ message: 'new info created' });
});

router.put('/:id', (req, res) => {
  console.log("Request Params: ", req.params)
  console.log("Request Body: ", req.body)
  // update a category by its `id` value
    // We first make a request to our DB for the record we want to update (using the id from the request params)
       // IF the record is found in the DB --> Then we take the req.body DATA and use the update method to change the value of the category_name field to the value in req.body
  fetch(toOurDB, {   // the fetch method RETURNS a PROMISE
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  }).then( data => {
      // if SUCCEFFUL REQUEST RESPONSE
    // Beacuse making a request to our DB is a ASYNC.
    // IF successful --> We send a 200 status code with a JSON message of "updated info"
    res.status(200).json({ message: 'updated info' });
  }).catch(error => {
    console.log("Error: ", error);
    // IF NOT successful --> We send a 500 status code with a JSON message of "server error"
    res.status(500).json({ message: error });
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
