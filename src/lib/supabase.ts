import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

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
