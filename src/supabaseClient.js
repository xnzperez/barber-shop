// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO EN SUPABASE
const supabaseUrl = 'https://ibcmjpvpqlmmhlzvgwum.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY21qcHZwcWxtbWhsenZnd3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NjI2NzIsImV4cCI6MjA3ODUzODY3Mn0.UdCV8T0IJ_8_BbVpVMKzm52zanbUSD9MqGvHkLuqDbs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)