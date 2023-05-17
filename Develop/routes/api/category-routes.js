const router = require('express').Router();
const { Category, Product } = require('../../models');

// Gets all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});
// Gets one category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found witrh that id!"});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});
// Creates new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Updates category
router.put('/:id', async (req, res) => {
  try{
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json('UPDATED');
} catch (err) {
  res.status(404).json(err);
}
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
