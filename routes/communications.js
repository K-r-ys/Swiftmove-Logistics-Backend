const express = require("express");
const router = express.Router();
const {
  getAllCommunications,
  createCommunication,
  updateCommunication,
  deleteCommunication,
} = require("../controllers/communicationsController");

/**
 * @swagger
 * /api/communications:
 *   get:
 *     summary: Get all communications
 *     description: Retrieves a list of all communications.
 *     responses:
 *       200:
 *         description: A list of communications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
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
router.get("/", getAllCommunications);

/**
 * @swagger
 * /api/communications:
 *   post:
 *     summary: Create a new communication
 *     description: Adds a new communication to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the communication
 *                 example: "This is a new communication."
 *     responses:
 *       201:
 *         description: Communication created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", createCommunication);

/**
 * @swagger
 * /api/communications/{id}:
 *   put:
 *     summary: Update a communication by ID
 *     description: Updates the details of a specific communication.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the communication to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content of the communication
 *                 example: "Updated content of the communication."
 *     responses:
 *       200:
 *         description: Communication updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Communication not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateCommunication);

/**
 * @swagger
 * /api/communications/{id}:
 *   delete:
 *     summary: Delete a communication by ID
 *     description: Removes a communication from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the communication to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Communication deleted
 *       404:
 *         description: Communication not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteCommunication);

module.exports = router;
