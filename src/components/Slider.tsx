import { cn, getEmotionLabel, getEmotionColor } from '../lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function Slider({ value, onChange, min = 1, max = 10, label }: SliderProps) {
  return (
    <div className="w-full space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, 
              rgb(254 202 202) 0%, 
              rgb(254 240 138) 50%, 
              rgb(187 247 208) 100%)`
          }}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Low</span>
          <div className="text-center">
            <div className={cn('text-3xl font-bold', getEmotionColor(value))}>
              {value}
            </div>
            <div className={cn('text-sm font-medium', getEmotionColor(value))}>
              {getEmotionLabel(value)}
            </div>
          </div>
          <span className="text-xs text-gray-500">High</span>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #22c55e;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #22c55e;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s;
        }
        
        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
