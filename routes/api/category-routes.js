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

  // Extract the category ID from the request parameters
  const id = req.params.id;

  // Use the Category model to update the category in the database
  Category.update(
    req.body,                   // Data to update (from request body)
    {
      where: {
        id: id,             // Filter by category ID
      },
    }
  )
  .then((category) => {
    // If the update operation is successful,
    // Send a 200 OK response with the updated category object as JSON
    res.status(200).json(category);
  })
  .catch((err) => {
    // If an error occurs during the update operation,
    // Send a 400 Bad Request response with the error message as JSON
    console.log("Error: ", err);
    res.status(400).json(err);
  });
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

