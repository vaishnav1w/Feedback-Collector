def analyze_sentiment(message):
    positive_words = ['good', 'great', 'awesome', 'excellent', 'love', 'like', 'nice', 'neat', 'well done', 'beautiful', 'useful', 'helpful']
    negative_words = ['bad', 'poor', 'terrible', 'hate', 'worst', 'slow', 'confusing', 'error', 'issue', 'not working', 'bug']

    # Normalize input
    message_lower = message.lower().replace("nize", "nice")  # typo fix

    # Match by keywords
    if any(word in message_lower for word in negative_words):
        return 'negative'
    elif any(word in message_lower for word in positive_words):
        return 'positive'
    else:
        return 'neutral'
