# Fix images, move hotels to Stay page, shrink category cards

## 1. Category cards ki height fix (sabse chhota, sabse pehle)
Homepage ke "Everything Dehradun, in one place" wale 8 cards (jinme image nahi hai) par galti se `min-h-screen` laga hua hai — isi wajah se har card poori screen jitna lamba ho raha hai. Ye hata kar cards ko normal compact height di jayegi, saath hi har card ko sahi page se link kiya jayega (Hotels & Stay → /stay, Explore → /explore, Food → /food, etc.) — abhi sab `#` par jaate hain.

## 2. Hotels ko homepage se hata kar Stay page par le jana
- Homepage se poora "50+ hotels to stay in Dehradun" section hata diya jayega.
- `/stay` page (jo abhi 9 hardcoded hotels dikhata hai) ko naye 50-hotel data se chalaya jayega: image + naam + star rating + price range + area, aur slim "View Details" button jo `/hotels/<slug>` detail page kholega.
- Stay page ka current heading, colors aur layout style waisa hi rahega — sirf cards ka data source aur card design places wale compact card jaisa hoga.
- Homepage par "Hotels & Stay" card se `/stay` par jaana.

## 3. Images theek karna
Abhi 26 places sirf 7 images share kar rahe hain aur 50 hotels sirf 4 images — isliye galat photo dikh rahi hai.

- **Places:** baaki ~19 jagahon ke liye alag-alag images banayi jayengi (Clock Tower, Lachhiwala, Rajaji National Park, Guru Ram Rai Darbar, Paltan Bazaar, George Everest, Asan Barrage, Buddha Temple, etc.) taaki har jagah ki apni sahi image ho.
- **Hotels:** asli branded hotel photos (Hyatt, JW Marriott etc.) copyright ki wajah se use nahi ki ja sakti. Iske badle 12–14 alag-alag hotel images banayi jayengi — luxury resort, hill-view resort, business hotel, mid-range hotel, budget lodge — aur har hotel ko uske star-rating/area ke hisaab se matching image di jayegi. Isse ab lobby/pool ki galat mismatch nahi lagegi, images realistic aur category-appropriate hongi.

## Technical notes
- `src/routes/index.tsx`: `min-h-screen` remove from categories card, category `href` → real routes, hotels section delete, `hotels` import hata dena.
- `src/routes/stay.tsx`: hardcoded array hata kar `@/data/hotels` se render.
- `src/data/places.ts` aur `src/data/hotels.ts`: naye image imports aur per-item mapping.
- Baaki koi page, color, font ya layout nahi chhua jayega.

## Credits
Exact credit number pehle se batana possible nahi hai — build mode ki cost usage-based hoti hai (kitni files, kitne images generate hue, kitne iterations). Sabse bada hissa image generation ka hoga (~30+ images). Isliye plan is order me hai: point 1 aur 2 (layout + stay page) pehle, images (point 3) uske baad — agar credits kam pade to zaroori fixes to already ho chuke honge. Chaho to bolo "sirf 1 aur 2 karo" — to images wala step skip kar dunga.
