const express = require("express");
const router = express.Router();
const {
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driversController");

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     description: Retrieves a list of all drivers.
 *     responses:
 *       200:
 *         description: A list of drivers
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
 *                   licenseNumber:
 *                     type: string
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
router.get("/", getAllDrivers);

/**
 * @swagger
 * /api/drivers:
 *   post:
 *     summary: Create a new driver
 *     description: Adds a new driver to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The driver's name
 *                 example: "John Doe"
 *               licenseNumber:
 *                 type: string
 *                 description: The driver's license number
 *                 example: "A123456789"
 *               status:
 *                 type: string
 *                 description: The driver's current status
 *                 example: "Active"
 *     responses:
 *       201:
 *         description: Driver created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createDriver);

/**
 * @swagger
 * /api/drivers/{id}:
 *   put:
 *     summary: Update a driver by ID
 *     description: Updates the details of a specific driver.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver to update
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
 *                 description: The updated name of the driver
 *                 example: "Johnathan Doe"
 *               licenseNumber:
 *                 type: string
 *                 description: The updated license number of the driver
 *                 example: "A987654321"
 *               status:
 *                 type: string
 *                 description: The updated status of the driver
 *                 example: "Inactive"
 *     responses:
 *       200:
 *         description: Driver updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateDriver);

/**
 * @swagger
 * /api/drivers/{id}:
 *   delete:
 *     summary: Delete a driver by ID
 *     description: Removes a driver from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Driver deleted
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteDriver);

module.exports = router;
