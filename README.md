# Tesla Energy Service Engineering — Site Layout Configurator

A web app that lets users plan and visualize an industrial battery site. The user picks how many of each battery type is needed, and the app figures out the budget, land space, energy output, and draws out the site layout automatically.

---

Live Demo
- **Website:** https://tesla-energy-ui.vercel.app
- **GitHub:** https://github.com/yashvi14/tesla-energy-ui

> Note: Backend is hosted on Render free tier. If Save Session is slow on first use, please wait ~50 seconds for it to wake up; it will work normally after that.

---

## What it does

- Select quantities for each battery type (MegapackXL, Megapack2, Megapack, PowerPack)
- Automatically calculates total cost, land area, and net energy output
- Auto-adds transformers (1 for every 2 batteries purchased)
- Generates a visual site layout that never exceeds 100ft in width
- Shows a cost breakdown chart so it is easy to see where the budget is going
- Export the site summary as a PDF
- Reset everything with one click
- Save and resume sessions anytime — even after clearing the browser cache

---

## Tech Stack

- **Frontend:** React + JavaScript (Vite)
- **Backend:** Node.js with Express
- **Data persistence:** JSON file on the server (so sessions survive cache clears)
- **Charts:** Recharts
- **PDF Export:** jsPDF

I went with React and Node.js because I'm most comfortable with this stack and wanted to focus on building a clean, functional UI.

---

## Extra Features

Beyond the minimum requirements, I added a few things to make the app more useful:

- **Cost Breakdown Chart** — a bar chart that breaks down spending by battery type so users can see at a glance where the money is going
- **PDF Export** — lets users download a full site summary report with battery config, budget, land, and energy details
- **Reset Button** — clears the entire configuration in one click
- **Input capping at 999** — prevents the layout from breaking with unrealistic quantities, with the layout still previewing up to 200 units for performance

---

## Running the app

Make sure the version is Node.js v20.19+ or v22+

```bash
# From the root folder
npm install
npm start
```

That's it. Both the frontend and backend start together.

- Frontend: http://localhost:8000
- Backend: http://localhost:3001

---

## Project Structure
```
tesla-energy-ui/
├── frontend/                   # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── BatteryForm.jsx       # Battery quantity inputs
│   │   │   ├── SummaryPanel.jsx      # Cost, land, energy summary + PDF export
│   │   │   ├── SiteLayout.jsx        # Auto-generated visual site layout
│   │   │   ├── SessionManager.jsx    # Save and resume sessions
│   │   │   └── CostChart.jsx         # Cost breakdown bar chart
│   │   ├── App.jsx                   # Main app logic and state
│   │   └── App.css                   # Styles
│   ├── index.html
│   └── vite.config.js
├── backend/
│   ├── server.js                     # Express server, session save/load
│   └── sessions.json                 # Auto-created when first session is saved
├── README.md
└── package.json                      # Run everything from here
```

---

## Author

Yashvi Viren Shah