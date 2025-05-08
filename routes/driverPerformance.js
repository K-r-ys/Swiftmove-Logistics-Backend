const express = require("express");
const router = express.Router();
const {
  getAllDriverPerformance,
  createDriverPerformance,
  updateDriverPerformance,
  deleteDriverPerformance,
} = require("../controllers/driverPerformanceController");

/**
 * @swagger
 * /api/driver-performance:
 *   get:
 *     summary: Get all driver performance records
 *     description: Retrieves a list of all driver performance records.
 *     responses:
 *       200:
 *         description: A list of driver performance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   driverId:
 *                     type: integer
 *                   performanceRating:
 *                     type: number
 *                     format: float
 *                   feedback:
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
router.get("/", getAllDriverPerformance);

/**
 * @swagger
 * /api/driver-performance:
 *   post:
 *     summary: Create a new driver performance record
 *     description: Adds a new driver performance record to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: integer
 *                 description: The ID of the driver
 *                 example: 1
 *               performanceRating:
 *                 type: number
 *                 format: float
 *                 description: The rating of the driver's performance
 *                 example: 4.5
 *               feedback:
 *                 type: string
 *                 description: Feedback for the driver
 *                 example: "Great driving and punctuality."
 *     responses:
 *       201:
 *         description: Driver performance record created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createDriverPerformance);

/**
 * @swagger
 * /api/driver-performance/{id}:
 *   put:
 *     summary: Update a driver performance record by ID
 *     description: Updates the details of a specific driver performance record.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver performance record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               performanceRating:
 *                 type: number
 *                 format: float
 *                 description: The new performance rating of the driver
 *                 example: 4.8
 *               feedback:
 *                 type: string
 *                 description: The new feedback for the driver
 *                 example: "Excellent performance this month."
 *     responses:
 *       200:
 *         description: Driver performance record updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Driver performance record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateDriverPerformance);

/**
 * @swagger
 * /api/driver-performance/{id}:
 *   delete:
 *     summary: Delete a driver performance record by ID
 *     description: Removes a driver performance record from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver performance record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Driver performance record deleted
 *       404:
 *         description: Driver performance record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteDriverPerformance);

module.exports = router;
