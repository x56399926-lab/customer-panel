insert into public.menu_categories (name, slug, image_key, sort_order) values
('Starters','starters','cat-starters',1),
('Main Course','main-course','cat-main',2),
('Rice','rice','dish-jeera-rice',3),
('Biryani','biryani','cat-biryani',4),
('Chinese','chinese','dish-noodles',5),
('Snacks','snacks','dish-samosa',6),
('Beverages','beverages','dish-chai',7),
('Desserts','desserts','dish-gulab-jamun',8);

insert into public.menu_items (category_id, name, description, price, is_veg, image_key, is_popular, is_recommended, addons, sort_order)
select c.id, v.name, v.description, v.price, v.is_veg, v.image_key, v.is_popular, v.is_recommended, v.addons::jsonb, v.sort_order
from (values
-- Starters
('starters','Paneer Tikka','Chargrilled cottage cheese with peppers and onion',229,true,'cat-starters',true,true,'[{"name":"Extra paneer","price":60}]',1),
('starters','Hara Bhara Kabab','Spinach, peas and potato patties with mint chutney',189,true,'cat-starters',false,false,'[]',2),
('starters','Crispy Chilli Potato','Crunchy potato tossed in sweet chilli sauce',169,true,'cat-starters',true,false,'[]',3),
('starters','Crispy Corn',' Golden fried corn kernels with pepper and herbs',179,true,'cat-starters',false,false,'[]',4),
('starters','Chicken Tikka','Yoghurt and spice marinated chicken from the tandoor',269,false,'dish-tandoori-chicken',true,true,'[{"name":"Extra chutney","price":20}]',5),
('starters','Tandoori Chicken (Half)','Classic half tandoori chicken with onion and lemon',299,false,'dish-tandoori-chicken',true,false,'[]',6),
-- Main Course
('main-course','Butter Paneer Masala','Paneer simmered in silky tomato and butter gravy',259,true,'cat-main',true,true,'[{"name":"Extra gravy","price":40}]',1),
('main-course','Kadai Paneer','Paneer tossed with peppers in roasted kadai masala',249,true,'cat-main',false,false,'[]',2),
('main-course','Dal Makhani','Black lentils slow cooked overnight with cream',199,true,'dish-dal-makhani',true,true,'[]',3),
('main-course','Dal Tadka','Yellow lentils tempered with ghee, cumin and garlic',169,true,'dish-dal-makhani',false,false,'[]',4),
('main-course','Chole Masala','Punjabi style chickpea curry with warm spices',179,true,'cat-main',false,false,'[]',5),
('main-course','Mix Veg Curry','Seasonal vegetables in a homely onion tomato gravy',189,true,'cat-main',false,false,'[]',6),
('main-course','Butter Chicken','Tandoori chicken in rich makhani gravy',319,false,'dish-butter-chicken',true,true,'[{"name":"Extra gravy","price":40}]',7),
('main-course','Egg Curry','Boiled eggs in a spiced onion tomato masala',199,false,'dish-butter-chicken',false,false,'[]',8),
-- Rice
('rice','Steamed Rice','Fluffy long grain basmati rice',99,true,'dish-jeera-rice',false,false,'[]',1),
('rice','Jeera Rice','Basmati rice tempered with cumin and ghee',129,true,'dish-jeera-rice',true,false,'[]',2),
('rice','Veg Pulao','Rice cooked with garden vegetables and whole spices',169,true,'dish-jeera-rice',false,true,'[]',3),
('rice','Kashmiri Pulao','Sweet and fragrant rice with dry fruit',199,true,'dish-jeera-rice',false,false,'[]',4),
('rice','Curd Rice','Cooling curd rice with curry leaf tempering',139,true,'dish-jeera-rice',false,false,'[]',5),
-- Biryani
('biryani','Veg Dum Biryani','Dum cooked biryani with vegetables and saffron',229,true,'cat-biryani',true,false,'[{"name":"Extra raita","price":30}]',1),
('biryani','Paneer Biryani','Layered biryani with marinated paneer cubes',259,true,'cat-biryani',false,true,'[]',2),
('biryani','Chicken Dum Biryani','Signature Hyderabadi style chicken dum biryani',299,false,'cat-biryani',true,true,'[{"name":"Extra raita","price":30},{"name":"Extra chicken","price":80}]',3),
('biryani','Egg Biryani','Fragrant biryani topped with boiled eggs',239,false,'cat-biryani',false,false,'[]',4),
('biryani','Mutton Biryani','Slow cooked mutton biryani with birista',379,false,'cat-biryani',true,false,'[]',5),
-- Chinese
('chinese','Veg Hakka Noodles','Wok tossed noodles with crunchy vegetables',179,true,'dish-noodles',true,false,'[]',1),
('chinese','Chicken Hakka Noodles','Hakka noodles tossed with shredded chicken',219,false,'dish-noodles',false,false,'[]',2),
('chinese','Veg Fried Rice','Classic fried rice with garden vegetables',169,true,'dish-fried-rice',false,false,'[]',3),
('chinese','Schezwan Fried Rice','Fiery schezwan fried rice with garlic',189,true,'dish-fried-rice',true,false,'[]',4),
('chinese','Chilli Paneer','Crispy paneer in spicy chilli garlic sauce',239,true,'dish-chilli-paneer',true,true,'[]',5),
('chinese','Chilli Chicken','Boneless chicken tossed in chilli soya glaze',269,false,'dish-chilli-paneer',false,false,'[]',6),
('chinese','Veg Manchurian','Vegetable dumplings in tangy manchurian gravy',199,true,'dish-chilli-paneer',false,false,'[]',7),
-- Snacks
('snacks','Samosa (2 pcs)','Crisp samosas with mint and tamarind chutney',60,true,'dish-samosa',true,false,'[]',1),
('snacks','Pav Bhaji','Buttery mashed vegetable bhaji with soft pav',149,true,'dish-pav-bhaji',true,true,'[{"name":"Extra pav","price":25}]',2),
('snacks','Vada Pav','Mumbai classic with spicy garlic chutney',50,true,'dish-pav-bhaji',false,false,'[]',3),
('snacks','Masala Dosa','Crisp dosa with potato masala, sambar and chutney',159,true,'dish-dosa',true,false,'[]',4),
('snacks','Grilled Veg Sandwich','Grilled sandwich with veggies and cheese',139,true,'dish-dosa',false,false,'[{"name":"Extra cheese","price":30}]',5),
('snacks','French Fries','Golden salted fries with peri peri sprinkle',119,true,'dish-samosa',false,false,'[]',6),
-- Beverages
('beverages','Masala Chai','Freshly brewed chai with ginger and cardamom',40,true,'dish-chai',true,false,'[]',1),
('beverages','Filter Coffee','South Indian style strong filter coffee',60,true,'dish-chai',false,false,'[]',2),
('beverages','Sweet Lassi','Thick chilled yoghurt lassi',79,true,'dish-lassi',true,true,'[]',3),
('beverages','Fresh Lime Soda','Sparkling lime soda, sweet or salted',69,true,'dish-lassi',false,false,'[]',4),
('beverages','Cold Coffee','Creamy blended cold coffee',119,true,'dish-lassi',false,false,'[{"name":"Ice cream scoop","price":40}]',5),
-- Desserts
('desserts','Gulab Jamun (2 pcs)','Warm gulab jamun soaked in rose syrup',79,true,'dish-gulab-jamun',true,true,'[]',1),
('desserts','Rasmalai (2 pcs)','Soft rasmalai in saffron milk',99,true,'dish-gulab-jamun',false,false,'[]',2),
('desserts','Gajar Halwa','Slow cooked carrot halwa with nuts',119,true,'dish-gulab-jamun',false,false,'[]',3),
('desserts','Choco Lava Brownie','Warm brownie with molten chocolate centre',139,true,'dish-brownie',true,false,'[{"name":"Ice cream scoop","price":40}]',4),
('desserts','Vanilla Ice Cream','Two scoops of creamy vanilla',89,true,'dish-brownie',false,false,'[]',5)
) as v(cat, name, description, price, is_veg, image_key, is_popular, is_recommended, addons, sort_order)
join public.menu_categories c on c.slug = v.cat;
