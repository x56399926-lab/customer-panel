import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/demo-store";
import type { Tables } from "@/integrations/supabase/types";
export type Category = Tables<"menu_categories">;
export type MenuItem = Tables<"menu_items">;
export type Settings = Tables<"restaurant_settings">;
export type Addon = { name: string; price: number };
export function parseAddons(value: unknown): Addon[] { if (!Array.isArray(value)) return []; return value.filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null).map(v => ({name:String(v.name??""),price:Number(v.price??0)})).filter(a=>a.name.length>0); }
export function useCategories(){return useQuery({queryKey:["categories"],queryFn:async()=>{const {data}=await supabase.from("menu_categories").select("*").order("sort_order");return data as Category[];}})}
export function useMenuItems(){return useQuery({queryKey:["menu-items"],queryFn:async()=>{const {data}=await supabase.from("menu_items").select("*").order("sort_order");return data as MenuItem[];}})}
export function useSettings(){return useQuery({queryKey:["settings"],queryFn:async()=>{const {data}=await supabase.from("restaurant_settings").select("*").eq("id",1).maybeSingle();return data as Settings|null;}})}
