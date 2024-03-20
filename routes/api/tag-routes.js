const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll()
    .then(data => {
      console.log("data: ", data);
      res.status(200).json({ message: data });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: error });
    });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  console.log("Request Params: ", req.params)  // { id: "2" }
  // find one tag by its `id` value
  Tag.findOne({ where: { id: req.params.id }})
    .then(data => {
      console.log("data: ", data);
      res.status(200).json({ message: data });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ message: error });
    
    })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  console.log("Request Params: ", req.params)
  console.log("Request Body: ", req.body)
  // update a tag by its `id` value
  fetch(`http://localhost:3001/api/tag/${req.params.id}`, {   // the fetch method RETURNS a PROMISE
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


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  console.log("Request Object: ", req.body)
    // create a new tag
    Tag.create(req.body)
      .then(data => {
        console.log("data: ", data);
        res.status(200).json(data);
      })
      .catch(error => {
        console.log("Error: ", error);
        res.status(500).json({ message: error });
      })
});


router.delete('/:id', (req, res) => {
   // delete a tag by its `id` value
   Tag.destroy({ where: { id: req.params.id }})
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
