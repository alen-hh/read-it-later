# Read It Later

Easily save web pages to read later with this modern Chrome extension featuring a clean, user-friendly side panel.

## 📖 Overview

**Read It Later** is a Chrome side panel extension that allows you to bookmark and manage web pages you want to read later. With a simple click, save any page to your reading list and access it anytime from the convenient side panel.

## ✨ Features

- **📌 Quick Save**: Add the current page to your reading list with one click
- **🎨 Beautiful UI**: Modern, clean interface built with React and Tailwind CSS
- **🔍 Smart Management**: 
  - Prevents duplicate URLs
  - Shows creation date for each saved page
  - Maximum capacity of 100 items
- **⚡ Fast Access**: Open saved pages in new tabs instantly
- **🗑️ Easy Cleanup**: Remove items from your list with a simple click
- **💾 Persistent Storage**: All your saved pages are stored locally using Chrome's storage API
- **📱 Side Panel**: Non-intrusive side panel that doesn't disrupt your browsing

## 🛠️ Tech Stack

- **Framework**: [Plasmo 0.90.5](https://docs.plasmo.com/) - Modern Chrome extension framework
- **UI**: React 18.2 with TypeScript 5.3
- **Styling**: Tailwind CSS 3.4.1 (with `plasmo-` prefix)
- **Icons**: [Heroicons](https://heroicons.com) - Beautiful hand-crafted SVG icons
- **Manifest**: Chrome Extension Manifest V3

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd read-it-later
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

### Development

1. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top-right corner)
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` directory

3. The extension will auto-reload as you make changes to the code.

### Project Structure

```
read-it-later/
├── src/
│   ├── sidepanel.tsx      # Main side panel UI component
│   ├── background.ts      # Background service worker
│   ├── content.ts         # Content script configuration
│   └── style.css          # Global styles
├── package.json           # Dependencies and manifest configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── postcss.config.js      # PostCSS configuration
```

## 📦 Building for Production

Create a production build:

```bash
pnpm build
# or
npm run build
```

This generates an optimized build in the `build/chrome-mv3-prod` directory, ready for distribution.

### Creating a Distribution Package

```bash
pnpm package
# or
npm run package
```

This creates a `.zip` file ready to be uploaded to the Chrome Web Store.

## 🎯 Usage

1. **Add a Page**: 
   - Navigate to any webpage you want to save
   - Click the extension icon in the toolbar
   - Click "Add Current Page" in the side panel

2. **View Saved Pages**:
   - Click the extension icon to open the side panel
   - Your reading list will appear with all saved pages

3. **Open a Saved Page**:
   - Click on the page title to open it in a new tab

4. **Remove a Page**:
   - Click the trash icon next to any saved page

## 🔒 Permissions

The extension requires the following permissions:

- **sidePanel**: To display the reading list in the browser's side panel
- **storage**: To save your reading list locally
- **activeTab**: To get information about the current page
- **tabs**: To open saved pages in new tabs
- **host_permissions** (`https://*/*`): To access page metadata

## 🌟 Features in Detail

### Duplicate Prevention
The extension automatically checks if a URL is already in your list before adding it, preventing duplicate entries.

### Maximum Capacity
To ensure optimal performance, the extension limits your reading list to 100 items. You'll be prompted to remove items before adding new ones if you reach this limit.

### Data Persistence
All your saved pages are stored using Chrome's local storage API, ensuring your data persists across browser sessions and is private to your device.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Alen Hu** - [huhaoyue0220@126.com](mailto:huhaoyue0220@126.com)

## 📚 Resources

- [Plasmo Documentation](https://docs.plasmo.com/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
