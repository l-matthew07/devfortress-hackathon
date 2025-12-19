/**
 * OpenAI Service
 * Integrates with OpenAI API to generate merchant insights
 */

const axios = require('axios');

/**
 * Generate AI insight using OpenAI
 * @param {string} question - Merchant's question
 * @param {object} storeData - Store data from Shopify
 * @returns {Promise<object>} Structured AI response
 */
const askAI = async (question, storeData) => {
  const openaiApiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // If no API key, use fallback responses (helpful for demo/hackathon)
  if (!openaiApiKey) {
    console.log('No OPENAI_API_KEY found, using fallback response');
    return getFallbackResponse(question, storeData);
  }

  // Build the prompt
  const prompt = buildPrompt(question, storeData);

  // Use gpt-3.5-turbo as default (more widely available and reliable)
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  try {
    console.log(`Calling OpenAI API with model: ${model}`);
    const response = await axios.post(
      openaiApiUrl,
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant for Shopify merchants. Provide helpful, actionable insights based on store data. Always respond in a structured format with insight, explanation, and action.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response format from OpenAI API');
    }

    const aiResponse = response.data.choices[0].message.content;

    if (!aiResponse) {
      throw new Error('Empty response from OpenAI API');
    }

    console.log('Successfully received response from OpenAI API');
    // Parse and structure the response
    return parseAIResponse(aiResponse, question);
  } catch (error) {
    // Enhanced error logging
    if (error.response) {
      // API responded with error status
      const status = error.response.status;
      const errorData = error.response.data;
      console.error('OpenAI API Error Response:', {
        status,
        error: errorData?.error || errorData,
        message: errorData?.error?.message || error.message
      });
      
      // Specific error messages for common issues
      if (status === 401) {
        console.error('Authentication failed - check your OPENAI_API_KEY');
      } else if (status === 429) {
        console.error('Rate limit exceeded - too many requests');
      } else if (status === 404) {
        console.error(`Model '${model}' not found - try gpt-3.5-turbo or gpt-4`);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from OpenAI API:', error.message);
      console.error('This could be a network issue or the API is down');
    } else {
      // Error setting up request
      console.error('Error setting up OpenAI API request:', error.message);
    }
    
    // Always use fallback response when API fails (for demo/hackathon purposes)
    console.log('Using fallback response due to API error');
    return getFallbackResponse(question, storeData);
  }
};

/**
 * Build prompt for OpenAI
 */
const buildPrompt = (question, storeData) => {
  return `You are an AI assistant for Shopify merchants.

Store data:
${JSON.stringify(storeData, null, 2)}

Merchant question: "${question}"

Respond with:
1. A short insight (one sentence)
2. A clear explanation (2-3 sentences)
3. One concrete action the merchant should take (one actionable step)

Format your response as:
INSIGHT: [your insight]
EXPLANATION: [your explanation]
ACTION: [your recommended action]`;
};

/**
 * Parse AI response into structured format
 */
const parseAIResponse = (response, question) => {
  // Extract structured parts from the response
  const insightMatch = response.match(/INSIGHT:\s*(.+?)(?:\n|$)/i);
  const explanationMatch = response.match(/EXPLANATION:\s*(.+?)(?:\nACTION:|$)/is);
  const actionMatch = response.match(/ACTION:\s*(.+?)(?:\n|$)/i);

  return {
    insight: insightMatch ? insightMatch[1].trim() : response.split('\n')[0] || 'Analyzing your store data...',
    explanation: explanationMatch ? explanationMatch[1].trim() : response || 'Processing your question...',
    action: actionMatch ? actionMatch[1].trim() : 'Review your store data regularly to maintain optimal performance.',
    rawResponse: response
  };
};

/**
 * Fallback response when API is unavailable (for demo)
 */
const getFallbackResponse = (question, storeData) => {
  // Simple rule-based responses for demo
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('sales') || lowerQuestion.includes('revenue')) {
    return {
      insight: `Your store has generated $${storeData.revenueToday.toFixed(2)} today from ${storeData.ordersToday} orders.`,
      explanation: `This represents an average order value of $${storeData.averageOrderValue.toFixed(2)}. Your current performance suggests steady customer engagement.`,
      action: `Consider running a promotion to increase your average order value, such as "Buy 2 Get 10% Off" to encourage larger purchases.`
    };
  }
  
  if (lowerQuestion.includes('inventory') || lowerQuestion.includes('stock') || lowerQuestion.includes('low')) {
    const lowStock = storeData.lowStockProducts;
    return {
      insight: `You have ${lowStock.length} products running low on stock, including ${lowStock[0].title}.`,
      explanation: `Maintaining adequate inventory is crucial for customer satisfaction. Running out of popular items can lead to lost sales and disappointed customers.`,
      action: `Reorder ${lowStock[0].title} immediately to avoid stockouts, and set up inventory alerts for products with less than 10 units remaining.`
    };
  }
  
  if (lowerQuestion.includes('abandon') || lowerQuestion.includes('cart')) {
    return {
      insight: `You have ${storeData.abandonedCarts} abandoned carts in your system.`,
      explanation: `Abandoned carts often indicate customers are interested but need a nudge to complete their purchase. Common reasons include shipping costs, checkout complexity, or indecision.`,
      action: `Send abandoned cart recovery emails with a 10% discount code to incentivize completion of these purchases.`
    };
  }

  // Default response
  return {
    insight: `Your store shows ${storeData.ordersToday} orders today with $${storeData.revenueToday.toFixed(2)} in revenue.`,
    explanation: `Based on your current store data, you have a healthy mix of products with varying inventory levels. Your top-selling product is ${storeData.topSellingProduct}.`,
    action: `Review your product performance dashboard weekly and focus marketing efforts on your best-performing items like ${storeData.topSellingProduct}.`
  };
};

module.exports = {
  askAI
};
