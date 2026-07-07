import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if credentials are validly configured
export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '';

// Expose a standard supabase client if configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any); // fallback handled by helper functions

// --- MOCK LOCALSTORAGE DATABASE & AUTH FOR DEMO MODE ---

// Mock database wrapper to match Supabase syntax
export const mockDb = {
  // Mock auth
  auth: {
    getUser: async () => {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      const session = localStorage.getItem('xmed_demo_session');
      if (session) {
        const user = JSON.parse(session);
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: null };
    },
    signUp: async ({ email, password, options }: any) => {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      const usersRaw = localStorage.getItem('xmed_demo_users') || '[]';
      const users = JSON.parse(usersRaw);
      
      if (users.find((u: any) => u.email === email)) {
        return { data: { user: null }, error: new Error('User already exists') };
      }

      const newUser = {
        id: `demo-user-${Math.floor(Math.random() * 100000)}`,
        email,
        user_metadata: options?.data || {},
        created_at: new Date().toISOString()
      };

      users.push({ ...newUser, password });
      localStorage.setItem('xmed_demo_users', JSON.stringify(users));
      localStorage.setItem('xmed_demo_session', JSON.stringify(newUser));
      
      return { data: { user: newUser }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      const usersRaw = localStorage.getItem('xmed_demo_users') || '[]';
      const users = JSON.parse(usersRaw);
      
      const matched = users.find((u: any) => u.email === email && u.password === password);
      if (matched) {
        const { password: _, ...user } = matched;
        localStorage.setItem('xmed_demo_session', JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: new Error('Invalid email or password') };
    },
    signOut: async () => {
      if (typeof window === 'undefined') return { error: null };
      localStorage.removeItem('xmed_demo_session');
      return { error: null };
    }
  },

  // Mock generic table operations
  from: (table: string) => {
    return {
      select: (query = '*') => {
        return {
          eq: (field: string, value: any) => {
            return {
              order: (orderField: string, { ascending = false } = {}) => {
                if (typeof window === 'undefined') return Promise.resolve({ data: [], error: null });
                const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
                let data = JSON.parse(raw);
                data = data.filter((row: any) => row[field] === value);
                
                data.sort((a: any, b: any) => {
                  const aVal = a[orderField];
                  const bVal = b[orderField];
                  if (aVal < bVal) return ascending ? -1 : 1;
                  if (aVal > bVal) return ascending ? 1 : -1;
                  return 0;
                });

                return Promise.resolve({ data, error: null });
              },
              then: (resolve: any) => {
                if (typeof window === 'undefined') return resolve({ data: [], error: null });
                const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
                const data = JSON.parse(raw).filter((row: any) => row[field] === value);
                return resolve({ data, error: null });
              }
            };
          },
          order: (orderField: string, { ascending = false } = {}) => {
            if (typeof window === 'undefined') return Promise.resolve({ data: [], error: null });
            const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
            const data = JSON.parse(raw);
            data.sort((a: any, b: any) => {
              const aVal = a[orderField];
              const bVal = b[orderField];
              if (aVal < bVal) return ascending ? -1 : 1;
              if (aVal > bVal) return ascending ? 1 : -1;
              return 0;
            });
            return Promise.resolve({ data, error: null });
          },
          then: (resolve: any) => {
            if (typeof window === 'undefined') return resolve({ data: [], error: null });
            const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
            const data = JSON.parse(raw);
            return resolve({ data, error: null });
          }
        };
      },
      insert: (values: any) => {
        return {
          select: () => {
            return {
              single: async () => {
                if (typeof window === 'undefined') return { data: null, error: null };
                const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
                const data = JSON.parse(raw);
                
                const newRow = Array.isArray(values)
                  ? values.map((v) => ({ ...v, id: `demo-id-${Math.random()}`, created_at: new Date().toISOString() }))
                  : { ...values, id: `demo-id-${Math.random()}`, created_at: new Date().toISOString() };

                if (Array.isArray(newRow)) {
                  data.push(...newRow);
                } else {
                  data.push(newRow);
                }

                localStorage.setItem(`xmed_demo_${table}`, JSON.stringify(data));
                return { data: Array.isArray(newRow) ? newRow[0] : newRow, error: null };
              }
            };
          },
          then: (resolve: any) => {
            if (typeof window === 'undefined') return resolve({ data: null, error: null });
            const raw = localStorage.getItem(`xmed_demo_${table}`) || '[]';
            const data = JSON.parse(raw);
            const items = Array.isArray(values) ? values : [values];
            const records = items.map(item => ({
              ...item,
              id: `demo-id-${Math.random()}`,
              created_at: new Date().toISOString()
            }));
            data.push(...records);
            localStorage.setItem(`xmed_demo_${table}`, JSON.stringify(data));
            return resolve({ data: records, error: null });
          }
        };
      }
    };
  }
};

// Client API wrapper that checks configuration and uses the appropriate database client
export const getSupabaseClient = () => {
  return isSupabaseConfigured ? supabase : mockDb;
};
