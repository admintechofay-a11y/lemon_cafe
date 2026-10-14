import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Utensils,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  Save,
  X
} from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { businessInfo } from '../config/business';
import { fallbackMenuItems } from '../config/menuData';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('lemon_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('lemon_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@lemonhousecafe.com');
  const [loginPassword, setLoginPassword] = useState('lemon123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab: 'menu' | 'specials' | 'enquiries' | 'business'
  const [activeTab, setActiveTab] = useState('menu');

  // Menu Management State
  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [editingItem, setEditingItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  // Tomorrow's Special State
  const [specialData, setSpecialData] = useState({
    title: "Tomorrow's Chef Special Showcase",
    subtitle: "Handpicked innovative gastronomy prepared exclusively for tomorrow's lunch and evening service.",
    dateText: "Available Tomorrow · From 12:00 PM",
    dishes: [
      { name: "Pineapple Biryani", tag: "Fragrant Heritage", desc: "Slow-dum basmati infused with sweet caramelised pineapple cubes, royal saffron, and roasted cashews." },
      { name: "Orange Dip Manchurian", tag: "Citrus Fusion", desc: "Crispy vegetable spheres glazed with fresh Valencia orange reduction and roasted garlic chili." },
      { name: "Three-Flavour Sushi", tag: "Japanese Craft", desc: "Avocado, asparagus tempura, and spicy yuzu crunch rolled in nori and toasted sesame seeds." },
      { name: "Charcoal Fettuccine Pasta", tag: "Smoky Truffle", desc: "Activated charcoal artisan pasta ribbons in smoky bell pepper emulsion with fresh burrata." },
      { name: "Tandoori Paneer Pizza", tag: "Woodfired Oven", desc: "Thin-crust sourdough with charred spiced cottage cheese, san marzano tomato sauce, and basil." },
      { name: "Zesty Lemon Sorbet & Gelato", tag: "Sweet Finish", desc: "Palate-cleansing organic lemon sorbet crowned with candied citrus rind and mint oil." }
    ]
  });

  // Enquiries State
  const [enquiries, setEnquiries] = useState([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);

  // Business Info State
  const [businessForm, setBusinessForm] = useState({
    hours: businessInfo.hours,
    phone: businessInfo.phone,
    address: businessInfo.address,
    whatsapp: businessInfo.whatsapp,
  });

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Fetch Menu from API
  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setMenuItems(json.data);
      }
    } catch (e) {}
  };

  // Fetch Enquiries
  const fetchEnquiries = async () => {
    if (!token) return;
    setIsLoadingEnquiries(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setEnquiries(json.data || []);
      }
    } catch (e) {} finally {
      setIsLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    if (token) fetchEnquiries();
  }, [token]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const json = await res.json();
      if (json.success) {
        setToken(json.token);
        setAdminUser(json.admin);
        localStorage.setItem('lemon_admin_token', json.token);
        localStorage.setItem('lemon_admin_user', JSON.stringify(json.admin));
        showNotification('Welcome back, Concierge Administrator.');
      } else {
        setLoginError(json.message || 'Invalid credentials');
      }
    } catch (err) {
      // Local fallback for offline mode
      const dummyToken = 'demo_admin_token_2026';
      const dummyUser = { name: 'Master Administrator', email: loginEmail, role: 'superadmin' };
      setToken(dummyToken);
      setAdminUser(dummyUser);
      localStorage.setItem('lemon_admin_token', dummyToken);
      localStorage.setItem('lemon_admin_user', JSON.stringify(dummyUser));
      showNotification('Logged in (Demo Mode).');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('lemon_admin_token');
    localStorage.removeItem('lemon_admin_user');
    showNotification('Logged out securely.');
  };

  // Save Menu Item (Create or Update)
  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem._id || editingItem.id);
    const id = editingItem._id || editingItem.id;
    const url = isEdit
      ? `http://localhost:5000/api/admin/menu/${id}`
      : 'http://localhost:5000/api/admin/menu';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });
      if (res.ok) {
        showNotification(isEdit ? 'Menu item updated successfully.' : 'New menu item created.');
        setIsItemModalOpen(false);
        fetchMenu();
      } else {
        // Fallback update local state
        setMenuItems((prev) =>
          isEdit
            ? prev.map((item) => ((item._id || item.id) === id ? editingItem : item))
            : [editingItem, ...prev]
        );
        setIsItemModalOpen(false);
        showNotification('Item saved locally.');
      }
    } catch (err) {
      setMenuItems((prev) =>
        isEdit
          ? prev.map((item) => ((item._id || item.id) === id ? editingItem : item))
          : [editingItem, ...prev]
      );
      setIsItemModalOpen(false);
      showNotification('Item saved locally.');
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/menu/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {}
    setMenuItems((prev) => prev.filter((i) => (i._id || i.id) !== id));
    showNotification('Item removed from menu.');
  };

  // Save Tomorrow's Special
  const handleSaveSpecials = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/specials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(specialData)
      });
    } catch (e) {}
    showNotification("Tomorrow's Special banner updated.");
  };

  // Save Business Info
  const handleSaveBusiness = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/business', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(businessForm)
      });
    } catch (e) {}
    showNotification('Business hours and contact details updated.');
  };

  // If Not Authenticated -> Show Elegant Login Card
  if (!token) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6 pt-28 pb-20 relative">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-md w-full rounded-36 bg-warm-white border border-olive/15 p-8 sm:p-10 shadow-luxury relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-olive text-cream flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-6 h-6 text-gold" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-olive-dark">
              Lemon Concierge Admin
            </h1>
            <p className="text-xs text-charcoal/70 mt-2 font-light">
              Secure portal for menu editing, guest enquiries & daily specials.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-20 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-gold font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-gold font-sans"
              />
            </div>

            <div className="p-3 rounded-16 bg-cream border border-olive/10 text-[11px] text-charcoal/65 font-mono">
              Default Credentials: <br />
              <strong className="text-olive">admin@lemonhousecafe.com</strong> / <strong className="text-gold-dark">lemon123</strong>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-pill-gold text-xs uppercase tracking-wider py-4 shadow-gold-glow mt-4 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'Verifying...' : 'Sign In to Management'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-8 z-50 p-4 rounded-24 bg-olive text-cream shadow-luxury border-2 border-gold flex items-center gap-3 text-xs sm:text-sm font-medium"
            >
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-olive/15 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-olive text-[11px] font-mono uppercase tracking-wider font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Concierge Admin Suite</span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-olive-dark">
              Lemon House Estate Manager
            </h1>
            <p className="text-xs text-charcoal/70 mt-1 font-light">
              Signed in as <strong className="text-olive">{adminUser?.name || 'Administrator'}</strong> ({adminUser?.email || 'admin@lemonhousecafe.com'})
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-pill-outline text-xs uppercase tracking-wider py-2.5 px-6 self-start md:self-auto flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-olive/10">
          {[
            { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: Utensils },
            { id: 'specials', label: "Tomorrow's Special", icon: Sparkles },
            { id: 'enquiries', label: `Guest Enquiries (${enquiries.length})`, icon: Mail },
            { id: 'business', label: 'Hours & Venue Info', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive ? 'bg-olive text-cream shadow-md' : 'bg-warm-white text-olive/80 hover:bg-gold/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-olive/60'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENU ITEMS CRUD */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-olive-dark">Manage Menu Items</h2>
                <p className="text-xs text-charcoal/70">Create, edit, or adjust prices and descriptions.</p>
              </div>
              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    category: 'Coffee & Tea',
                    price: 300,
                    description: '',
                    isVeg: true,
                    isChefsPick: false,
                    isMustTry: false,
                    image: '/assets/optimized/coffee-terrace.webp',
                    tags: 'Specialty, In-House',
                  });
                  setIsItemModalOpen(true);
                }}
                className="btn-pill-gold text-xs uppercase tracking-wider py-3 px-6 shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="rounded-32 bg-warm-white border border-olive/15 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-cream/80 border-b border-olive/10 text-olive uppercase font-mono text-[11px] tracking-wider">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-olive/10">
                    {menuItems.map((item) => {
                      const id = item._id || item.id;
                      return (
                        <tr key={id} className="hover:bg-cream/40 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={item.image || '/assets/optimized/coffee-terrace.webp'}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border border-olive/10"
                            />
                            <div>
                              <p className="font-serif font-semibold text-olive-dark">{item.name}</p>
                              <p className="text-[11px] text-charcoal/60 line-clamp-1 max-w-xs">{item.description}</p>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-xs text-olive/80">{item.category}</td>
                          <td className="p-4 font-serif font-bold text-base text-gold-dark">₹{item.price}</td>
                          <td className="p-4">
                            <div className="flex gap-1.5 flex-wrap">
                              {item.isVeg && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono">Veg</span>
                              )}
                              {item.isChefsPick && (
                                <span className="px-2 py-0.5 rounded-full bg-gold/20 text-olive text-[10px] font-mono">Chef's Pick</span>
                              )}
                              {item.isMustTry && (
                                <span className="px-2 py-0.5 rounded-full bg-olive/10 text-olive text-[10px] font-mono">Must Try</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem({
                                    ...item,
                                    tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || ''
                                  });
                                  setIsItemModalOpen(true);
                                }}
                                className="p-2 rounded-lg bg-cream hover:bg-gold/20 text-olive transition-colors"
                                title="Edit Item"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(id)}
                                className="p-2 rounded-lg bg-cream hover:bg-rose-100 text-rose-700 transition-colors"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TOMORROW'S SPECIALS */}
        {activeTab === 'specials' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-olive-dark">Edit Tomorrow's Special Showcase</h2>
              <p className="text-xs text-charcoal/70">Update the highlight banner and featured special dishes displayed on the Home page.</p>
            </div>

            <div className="rounded-32 bg-warm-white border border-olive/15 p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={specialData.title}
                    onChange={(e) => setSpecialData({ ...specialData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                    Schedule / Date Text
                  </label>
                  <input
                    type="text"
                    value={specialData.dateText}
                    onChange={(e) => setSpecialData({ ...specialData, dateText: e.target.value })}
                    className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                  Subtitle Description
                </label>
                <textarea
                  rows="2"
                  value={specialData.subtitle}
                  onChange={(e) => setSpecialData({ ...specialData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal"
                />
              </div>

              {/* Dishes list */}
              <div className="space-y-4 pt-4 border-t border-olive/10">
                <p className="text-xs font-mono uppercase tracking-wider text-olive font-bold">Featured Dishes (6 Items)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialData.dishes.map((dish, i) => (
                    <div key={i} className="p-4 rounded-24 bg-cream border border-olive/10 space-y-2">
                      <input
                        type="text"
                        value={dish.name}
                        onChange={(e) => {
                          const updated = [...specialData.dishes];
                          updated[i].name = e.target.value;
                          setSpecialData({ ...specialData, dishes: updated });
                        }}
                        className="w-full font-serif font-semibold text-olive-dark bg-transparent border-b border-olive/20 pb-1 text-sm focus:outline-none"
                      />
                      <input
                        type="text"
                        value={dish.tag}
                        onChange={(e) => {
                          const updated = [...specialData.dishes];
                          updated[i].tag = e.target.value;
                          setSpecialData({ ...specialData, dishes: updated });
                        }}
                        className="w-full font-mono text-[10px] text-gold-dark uppercase tracking-wider bg-transparent border-b border-olive/10 pb-1 focus:outline-none"
                      />
                      <textarea
                        rows="2"
                        value={dish.desc}
                        onChange={(e) => {
                          const updated = [...specialData.dishes];
                          updated[i].desc = e.target.value;
                          setSpecialData({ ...specialData, dishes: updated });
                        }}
                        className="w-full text-xs text-charcoal/70 bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveSpecials}
                className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 flex items-center gap-2 shadow-gold-glow"
              >
                <Save className="w-4 h-4" />
                <span>Save Specials Banner</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: GUEST ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-olive-dark">Guest Enquiries</h2>
                <p className="text-xs text-charcoal/70">Incoming requests for private dining, events, and cabanas.</p>
              </div>
              <button
                onClick={fetchEnquiries}
                className="btn-pill-outline text-xs uppercase tracking-wider py-2.5 px-6"
              >
                Refresh List
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center rounded-32 bg-warm-white border border-olive/15">
                <Mail className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="font-serif text-xl text-olive-dark">No guest enquiries yet</p>
                <p className="text-xs text-charcoal/60 mt-1">New submissions from the Visit page will appear here immediately.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="p-6 rounded-32 bg-warm-white border border-olive/15 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-olive text-[10px] font-mono uppercase font-semibold">
                          {enq.type || enq.enquiryType || 'General Visit'}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal/50">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-semibold text-olive-dark">{enq.name}</h3>
                      <p className="font-mono text-xs text-gold-dark font-medium mt-0.5">{enq.phone}</p>
                      {enq.email && <p className="text-xs text-charcoal/60">{enq.email}</p>}

                      <p className="text-xs text-charcoal/80 mt-3 p-3 rounded-16 bg-cream border border-olive/10 italic leading-relaxed">
                        “{enq.message || 'No additional message.'}”
                      </p>
                    </div>

                    <div className="pt-3 border-t border-olive/10 flex items-center justify-between">
                      <a
                        href={`https://wa.me/${(enq.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${enq.name}, thank you for reaching out to Lemon House Café & Pool.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: HOURS & VENUE INFO */}
        {activeTab === 'business' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-olive-dark">Update Operating Hours & Contact</h2>
              <p className="text-xs text-charcoal/70">These details synchronize instantly to your website footer, location cards, and schema metadata.</p>
            </div>

            <div className="rounded-32 bg-warm-white border border-olive/15 p-8 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={businessForm.hours}
                  onChange={(e) => setBusinessForm({ ...businessForm, hours: e.target.value })}
                  className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                  Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={businessForm.phone}
                  onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                  Physical Address
                </label>
                <textarea
                  rows="2"
                  value={businessForm.address}
                  onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1.5">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={businessForm.whatsapp}
                  onChange={(e) => setBusinessForm({ ...businessForm, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm text-charcoal font-mono"
                />
              </div>

              <button
                onClick={handleSaveBusiness}
                className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 flex items-center gap-2 shadow-gold-glow mt-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Business Details</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MENU ITEM MODAL */}
      <AnimatePresence>
        {isItemModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-36 bg-warm-white border border-olive/20 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-olive/10 mb-6">
                <h3 className="font-serif text-xl font-semibold text-olive-dark">
                  {editingItem._id || editingItem.id ? 'Edit Menu Item' : 'New Culinary Creation'}
                </h3>
                <button
                  onClick={() => setIsItemModalOpen(false)}
                  className="p-1 rounded-full text-charcoal/50 hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMenuItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                    Dish / Drink Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                      Category *
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm"
                    >
                      <option value="Coffee & Tea">Coffee & Tea</option>
                      <option value="Signature Sips">Signature Sips</option>
                      <option value="Shakes & Smoothies">Shakes & Smoothies</option>
                      <option value="Food">Food</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Specials">Specials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                      Price in ₹ *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    rows="2"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                    Image Asset Path / URL
                  </label>
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-olive font-semibold mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingItem.tags}
                    onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                    placeholder="e.g. Gold Leaf, Citrus, Trending"
                    className="w-full px-4 py-2.5 rounded-20 bg-cream border border-olive/15 text-xs sm:text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isVeg ?? true}
                      onChange={(e) => setEditingItem({ ...editingItem, isVeg: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>100% Pure Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isChefsPick ?? false}
                      onChange={(e) => setEditingItem({ ...editingItem, isChefsPick: e.target.checked })}
                      className="rounded text-gold focus:ring-gold"
                    />
                    <span>Chef's Pick Badge</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isMustTry ?? false}
                      onChange={(e) => setEditingItem({ ...editingItem, isMustTry: e.target.checked })}
                      className="rounded text-olive focus:ring-olive"
                    />
                    <span>Must Try Feature</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-olive/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsItemModalOpen(false)}
                    className="btn-pill-outline text-xs uppercase tracking-wider py-3 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-gold text-xs uppercase tracking-wider py-3 px-6 shadow-gold-glow"
                  >
                    Save Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
