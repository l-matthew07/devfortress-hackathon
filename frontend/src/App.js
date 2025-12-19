import React, { useState, useCallback } from 'react';
import {
  AppProvider,
  Page,
  Layout,
  Card,
  TextField,
  Button,
  Banner,
  BlockStack,
  InlineStack,
  Text,
  Spinner,
  Divider
} from '@shopify/polaris';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  const handleQuestionChange = useCallback((value) => {
    setQuestion(value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!question.trim()) {
      return;
    }

    const userQuestion = question.trim();
    setLoading(true);
    setError(null);
    setQuestion('');

    // Add user question to conversation
    const newConversation = {
      id: Date.now(),
      question: userQuestion,
      response: null,
      loading: true
    };

    setConversations(prev => [...prev, newConversation]);

    try {
      const response = await axios.post(`${API_URL}/ask-athena`, {
        question: userQuestion
      });

      // Update conversation with response
      setConversations(prev => 
        prev.map(conv => 
          conv.id === newConversation.id 
            ? { ...conv, response: response.data.response, loading: false }
            : conv
        )
      );
    } catch (err) {
      console.error('Error asking Athena:', err);
      setError(err.response?.data?.message || 'Failed to get response from Athena. Please try again.');
      
      // Update conversation with error state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === newConversation.id 
            ? { ...conv, loading: false, error: true }
            : conv
        )
      );
    } finally {
      setLoading(false);
    }
  }, [question]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <AppProvider>
      <Page
        title="Athena Smart Merchant Assistant"
        subtitle="Ask questions about your store and get AI-powered insights"
      >
        <Layout>
          <Layout.Section>
            {error && (
              <Banner status="critical" onDismiss={() => setError(null)}>
                <p>{error}</p>
              </Banner>
            )}

            {/* Chat History */}
            <Card>
              <BlockStack spacing="loose">
                {conversations.length === 0 ? (
                  <div className="empty-state">
                    <Text as="p" tone="subdued" alignment="center">
                      👋 Welcome! Ask Athena anything about your store.
                    </Text>
                    <Text as="p" tone="subdued" alignment="center">
                      Try: "Why did my sales drop today?" or "What should I do about low inventory?"
                    </Text>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div key={conv.id} className="conversation-item">
                      {/* User Question */}
                      <div className="user-message">
                        <BlockStack spacing="tight">
                          <Text as="p" fontWeight="semibold">You asked:</Text>
                          <Text as="p">{conv.question}</Text>
                        </BlockStack>
                      </div>

                      <Divider />

                      {/* Athena Response */}
                      <div className="athena-response">
                        {conv.loading ? (
                          <InlineStack align="center" spacing="tight">
                            <Spinner size="small" />
                            <Text as="p" tone="subdued">Athena is thinking...</Text>
                          </InlineStack>
                        ) : conv.error ? (
                          <Banner status="critical">
                            <p>Failed to get response. Please try again.</p>
                          </Banner>
                        ) : conv.response ? (
                          <BlockStack spacing="loose">
                            {/* Insight */}
                            <div className="response-section insight">
                              <BlockStack spacing="tight">
                                <Text as="p" fontWeight="semibold" tone="info">
                                  🧠 Insight
                                </Text>
                              </BlockStack>
                              <Text as="p">{conv.response.insight}</Text>
                            </div>

                            {/* Explanation */}
                            <div className="response-section explanation">
                              <BlockStack spacing="tight">
                                <Text as="p" fontWeight="semibold" tone="subdued">
                                  📊 Explanation
                                </Text>
                              </BlockStack>
                              <Text as="p">{conv.response.explanation}</Text>
                            </div>

                            {/* Action */}
                            <div className="response-section action">
                              <BlockStack spacing="tight">
                                <Text as="p" fontWeight="semibold" tone="success">
                                  ⚡ Recommended Action
                                </Text>
                              </BlockStack>
                              <Text as="p">{conv.response.action}</Text>
                            </div>
                          </BlockStack>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Input Section */}
          <Layout.Section>
            <Card>
              <BlockStack spacing="tight">
                <TextField
                  label="Ask Athena"
                  labelHidden
                  value={question}
                  onChange={handleQuestionChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Athena about your store..."
                  multiline={3}
                  disabled={loading}
                  helpText="Press Enter to send, Shift+Enter for new line"
                />
                <InlineStack align="end">
                  <Button
                    primary
                    onClick={handleSubmit}
                    disabled={!question.trim() || loading}
                    loading={loading}
                  >
                    Ask Athena ▶
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
