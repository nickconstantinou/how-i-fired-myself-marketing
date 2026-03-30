-- Migration: Create quiz_responses table for Fear Profile quiz
-- Run on: Supabase project araqigsimkjsmwhnjesv

CREATE TABLE IF NOT EXISTS quiz_responses (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT        NOT NULL,
  archetype      TEXT        NOT NULL CHECK (archetype IN ('identity_hollow', 'spouse_mismatch', 'purpose_void', 'financial_doubter')),
  fear_scores    JSONB       NOT NULL,
  consent_given  BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for research queries: archetype distribution and time-based analysis
CREATE INDEX IF NOT EXISTS idx_quiz_responses_archetype    ON quiz_responses(archetype);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at   ON quiz_responses(created_at DESC);

-- RLS: quiz_responses is write-only from client side (Edge Function only)
-- Client fetches results by UUID via Supabase REST API
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow read by ID — results page uses response UUID (no PII in URL)
-- Works because the fetch goes to /rest/v1/quiz_responses?id=eq.<uuid>&select=...
CREATE POLICY "Read quiz_responses by ID (anon)" ON quiz_responses
  FOR SELECT USING (true);

-- Service role can do anything (Edge Function uses service role key)
CREATE POLICY "Service role full access" ON quiz_responses
  FOR ALL USING (auth.role() = 'service_role');