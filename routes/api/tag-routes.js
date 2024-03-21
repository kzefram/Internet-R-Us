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
  Tags.update(
    req.body,                   // Data to update (from request body)
    {
      where: {
        id: id,             // Filter by tag ID
      },
    }
    )
  })
  .then((tag) => {
    // If the update operation is successful,
    // Send a 200 OK response with the updated tag object as JSON
    res.status(200).json(tag);
  })
  .catch((err) => {
    // If an error occurs during the update operation,
    // Send a 400 Bad Request response with the error message as JSON
    console.log("Error: ", err);
    res.status(400).json(err);
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
