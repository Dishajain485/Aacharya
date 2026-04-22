// Chat AI Keyword Responses - STRICT IMPLEMENTATION

export const chatKeywords = {
  // Greetings
  hello: [
    "Hello! 👋 I'm Aacharya, your AI habit mentor. How can I help you today?",
    "Hello! Welcome to your fitness journey. What would you like to explore?"
  ],
  hi: [
    "Hi there! 👋 Ready to crush your fitness goals today?",
    "Hey! How are you feeling today?"
  ],
  hey: [
    "Hey! 🙌 Let's make today count!",
    "Hey there! How may I help you today?"
  ],
  
  // Fitness Goal Questions
  goal: [
    "Your fitness goal helps personalize your journey. Choose from Weight Loss, Muscle Gain, or Stay Fit. What's your primary goal?",
    "Understanding your fitness goal helps me create the perfect plan for you!"
  ],
  weight: [
    "Weight Loss focuses on calorie deficit, cardio, and sustainable habits. I'll help you lose weight healthily!",
    "For weight loss, combine cardio, strength training, and proper nutrition. Let's create your plan!"
  ],
  muscle: [
    "Muscle Gain requires progressive overload, protein intake, and recovery. Let's build that strength!",
    "Building muscle takes consistency. Focus on compound exercises, eat enough protein, and rest well."
  ],
  fit: [
    "Stay Fit is about maintaining health, energy, and balance. Perfect for overall wellness!",
    "Staying fit means regular exercise, balanced nutrition, and good habits. Let's keep you healthy!"
  ],
  
  // Health Topics
  meditation: [
    "Meditation is a powerful tool for mental clarity and stress relief. Start with just 5 minutes daily. Would you like a guided session?",
    "Regular meditation improves focus and reduces stress. Try our Morning Meditation mission!"
  ],
  workout: [
    "Workouts should match your goal. Weight loss needs cardio, muscle gain needs strength training, and staying fit needs balance!",
    "Consistency is key! Start with 3-4 workouts per week and gradually increase intensity."
  ],
  sleep: [
    "Quality sleep is essential for recovery and muscle growth. Aim for 7-9 hours. Try our Sleep Tracker mission!",
    "Sleep is when your body repairs and builds muscle. Create a consistent bedtime routine."
  ],
  diet: [
    "Your diet should match your fitness goal. Weight loss needs a calorie deficit, muscle gain needs surplus with high protein!",
    "Nutrition is 70% of your results. Track your calories and macros for best results."
  ],
  water: [
    "Hydration is vital! Drink at least 8 glasses of water daily. Try our Hydration Check mission!",
    "Proper hydration improves performance, recovery, and fat loss. Drink water throughout the day."
  ],
  
  // Wellness
  stress: [
    "Stress affects your fitness progress. Try meditation, light exercise, or breathing techniques to manage it.",
    "Chronic stress increases cortisol and hinders results. Practice daily self-care and get enough sleep."
  ],
  energy: [
    "Low energy? Check your sleep, nutrition, and hydration. Proper fuel equals better performance!",
    "Boost energy naturally with proper sleep, balanced meals, and morning exercise."
  ],
  protein: [
    "Protein is essential for muscle recovery and growth. Aim for 0.8-1g per pound of body weight.",
    "Good protein sources: chicken, fish, eggs, Greek yogurt, legumes, and protein powder."
  ],
  
  // Missions
  mission: [
    "Missions help you build healthy habits! Complete daily missions to earn XP and unlock rewards.",
    "Check your Missions page to see today's fitness challenges!"
  ],
  xp: [
    "XP (Experience Points) track your fitness journey. Earn XP by completing missions and rank up!",
    "The more XP you earn, the higher your rank. Keep completing missions!"
  ],
  rank: [
    "Your rank shows your fitness mastery: E → D → C → B → A → S. Keep earning XP to rank up!",
    "Each rank unlocks new features and rewards. What rank are you aiming for?"
  ],
  
  // Scanner
  scan: [
    "Use the Scanner to identify meals and workouts. Get instant nutrition and exercise insights!",
    "The Scanner analyzes items and provides goal-specific recommendations."
  ],
  
  // Default
  default: [
    "I'm here to guide your fitness journey. Ask me about goals, workouts, nutrition, or missions!",
    "Interesting question! I specialize in fitness and habits. Try asking about your goal, workout tips, or daily missions.",
    "I'm still learning! For now, I can help with fitness goals, workout tips, and mission guidance."
  ]
};

export const getChatResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for keyword matches
  for (const [keyword, responses] of Object.entries(chatKeywords)) {
    if (lowerMessage.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Default response
  const defaultResponses = chatKeywords.default;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
