import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
// For development, you can use environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if using placeholder values
const isUsingPlaceholder = !process.env.REACT_APP_SUPABASE_URL;

if (isUsingPlaceholder) {
  console.warn(
    '⚠️ Supabase credentials not configured!\n\n' +
    'The app will work with local dummy data, but data won\'t persist.\n\n' +
    'To enable data persistence:\n' +
    '1. Create a .env file in the project root\n' +
    '2. Add your Supabase credentials:\n' +
    '   REACT_APP_SUPABASE_URL=your_url\n' +
    '   REACT_APP_SUPABASE_ANON_KEY=your_key\n' +
    '3. Restart the app\n\n' +
    'See SETUP_GUIDE.md for detailed instructions.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { isUsingPlaceholder };