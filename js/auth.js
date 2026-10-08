// ===================================================
// WHEELS - AUTHENTICATION & ROLE MANAGEMENT
// ===================================================

const AUTH_STORAGE_KEY = 'wheels_auth_user';

const DEMO_USERS = {
    admin: {
        id: 'usr-admin-01',
        name: 'Alex Vance',
        title: 'Dealership Director',
        email: 'admin@wheels.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    customer: {
        id: 'usr-cust-01',
        name: 'Marcus Sterling',
        title: 'VIP Buyer',
        email: 'customer@wheels.com',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
};

class AuthManager {
    constructor() {
        this.currentUser = this.getStoredUser();
        // Default to Marcus (Customer) if none set so features are immediately interactive!
        if (!this.currentUser) {
            this.loginAsDemo('customer');
        }
    }

    getStoredUser() {
        try {
            const raw = localStorage.getItem(AUTH_STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    login(email, password) {
        if (email.toLowerCase().includes('admin') || email === 'admin@wheels.com') {
            this.currentUser = DEMO_USERS.admin;
        } else {
            this.currentUser = {
                id: 'usr-' + Date.now(),
                name: email.split('@')[0].toUpperCase(),
                email: email,
                role: 'customer',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
            };
        }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
        window.dispatchEvent(new CustomEvent('wheels-auth-updated', { detail: this.currentUser }));
        return this.currentUser;
    }

    register(name, email, password, role = 'customer') {
        this.currentUser = {
            id: 'usr-' + Date.now(),
            name: name || 'New Member',
            email: email,
            role: role,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
        window.dispatchEvent(new CustomEvent('wheels-auth-updated', { detail: this.currentUser }));
        return this.currentUser;
    }

    loginAsDemo(type = 'customer') {
        this.currentUser = DEMO_USERS[type] || DEMO_USERS.customer;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
        window.dispatchEvent(new CustomEvent('wheels-auth-updated', { detail: this.currentUser }));
        return this.currentUser;
    }

    logout() {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        this.currentUser = null;
        window.dispatchEvent(new CustomEvent('wheels-auth-updated', { detail: null }));
    }

    switchRole(role) {
        if (role === 'admin') {
            this.loginAsDemo('admin');
        } else {
            this.loginAsDemo('customer');
        }
    }
}

window.authManager = new AuthManager();
