# Project Friday

Multi-hub operational dashboard system providing centralized control for Finance, Work, Academic, Family, and Emotional management.

## System Architecture

```
index.html          → Main dashboard (KidCal/Family Hub)
life-hub.html       → Central integration platform
work-hub.html       → IT operations & ticket management
finance-hub.html    → Transaction tracking & bill management
academic-hub.html   → Grade tracking & Canvas sync
emotional-hub.html  → Mood tracking & mindfulness
automotive-hub.html → Vehicle maintenance scheduling
```

## Features

### Core Capabilities
- Cross-hub navigation
- Real-time status monitoring
- Automated workflow tracking
- Responsive design (mobile/desktop)
- Dark theme interface

### Technology Stack
- HTML5
- Tailwind CSS (CDN)
- Feather Icons (CDN)
- Vanilla JavaScript

## Deployment

### GitHub Pages (Recommended)

1. Enable GitHub Pages in repository settings
2. Source: Deploy from main branch
3. Site will be live at: `https://[username].github.io/project-friday/`

### Local Development

```bash
# No build step required
# Open index.html in browser
```

## File Structure

```
project-friday/
├── index.html              # Main dashboard
├── life-hub.html           # Central hub
├── work-hub.html           # Work operations
├── finance-hub.html        # Finance tracking
├── academic-hub.html       # Grade management
├── emotional-hub.html      # Well-being tracker
├── automotive-hub.html     # Vehicle maintenance
└── README.md               # Documentation
```

## Navigation Flow

```
Dashboard (index.html)
    ↓
Life Hub (life-hub.html) ← Central control
    ├─→ Finance Hub
    ├─→ Work Hub
    ├─→ Academic Hub
    ├─→ Emotional Hub
    └─→ Automotive Hub
```

## Development Status

| Hub | Status | Features |
|-----|--------|----------|
| Main Dashboard | Active | Family scheduling, KidCal integration |
| Life Hub | Active | Cross-hub monitoring, automation tracking |
| Work Hub | Active | Ticket management, SOP documentation |
| Finance Hub | Placeholder | Transaction log structure ready |
| Academic Hub | Placeholder | Canvas sync ready |
| Emotional Hub | Placeholder | Mood tracker ready |
| Automotive Hub | Placeholder | Service tracking ready |

## Future Enhancements

- Backend integration for data persistence
- API connections (Canvas, Google Calendar, Banking)
- Mobile app version
- Real-time notifications
- Data export functionality

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)
- No server-side dependencies

## License

Personal project - Not for public distribution

## Version

Current: v2.4 (Life Hub operational)

---

**Project Friday System Core**
