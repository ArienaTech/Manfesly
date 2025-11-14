import { useState } from 'react';
import { Sparkles, Brain, Heart, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { AuthModal } from '../components/AuthModal';

export function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-primary-200 text-primary-700 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Neuroscience meets Manifestation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Rewire your mind.
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent">
              Redesign your reality.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Transform your emotional, attentional, and belief systems through
            daily 2-5 minute Neuro-Flow™ sessions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" onClick={() => openAuth('signup')}>
              Start Free Session
            </Button>
            <Button variant="outline" size="lg" onClick={() => openAuth('signin')}>
              Sign In
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required • 2-minute sessions • Science-backed
          </p>

          <div className="pt-2">
            <button
              onClick={() => window.location.href = '/guest'}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Try a guest session first
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Science + Spirit = Manifestly
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We bridge the gap between neuroscience and spirituality to help you
            create lasting change.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-10 h-10 text-primary-600" />}
              title="Neural Rewiring"
              description="Evidence-based techniques that reshape your neural pathways for lasting transformation."
            />
            <FeatureCard
              icon={<Heart className="w-10 h-10 text-lavender-600" />}
              title="Emotional Intelligence"
              description="Track your emotional state and build self-awareness through daily check-ins."
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-primary-600" />}
              title="Progress Tracking"
              description="Visualize your journey with beautiful charts and celebrate your streak."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Daily Neuro-Flow™
          </h2>

          <div className="space-y-8">
            <StepCard
              number="1"
              title="Check In"
              description="Rate your current emotional state on a scale of 1-10."
            />
            <StepCard
              number="2"
              title="Receive Your Prompt"
              description="Get a personalized AI-generated reflection prompt based on your emotions."
            />
            <StepCard
              number="3"
              title="Reflect & Journal"
              description="Take 2-5 minutes to write your thoughts and insights."
            />
            <StepCard
              number="4"
              title="Track Progress"
              description="Watch your emotional evolution unfold through beautiful visualizations."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-br from-primary-600 to-lavender-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold">
            Ready to transform your reality?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands who are rewiring their minds for success, peace, and fulfillment.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary-600 hover:bg-gray-50 border-0"
            onClick={() => openAuth('signup')}
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t border-gray-200">
        <p>© 2024 Manifestly. All rights reserved.</p>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card-gradient rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-smooth text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-lavender-500 text-white font-bold text-xl flex items-center justify-center shadow-lg">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
