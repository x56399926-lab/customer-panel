import heroFeast from "@/assets/hero-feast.jpg";
import catBiryani from "@/assets/cat-biryani.jpg";
import catStarters from "@/assets/cat-starters.jpg";
import catMain from "@/assets/cat-main.jpg";
import dishButterChicken from "@/assets/dish-butter-chicken.jpg";
import dishNoodles from "@/assets/dish-noodles.jpg";
import dishSamosa from "@/assets/dish-samosa.jpg";
import dishFriedRice from "@/assets/dish-fried-rice.jpg";
import dishChilliPaneer from "@/assets/dish-chilli-paneer.jpg";
import dishGulabJamun from "@/assets/dish-gulab-jamun.jpg";
import dishDalMakhani from "@/assets/dish-dal-makhani.jpg";
import dishJeeraRice from "@/assets/dish-jeera-rice.jpg";
import dishChai from "@/assets/dish-chai.jpg";
import dishLassi from "@/assets/dish-lassi.jpg";
import dishTandooriChicken from "@/assets/dish-tandoori-chicken.jpg";
import dishPavBhaji from "@/assets/dish-pav-bhaji.jpg";
import dishDosa from "@/assets/dish-dosa.jpg";
import dishBrownie from "@/assets/dish-brownie.jpg";

export const heroImage = heroFeast;

export const imageLibrary: Record<string, string> = {
  "hero-feast": heroFeast,
  "cat-biryani": catBiryani,
  "cat-starters": catStarters,
  "cat-main": catMain,
  "dish-butter-chicken": dishButterChicken,
  "dish-noodles": dishNoodles,
  "dish-samosa": dishSamosa,
  "dish-fried-rice": dishFriedRice,
  "dish-chilli-paneer": dishChilliPaneer,
  "dish-gulab-jamun": dishGulabJamun,
  "dish-dal-makhani": dishDalMakhani,
  "dish-jeera-rice": dishJeeraRice,
  "dish-chai": dishChai,
  "dish-lassi": dishLassi,
  "dish-tandoori-chicken": dishTandooriChicken,
  "dish-pav-bhaji": dishPavBhaji,
  "dish-dosa": dishDosa,
  "dish-brownie": dishBrownie,
};

export const imageKeys = Object.keys(imageLibrary);

export function resolveImage(imageKey?: string | null, imageUrl?: string | null): string {
  if (imageUrl && imageUrl.trim().length > 0) return imageUrl;
  if (imageKey && imageLibrary[imageKey]) return imageLibrary[imageKey]!;
  return heroFeast;
}
