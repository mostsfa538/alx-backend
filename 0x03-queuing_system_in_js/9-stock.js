import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.on('error', (err) => console.error(`Redis client error: ${err.message}`));

const getAsync = promisify(client.get).bind(client);

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity = reservedStock !== null ? reservedStock : product.initialAvailableQuantity;

  res.json({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity,
    currentQuantity: parseInt(currentQuantity, 10),
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity = reservedStock !== null ? parseInt(reservedStock, 10) : product.initialAvailableQuantity;

  if (currentQuantity <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  reserveStockById(itemId, currentQuantity - 1);

  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

