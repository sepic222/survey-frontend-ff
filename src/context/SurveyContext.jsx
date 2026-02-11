import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { surveySections } from '../config/surveyData';

const SurveyContext = createContext(undefined);

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const SurveyProvider = ({ children }) => {
  // Lazy init to prevent race condition & fix Intro Skip
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fateflix_step');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Lazy init for answers to prevent flash of empty content
  const [answers, setAnswers] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fateflix_answers');
      try {
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        console.warn('Failed to parse local answers', e);
        return {};
      }
    }
    return {};
  });

  const [submissionId, setSubmissionId] = useState(null);
  const [chartId, setChartId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isSohoMode, setIsSohoMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fateflix_soho_mode') === 'true';
    }
    return false;
  });

  const saveTimeoutRef = useRef({});

  const totalSteps = surveySections.length;

  // Sync submissionId to localStorage
  useEffect(() => {
    if (submissionId) {
      localStorage.setItem('fateflix_submission_id', submissionId);
    }
  }, [submissionId]);

  // Sync currentStep to localStorage (for Intro Skip)
  useEffect(() => {
    localStorage.setItem('fateflix_step', currentStep.toString());
  }, [currentStep]);

  // Sync answers to localStorage (for pre-submission persistence)
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('fateflix_answers', JSON.stringify(answers));
    }
  }, [answers]);

  // Sync isSohoMode to localStorage
  useEffect(() => {
    localStorage.setItem('fateflix_soho_mode', isSohoMode.toString());
  }, [isSohoMode]);

  // Restore session (Server Sync)
  useEffect(() => {
    const restoreSession = async () => {
      // Note: Local answers and step are already loaded via lazy state init.
      // We only need to fetch server state if we have a submission ID.

      const storedSubmissionId = localStorage.getItem('fateflix_submission_id');
      if (!storedSubmissionId) {
        setIsRestoring(false);
        return;
      }

      console.log('🔄 Attempting to restore server session:', storedSubmissionId);

      try {
        const apiBase = import.meta.env.PUBLIC_API_BASE || (import.meta.env.DEV ? 'http://localhost:3001' : '');
        const response = await fetch(`${apiBase}/api/survey/state/${storedSubmissionId}`);

        if (response.ok) {
          const data = await response.json();
          if (data.ok && data.submissionId) {
            setSubmissionId(data.submissionId);
            // Merge server answers with local (Server wins conflicts)
            setAnswers(prev => ({ ...prev, ...(data.answers || {}) }));

            if (data.answers?.email) setUserEmail(data.answers.email);
            if (data.answers?.isSohoMode === true) setIsSohoMode(true);
            if (data.chartId) setChartId(data.chartId);
            console.log('✅ Server session restored successfully');
          } else {
            console.warn('⚠️ Session invalid, clearing localStorage ID');
            localStorage.removeItem('fateflix_submission_id');
          }
        } else {
          if (response.status === 404) {
            localStorage.removeItem('fateflix_submission_id');
          }
        }
      } catch (e) {
        console.error('❌ Error restoring session:', e);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, []);

  // Real-time save function (debounced)
  const saveAnswerToServer = useCallback(async (questionId, value, submissionId, userEmail) => {
    if (!submissionId) return; // Can't save without submission ID

    // Skip birth data and cosmic keys
    if (['date', 'time', 'latitude', 'longitude', 'city', 'country', 'username', 'time_accuracy'].includes(questionId)) {
      return;
    }

    // Handle top3 fields specially (they combine into one answer)
    if (questionId === 'top3_films' || questionId === 'top3_series' || questionId === 'top3_docs') {
      // Don't save individually, will be handled on final submit
      return;
    }

    try {
      const apiBase = import.meta.env.PUBLIC_API_BASE || (import.meta.env.DEV ? 'http://localhost:3001' : '');
      const response = await fetch(`${apiBase}/api/survey/save-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          questionKey: questionId,
          answerValue: value,
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.warn(`⚠️ Failed to save answer for ${questionId}:`, error);
      }
      // Silent success - don't log every save
    } catch (error) {
      console.warn(`⚠️ Error saving answer for ${questionId}:`, error.message);
    }
  }, []);

  // Debounced version of save function (500ms delay)
  const debouncedSave = useCallback(
    debounce((questionId, value, submissionId, userEmail) => {
      saveAnswerToServer(questionId, value, submissionId, userEmail);
    }, 500),
    [saveAnswerToServer]
  );

  const setAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [questionId]: value,
      };

      // Save to server in real-time (if submission exists)
      if (submissionId) {
        debouncedSave(questionId, value, submissionId, userEmail);
      }

      return newAnswers;
    });
  }, [submissionId, userEmail, debouncedSave]);

  const nextStep = (mode) => {
    if (mode === 'soho') {
      setIsSohoMode(true);
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetSurvey = useCallback(() => {
    // Clear State
    setCurrentStep(0);
    setAnswers({});
    setSubmissionId(null);
    setChartId(null);
    setUserEmail(null);
    setIsSohoMode(false);

    // Clear Local Storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fateflix_answers');
      localStorage.removeItem('fateflix_step');
      localStorage.removeItem('fateflix_submission_id');
      localStorage.removeItem('fateflix_soho_mode');
    }
    console.log('🧹 Survey reset to clean slate.');
  }, []);

  const value = {
    currentStep,
    totalSteps,
    answers,
    setAnswer,
    nextStep,
    prevStep,
    currentSection: surveySections[currentStep],
    submissionId,
    setSubmissionId,
    chartId,
    setChartId,
    userEmail,
    setUserEmail,
    resetSurvey,
    isRestoring, // Added to context
    isSohoMode,
    setIsSohoMode,
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};


