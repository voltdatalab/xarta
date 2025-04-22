-- Create tables for language configuration and translations

-- Table for storing configuration settings
CREATE TABLE IF NOT EXISTS config (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing translations
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  locale VARCHAR(10) NOT NULL,
  translations JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(locale)
);

-- Insert available languages
INSERT INTO config (key, value)
VALUES ('languages.available', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Insert default selected language
INSERT INTO config (key, value)
VALUES ('languages.selectedLanguage', '{"code":"en"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

