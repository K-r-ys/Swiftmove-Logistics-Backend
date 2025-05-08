const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customersController");

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieves a list of all customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
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
router.get("/", getAllCustomers);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Adds a new customer to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the customer
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email of the customer
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: The phone number of the customer
 *                 example: "+254123456789"
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     description: Updates the details of a specific customer.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the customer
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 description: The new email of the customer
 *                 example: "john.doe.updated@example.com"
 *               phone:
 *                 type: string
 *                 description: The new phone number of the customer
 *                 example: "+254987654321"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     description: Removes a customer from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteCustomer);

module.exports = router;
