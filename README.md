## Weather Up

Weather Up is a small weather dashboard for parents and caregivers who need to quickly decide how to dress their kid for the day. It combines forecast data with an AI-powered clothing recommendation so they can go from “What should they wear?” to “We’re out the door” in a few taps.

---

## 1. User Persona

**Who they are, what they do, and why weather data matters**

- **Primary user**: A busy parent or caregiver of a school‑age child.
- **Context**: Mornings are chaotic — they are juggling breakfast, backpacks, and school drop‑off, often on a phone with one hand while wrangling a kid with the other.
- **Why weather matters**:
  - Keeping their kid comfortable and safe (avoiding being soaked, freezing, or overheated).
  - Avoiding calls from school about inappropriate clothing for recess or outdoor activities.
  - Reducing last‑minute outfit changes that derail the morning routine.

**What they need at a glance vs. what they can dig for**

- **At a glance**
  - Today’s location, temperature, and chance of precipitation.
  - A clear, opinionated answer to “How should I dress my kid?”.
  - Simple language that maps directly to items they can pull from a drawer (e.g., “light rain jacket” vs. “0.1 in precipitation”).
- **If they want to dig deeper**
  - More detailed forecast information coming from the weather API (e.g., highs/lows, precipitation probabilities, wind).
  - The ability to tweak the recommendation by changing location or re‑running the clothing suggestion.

**What feels delightful vs. what gets in their way**

- **Delightful**
  - A clean, card‑based interface that surfaces only the essentials.
  - A single, prominent **“Dress my kid with AI”** button that turns the forecast into specific clothing advice.
  - A focused modal that summarizes four concrete items: headwear, torso, lower body, and footwear.
  - Dark/light theme support so the UI feels comfortable in early‑morning or late‑night use.
- **Gets in their way**
  - Dense tables of raw numbers or jargon (e.g., “dew point” and “wind gust” front and center).
  - Having to read long paragraphs to find one actionable sentence.
  - Too many knobs or configuration steps before they see a recommendation.

---

## 2. User‑Specific Feature

**What it does and why it exists for this user**

Weather Up includes an AI‑powered feature that converts the current forecast into a tiny, opinionated packing list for this parent:

- When the parent taps **“Dress my kid with AI”**, the app:
  - Uses the forecast data (via the weather API) for the selected city and state.
  - Calls a large language model (Gemini) with a structured prompt tailored to kids’ clothing.
  - Returns **exactly four recommendations**:
    - **One headwear option**
    - **One torso option**
    - **One lower body option**
    - **One footwear option**
- The result is shown in a modal that keeps all four items visible at once, alongside a short summary in plain language.

This feature exists specifically for our parent persona because it removes decision fatigue:

- They do not have to translate temperature, wind, and precipitation into outfits.
- They get a small, trustworthy list that maps 1:1 to what they can grab from a closet or shoe rack.
- They can re‑run the recommendation with a single tap if the forecast or location changes.

**What I would have done differently with more time**

With more time, this feature could be extended to better reflect real‑world parenting constraints:

- Support **multiple kids** with different sensitivity to cold/heat and different sizes.
- Allow **basic preferences** like “school requires closed‑toe shoes,” “no hats allowed,” or “kid runs hot/cold.”
- Save **favorite configurations or presets** (e.g., “school day,” “soccer practice”) and reuse them quickly.

---

## 3. Why This Visualization

- I wanted to leveragea an area chart of rain probability so you can plan accordingly with pretty low cognitive overhead
- The forecast is presented as a simple card with high/low temps and little else to keep the information clear and legible. We don't need to overload the user with too many details as the assumption is that this is a parent on the go

---

## 4. What I'd Change and Why
- I find that the requirement to allow users to search for a city or location is fine but to streamline the experience for users I would probably opt for leveraging the browsers native Geolocation API to grab users location automatically. 
- This would reduce an API call and give number of views required for users to get their recommendation for what to wear.

## 4. Setup and Running Instructions

**Prerequisites**

- **Node.js** (LTS recommended, e.g., 20.x).
- A package manager such as **pnpm** (used in development), **npm**, or **yarn**.
- API keys:

  - A Google Generative AI API key, exposed to the frontend as `VITE_GOOGLE_GENERATIVE_AI_API_KEY` for the recommendation feature will be made available via a secure link in an attached message.

**Environment configuration**

Create a `.env.local` file in the project root and set:

```bash
VITE_GOOGLE_GENERATIVE_AI_API_KEY=attached_google_generative_ai_key_here
```

**Install dependencies**

Using `pnpm` (recommended):

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

**Run the development server**

```bash
pnpm dev
```

Then open the printed local URL in your browser (typically `http://localhost:5173` for Vite).

**Run tests**

This project uses Vitest for unit and component tests as well as a playwright extension to enable `browser mode`. To ensure tests run properly, first run:

```bash
pnpm exec playwright install
```

and then you may run 

```bash
pnpm test
```

**Build for production**

```bash
pnpm build
```

You can then preview the production build locally:

```bash
pnpm preview
```

---

## 6. Tradeoffs and What’s Next

**Assumptions and corners cut**

- **Persona focus**: The experience is optimized for a single, US‑based parent persona; internationalization, multiple languages, and different school norms are not yet addressed.
- **Single child model**: The UI assumes dressing one kid at a time; families with multiple children would have to re‑run the flow.
- **Limited error handling**: Error messages are simple and primarily focused on invalid search input or failed API calls.
- **Mobile First**: I approached this with mobile first in mind as the user is probably checking this on their phone before starting their day so the desktop view could be enhanced to leverage available space for more details.
- **AI opacity**: The clothing recommendation is treated as a black box; the user does not see detailed reasoning or confidence.
- **Accessibility and performance**: The UI uses shadcn/ui and Tailwind primitives. shadcn/ui leverages BaseUI which has extensive considerations for accessibility outlined [here](https://base-ui.com/react/overview/accessibility)

**What I’d prioritize next**

- **Richer forecast views**: Allow parents to quickly glance at the rest of the day or tomorrow without overwhelming them.
- **More flexible recommendations**: Support multiple kids, basic preference settings, and the ability to toggle “extra layers” for extreme weather.
- **Better transparency and trust**: Offer simple explanations like “We chose a waterproof boot because there is an 80% chance of rain during school hours.”
- **Accessibility improvements**: Audit color contrast, focus states, and screen‑reader text, and add more robust keyboard navigation.
- **Resilience and offline behavior**: Handle flaky connections more gracefully, cache recent results, and let parents see the last successful forecast when offline.

Together, these next steps would move Weather Up from a focused prototype into a more production‑ready tool for real families. 
