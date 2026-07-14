/**
 * Tipe database Supabase (disederhanakan dari `generate_typescript_types`).
 * Regenerate saat schema berubah.
 */
export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          contact: string;
          subject: string | null;
          message: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact: string;
          subject?: string | null;
          message: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact?: string;
          subject?: string | null;
          message?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
