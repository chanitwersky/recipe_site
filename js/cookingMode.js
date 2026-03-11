// ===== Speech Synthesis Functions =====

// Global speech synthesis instance
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let selectedVoice = null;
let availableVoices = [];

// Initialize and load all available voices
function initializeVoice() {
    return new Promise((resolve) => {
        // Get available voices
        availableVoices = speechSynthesis.getVoices();
        
        // If voices aren't loaded yet, wait for them
        if (availableVoices.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                availableVoices = speechSynthesis.getVoices();
                resolve();
            };
        } else {
            resolve();
        }
    });
}

// Select male voice based on available voices and accent preference
function selectMaleVoice(accent) {
    // Priority list of male voices based on accent
    let maleVoiceNames = [];
    
    if (accent === 'en-US') {
        // American English male voices
        maleVoiceNames = [
            'Google US English Male',
            'Microsoft David - English (United States)',
            'Microsoft Mark - English (United States)',
            'Alex',  // macOS US voice
            'Fred'
        ];
    } else if (accent === 'en-GB') {
        // British English male voices
        maleVoiceNames = [
            'Google UK English Male',
            'Microsoft George - English (Great Britain)',
            'Daniel',  // macOS UK voice
            'Oliver'
        ];
    }
    
    // Try to find preferred male voices
    for (let voiceName of maleVoiceNames) {
        const voice = availableVoices.find(v => v.name === voiceName);
        if (voice) {
            return voice;
        }
    }
    
    // Fallback: Find any voice with "male" in the name and matching accent
    const accentMaleVoice = availableVoices.find(v => 
        v.lang === accent && (
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('mark') ||
            v.name.toLowerCase().includes('george')
        )
    );
    
    if (accentMaleVoice) {
        return accentMaleVoice;
    }
    
    // Last resort: Find any voice with matching accent
    return availableVoices.find(v => v.lang === accent) || availableVoices[0];
}

// Select female voice based on available voices and accent preference
function selectFemaleVoice(accent) {
    // Priority list of female voices based on accent
    let femaleVoiceNames = [];
    
    if (accent === 'en-US') {
        // American English female voices
        femaleVoiceNames = [
            'Google US English Female',
            'Microsoft Zira - English (United States)',
            'Samantha',  // macOS US voice
            'Karen',     // macOS US voice
            'Victoria'
        ];
    } else if (accent === 'en-GB') {
        // British English female voices
        femaleVoiceNames = [
            'Google UK English Female',
            'Microsoft Hazel - English (Great Britain)',
            'Microsoft Susan - English (Great Britain)',
            'Fiona',  // macOS UK voice
            'Kate'
        ];
    }
    
    // Try to find preferred female voices
    for (let voiceName of femaleVoiceNames) {
        const voice = availableVoices.find(v => v.name === voiceName);
        if (voice) {
            return voice;
        }
    }
    
    // Fallback: Find any voice with "female" in the name and matching accent
    const accentFemaleVoice = availableVoices.find(v => 
        v.lang === accent && (
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('hazel')
        )
    );
    
    if (accentFemaleVoice) {
        return accentFemaleVoice;
    }
    
    // Last resort: Find any voice with matching accent
    return availableVoices.find(v => v.lang === accent) || availableVoices[0];
}

// Apply user's voice preference (gender and accent)
function applyUserVoice() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    // Get user's voice preferences (gender and accent)
    const voicePrefs = getUserVoice(currentUser);
    const gender = voicePrefs.gender;
    const accent = voicePrefs.accent;
    
    // Select appropriate voice based on gender and accent
    if (gender === 'male') {
        return selectMaleVoice(accent);
    } else {
        return selectFemaleVoice(accent);
    }
}

// Speak a step out loud using user's selected voice
function speakStep(text) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Create new speech utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set realistic human-like voice parameters
    currentUtterance.rate = 1;      // Normal speaking rate
    currentUtterance.pitch = 1;     // Natural pitch
    currentUtterance.volume = 1;    // Full volume
    
    // Get user's preferred voice (male or female)
    selectedVoice = applyUserVoice();
    
    // Use selected voice if available
    if (selectedVoice) {
        currentUtterance.voice = selectedVoice;
        currentUtterance.lang = selectedVoice.lang;
    } else {
        // Fallback to English language
        currentUtterance.lang = 'en-US';
    }
    
    // Speak the text
    speechSynthesis.speak(currentUtterance);
}

// Pause speech
function pauseSpeech() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
}

// Resume speech
function resumeSpeech() {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}

// Stop speech completely
function stopSpeech() {
    speechSynthesis.cancel();
}

// ===== Cooking Mode Logic =====

class CookingMode {
    constructor(steps, delay) {
        this.steps = steps;
        this.currentStep = 0;
        this.delay = delay * 1000; // Convert to milliseconds
        this.isPaused = false;
        this.timer = null;
    }
    
    async start() {
        // Initialize voices before starting
        await initializeVoice();
        
        // Show and speak first step
        this.showStep();
        this.speakCurrentStep();
        this.startTimer();
    }
    
    showStep() {
        const stepElement = document.getElementById('cookingStep');
        const counterElement = document.getElementById('stepCounter');
        const progressElement = document.getElementById('progressFill');
        
        // Display current step text
        stepElement.textContent = this.steps[this.currentStep];
        
        // Display step counter
        counterElement.textContent = `Step ${this.currentStep + 1} of ${this.steps.length}`;
        
        // Update progress bar
        const progress = ((this.currentStep + 1) / this.steps.length) * 100;
        progressElement.style.width = progress + '%';
    }
    
    speakCurrentStep() {
        // Prepare step announcement
        const stepNumber = this.currentStep + 1;
        const stepText = this.steps[this.currentStep];
        const announcement = `Step ${stepNumber}. ${stepText}`;
        
        // Speak the step using user's preferred voice (male or female)
        speakStep(announcement);
    }
    
    startTimer() {
        // Don't start timer if paused
        if (this.isPaused) return;
        
        // Set timer to automatically move to next step
        this.timer = setTimeout(() => {
            this.nextStep();
        }, this.delay);
    }
    
    nextStep() {
        // Clear existing timer
        clearTimeout(this.timer);
        
        // Check if there are more steps
        if (this.currentStep < this.steps.length - 1) {
            // Move to next step
            this.currentStep++;
            this.showStep();
            this.speakCurrentStep();
            this.startTimer();
        } else {
            // All steps completed
            this.finish();
        }
    }
    
    pause() {
        // Set paused state
        this.isPaused = true;
        
        // Stop the timer
        clearTimeout(this.timer);
        
        // Pause the speech
        pauseSpeech();
        
        // Update button text
        document.getElementById('pauseBtn').textContent = 'Continue';
    }
    
    continue() {
        // Clear paused state
        this.isPaused = false;
        
        // Update button text
        document.getElementById('pauseBtn').textContent = 'Pause';
        
        // Resume the speech
        resumeSpeech();
        
        // Restart the timer
        this.startTimer();
    }
    
    finish() {
        // Completion message
        const completionMessage = 'Cooking Complete! Enjoy your meal!';
        
        // Display completion message
        document.getElementById('cookingStep').textContent = '🎉 ' + completionMessage;
        
        // Speak completion message using user's preferred voice
        speakStep(completionMessage);
        
        // Hide pause button
        document.getElementById('pauseBtn').style.display = 'none';
        
        // Change next button to close
        document.getElementById('nextBtn').textContent = 'Close';
    }
    
    stop() {
        // Clear timer
        clearTimeout(this.timer);
        
        // Stop all speech
        stopSpeech();
    }
}

// Global cooking mode instance
let cookingModeInstance = null;

// Initialize voices when page loads
initializeVoice();
