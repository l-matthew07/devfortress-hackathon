const express = require('express');
const router = express.Router();
const shopifyService = require('../services/shopifyService');
const openaiService = require('../services/openaiService');

/**
 * POST /ask-athena
 * Accepts a merchant question and returns AI-generated insights
 */
router.post('/ask-athena', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Please provide a valid question'
      });
    }

    // Fetch store data
    const storeData = await shopifyService.fetchStoreData();

    // Get AI response from OpenAI
    const response = await openaiService.askAI(question.trim(), storeData);

    res.json({
      success: true,
      question: question.trim(),
      response: {
        insight: response.insight,
        explanation: response.explanation,
        action: response.action
      }
    });
  } catch (error) {
    console.error('Error in /ask-athena:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to process request'
    });
  }
});

module.exports = router;
