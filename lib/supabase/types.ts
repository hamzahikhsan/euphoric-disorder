/**
 * Tipe database Supabase — diperluas untuk Admin Panel.
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
          status: "unread" | "read" | "responded" | "archived";
          admin_notes: string | null;
          responded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact: string;
          subject?: string | null;
          message: string;
          source?: string;
          status?: "unread" | "read" | "responded" | "archived";
          admin_notes?: string | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact?: string;
          subject?: string | null;
          message?: string;
          source?: string;
          status?: "unread" | "read" | "responded" | "archived";
          admin_notes?: string | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          slug: string;
          subject: string;
          case_id: string;
          name: string;
          tagline: string | null;
          material: string | null;
          price_idr: number | null;
          original_price_idr: number | null;
          status: "OPEN" | "PO" | "LIMITED" | "SOLD" | "ARCHIVED";
          filed_under: string[];
          description: string | null;
          story: string | null;
          fabric_gsm: number | null;
          fabric_composition: string | null;
          fabric_feel: string | null;
          fit_silhouette: string | null;
          print_technique: string | null;
          print_location: string[];
          image_front: string | null;
          image_back: string | null;
          image_details: string[];
          image_lookbook: string[];
          colors: { name: string; hex: string }[];
          sizes_available: string[];
          size_chart: { size: string; chest: number; length: number; sleeve: number }[];
          care_instructions: string[];
          batch_info: string | null;
          model_info: string | null;
          shopee_url: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          subject: string;
          case_id: string;
          name: string;
          tagline?: string | null;
          material?: string | null;
          price_idr?: number | null;
          original_price_idr?: number | null;
          status?: "OPEN" | "PO" | "LIMITED" | "SOLD" | "ARCHIVED";
          filed_under?: string[];
          description?: string | null;
          story?: string | null;
          fabric_gsm?: number | null;
          fabric_composition?: string | null;
          fabric_feel?: string | null;
          fit_silhouette?: string | null;
          print_technique?: string | null;
          print_location?: string[];
          image_front?: string | null;
          image_back?: string | null;
          image_details?: string[];
          image_lookbook?: string[];
          colors?: { name: string; hex: string }[];
          sizes_available?: string[];
          size_chart?: { size: string; chest: number; length: number; sleeve: number }[];
          care_instructions?: string[];
          batch_info?: string | null;
          model_info?: string | null;
          shopee_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          subject?: string;
          case_id?: string;
          name?: string;
          tagline?: string | null;
          material?: string | null;
          price_idr?: number | null;
          original_price_idr?: number | null;
          status?: "OPEN" | "PO" | "LIMITED" | "SOLD" | "ARCHIVED";
          filed_under?: string[];
          description?: string | null;
          story?: string | null;
          fabric_gsm?: number | null;
          fabric_composition?: string | null;
          fabric_feel?: string | null;
          fit_silhouette?: string | null;
          print_technique?: string | null;
          print_location?: string[];
          image_front?: string | null;
          image_back?: string | null;
          image_details?: string[];
          image_lookbook?: string[];
          colors?: { name: string; hex: string }[];
          sizes_available?: string[];
          size_chart?: { size: string; chest: number; length: number; sleeve: number }[];
          care_instructions?: string[];
          batch_info?: string | null;
          model_info?: string | null;
          shopee_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_config: {
        Row: {
          key: string;
          value: string;
          category: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          category?: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          category?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          changes: Record<string, { lama: unknown; baru: unknown }> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          changes?: Record<string, { lama: unknown; baru: unknown }> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          changes?: Record<string, { lama: unknown; baru: unknown }> | null;
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
