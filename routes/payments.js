const express = require("express");
const router = express.Router();
const {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentsController");

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieves a list of all payments.
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   orderId:
 *                     type: integer
 *                   amount:
 *                     type: number
 *                     format: float
 *                   method:
 *                     type: string
 *                   paymentDate:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getAllPayments);

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     description: Adds a new payment to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The ID of the order associated with the payment
 *                 example: 1
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The payment amount
 *                 example: 100.50
 *               method:
 *                 type: string
 *                 description: The payment method (e.g., Credit Card, PayPal)
 *                 example: "Credit Card"
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time the payment was made
 *                 example: "2025-05-08T14:30:00Z"
 *               status:
 *                 type: string
 *                 description: The status of the payment (e.g., "Completed")
 *                 example: "Completed"
 *     responses:
 *       201:
 *         description: Payment created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createPayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     description: Updates the details of a specific payment.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the payment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The updated order ID
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The updated payment amount
 *               method:
 *                 type: string
 *                 description: The updated payment method
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated payment date and time
 *               status:
 *                 type: string
 *                 description: The updated status of the payment
 *     responses:
 *       200:
 *         description: Payment updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     description: Removes a payment from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the payment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment deleted
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deletePayment);

module.exports = router;
