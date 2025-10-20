# **TaalAI – AI-Powered Financial Coach for Indians**

![TaalAI Banner](https://via.placeholder.com/1200x300/f97316/ffffff?text=TaalAI+-+Your+Financial+Coach)

**TaalAI** is an agentic AI-powered financial coach designed specifically for Indians with irregular incomes — freelancers, gig workers, and digital creators.  
It helps users understand their income rhythm, receive personalized financial insights, and make data-driven financial decisions.

---

## **Table of Contents**
- [Features](#features)
- [System Architecture](#system-architecture)
- [Quick Start](#quick-start)
- [Database Setup (Supabase)](#database-setup-supabase)
- [AI Agents Overview](#ai-agents-overview)
- [Technology Stack](#technology-stack)
- [Environment Variables](#environment-variables)
- [WhatsApp Bot Setup](#whatsapp-bot-setup)
- [User Flow](#user-flow)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Support](#support)

---

## **Features**

<details>
<summary><b>Core Features (MVP)</b></summary>

### 1. Income Rhythm Engine (TaalSense)
- Tracks and learns income volatility trends.  
- Builds a dynamic *Financial Pulse Score* (0–100).  
- Suggests adaptive saving goals using AI reasoning.

### 2. “What If I Buy This?” Simulator
- Evaluates the impact of purchases on long-term savings.  
- Provides visual comparisons of financial trajectories.  
- Offers AI-backed purchase insights.

### 3. VoiceMint – Conversational Coach
- Interactive AI chat in Hinglish or regional languages.  
- Supports voice input/output.  
- Provides 30-second advice clips and daily nudges.

### 4. WhatsApp Micro Coach
- Personalized savings nudges and spending insights.  
- Tax reminders and prompts via WhatsApp.

### 5. TaxMate
- Auto-classifies income and expenses.  
- Generates quarterly tax insights.  
- Provides TDS, GST, and advance tax guidance.
</details>

---

## **System Architecture**

```

fintech/
├── frontend/           # Next.js 14 + TailwindCSS
│   ├── app/            # App Router pages
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utilities and helpers
│   ├── store/          # Zustand state management
│   └── types/          # TypeScript type definitions
├── backend/            # FastAPI (Python)
│   ├── app/
│   │   ├── agents/     # AI agents (TaalCore, Coach, Predictor, Tax)
│   │   ├── routes/     # API endpoints
│   │   ├── models/     # Data schemas
│   │   └── services/   # Business logic
│   └── requirements.txt
├── shared/             # Shared resources
│   └── supabase-schema.sql
└── docker-compose.yml

````

---

## **Quick Start**

<details>
<summary><b>Prerequisites</b></summary>

- **Node.js** v18+ ([Download](https://nodejs.org/))  
- **Python** 3.11 or 3.12 ([Download](https://www.python.org/))  
  *Note: Python 3.14 may cause compatibility issues.*
- **Docker** (optional, for containerized setup)  
- **Supabase** account ([Sign up](https://supabase.com/))  
- **Google AI Studio** API key for Gemini ([Get key](https://makersuite.google.com/app/apikey))

> Windows users should refer to [WINDOWS_SETUP.md](WINDOWS_SETUP.md) for OS-specific setup steps.
</details>

---

<details>
<summary><b>Option 1: Docker Setup (Recommended)</b></summary>

```bash
cd fintech
cp .env.example .env
````

Edit `.env` with your credentials:

```bash
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Start all services:

```bash
docker-compose up -d
```

Access:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:8000](http://localhost:8000)
* API Docs → [http://localhost:8000/docs](http://localhost:8000/docs)

</details>

---

<details>
<summary><b>Option 2: Local Development Setup</b></summary>

### Backend Setup

```bash
cd fintech/backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd fintech/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Access:

* Frontend → [http://localhost:3000](http://localhost:3000)
* API Docs → [http://localhost:8000/docs](http://localhost:8000/docs)

</details>

---

## **Database Setup (Supabase)**

<details>
<summary><b>Click to view Supabase configuration</b></summary>

1. Create a new project on [Supabase](https://supabase.com/).
2. In the SQL Editor, run the contents of `shared/supabase-schema.sql`.
3. Retrieve project credentials (URL and anon key) from **Settings → API**.
4. Add them to your `.env` file.

</details>

---

## **AI Agents Overview**

| Agent         | Description                                                                                                       | Key Technologies        |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **TaalCore**  | Central orchestrator for financial intelligence, handles income rhythm analysis and adaptive savings suggestions. | NumPy, scikit-learn     |
| **Coach**     | Conversational financial advisor providing personalized guidance in Hinglish and other languages.                 | Google Gemini 1.5 Flash |
| **Predictor** | Simulates “What-if” purchase scenarios and models income/savings trajectories.                                    | scikit-learn            |
| **Tax Agent** | Generates TDS/GST insights, quarterly tax projections, and tax-saving recommendations.                            | Rule-based + LLM hybrid |

---

## **Technology Stack**

| Layer                | Technology                                         |
| -------------------- | -------------------------------------------------- |
| **Frontend**         | Next.js 14, TypeScript, TailwindCSS, Framer Motion |
| **Backend**          | FastAPI (Python), SQLAlchemy                       |
| **Database**         | PostgreSQL (via Supabase)                          |
| **AI/ML**            | Google Gemini 1.5 Flash, scikit-learn              |
| **State Management** | Zustand                                            |
| **Charts**           | Recharts                                           |
| **Authentication**   | Supabase Auth                                      |
| **Messaging**        | Twilio (WhatsApp)                                  |
| **Hosting**          | Vercel (Frontend), Render/Railway (Backend)        |

---

## **Environment Variables**

<details>
<summary><b>View environment variable configuration</b></summary>

```bash
# Required
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SECRET_KEY=your-secret-key

# Optional (for WhatsApp Integration)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

</details>

---

## **WhatsApp Bot Setup**

<details>
<summary><b>View WhatsApp configuration steps</b></summary>

1. Create an account on [Twilio](https://www.twilio.com/).
2. Join the WhatsApp Sandbox under **Messaging → Try it out → Send a WhatsApp message**.
3. Set the webhook URL:

   ```
   https://your-backend-url/api/whatsapp/webhook
   ```

   Method: **POST**
4. Add credentials to `.env`:

   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxx
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

</details>

---

## **User Flow**

1. **Sign Up:** Email or Google OAuth authentication.
2. **Onboarding:** Add income sources, expenses, and goals.
3. **Dashboard:** View financial pulse, rhythm insights, and trends.
4. **Chat with TaalAI:** Receive personalized, contextual guidance.
5. **What-If Simulator:** Test spending or purchase decisions.
6. **WhatsApp Nudges:** Receive daily saving reminders (optional).

---

## **Development**

<details>
<summary><b>Testing and Build Commands</b></summary>

### Run Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Build for Production

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm run build
npm start
```

</details>

---

## **Deployment**

<details>
<summary><b>Frontend (Vercel)</b></summary>

1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Configure environment variables.
3. Deploy automatically on push.

</details>

<details>
<summary><b>Backend (Render/Railway)</b></summary>

1. Create a new web service.
2. Connect the GitHub repository.
3. Build command:

   ```bash
   pip install -r requirements.txt
   ```
4. Start command:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
5. Add required environment variables.

</details>

---

## **Contributing**

Contributions are welcome.
Follow the standard Git branching workflow:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "Add new feature"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

---

## **License**

This project is licensed under the **MIT License**.

---

## **Acknowledgments**

* **Google Gemini API** – AI and NLP capabilities
* **Supabase** – Authentication and database services
* **Twilio** – WhatsApp messaging integration
* **Indian Freelance Community** – Inspiration for real-world use cases

---

## **Support**

For issues and questions:

* **GitHub Issues:** [Create an issue](https://github.com/yourusername/taalai/issues)
* **Email:** [support@taalai.app](mailto:support@taalai.app)

---

**TaalAI – Empowering India’s freelance and creator economy.**
*Building financial discipline, one rhythm at a time.*

```
