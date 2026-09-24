// @ts-nocheck
/* Frontend-only demo store. No network/backend calls are made. */

const STORAGE_KEY = "rrc-demo-customer-v1";

const SEED = {
  "categories": [
    {
      "id": "cat-starters",
      "name": "Starters",
      "slug": "starters",
      "image_key": "cat-starters",
      "sort_order": 1,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-main-course",
      "name": "Main Course",
      "slug": "main-course",
      "image_key": "cat-main",
      "sort_order": 2,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-rice",
      "name": "Rice",
      "slug": "rice",
      "image_key": "dish-jeera-rice",
      "sort_order": 3,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-biryani",
      "name": "Biryani",
      "slug": "biryani",
      "image_key": "cat-biryani",
      "sort_order": 4,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-chinese",
      "name": "Chinese",
      "slug": "chinese",
      "image_key": "dish-noodles",
      "sort_order": 5,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-snacks",
      "name": "Snacks",
      "slug": "snacks",
      "image_key": "dish-samosa",
      "sort_order": 6,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-beverages",
      "name": "Beverages",
      "slug": "beverages",
      "image_key": "dish-chai",
      "sort_order": 7,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "cat-desserts",
      "name": "Desserts",
      "slug": "desserts",
      "image_key": "dish-gulab-jamun",
      "sort_order": 8,
      "created_at": "2026-01-01T00:00:00.000Z"
    }
  ],
  "items": [
    {
      "id": "item-001",
      "category_id": "cat-starters",
      "name": "Paneer Tikka",
      "description": "Chargrilled cottage cheese with peppers and onion",
      "price": 229,
      "is_veg": true,
      "image_key": "cat-starters",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra paneer",
          "price": 60
        }
      ],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-002",
      "category_id": "cat-starters",
      "name": "Hara Bhara Kabab",
      "description": "Spinach, peas and potato patties with mint chutney",
      "price": 189,
      "is_veg": true,
      "image_key": "cat-starters",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-003",
      "category_id": "cat-starters",
      "name": "Crispy Chilli Potato",
      "description": "Crunchy potato tossed in sweet chilli sauce",
      "price": 169,
      "is_veg": true,
      "image_key": "cat-starters",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-004",
      "category_id": "cat-starters",
      "name": "Crispy Corn",
      "description": " Golden fried corn kernels with pepper and herbs",
      "price": 179,
      "is_veg": true,
      "image_key": "cat-starters",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-005",
      "category_id": "cat-starters",
      "name": "Chicken Tikka",
      "description": "Yoghurt and spice marinated chicken from the tandoor",
      "price": 269,
      "is_veg": false,
      "image_key": "dish-tandoori-chicken",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra chutney",
          "price": 20
        }
      ],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-006",
      "category_id": "cat-starters",
      "name": "Tandoori Chicken (Half)",
      "description": "Classic half tandoori chicken with onion and lemon",
      "price": 299,
      "is_veg": false,
      "image_key": "dish-tandoori-chicken",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 6,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-007",
      "category_id": "cat-main-course",
      "name": "Butter Paneer Masala",
      "description": "Paneer simmered in silky tomato and butter gravy",
      "price": 259,
      "is_veg": true,
      "image_key": "cat-main",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra gravy",
          "price": 40
        }
      ],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-008",
      "category_id": "cat-main-course",
      "name": "Kadai Paneer",
      "description": "Paneer tossed with peppers in roasted kadai masala",
      "price": 249,
      "is_veg": true,
      "image_key": "cat-main",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-009",
      "category_id": "cat-main-course",
      "name": "Dal Makhani",
      "description": "Black lentils slow cooked overnight with cream",
      "price": 199,
      "is_veg": true,
      "image_key": "dish-dal-makhani",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-010",
      "category_id": "cat-main-course",
      "name": "Dal Tadka",
      "description": "Yellow lentils tempered with ghee, cumin and garlic",
      "price": 169,
      "is_veg": true,
      "image_key": "dish-dal-makhani",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-011",
      "category_id": "cat-main-course",
      "name": "Chole Masala",
      "description": "Punjabi style chickpea curry with warm spices",
      "price": 179,
      "is_veg": true,
      "image_key": "cat-main",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-012",
      "category_id": "cat-main-course",
      "name": "Mix Veg Curry",
      "description": "Seasonal vegetables in a homely onion tomato gravy",
      "price": 189,
      "is_veg": true,
      "image_key": "cat-main",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 6,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-013",
      "category_id": "cat-main-course",
      "name": "Butter Chicken",
      "description": "Tandoori chicken in rich makhani gravy",
      "price": 319,
      "is_veg": false,
      "image_key": "dish-butter-chicken",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra gravy",
          "price": 40
        }
      ],
      "sort_order": 7,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-014",
      "category_id": "cat-main-course",
      "name": "Egg Curry",
      "description": "Boiled eggs in a spiced onion tomato masala",
      "price": 199,
      "is_veg": false,
      "image_key": "dish-butter-chicken",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 8,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-015",
      "category_id": "cat-rice",
      "name": "Steamed Rice",
      "description": "Fluffy long grain basmati rice",
      "price": 99,
      "is_veg": true,
      "image_key": "dish-jeera-rice",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-016",
      "category_id": "cat-rice",
      "name": "Jeera Rice",
      "description": "Basmati rice tempered with cumin and ghee",
      "price": 129,
      "is_veg": true,
      "image_key": "dish-jeera-rice",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-017",
      "category_id": "cat-rice",
      "name": "Veg Pulao",
      "description": "Rice cooked with garden vegetables and whole spices",
      "price": 169,
      "is_veg": true,
      "image_key": "dish-jeera-rice",
      "image_url": null,
      "is_popular": false,
      "is_recommended": true,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-018",
      "category_id": "cat-rice",
      "name": "Kashmiri Pulao",
      "description": "Sweet and fragrant rice with dry fruit",
      "price": 199,
      "is_veg": true,
      "image_key": "dish-jeera-rice",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-019",
      "category_id": "cat-rice",
      "name": "Curd Rice",
      "description": "Cooling curd rice with curry leaf tempering",
      "price": 139,
      "is_veg": true,
      "image_key": "dish-jeera-rice",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-020",
      "category_id": "cat-biryani",
      "name": "Veg Dum Biryani",
      "description": "Dum cooked biryani with vegetables and saffron",
      "price": 229,
      "is_veg": true,
      "image_key": "cat-biryani",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [
        {
          "name": "Extra raita",
          "price": 30
        }
      ],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-021",
      "category_id": "cat-biryani",
      "name": "Paneer Biryani",
      "description": "Layered biryani with marinated paneer cubes",
      "price": 259,
      "is_veg": true,
      "image_key": "cat-biryani",
      "image_url": null,
      "is_popular": false,
      "is_recommended": true,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-022",
      "category_id": "cat-biryani",
      "name": "Chicken Dum Biryani",
      "description": "Signature Hyderabadi style chicken dum biryani",
      "price": 299,
      "is_veg": false,
      "image_key": "cat-biryani",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra raita",
          "price": 30
        },
        {
          "name": "Extra chicken",
          "price": 80
        }
      ],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-023",
      "category_id": "cat-biryani",
      "name": "Egg Biryani",
      "description": "Fragrant biryani topped with boiled eggs",
      "price": 239,
      "is_veg": false,
      "image_key": "cat-biryani",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-024",
      "category_id": "cat-biryani",
      "name": "Mutton Biryani",
      "description": "Slow cooked mutton biryani with birista",
      "price": 379,
      "is_veg": false,
      "image_key": "cat-biryani",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-025",
      "category_id": "cat-chinese",
      "name": "Veg Hakka Noodles",
      "description": "Wok tossed noodles with crunchy vegetables",
      "price": 179,
      "is_veg": true,
      "image_key": "dish-noodles",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-026",
      "category_id": "cat-chinese",
      "name": "Chicken Hakka Noodles",
      "description": "Hakka noodles tossed with shredded chicken",
      "price": 219,
      "is_veg": false,
      "image_key": "dish-noodles",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-027",
      "category_id": "cat-chinese",
      "name": "Veg Fried Rice",
      "description": "Classic fried rice with garden vegetables",
      "price": 169,
      "is_veg": true,
      "image_key": "dish-fried-rice",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-028",
      "category_id": "cat-chinese",
      "name": "Schezwan Fried Rice",
      "description": "Fiery schezwan fried rice with garlic",
      "price": 189,
      "is_veg": true,
      "image_key": "dish-fried-rice",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-029",
      "category_id": "cat-chinese",
      "name": "Chilli Paneer",
      "description": "Crispy paneer in spicy chilli garlic sauce",
      "price": 239,
      "is_veg": true,
      "image_key": "dish-chilli-paneer",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-030",
      "category_id": "cat-chinese",
      "name": "Chilli Chicken",
      "description": "Boneless chicken tossed in chilli soya glaze",
      "price": 269,
      "is_veg": false,
      "image_key": "dish-chilli-paneer",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 6,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-031",
      "category_id": "cat-chinese",
      "name": "Veg Manchurian",
      "description": "Vegetable dumplings in tangy manchurian gravy",
      "price": 199,
      "is_veg": true,
      "image_key": "dish-chilli-paneer",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 7,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-032",
      "category_id": "cat-snacks",
      "name": "Samosa (2 pcs)",
      "description": "Crisp samosas with mint and tamarind chutney",
      "price": 60,
      "is_veg": true,
      "image_key": "dish-samosa",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-033",
      "category_id": "cat-snacks",
      "name": "Pav Bhaji",
      "description": "Buttery mashed vegetable bhaji with soft pav",
      "price": 149,
      "is_veg": true,
      "image_key": "dish-pav-bhaji",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [
        {
          "name": "Extra pav",
          "price": 25
        }
      ],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-034",
      "category_id": "cat-snacks",
      "name": "Vada Pav",
      "description": "Mumbai classic with spicy garlic chutney",
      "price": 50,
      "is_veg": true,
      "image_key": "dish-pav-bhaji",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-035",
      "category_id": "cat-snacks",
      "name": "Masala Dosa",
      "description": "Crisp dosa with potato masala, sambar and chutney",
      "price": 159,
      "is_veg": true,
      "image_key": "dish-dosa",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-036",
      "category_id": "cat-snacks",
      "name": "Grilled Veg Sandwich",
      "description": "Grilled sandwich with veggies and cheese",
      "price": 139,
      "is_veg": true,
      "image_key": "dish-dosa",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [
        {
          "name": "Extra cheese",
          "price": 30
        }
      ],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-037",
      "category_id": "cat-snacks",
      "name": "French Fries",
      "description": "Golden salted fries with peri peri sprinkle",
      "price": 119,
      "is_veg": true,
      "image_key": "dish-samosa",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 6,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-038",
      "category_id": "cat-beverages",
      "name": "Masala Chai",
      "description": "Freshly brewed chai with ginger and cardamom",
      "price": 40,
      "is_veg": true,
      "image_key": "dish-chai",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-039",
      "category_id": "cat-beverages",
      "name": "Filter Coffee",
      "description": "South Indian style strong filter coffee",
      "price": 60,
      "is_veg": true,
      "image_key": "dish-chai",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-040",
      "category_id": "cat-beverages",
      "name": "Sweet Lassi",
      "description": "Thick chilled yoghurt lassi",
      "price": 79,
      "is_veg": true,
      "image_key": "dish-lassi",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-041",
      "category_id": "cat-beverages",
      "name": "Fresh Lime Soda",
      "description": "Sparkling lime soda, sweet or salted",
      "price": 69,
      "is_veg": true,
      "image_key": "dish-lassi",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-042",
      "category_id": "cat-beverages",
      "name": "Cold Coffee",
      "description": "Creamy blended cold coffee",
      "price": 119,
      "is_veg": true,
      "image_key": "dish-lassi",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [
        {
          "name": "Ice cream scoop",
          "price": 40
        }
      ],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-043",
      "category_id": "cat-desserts",
      "name": "Gulab Jamun (2 pcs)",
      "description": "Warm gulab jamun soaked in rose syrup",
      "price": 79,
      "is_veg": true,
      "image_key": "dish-gulab-jamun",
      "image_url": null,
      "is_popular": true,
      "is_recommended": true,
      "addons": [],
      "sort_order": 1,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-044",
      "category_id": "cat-desserts",
      "name": "Rasmalai (2 pcs)",
      "description": "Soft rasmalai in saffron milk",
      "price": 99,
      "is_veg": true,
      "image_key": "dish-gulab-jamun",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 2,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-045",
      "category_id": "cat-desserts",
      "name": "Gajar Halwa",
      "description": "Slow cooked carrot halwa with nuts",
      "price": 119,
      "is_veg": true,
      "image_key": "dish-gulab-jamun",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 3,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-046",
      "category_id": "cat-desserts",
      "name": "Choco Lava Brownie",
      "description": "Warm brownie with molten chocolate centre",
      "price": 139,
      "is_veg": true,
      "image_key": "dish-brownie",
      "image_url": null,
      "is_popular": true,
      "is_recommended": false,
      "addons": [
        {
          "name": "Ice cream scoop",
          "price": 40
        }
      ],
      "sort_order": 4,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "item-047",
      "category_id": "cat-desserts",
      "name": "Vanilla Ice Cream",
      "description": "Two scoops of creamy vanilla",
      "price": 89,
      "is_veg": true,
      "image_key": "dish-brownie",
      "image_url": null,
      "is_popular": false,
      "is_recommended": false,
      "addons": [],
      "sort_order": 5,
      "is_available": true,
      "created_at": "2026-01-01T00:00:00.000Z"
    }
  ]
};

const DEFAULT_SETTINGS = {
  id: 1, name: "Radhe Radhe Cafe", description: "Fresh, comforting Indian food made to order.",
  phone: "+91 98765 43210", whatsapp: "+91 98765 43210", email: "hello@radheradhe.demo",
  address: "Main Market, Kanpur", opening_time: "10:00", closing_time: "22:30",
  delivery_charge: 40, min_order_amount: 199, estimated_delivery_minutes: 45, is_open: true,
  logo_url: null, updated_at: "2026-01-01T00:00:00.000Z"
};

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2,10)}-${Date.now()}`;

function makeSeedOrders() {
  const now = Date.now();
  const names = ["Aarav Sharma", "Priya Singh", "Rohan Verma"];
  const statuses = ["received", "preparing", "ready"];
  return names.map((name, i) => {
    const item = SEED.items[i * 3];
    const created = new Date(now - i * 35 * 60 * 1000).toISOString();
    const subtotal = item.price * (i + 1);
    const orderId = uid("order");
    return {
      id: orderId, order_code: `ORD${1024 + i}`, user_id: null, customer_name: name, phone: `98765000${10+i}`,
      address: `${12+i} Civil Lines, Kanpur`, landmark: "Near market", instructions: "Please call on arrival",
      payment_method: i === 1 ? "upi" : "cod", status: statuses[i], subtotal, delivery_charge: 40, total: subtotal + 40,
      estimated_delivery_minutes: 45, created_at: created, updated_at: created,
      order_items: [{id: uid("item"), order_id: orderId, menu_item_id: item.id, name: item.name, quantity: i+1, unit_price: item.price, line_total: subtotal, addons: item.addons, notes: null}]
    };
  });
}

function freshState() {
  const orders = makeSeedOrders();
  return { categories: SEED.categories, menu_items: SEED.items, restaurant_settings: DEFAULT_SETTINGS, orders: orders.map(o => { const {order_items, ...order} = o; return order; }), order_items: orders.flatMap(o => o.order_items), notifications: orders.map(o => ({id: uid("note"), order_id:o.id, title:`Order ${o.order_code}`, body:`${o.customer_name} placed an order`, is_read:false, created_at:o.created_at})) };
}

function getState() {
  if (typeof window === "undefined") return freshState();
  try { const raw = window.localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch {}
  const state = freshState();
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  return state;
}

function saveState(state) {
  if (typeof window !== "undefined") { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }
  return state;
}

function clone(v) { return JSON.parse(JSON.stringify(v)); }

class QueryBuilder {
  constructor(table) { this.table=table; this.filters=[]; this.sort=null; this.max=null; this.single=false; this.selection="*"; this.operation="select"; this.payload=null; }
  select(selection="*") { this.selection=selection; return this; }
  eq(column,value) { this.filters.push([column,value]); return this; }
  order(column, opts={}) { this.sort=[column, !!opts.ascending]; return this; }
  limit(n) { this.max=n; return this; }
  maybeSingle() { this.single=true; return this; }
  single() { this.single=true; return this; }
  insert(payload) { this.operation="insert"; this.payload=payload; return this; }
  update(payload) { this.operation="update"; this.payload=payload; return this; }
  delete() { this.operation="delete"; return this; }
  then(resolve,reject) { return this.execute().then(resolve,reject); }
  async execute() {
    const state=getState();
    let rows=state[this.table] || [];
    if(this.operation==="select") {
      rows=rows.filter(row=>this.filters.every(([k,v])=>row[k]===v));
      if(this.sort) { const [k,asc]=this.sort; rows=[...rows].sort((a,b)=>String(a[k]).localeCompare(String(b[k])) * (asc?1:-1)); }
      if(this.max!=null) rows=rows.slice(0,this.max);
      rows=rows.map(row=>this.expand(row,state));
      const data=this.single ? (rows[0] ?? null) : rows;
      return {data:clone(data),error:null};
    }
    if(this.operation==="insert") {
      const values=Array.isArray(this.payload)?this.payload:[this.payload];
      const added=values.map(v=>({...v,id:v.id||uid(this.table.slice(0,-1)),created_at:v.created_at||new Date().toISOString(),updated_at:v.updated_at||new Date().toISOString()}));
      state[this.table]=[...rows,...added]; saveState(state); return {data:clone(added),error:null};
    }
    if(this.operation==="update") {
      let count=0; state[this.table]=rows.map(row=>{ if(this.filters.every(([k,v])=>row[k]===v)){count++; return {...row,...this.payload,updated_at:new Date().toISOString()}} return row; }); saveState(state); return {data:null,error:null};
    }
    if(this.operation==="delete") { state[this.table]=rows.filter(row=>!this.filters.every(([k,v])=>row[k]===v)); saveState(state); return {data:null,error:null}; }
  }
  expand(row,state) {
    const out={...row};
    if(this.selection.includes("order_items")) out.order_items=state.order_items.filter(x=>x.order_id===row.id);
    if(this.selection.includes("menu_categories")) out.menu_categories=state.categories.find(x=>x.id===row.category_id)||null;
    return out;
  }
}

let listeners=[];
let currentUser=null;
function readUser() { if(currentUser) return currentUser; if(typeof window!=="undefined"){ try{ const r=window.localStorage.getItem(STORAGE_KEY+":user"); if(r) currentUser=JSON.parse(r); }catch{} } return currentUser; }
function setUser(user,event) { currentUser=user; if(typeof window!=="undefined"){ try{ if(user) window.localStorage.setItem(STORAGE_KEY+":user",JSON.stringify(user)); else window.localStorage.removeItem(STORAGE_KEY+":user"); }catch{} } listeners.forEach(fn=>fn(event, user ? {user} : null)); }

export const supabase = {
  from(table) { return new QueryBuilder(table); },
  auth: {
    async getSession() { const user=readUser(); return {data:{session:user?{user}:null},error:null}; },
    async getUser() { const user=readUser(); return {data:{user},error:null}; },
    onAuthStateChange(fn) { listeners.push(fn); return {data:{subscription:{unsubscribe:()=>{listeners=listeners.filter(x=>x!==fn)}}}}; },
    async signInWithPassword({email,password}) { if(!email||!password) return {data:null,error:new Error("Enter email and password")}; const user={id:uid("user"),email}; setUser(user,"SIGNED_IN"); return {data:{user,session:{user}},error:null}; },
    async signUp({email,password,options}) { if(!email||!password) return {data:null,error:new Error("Enter email and password")}; const user={id:uid("user"),email,user_metadata:options?.data||{}}; setUser(user,"SIGNED_IN"); return {data:{user,session:{user}},error:null}; },
    async signOut() { setUser(null,"SIGNED_OUT"); return {error:null}; }
  },
  async rpc(name,args) { if(name==="has_role") return {data:!!readUser() && args?._role==="admin" && String(readUser()?.email||"").toLowerCase().includes("admin"),error:null}; return {data:null,error:null}; },
  channel() { return {on(){return this},subscribe(){return this}}; },
  async removeChannel() { return "ok"; }
};

export function getDemoState() { return getState(); }
export function saveDemoState(state) { return saveState(state); }
export function createDemoOrder(input) {
  const state=getState(); const now=new Date().toISOString(); const code=`ORD${Math.max(1023,...state.orders.map(o=>Number(String(o.order_code).replace(/\D/g,""))||1023))+1}`;
  const id=uid("order"); const delivery=Number(state.restaurant_settings.delivery_charge||0); const subtotal=input.subtotal;
  const order={id,order_code:code,user_id:readUser()?.id||null,customer_name:input.customer_name,phone:input.phone,address:input.address,landmark:input.landmark||null,instructions:input.instructions||null,payment_method:input.payment_method,status:"received",subtotal,delivery_charge:delivery,total:subtotal+delivery,estimated_delivery_minutes:Number(state.restaurant_settings.estimated_delivery_minutes||45),created_at:now,updated_at:now};
  const items=input.items.map(x=>{const m=state.menu_items.find(m=>m.id===x.menu_item_id); const addons=x.addons||[]; const unit=Number(m?.price||0)+addons.reduce((s,a)=>s+Number(a.price||0),0); return {id:uid("item"),order_id:id,menu_item_id:x.menu_item_id,name:m?.name||"Demo item",quantity:x.quantity,unit_price:unit,line_total:unit*x.quantity,addons,notes:x.notes||null};});
  state.orders.unshift(order); state.order_items.push(...items); state.notifications.unshift({id:uid("note"),order_id:id,title:`New order ${code}`,body:`${order.customer_name} placed an order`,is_read:false,created_at:now}); saveState(state); return {orderCode:code,order,items};
}

export function getDemoOrder(code) { const state=getState(); const order=state.orders.find(o=>o.order_code===code); return order?{order,items:state.order_items.filter(i=>i.order_id===order.id),history:[]}:null; }
