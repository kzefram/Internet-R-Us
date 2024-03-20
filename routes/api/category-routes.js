const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
    .then(data => {
      console.log("data: ", data);
      res.status(200).json({ message: data });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: error });
    });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  console.log("Request Params: ", req.params)  // { id: "2" }
  // find one category by its `id` value
  Category.findOne({ where: { id: req.params.id }})
    .then(data => {
      console.log("data: ", data);
      res.status(200).json({ message: data });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: error });
    
    })
    // be sure to include its associated Products
    
});
  
router.post('/', (req, res) => {
    console.log("Request Object: ", req.body)
    // create a new category
    Category.create(req.body)
      .then(data => {
        console.log("data: ", data);
        res.status(200).json(data);
      })
      .catch(error => {
        console.log("Error: ", error);
        res.status(500).json({ message: error });
      })
});

router.put('/:id', (req, res) => {
  console.log("Request Params: ", req.params)
  console.log("Request Body: ", req.body)
  // update a category by its `id` value
  fetch(`http://localhost:3001/api/categories/${req.params.id}`, {   // the fetch method RETURNS a PROMISE
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
  Category.destroy({ where: { id: req.params.id }})
    .then(data => {
      console.log("data: ", data);
      res.status(200).json({ message: data });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: error });
    
    })
});

module.exports = router;
