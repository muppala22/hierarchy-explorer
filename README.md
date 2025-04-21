# Hierarchy Explorer 🌐

A powerful Angular app that allows users to explore, search, and manage deeply nested hierarchical data — inspired by tools used in enterprise-level applications.

## ✨ Features

- 🧭 Expand/Collapse nested entities in real-time
- 🔍 Search by EAN (or any property)
- 🏷️ Visual icons for different node types (Global, Country, Facility, etc.)
- 📁 Recursive rendering using Angular components
- 🔁 Expand All / Collapse All / Refresh controls
- 🌗 Responsive & clean UI with potential for dark mode

## 🧠 Built With

- [Angular](https://angular.io/)
- TypeScript
- SCSS
- (Optional) Angular Material or TailwindCSS

## 📚 Project Structure

src/ ├── app/ │ ├── components/ │ │ ├── hierarchy-view/ │ │ └── hierarchy-node/ <-- recursive component │ ├── models/ │ │ └── hierarchy.model.ts │ ├── services/ │ │ └── hierarchy.service.ts (optional for backend) │ └── app.component.ts └── assets/

## License

MIT

## 🛠 Setup

```bash
git clone https://github.com/yourusername/hierarchy-explorer.git
cd hierarchy-explorer
npm install
ng serve


### 🚀 Project Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Basic hierarchy tree with mock data | ✅ |
| 2 | Expand/collapse + recursive rendering | ✅ |
| 3 | Expand All / Collapse All / Refresh buttons | ✅ |
| 4 | Search by EAN / deep filtering | ✅ |
| 5 | Clean UI with icons per level | ✅ |
| 6 | Add backend/API or localStorage | 🔜 |
| 7 | Drag-and-drop reordering | 🔜 |
| 8 | Node editing & saving | 🔜 |
| 9 | Responsive design & animations | 🔜 |

