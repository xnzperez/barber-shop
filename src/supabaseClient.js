// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO EN SUPABASE
const supabaseUrl = ''
const supabaseAnonKey = ''
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
