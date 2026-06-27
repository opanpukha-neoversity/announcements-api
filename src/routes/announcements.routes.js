import { Router } from 'express'

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementById,
  getAnnouncements,
  updateAnnouncement,
} from '../controllers/announcements.controller.js'

import {
  createAnnouncementValidator,
  deleteAnnouncementValidator,
  getAnnouncementByIdValidator,
  listAnnouncementsValidator,
  updateAnnouncementValidator,
} from '../validators/announcements.validators.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcements board REST API
 */

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get announcements list
 *     tags: [Announcements]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title substring
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort by creation date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of announcements with pagination
 *       400:
 *         description: Validation error
 */
router.get('/', listAnnouncementsValidator, getAnnouncements)

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Announcement object
 *       404:
 *         description: Announcement not found
 */
router.get('/:id', getAnnouncementByIdValidator, getAnnouncementById)

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create announcement
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price, category, contactInfo]
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       201:
 *         description: Created announcement
 *       400:
 *         description: Validation error
 */
router.post('/', createAnnouncementValidator, createAnnouncement)

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Partially update announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: Updated announcement
 *       400:
 *         description: Validation error
 *       404:
 *         description: Announcement not found
 */
router.patch('/:id', updateAnnouncementValidator, updateAnnouncement)

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted successfully, no content
 *       404:
 *         description: Announcement not found
 */
router.delete('/:id', deleteAnnouncementValidator, deleteAnnouncement)

export default router
