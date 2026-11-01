import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://luhuiwyhewofjxnbzbdt.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aHVpd3loZXdvZmp4bmJ6YmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MDQyMDYsImV4cCI6MjA5MTI4MDIwNn0.ANDf7QBQS3BwBmsM-U8HXuVDoIFT4P4ndVSahzTKyeo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CoachProfile = {
  id: string;
  coach_id: string;
  display_name: string;
  avatar_url: string | null;
  sport: string | null;
  region_city: string | null;
  region_district: string | null;
  center_name: string | null;
  bio: string | null;
  coaching_years: number | null;
  specialties: string[] | null;
  coaching_style: string | null;
  has_player_career: boolean | null;
  career_details: string | null;
  certifications: string[] | null;
  awards: string[] | null;
  show_coaching_journey: boolean | null;
  journey_snapshot: string | null;
  public_slug: string;
  is_public: boolean;
};

export type LessonPackage = {
  id: string;
  title: string;
  price: number;
  total_credits: number;
  duration_minutes: number;
  color: string;
  notes: string | null;
};
