export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          intention: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          intention?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          intention?: string | null
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          emotion_score: number
          prompt: string
          reflection: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          emotion_score: number
          prompt: string
          reflection?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          emotion_score?: number
          prompt?: string
          reflection?: string | null
          created_at?: string
        }
      }
    }
  }
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  intention: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  emotion_score: number;
  prompt: string;
  reflection: string | null;
  created_at: string;
}
