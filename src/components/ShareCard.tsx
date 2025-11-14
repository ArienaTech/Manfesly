import { useRef } from 'react';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Modal } from './Modal';
import { Button } from './Button';
import type { Session } from '../types/database';
import { formatDate, getEmotionLabel } from '../lib/utils';

interface ShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

export function ShareCard({ isOpen, onClose, session }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `manifestly-${formatDate(session.created_at)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Share Your Journey
          </h2>
          <p className="text-gray-600">
            Download this beautiful card to share your progress
          </p>
        </div>

        {/* Share Card Preview */}
        <div
          ref={cardRef}
          className="w-full aspect-square bg-gradient-to-br from-primary-500 via-lavender-500 to-primary-600 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-white rounded-full" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Logo */}
            <div>
              <h3 className="text-2xl font-bold">Manifestly</h3>
              <p className="text-sm opacity-90">Neuro-Flow™ Session</p>
            </div>

            {/* Quote */}
            <div className="py-8 space-y-4">
              <div className="text-6xl font-bold">
                {session.emotion_score}/10
              </div>
              <p className="text-lg font-medium">
                {getEmotionLabel(session.emotion_score)}
              </p>
              <div className="h-1 w-20 bg-white rounded-full" />
            </div>

            {/* Prompt */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm font-medium italic leading-relaxed">
                "{session.prompt.substring(0, 120)}
                {session.prompt.length > 120 ? '...' : ''}"
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="relative z-10 flex justify-between items-end">
            <p className="text-sm opacity-75">
              {formatDate(session.created_at)}
            </p>
            <p className="text-xs opacity-75">manifestly.app</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}
