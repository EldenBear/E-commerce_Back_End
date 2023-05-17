const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Gets all Tags
router.get('/', async  (req, res) => {
  try {
    const tagData = await  Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});
// Gets one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:  [{ model: Product}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});
// Creates new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});
// Updates tag
router.put('/:id', async (req, res) => {
  try{
  await Tag.update(req.body, {
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
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
