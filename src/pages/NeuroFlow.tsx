import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Slider } from '../components/Slider';
import { Textarea } from '../components/Textarea';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { generatePrompt } from '../lib/openai';

type Step = 'emotion' | 'prompt' | 'reflection' | 'complete';

export function NeuroFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('emotion');
  const [emotionScore, setEmotionScore] = useState(5);
  const [prompt, setPrompt] = useState('');
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmotionNext = async () => {
    setLoading(true);
    try {
      // Fetch past sessions for context
      const { data: pastSessions } = await supabase
        .from('sessions')
        .select('emotion_score, reflection')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      const generatedPrompt = await generatePrompt(emotionScore, pastSessions || undefined);
      setPrompt(generatedPrompt);
      setStep('prompt');
    } catch (error) {
      console.error('Error generating prompt:', error);
      setPrompt("Visualize your calmest self today. What would they do differently?");
      setStep('prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSession = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('sessions')
        .insert({
          user_id: user!.id,
          emotion_score: emotionScore,
          prompt,
          reflection,
        } as any);

      if (error) throw error;
      setStep('complete');
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {(['emotion', 'prompt', 'reflection', 'complete'] as Step[]).map((s, idx) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                      step === s
                        ? 'bg-primary-600 text-white scale-110'
                        : steps.indexOf(step) > steps.indexOf(s)
                        ? 'bg-primary-500 text-white'
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
                        ? 'bg-primary-500'
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
                onClick={handleEmotionNext}
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? 'Generating prompt...' : 'Continue'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </Button>
            </div>
          )}

          {step === 'prompt' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-gradient-to-br from-primary-100 to-lavender-100 rounded-full">
                  <Sparkles className="w-8 h-8 text-primary-600" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Reflection Prompt
                </h2>
                <div className="p-6 bg-gradient-to-br from-primary-50 to-lavender-50 rounded-2xl border-2 border-primary-200">
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

              <div className="p-4 bg-gradient-to-br from-primary-50 to-lavender-50 rounded-2xl">
                <p className="text-sm text-gray-700 italic mb-4">
                  "{prompt}"
                </p>
              </div>

              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your thoughts here..."
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
                  onClick={handleSaveSession}
                  disabled={!reflection.trim() || loading}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {loading ? 'Saving...' : 'Complete Session'}
                </Button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-to-br from-primary-500 to-lavender-500 rounded-full">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  Beautiful work! 🎉
                </h2>
                <p className="text-lg text-gray-600">
                  You've completed today's Neuro-Flow™ session.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate('/dashboard')} size="lg">
                  View Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep('emotion');
                    setEmotionScore(5);
                    setPrompt('');
                    setReflection('');
                  }}
                >
                  Start Another Session
                </Button>
              </div>
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
