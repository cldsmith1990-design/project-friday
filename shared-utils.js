/**
 * Project Friday - Shared Utilities
 * Common functionality across all hubs
 */

// ==========================================
// LOCAL STORAGE MANAGER
// ==========================================
const Storage = {
  prefix: 'pf_',

  save(key, data) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save error:', e);
      return false;
    }
  },

  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage load error:', e);
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(this.prefix))
      .forEach(k => localStorage.removeItem(k));
  }
};

// ==========================================
// THEME MANAGER (Dark/Light Mode)
// ==========================================
const Theme = {
  key: 'theme',

  init() {
    const saved = Storage.load(this.key, 'dark');
    this.apply(saved);
    return saved;
  },

  toggle() {
    const current = Storage.load(this.key, 'dark');
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    Storage.save(this.key, next);
    return next;
  },

  apply(theme) {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    document.body.setAttribute('data-theme', theme);

    // Update theme-specific styles
    if (theme === 'light') {
      document.body.classList.remove('bg-gradient-to-br', 'from-slate-900', 'via-slate-950', 'to-black', 'text-white');
      document.body.classList.add('bg-gradient-to-br', 'from-slate-100', 'via-white', 'to-slate-50', 'text-slate-900');
    } else {
      document.body.classList.remove('bg-gradient-to-br', 'from-slate-100', 'via-white', 'to-slate-50', 'text-slate-900');
      document.body.classList.add('bg-gradient-to-br', 'from-slate-900', 'via-slate-950', 'to-black', 'text-white');
    }
  }
};

// ==========================================
// NOTIFICATIONS MANAGER
// ==========================================
const Notifications = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'notification-container';
      this.container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 4000) {
    this.init();

    const colors = {
      info: 'bg-blue-600 border-blue-500',
      success: 'bg-emerald-600 border-emerald-500',
      warning: 'bg-amber-600 border-amber-500',
      error: 'bg-red-600 border-red-500'
    };

    const icons = {
      info: 'info',
      success: 'check-circle',
      warning: 'alert-triangle',
      error: 'x-circle'
    };

    const notification = document.createElement('div');
    notification.className = `${colors[type]} border text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
      <i data-feather="${icons[type]}" class="w-5 h-5 flex-shrink-0"></i>
      <span class="text-sm">${message}</span>
      <button class="ml-auto text-white/70 hover:text-white" onclick="this.parentElement.remove()">
        <i data-feather="x" class="w-4 h-4"></i>
      </button>
    `;

    this.container.appendChild(notification);
    if (window.feather) feather.replace();

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full');
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }

    return notification;
  },

  info(message, duration) { return this.show(message, 'info', duration); },
  success(message, duration) { return this.show(message, 'success', duration); },
  warning(message, duration) { return this.show(message, 'warning', duration); },
  error(message, duration) { return this.show(message, 'error', duration); }
};

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
const Search = {
  modal: null,

  init() {
    // Create search modal
    this.modal = document.createElement('div');
    this.modal.id = 'search-modal';
    this.modal.className = 'fixed inset-0 z-50 hidden';
    this.modal.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="Search.close()"></div>
      <div class="relative max-w-2xl mx-auto mt-20 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        <div class="flex items-center gap-3 p-4 border-b border-slate-700">
          <i data-feather="search" class="w-5 h-5 text-slate-400"></i>
          <input type="text" id="search-input" placeholder="Search across all hubs..."
            class="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
            oninput="Search.query(this.value)">
          <kbd class="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded">ESC</kbd>
        </div>
        <div id="search-results" class="max-h-96 overflow-y-auto p-2">
          <div class="text-center py-8 text-slate-500">
            <i data-feather="search" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p>Start typing to search...</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.modal);

    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
      if (e.key === 'Escape') {
        this.close();
      }
    });
  },

  open() {
    this.modal.classList.remove('hidden');
    document.getElementById('search-input').focus();
    if (window.feather) feather.replace();
  },

  close() {
    this.modal.classList.add('hidden');
    document.getElementById('search-input').value = '';
  },

  // Search index - pages and their content
  index: [
    { title: 'Family Dashboard', url: 'index.html', keywords: 'home family kids schedule calendar events', hub: 'Family' },
    { title: 'Life Hub', url: 'life-hub.html', keywords: 'life control master automation system', hub: 'Life' },
    { title: 'Work Hub', url: 'work-hub.html', keywords: 'work tickets sop operations jira', hub: 'Work' },
    { title: 'Finance Hub', url: 'finance-hub.html', keywords: 'money budget bills transactions debt savings', hub: 'Finance' },
    { title: 'Academic Hub', url: 'academic-hub.html', keywords: 'grades school courses assignments gpa study', hub: 'Academic' },
    { title: 'Emotional Hub', url: 'emotional-hub.html', keywords: 'mood wellness mental health journal gratitude', hub: 'Emotional' },
    { title: 'Automotive Hub', url: 'automotive-hub.html', keywords: 'car vehicle maintenance service mileage fuel', hub: 'Automotive' }
  ],

  query(term) {
    const results = document.getElementById('search-results');
    if (!term.trim()) {
      results.innerHTML = `
        <div class="text-center py-8 text-slate-500">
          <i data-feather="search" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
          <p>Start typing to search...</p>
        </div>
      `;
      if (window.feather) feather.replace();
      return;
    }

    const matches = this.index.filter(item =>
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.keywords.toLowerCase().includes(term.toLowerCase())
    );

    if (matches.length === 0) {
      results.innerHTML = `
        <div class="text-center py-8 text-slate-500">
          <i data-feather="frown" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
          <p>No results found for "${term}"</p>
        </div>
      `;
    } else {
      results.innerHTML = matches.map(m => `
        <a href="${m.url}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition group">
          <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <i data-feather="layout" class="w-5 h-5 text-indigo-400"></i>
          </div>
          <div class="flex-1">
            <p class="text-white font-medium group-hover:text-indigo-300">${m.title}</p>
            <p class="text-xs text-slate-500">${m.hub} Hub</p>
          </div>
          <i data-feather="arrow-right" class="w-4 h-4 text-slate-600 group-hover:text-indigo-400"></i>
        </a>
      `).join('');
    }
    if (window.feather) feather.replace();
  }
};

// ==========================================
// DATA EXPORT
// ==========================================
const Export = {
  toCSV(data, filename) {
    if (!Array.isArray(data) || data.length === 0) {
      Notifications.error('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\n');

    this.download(csvContent, filename + '.csv', 'text/csv');
    Notifications.success('CSV exported successfully');
  },

  toJSON(data, filename) {
    const jsonContent = JSON.stringify(data, null, 2);
    this.download(jsonContent, filename + '.json', 'application/json');
    Notifications.success('JSON exported successfully');
  },

  download(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// ==========================================
// GROCERY LIST MANAGER
// ==========================================
const GroceryList = {
  key: 'grocery_list',

  getItems() {
    return Storage.load(this.key, []);
  },

  addItem(item) {
    const items = this.getItems();
    items.push({ id: Date.now(), text: item, checked: false, addedAt: new Date().toISOString() });
    Storage.save(this.key, items);
    return items;
  },

  toggleItem(id) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) item.checked = !item.checked;
    Storage.save(this.key, items);
    return items;
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    Storage.save(this.key, items);
    return items;
  },

  clearChecked() {
    const items = this.getItems().filter(i => !i.checked);
    Storage.save(this.key, items);
    return items;
  }
};

// ==========================================
// NOTES MANAGER
// ==========================================
const Notes = {
  key: 'quick_notes',

  getNotes() {
    return Storage.load(this.key, []);
  },

  addNote(content, color = 'slate') {
    const notes = this.getNotes();
    notes.unshift({
      id: Date.now(),
      content,
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    Storage.save(this.key, notes);
    return notes;
  },

  updateNote(id, content) {
    const notes = this.getNotes();
    const note = notes.find(n => n.id === id);
    if (note) {
      note.content = content;
      note.updatedAt = new Date().toISOString();
    }
    Storage.save(this.key, notes);
    return notes;
  },

  deleteNote(id) {
    const notes = this.getNotes().filter(n => n.id !== id);
    Storage.save(this.key, notes);
    return notes;
  }
};

// ==========================================
// WEATHER (Simulated - would need API key for real data)
// ==========================================
const Weather = {
  // Simulated weather data
  getData() {
    return {
      temp: 45,
      condition: 'Partly Cloudy',
      icon: 'cloud',
      high: 52,
      low: 38,
      humidity: 65,
      wind: 8,
      forecast: [
        { day: 'Sat', high: 52, low: 38, icon: 'cloud' },
        { day: 'Sun', high: 48, low: 35, icon: 'cloud-rain' },
        { day: 'Mon', high: 44, low: 32, icon: 'cloud-snow' },
        { day: 'Tue', high: 46, low: 34, icon: 'sun' },
        { day: 'Wed', high: 50, low: 36, icon: 'sun' }
      ]
    };
  }
};

// ==========================================
// INITIALIZE SHARED FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  Search.init();
  Theme.init();
});
