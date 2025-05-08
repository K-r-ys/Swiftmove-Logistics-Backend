const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves a list of all orders.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   customerId:
 *                     type: integer
 *                   product:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Adds a new order to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: The ID of the customer placing the order
 *                 example: 1
 *               product:
 *                 type: string
 *                 description: The product being ordered
 *                 example: "Laptop"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product being ordered
 *                 example: 2
 *               status:
 *                 type: string
 *                 description: The status of the order
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     description: Updates the details of a specific order.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: The updated customer ID
 *               product:
 *                 type: string
 *                 description: The updated product
 *               quantity:
 *                 type: integer
 *                 description: The updated quantity
 *               status:
 *                 type: string
 *                 description: The updated status of the order
 *     responses:
 *       200:
 *         description: Order updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Removes an order from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteOrder);

module.exports = router;
