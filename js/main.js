// ============================================
// WHEELS - MAIN JAVASCRIPT & WORKFLOW ENGINE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navIcons = document.querySelector('.nav-icons');
  const themeStorageKey = 'wheels-theme';
  const cityStorageKey = 'wheels_selected_city';
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  // --- THEME MANAGEMENT ---
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  function getStoredTheme() {
    return localStorage.getItem(themeStorageKey);
  }

  function setStoredTheme(theme) {
    localStorage.setItem(themeStorageKey, theme);
  }

  function updateThemeToggleIcon() {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
      if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-moon';
      } else {
        icon.className = 'fas fa-sun';
      }
    });
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    updateThemeToggleIcon();
  }

  const storedTheme = getStoredTheme();
  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (prefersLight) {
    applyTheme('light');
  }

  // --- CITY / LOCATION MANAGEMENT ---
  function getSelectedCity() {
    return localStorage.getItem(cityStorageKey) || 'Mumbai';
  }

  function setSelectedCity(cityName) {
    localStorage.setItem(cityStorageKey, cityName);
    window.dispatchEvent(new CustomEvent('wheels-city-changed', { detail: cityName }));
    renderNavAuth();
    showToast(`Showroom location set to ${cityName}`, 'success');
  }

  // --- AUTH & NAVBAR SYNC ---
  function renderNavAuth() {
    if (!navIcons) return;
    const user = window.authManager ? window.authManager.getCurrentUser() : null;
    const wishlist = window.carDB ? window.carDB.getWishlist() : [];
    const compare = window.carDB ? window.carDB.getCompareList() : [];
    const currentCity = getSelectedCity();

    let authHtml = `
      <!-- Location Selector Pill -->
      <button type="button" class="nav-location-pill trigger-city-modal" title="Change City / Showroom Location">
        <i class="fas fa-map-marker-alt"></i>
        <span class="selected-city-label">${currentCity}</span>
        <i class="fas fa-chevron-down"></i>
      </button>

      <button class="theme-toggle" aria-label="Toggle theme" title="Toggle Light/Dark Theme">
        <i class="fas ${document.body.classList.contains('light-theme') ? 'fa-moon' : 'fa-sun'}"></i>
      </button>

      <a href="fleet.html?filter=wishlist" class="nav-badge-link" title="Saved Wishlist">
        <i class="fas fa-heart"></i>
        <span class="nav-badge-count wishlist-count">${wishlist.length}</span>
      </a>

      <button type="button" class="nav-badge-link trigger-compare-modal" title="Compare Vehicles">
        <i class="fas fa-columns"></i>
        <span class="nav-badge-count compare-count">${compare.length}</span>
      </button>
    `;

    if (user) {
      authHtml += `
        <div class="nav-user-dropdown">
          <button class="nav-user-btn">
            <img src="${user.avatar}" alt="${user.name}" class="nav-avatar">
            <span class="nav-user-name">${user.name.split(' ')[0]}</span>
            <span class="badge-role ${user.role}">${user.role.toUpperCase()}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="user-menu-popover">
            <div class="popover-header">
              <strong>${user.name}</strong>
              <small>${user.email}</small>
            </div>
            <a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> ${user.role === 'admin' ? 'Dealership Portal' : 'My Garage & Orders'}</a>
            <a href="fleet.html"><i class="fas fa-car"></i> New Inventory</a>
            <a href="javascript:void(0)" id="switch-role-btn">
              <i class="fas fa-exchange-alt"></i> Switch to ${user.role === 'admin' ? 'Customer Mode' : 'Admin Mode'}
            </a>
            <hr style="border: 0; border-top: 1px solid var(--extra); margin: 6px 0;">
            <a href="javascript:void(0)" id="global-logout-btn" style="color: #ff4545;">
              <i class="fas fa-sign-out-alt"></i> Sign Out
            </a>
          </div>
        </div>
      `;
    } else {
      authHtml += `
        <a href="login.html" class="btn btn-secondary" style="padding: 8px 18px; font-size: 0.85rem;">Sign In</a>
        <a href="register.html" class="btn" style="padding: 8px 18px; font-size: 0.85rem;">Sign Up</a>
      `;
    }

    navIcons.innerHTML = authHtml;
    updateThemeToggleIcon();
    setupUserDropdownEvents();
    renderCompareDrawer();
  }

  function setupUserDropdownEvents() {
    const userBtn = document.querySelector('.nav-user-btn');
    const popover = document.querySelector('.user-menu-popover');
    if (userBtn && popover) {
      userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        popover.classList.toggle('show');
      });
      document.addEventListener('click', function() {
        popover.classList.remove('show');
      });
    }

    const switchBtn = document.getElementById('switch-role-btn');
    if (switchBtn && window.authManager) {
      switchBtn.addEventListener('click', function() {
        const current = window.authManager.getCurrentUser();
        const nextRole = current.role === 'admin' ? 'customer' : 'admin';
        window.authManager.switchRole(nextRole);
        showToast(`Switched profile to ${nextRole.toUpperCase()}`, 'success');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }

    const logoutBtn = document.getElementById('global-logout-btn');
    if (logoutBtn && window.authManager) {
      logoutBtn.addEventListener('click', function() {
        window.authManager.logout();
        showToast('Signed out successfully', 'info');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 600);
      });
    }
  }

  // Mobile Menu Toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Listen for DB & Auth updates
  window.addEventListener('wheels-db-updated', () => {
    renderNavAuth();
    renderCompareDrawer();
  });
  window.addEventListener('wheels-auth-updated', () => {
    renderNavAuth();
  });

  renderNavAuth();

  // Handle global click for theme toggle, city modal & compare triggers
  document.addEventListener('click', function(event) {
    const toggleButton = event.target.closest('.theme-toggle');
    if (toggleButton) {
      event.preventDefault();
      toggleTheme();
    }

    const compareBtn = event.target.closest('.trigger-compare-modal');
    if (compareBtn) {
      event.preventDefault();
      openCompareModal();
    }

    const cityBtn = event.target.closest('.trigger-city-modal');
    if (cityBtn) {
      event.preventDefault();
      openCitySelectorModal();
    }
  });

  // --- CITY SELECTOR MODAL COMPONENT (EXACT DESIGN AS SCREENSHOT) ---
  const CITIES_DATA = [
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 2L4 7v13h16V7l-8-5zm0 3.3L18 9v9H6V9l6-3.7zM11 11h2v7h-2v-7zm-4 2h2v5H7v-5zm10 0h2v5h-2v-5z"/></svg>`
    },
    {
      id: 'surat',
      name: 'Surat',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M6 3h12l4 6-10 12L2 9l4-6zm1.5 2l-2.6 4h3.7l1.5-4H7.5zm4.5 0l-1.5 4h3l-1.5-4zm4.5 0l1.5 4h3.7l-2.6-4h-2.6zM4.6 11l7.4 8.8 7.4-8.8H4.6z"/></svg>`
    },
    {
      id: 'vadodara',
      name: 'Vadodara',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 3c-1.1 0-2 .9-2 2 0 .7.4 1.4 1 1.7V9H4v12h16V9h-7V6.7c.6-.3 1-1 1-1.7 0-1.1-.9-2-2-2zm-6 8h3v8H6v-8zm5 0h2v8h-2v-8zm4 0h3v8h-3v-8z"/></svg>`
    },
    {
      id: 'rajkot',
      name: 'Rajkot',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 2l-3 4h2v14h2V6h2l-3-4zm-8 8l-2 3h2v7h2v-7h2l-2-3H4zm14 0l-2 3h2v7h2v-7h2l-2-3h-2z"/></svg>`
    },
    {
      id: 'gandhinagar',
      name: 'Gandhinagar',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 2L2 9v12h20V9L12 2zm0 3.5l7 4.9V19h-3v-6H8v6H5v-8.6l7-4.9zM10 15h4v4h-4v-4z"/></svg>`
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M3 21h18v-2H3v2zm2-4h14v-2H5v2zm2-4h10V9l-5-5-5 5v4zm2-2V9.8l3-3 3 3V11H9z"/></svg>`
    },
    {
      id: 'delhi',
      name: 'Delhi',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12zm-9-8h4v6h-4v-6z"/></svg>`
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.25 6 2.25v4.78zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M4 4h3v16H4V4zm13 0h3v16h-3V4zm-6 2h2v14h-2V6zm-4 4h10v2H7v-2z"/></svg>`
    },
    {
      id: 'chennai',
      name: 'Chennai',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 2l-7 4v14h14V6l-7-4zm5 16H7v-3h10v3zm0-5H7V8.5l5-2.9 5 2.9V13z"/></svg>`
    },
    {
      id: 'pune',
      name: 'Pune',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l5 4.5v6H7v-6l5-4.5z"/></svg>`
    },
    {
      id: 'kolkata',
      name: 'Kolkata',
      iconSvg: `<svg viewBox="0 0 24 24" class="city-landmark-svg"><path d="M21 16.5l-3-6-3 6h6zm-9 0l-3-6-3 6h6zm-6 0l-3-6-1 2 2 4h2zM2 19h20v2H2v-2z"/></svg>`
    }
  ];

  window.openCitySelectorModal = function() {
    let modal = document.getElementById('global-city-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-city-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const currentCity = getSelectedCity();

    modal.innerHTML = `
      <div class="city-modal-card">
        <div class="city-modal-header">
          <h2 class="city-modal-title">Select your city</h2>
          <p class="city-modal-sub">See cars nearest to you first</p>
          <button type="button" class="city-modal-close" aria-label="Close" id="btn-close-city-modal">✕</button>
        </div>

        <!-- Use Current Location Button -->
        <button type="button" class="btn-use-location" id="btn-use-geo-location">
          <i class="fas fa-crosshairs"></i> Use my current location
        </button>

        <!-- Search Your City -->
        <div class="city-search-box">
          <i class="fas fa-search city-search-icon"></i>
          <input type="text" class="city-search-input" id="city-search-input" placeholder="Search your city">
        </div>

        <!-- Popular Cities -->
        <div class="popular-cities-label">POPULAR CITIES</div>
        <div class="popular-cities-grid" id="popular-cities-grid">
          ${CITIES_DATA.map(city => `
            <button type="button" class="city-item-btn ${city.name.toLowerCase() === currentCity.toLowerCase() ? 'selected' : ''}" data-city="${city.name}">
              <div class="city-icon-circle">
                ${city.iconSvg}
              </div>
              <span class="city-item-name">${city.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- View All India -->
        <button type="button" class="btn-view-all-cities" id="btn-view-all-cities">
          <i class="fas fa-map-marked-alt"></i> View cars in All India
        </button>
      </div>
    `;

    modal.classList.add('active');

    // Close Event
    const closeBtn = document.getElementById('btn-close-city-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // City Button Clicks
    modal.querySelectorAll('.city-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.getAttribute('data-city');
        setSelectedCity(city);
        modal.classList.remove('active');
      });
    });

    // View All India Click
    const allIndiaBtn = document.getElementById('btn-view-all-cities');
    if (allIndiaBtn) {
      allIndiaBtn.addEventListener('click', () => {
        setSelectedCity('All India');
        modal.classList.remove('active');
      });
    }

    // Geolocation Use Click
    const geoBtn = document.getElementById('btn-use-geo-location');
    if (geoBtn) {
      geoBtn.addEventListener('click', () => {
        geoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting location...';
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              // Simulated reverse-geocode to nearest flagship showroom city
              const detectedCity = 'Mumbai';
              setSelectedCity(detectedCity);
              modal.classList.remove('active');
            },
            (err) => {
              // Default fallback
              setSelectedCity('Mumbai');
              modal.classList.remove('active');
            },
            { timeout: 3000 }
          );
        } else {
          setSelectedCity('Mumbai');
          modal.classList.remove('active');
        }
      });
    }

    // Live City Search Filter
    const searchInput = document.getElementById('city-search-input');
    const citiesGrid = document.getElementById('popular-cities-grid');
    if (searchInput && citiesGrid) {
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase().trim();
        const buttons = citiesGrid.querySelectorAll('.city-item-btn');
        let visibleCount = 0;
        buttons.forEach(btn => {
          const name = btn.getAttribute('data-city').toLowerCase();
          if (name.includes(term)) {
            btn.style.display = 'flex';
            visibleCount++;
          } else {
            btn.style.display = 'none';
          }
        });

        let noResult = document.getElementById('city-no-results');
        if (visibleCount === 0) {
          if (!noResult) {
            noResult = document.createElement('div');
            noResult.id = 'city-no-results';
            noResult.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 1.5rem 0; color: #6b7280; font-size: 0.9rem;';
            noResult.innerHTML = `<p>No matching city found. <br><a href="javascript:void(0)" style="color: var(--secondary); font-weight: bold;" onclick="setSelectedCity('${searchInput.value}'); document.getElementById('global-city-modal').classList.remove('active');">Set '${searchInput.value}' as location</a></p>`;
            citiesGrid.appendChild(noResult);
          }
        } else if (noResult) {
          noResult.remove();
        }
      });
    }
  };

  // --- FLOATING COMPARE DRAWER & MODAL ---
  function renderCompareDrawer() {
    let drawer = document.getElementById('floating-compare-drawer');
    const compareList = window.carDB ? window.carDB.getCompareList() : [];

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'floating-compare-drawer';
      drawer.className = 'floating-compare-drawer';
      document.body.appendChild(drawer);
    }

    if (compareList.length === 0) {
      drawer.style.display = 'none';
      return;
    }

    const cars = compareList.map(id => window.carDB.getCarById(id)).filter(Boolean);

    drawer.style.display = 'flex';
    drawer.innerHTML = `
      <div class="compare-drawer-content">
        <div class="drawer-info">
          <i class="fas fa-columns" style="color: var(--secondary);"></i>
          <span>Compare <strong>${cars.length}/4</strong> Vehicles</span>
        </div>
        <div class="drawer-thumbs">
          ${cars.map(c => `
            <div class="drawer-thumb" title="${c.name}">
              <img src="${c.image}" alt="${c.name}">
              <button class="remove-compare-btn" data-id="${c.id}" title="Remove">✕</button>
            </div>
          `).join('')}
        </div>
        <div class="drawer-actions">
          <button class="btn btn-sm trigger-compare-modal" style="padding: 6px 14px; font-size: 0.8rem;">Compare Side-by-Side</button>
          <button class="btn-clear-compare" title="Clear all">Clear</button>
        </div>
      </div>
    `;

    drawer.querySelectorAll('.remove-compare-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        window.carDB.toggleCompare(id);
      });
    });

    const clearBtn = drawer.querySelector('.btn-clear-compare');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.carDB.clearCompare();
      });
    }
  }

  window.openCompareModal = function() {
    let modal = document.getElementById('global-compare-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-compare-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const compareList = window.carDB ? window.carDB.getCompareList() : [];
    const cars = compareList.map(id => window.carDB.getCarById(id)).filter(Boolean);

    if (cars.length === 0) {
      modal.innerHTML = `
        <div class="modal-card compare-modal-card">
          <div class="modal-header">
            <h3><i class="fas fa-columns"></i> Vehicle Comparison</h3>
            <button class="modal-close-btn" onclick="document.getElementById('global-compare-modal').classList.remove('active')">✕</button>
          </div>
          <div style="padding: 3rem; text-align: center;">
            <i class="fas fa-car-side" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
            <p>No vehicles selected for comparison yet.</p>
            <p style="font-size: 0.9rem; color: var(--accent);">Browse our new car catalog and click "Compare" on any car.</p>
            <a href="fleet.html" class="btn" style="margin-top: 1rem; display: inline-block;">Browse New Inventory</a>
          </div>
        </div>
      `;
    } else {
      modal.innerHTML = `
        <div class="modal-card compare-modal-card wide">
          <div class="modal-header">
            <div>
              <h3><i class="fas fa-columns" style="color: var(--secondary);"></i> Side-by-Side Vehicle Comparison</h3>
              <p style="font-size: 0.85rem; color: var(--accent); margin: 0;">Comparing ${cars.length} Brand New 2026 Models</p>
            </div>
            <button class="modal-close-btn" onclick="document.getElementById('global-compare-modal').classList.remove('active')">✕</button>
          </div>
          <div class="compare-table-wrapper">
            <table class="compare-table">
              <thead>
                <tr>
                  <th style="width: 180px;">Specification</th>
                  ${cars.map(c => `
                    <th>
                      <div class="compare-head-cell">
                        <img src="${c.image}" alt="${c.name}" class="compare-cell-img">
                        <h4>${c.name}</h4>
                        <div class="compare-cell-price">$${c.price.toLocaleString()} MSRP</div>
                        <a href="car-details.html?id=${c.id}" class="btn btn-sm" style="margin-top: 6px; font-size: 0.75rem; padding: 4px 10px;">Configure & Buy</a>
                      </div>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Brand / Class</strong></td>
                  ${cars.map(c => `<td>${c.brand} (${c.bodyType})</td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Powertrain</strong></td>
                  ${cars.map(c => `<td><span class="badge-fuel">${c.fuelType}</span></td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Horsepower</strong></td>
                  ${cars.map(c => `<td class="highlight-val"><strong>${c.horsepower} HP</strong></td>`).join('')}
                </tr>
                <tr>
                  <td><strong>0 - 60 mph</strong></td>
                  ${cars.map(c => `<td class="highlight-val" style="color: var(--highlight);"><strong>${c.zeroToSixty}</strong></td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Top Speed</strong></td>
                  ${cars.map(c => `<td>${c.topSpeed}</td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Range / Efficiency</strong></td>
                  ${cars.map(c => `<td>${c.rangeOrMpg}</td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Drivetrain</strong></td>
                  ${cars.map(c => `<td>${c.drivetrain || 'AWD'}</td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Stock Status</strong></td>
                  ${cars.map(c => `<td><span class="badge-stock">${c.stockCount} Available</span></td>`).join('')}
                </tr>
                <tr>
                  <td><strong>Warranty</strong></td>
                  ${cars.map(c => `<td style="font-size: 0.8rem;">${c.warranty}</td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
  };

  // --- TOAST NOTIFICATIONS ---
  window.showToast = function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
