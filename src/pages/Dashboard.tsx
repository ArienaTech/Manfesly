import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Sparkles,
  TrendingUp,
  Calendar,
  LogOut,
  User,
  Flame,
  Download,
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Session } from '../types/database';
import { formatDate, getEmotionColor, getEmotionLabel } from '../lib/utils';
import { ShareCard } from '../components/ShareCard';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchSessions();
  }, [user, navigate]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
      calculateStreak(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (sessionList: Session[]) => {
    if (sessionList.length === 0) {
      setStreak(0);
      return;
    }

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedSessions = [...sessionList].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const uniqueDates = new Set(
      sortedSessions.map((s) => {
        const d = new Date(s.created_at);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );

    const sortedDates = Array.from(uniqueDates).sort((a, b) => b - a);

    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (sortedDates[i] === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const chartData = sessions
    .slice(0, 10)
    .reverse()
    .map((session) => ({
      date: new Date(session.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      score: session.emotion_score,
    }));

  const averageScore =
    sessions.length > 0
      ? (sessions.reduce((sum, s) => sum + s.emotion_score, 0) / sessions.length).toFixed(1)
      : '0';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleShare = (session: Session) => {
    setSelectedSession(session);
    setShareModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 text-primary-600 animate-pulse mx-auto" />
          <p className="text-gray-600">Loading your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {userProfile?.name || 'there'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Your transformation journey continues.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900">{streak} days</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-lavender-500 to-lavender-600 rounded-2xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-lavender-500 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{averageScore}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* New Session Button */}
        <Card glass>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready for today's session?
              </h3>
              <p className="text-gray-600">
                Continue your transformation with a new Neuro-Flow™ session.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => navigate('/session')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5" />
              Start Session
            </Button>
          </div>
        </Card>

        {/* Emotional Progress Chart */}
        {sessions.length > 0 && (
          <Card>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Emotional Journey
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  domain={[1, 10]}
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Past Sessions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Past Sessions
            </h3>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-gray-600">
                No sessions yet. Start your first one!
              </p>
              <Button onClick={() => navigate('/session')}>
                Start Your First Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-smooth"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        {formatDate(session.created_at)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-2xl font-bold ${getEmotionColor(session.emotion_score)}`}>
                          {session.emotion_score}/10
                        </span>
                        <span className={`text-sm ${getEmotionColor(session.emotion_score)}`}>
                          {getEmotionLabel(session.emotion_score)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(session)}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Share
                    </Button>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Prompt:</p>
                    <p className="text-sm text-gray-600 italic">
                      "{session.prompt}"
                    </p>
                  </div>

                  {session.reflection && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Reflection:
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {session.reflection}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Share Modal */}
      {selectedSession && (
        <ShareCard
          isOpen={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setSelectedSession(null);
          }}
          session={selectedSession}
        />
      )}
    </div>
  );
}
