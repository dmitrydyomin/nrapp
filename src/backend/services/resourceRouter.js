const { Router } = require('express');
const asyncHandler = require('express-async-handler');

const fixPage = (page) => {
  let parsed = parseInt(page, 10);
  if (Number.isNaN(parsed)) {
    parsed = 1;
  }
  return Math.max(parsed, 1);
};

const resourceRoutes = ({
  all,
  one,
  create,
  update,
  remove,
}, existingRouter) => {
  const router = existingRouter || Router();

  router.get('/', asyncHandler(async (req, res) => {
    const { page, order, ...filters } = req.query;
    const data = await all({ filters, order, page: fixPage(page) });
    res.json(data);
  }));

  router.post('/', asyncHandler(async (req, res) => {
    const data = req.body;
    const item = await create(data, { user: req.user });
    res.json(item);
  }));

  router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await one(id);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  }));

  router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const item = await update(id, data, { user: req.user });
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  }));

  router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await remove(id, { user: req.user });
    res.send();
  }));

  return router;
};

module.exports = resourceRoutes;
