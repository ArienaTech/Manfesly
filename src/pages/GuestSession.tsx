import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Home } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Slider } from '../components/Slider';
import { Textarea } from '../components/Textarea';

type Step = 'emotion' | 'prompt' | 'reflection' | 'complete';

const guestPrompts = [
  "Visualize your calmest self today. What would they do differently?",
  "Imagine you're watching your ideal day unfold. What do you notice first?",
  "What would change if you believed everything was working in your favor?",
  "Picture yourself radiating confidence. How does your body feel?",
  "If fear couldn't hold you back, what's the first step you'd take?",
];

export function GuestSession() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('emotion');
  const [emotionScore, setEmotionScore] = useState(5);
  const [prompt] = useState(
    guestPrompts[Math.floor(Math.random() * guestPrompts.length)]
  );
  const [reflection, setReflection] = useState('');

  const handleComplete = () => {
    setStep('complete');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lavender-100 rounded-full text-lavender-700 font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Guest Mode • Try Before You Sign In</span>
          </div>
          <p className="text-gray-600">
            Experience a Neuro-Flow™ session without creating an account
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {(['emotion', 'prompt', 'reflection', 'complete'] as Step[]).map((s, idx) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                      step === s
                        ? 'bg-lavender-600 text-white scale-110'
                        : steps.indexOf(step) > steps.indexOf(s)
                        ? 'bg-lavender-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {steps.indexOf(step) > steps.indexOf(s) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-smooth ${
                      steps.indexOf(step) > steps.indexOf(s)
                        ? 'bg-lavender-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {stepTitles[step]}
          </div>
        </div>

        {/* Content */}
        <Card>
          {step === 'emotion' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  How are you feeling right now?
                </h2>
                <p className="text-gray-600">
                  Take a moment to check in with yourself.
                </p>
              </div>

              <div className="py-8">
                <Slider
                  value={emotionScore}
                  onChange={setEmotionScore}
                  label="Your emotional state"
                />
              </div>

              <Button
                onClick={() => setStep('prompt')}
                className="w-full flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'prompt' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-gradient-to-br from-lavender-100 to-primary-100 rounded-full">
                  <Sparkles className="w-8 h-8 text-lavender-600" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Reflection Prompt
                </h2>
                <div className="p-6 bg-gradient-to-br from-lavender-50 to-primary-50 rounded-2xl border-2 border-lavender-200">
                  <p className="text-lg text-gray-800 leading-relaxed italic">
                    "{prompt}"
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setStep('reflection')}
                className="w-full flex items-center justify-center gap-2"
              >
                Start Reflection
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'reflection' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Your Reflection
                </h2>
                <p className="text-gray-600">
                  Take 2-5 minutes to journal your thoughts.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-lavender-50 to-primary-50 rounded-2xl">
                <p className="text-sm text-gray-700 italic mb-4">
                  "{prompt}"
                </p>
              </div>

              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your thoughts here... (Note: Guest sessions are not saved)"
                rows={10}
                className="glass"
              />

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep('prompt')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!reflection.trim()}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  Complete Session
                </Button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-to-br from-lavender-500 to-primary-500 rounded-full">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  Beautiful work! 🎉
                </h2>
                <p className="text-lg text-gray-600">
                  You've completed a guest Neuro-Flow™ session.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-lavender-50 to-primary-50 rounded-2xl border-2 border-lavender-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Want to save your progress?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Create a free account to track your journey, view your emotional progress,
                  and build your transformation streak.
                </p>
                <Button size="lg" onClick={() => navigate('/')}>
                  Create Free Account
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

const steps: Step[] = ['emotion', 'prompt', 'reflection', 'complete'];

const stepTitles: Record<Step, string> = {
  emotion: 'Step 1: Check In',
  prompt: 'Step 2: Your Prompt',
  reflection: 'Step 3: Reflect',
  complete: 'Complete!',
};
