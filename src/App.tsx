import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Step, Evaluation } from './types';
import { PEOPLE } from './data/surveyData';
import { ProgressBar } from './components/ProgressBar';
import { SurveyLanding } from './components/SurveyLanding';
import { PersonSelector } from './components/PersonSelector';
import { RatingSection } from './components/RatingSection';
import { OpenQuestionsSection } from './components/OpenQuestionsSection';
import { SurveyCompletion } from './components/SurveyCompletion';
export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [surveyorName, setSurveyorName] = useState('');
  const [evaluations, setEvaluations] = useState<Record<number, Evaluation>>(
    () => {
      const initial: Record<number, Evaluation> = {};
      PEOPLE.forEach((p) => {
        initial[p.id] = {
          ratings: {},
          openAnswers: {},
          isComplete: false
        };
      });
      return initial;
    }
  );
  const selectedPerson = PEOPLE.find((p) => p.id === selectedPersonId);
  const currentEvaluation = selectedPersonId ?
  evaluations[selectedPersonId] :
  null;
  const handleRatingUpdate = (questionId: number, value: number) => {
    if (!selectedPersonId) return;
    setEvaluations((prev) => ({
      ...prev,
      [selectedPersonId]: {
        ...prev[selectedPersonId],
        ratings: {
          ...prev[selectedPersonId].ratings,
          [questionId]: value
        }
      }
    }));
  };
  const handleOpenAnswerUpdate = (questionId: number, value: string) => {
    if (!selectedPersonId) return;
    setEvaluations((prev) => ({
      ...prev,
      [selectedPersonId]: {
        ...prev[selectedPersonId],
        openAnswers: {
          ...prev[selectedPersonId].openAnswers,
          [questionId]: value
        }
      }
    }));
  };
  const handlePersonSubmit = () => {
    if (!selectedPersonId) return;
    setEvaluations((prev) => ({
      ...prev,
      [selectedPersonId]: {
        ...prev[selectedPersonId],
        isComplete: true
      }
    }));
    setCurrentStep('completion');
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans overflow-x-hidden flex flex-col pt-2 sm:pt-4 pb-8 sm:pb-12">
      <ProgressBar currentStep={currentStep} />

      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' &&
          <SurveyLanding
            key="landing"
            surveyorName={surveyorName}
            onNameChange={setSurveyorName}
            onStart={() => setCurrentStep('selector')} />

          }

          {currentStep === 'selector' &&
          <PersonSelector
            key="selector"
            people={PEOPLE}
            evaluations={evaluations}
            surveyorName={surveyorName}
            onSelect={(id) => {
              setSelectedPersonId(id);
              setCurrentStep('rating');
            }} />

          }

          {currentStep === 'rating' && selectedPerson && currentEvaluation &&
          <RatingSection
            key="rating"
            person={selectedPerson}
            evaluation={currentEvaluation}
            onUpdate={handleRatingUpdate}
            onNext={() => setCurrentStep('open')}
            onBack={() => setCurrentStep('selector')} />

          }

          {currentStep === 'open' && selectedPerson && currentEvaluation &&
          <OpenQuestionsSection
            key="open"
            person={selectedPerson}
            evaluation={currentEvaluation}
            onUpdate={handleOpenAnswerUpdate}
            onSubmit={handlePersonSubmit}
            onBack={() => setCurrentStep('rating')} />

          }

          {currentStep === 'completion' &&
          <SurveyCompletion
            key="completion"
            evaluations={evaluations}
            surveyorName={surveyorName}
            onBackToSelector={() => setCurrentStep('selector')} />

          }
        </AnimatePresence>
      </main>
    </div>);

}