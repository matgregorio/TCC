const express = require('express');
const router = express.Router();
const adminTemplateController = require('../controllers/adminTemplateController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

//Rotas para gerenciamento de templates
router.get('/templates', authMiddleware, isAdmin, adminTemplateController.getAllTemplates);
router.get('/templates/:name', authMiddleware, isAdmin, adminTemplateController.getTemplateByName);
router.put('/templates', authMiddleware, isAdmin, adminTemplateController.createOrUpdateTemplate);
router.delete('/templates/:name', authMiddleware, isAdmin, adminTemplateController.deletedTemplate);

module.exports = router;
