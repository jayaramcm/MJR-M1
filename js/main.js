// ==========================================================================
// MJR TOWNSHIP @ KALWAKURTHY — CLIENT CONTROLLER
// ==========================================================================

let PLOTS_RECORDS = [];
let AS_OF_DATE = 'October 2026';

document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initHeroControls();
  await loadPlotsData();
  initMasterPlan();
  initPlotFinder();
  initAmenitiesShowcase();
  initLocationShowcase();
  initFAQ();
  initModals();
  initForms();
  initStickyMobileBar();
});

/* --------------------------------------------------------------------------
   0. LOAD REAL PLOT DATA FROM plots.json (Zero Invented Values)
   -------------------------------------------------------------------------- */
async function loadPlotsData() {
  try {
    const res = await fetch('plots.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.asOfDate) AS_OF_DATE = data.asOfDate;
      if (Array.isArray(data.plots)) {
        PLOTS_RECORDS = data.plots;
      }
    }
  } catch (err) {
    PLOTS_RECORDS = [];
  }

  const metaEl = document.getElementById('availabilityAsOf');
  if (metaEl) {
    metaEl.textContent = `Availability as of ${AS_OF_DATE} · Confirm availability with our team`;
  }
}

/* --------------------------------------------------------------------------
   1. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileClose = document.getElementById('mobileNavClose');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const updateHeaderHeightVar = () => {
    if (header && window.scrollY <= 24) {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
  };
  updateHeaderHeightVar();
  window.addEventListener('resize', updateHeaderHeightVar, { passive: true });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          closeDrawer();
          const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 82;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // Scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.id;
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. HERO VIDEO CONTROLS & REDUCED MOTION
   -------------------------------------------------------------------------- */
function initHeroControls() {
  const heroVideo = document.getElementById('heroVideo');
  const playBtn = document.getElementById('heroPlayToggle');
  const muteBtn = document.getElementById('heroMuteToggle');

  if (!heroVideo) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyMotionPreference = (matches) => {
    if (matches) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    } else {
      heroVideo.play().catch(() => { });
    }
  };
  applyMotionPreference(reducedMotionQuery.matches);
  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', (e) => applyMotionPreference(e.matches));
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        playBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      } else {
        heroVideo.pause();
        playBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        muteBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      } else {
        muteBtn.innerHTML = `<svg class="btn-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. MASTER PLAN WORKBENCH & INSPECTOR (MJR M4 Map Layout & Interactivity)
   -------------------------------------------------------------------------- */
let selectMasterPlanPlot = null;

function initMasterPlan() {
  const viewport = document.getElementById('masterPlanViewport');
  const stage = document.getElementById('masterPlanStage');
  const bgImg = document.getElementById('mplanBgImg');
  const pinsEl = document.getElementById('planPins');
  const shape = document.getElementById('planShape');
  const compass = document.getElementById('mapCompassBadge');
  const zoomInBtn = document.getElementById('zoomInMasterPlan');
  const zoomOutBtn = document.getElementById('zoomOutMasterPlan');
  const zoomResetBtn = document.getElementById('zoomResetMasterPlan');

  const data = window.MJR_PLOTS;
  if (!viewport || !stage || !pinsEl || !data) return;

  const FACING_ANGLES = {
    'North': 0,
    'North-East': 45,
    'East': 90,
    'South-East': 135,
    'South': 180,
    'South-West': 225,
    'West': 270,
    'North-West': 315,
  };

  let selectedNo = null;
  let userZoom = 1;
  const pins = {};

  const statusText = (p) => (p.reserved ? p.reserved : p.sold ? 'Sold Out' : 'Available');

  // Create all 104 interactive plot pins on the MJR M4 layout
  pinsEl.innerHTML = '';
  data.list.forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pin map-plot-node' + (p.sold ? ' is-sold' : '') + (p.reserved ? ' is-reserved' : '');
    b.dataset.plotNum = String(p.n);
    b.textContent = p.n;
    b.title = `Plot ${p.label} — ${statusText(p)} (${p.size} sq. yd.)`;
    b.setAttribute('aria-label', `Plot ${p.label}, ${statusText(p)}`);
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (selectedNo === p.n) {
        selectPlot(null);
      } else {
        selectPlot(p.n);
      }
    });
    pinsEl.appendChild(b);
    pins[p.n] = b;
  });

  // Outline the selected plot to its exact drawn shape on the 2560 x 1440 layout
  const showShape = (p) => {
    if (!shape) return;
    if (p && p.shape) shape.setAttribute('points', p.shape);
    shape.classList.toggle('is-on', !!(p && p.shape));
  };

  // Stage geometry & screen-space pin positioning (MJR M4 coordinates)
  const ROAD_X0 = 0.1102;
  const ROAD_X1 = 0.8914;
  const ROAD_SPAN = ROAD_X1 - ROAD_X0;

  const applyView = () => {
    const vpW = viewport.clientWidth || 880;
    const vpH = viewport.clientHeight || 620;
    const stageBaseH = vpW * (data.IMG_H / data.IMG_W);

    let targetScale, targetX, targetY, bgScale;

    if (selectedNo !== null && data.byNo[selectedNo]) {
      const p = data.byNo[selectedNo];
      targetScale = 2.45 * userZoom;
      targetX = (vpW * 0.5) - (p.px * vpW * targetScale);
      targetY = (vpH * 0.52) - (p.py * stageBaseH * targetScale);
      bgScale = 1.12;
      viewport.classList.add('is-zoomed');
    } else {
      const fitW = 1 / ROAD_SPAN;
      const fitH = vpH / (0.94 * stageBaseH);
      targetScale = Math.min(fitW, fitH) * userZoom;
      const scaledW = vpW * targetScale;
      const scaledH = stageBaseH * targetScale;
      targetX = (vpW - ROAD_SPAN * scaledW) / 2 - ROAD_X0 * scaledW;
      const topPad = 0.04 * scaledH;
      const botEdge = 0.988 * scaledH;
      const spanH = botEdge - topPad;
      targetY = (vpH - spanH) / 2 - topPad;
      bgScale = 1;
      viewport.classList.remove('is-zoomed');
    }

    stage.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0) scale(${targetScale.toFixed(4)})`;
    if (bgImg) {
      bgImg.style.transform = `scale(${bgScale})`;
    }

    const sW = vpW * targetScale;
    const sH = stageBaseH * targetScale;
    for (let i = 0; i < data.list.length; i++) {
      const p = data.list[i];
      const pin = pins[p.n];
      if (!pin) continue;
      const px = targetX + p.px * sW;
      const py = targetY + p.py * sH;
      pin.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
      pin.classList.toggle('is-selected', selectedNo === p.n);
    }
  };

  const selectPlot = (n) => {
    if (n === null || !data.byNo[n]) {
      selectedNo = null;
      userZoom = 1;
      showShape(null);
      if (compass) compass.style.transform = 'rotate(0deg)';
      applyView();
      renderInspector(null, selectPlot);
      return;
    }

    const p = data.byNo[n];
    selectedNo = p.n;
    userZoom = 1;
    showShape(p);
    if (compass) {
      const deg = FACING_ANGLES[p.facing] ?? 0;
      compass.style.transform = `rotate(${deg}deg)`;
    }
    applyView();
    renderInspector(p, selectPlot);
  };

  selectMasterPlanPlot = selectPlot;

  // Clicking empty map area resets selection back to overview
  viewport.addEventListener('click', (e) => {
    if (e.target.closest('.pin')) return;
    if (selectedNo !== null) {
      selectPlot(null);
    }
  });

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      userZoom = Math.min(userZoom + 0.25, 2.0);
      applyView();
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      userZoom = Math.max(userZoom - 0.25, 0.75);
      applyView();
    });
  }
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      selectPlot(null);
    });
  }

  window.addEventListener('resize', applyView);

  // Initial render: overview map + right column legend & dropdown
  applyView();
  renderInspector(null, selectPlot);
}

function renderInspector(plot, onSelectPlot) {
  const inspector = document.getElementById('plotInspector');
  const data = window.MJR_PLOTS;
  if (!inspector || !data) return;

  // Build dropdown options for all 104 plots
  let optionsHtml = `<option value="" ${!plot ? 'selected' : ''}>Select a Plot (01 – 104)...</option>`;
  data.list.forEach((p) => {
    const statusTag = p.reserved ? p.reserved : p.sold ? 'Sold Out' : 'Available';
    const isSel = plot && plot.n === p.n ? 'selected' : '';
    optionsHtml += `<option value="${p.n}" ${isSel}>Plot #${p.label} — ${p.size} sq. yd. (${statusTag})</option>`;
  });

  // Legend HTML (Always shown in the right column)
  const legendHtml = `
    <div class="inspector-legend-box" aria-label="Map Legend">
      <span class="inspector-legend-title">Map Legend</span>
      <div class="inspector-legend-grid">
        <span class="inspector-legend-item">
          <span class="legend-pin-swatch swatch-m4-avail"></span>
          <span>Available</span>
        </span>
        <span class="inspector-legend-item">
          <span class="legend-pin-swatch swatch-m4-sold"></span>
          <span>Sold Out</span>
        </span>
        <span class="inspector-legend-item">
          <span class="legend-pin-swatch swatch-m4-selected"></span>
          <span>Selected</span>
        </span>
        <span class="inspector-legend-item">
          <span class="legend-pin-swatch swatch-m4-reserved"></span>
          <span>Reserved / EV</span>
        </span>
      </div>
    </div>
  `;

  // Dropdown Selector HTML
  const selectorHtml = `
    <div class="inspector-selector-field">
      <label class="spec-label" for="inspectorPlotSelect">Choose from dropdown or click any plot on map</label>
      <select id="inspectorPlotSelect" class="inspector-select">
        ${optionsHtml}
      </select>
    </div>
  `;

  let detailsHtml = '';

  if (plot) {
    const statusClass = plot.reserved ? 'is-reserved' : plot.sold ? 'is-sold' : '';
    const statusLabel = plot.reserved ? plot.reserved : plot.sold ? 'Sold Out' : 'Available';
    const highlightsHtml = (plot.highlights || [])
      .map((h) => `<span class="inspector-hl-tag">${h}</span>`)
      .join('');

    const actionBtnHtml = plot.reserved
      ? `<button type="button" class="btn btn-outline-light btn-pill btn-block" disabled style="opacity:0.55; cursor:not-allowed;">${plot.reserved} — Not for Sale</button>`
      : `<button type="button" class="btn btn-gold btn-pill btn-block" id="inspectorEnquireBtn">
           Enquire About Plot #${plot.label}
         </button>`;

    detailsHtml = `
      <div>
        <span class="inspector-kicker">Block ${plot.block} &middot; ${plot.road} FT Road Frontage</span>
        <div class="inspector-heading-row">
          <h3 class="inspector-heading">Plot #${plot.label}</h3>
          <span class="inspector-status-pill ${statusClass}">${statusLabel}</span>
        </div>
        <p class="inspector-desc" style="margin-top: 8px;">${plot.desc}</p>
      </div>

      <div class="inspector-specs">
        <div class="inspector-spec-cell">
          <span class="spec-label">Plot Size</span>
          <span class="spec-value">${plot.size.toFixed(1)} sq. yd.</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Direction</span>
          <span class="spec-value">${plot.facing} Facing</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Abutting Road</span>
          <span class="spec-value">${plot.road} FT Wide</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Position</span>
          <span class="spec-value">${plot.corner ? 'Corner Plot' : 'Regular Plot'}</span>
        </div>
      </div>

      <div>
        <span class="spec-label" style="display:block; margin-bottom:6px;">Highlights</span>
        <div class="inspector-highlights">${highlightsHtml}</div>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        ${actionBtnHtml}
      </div>
    `;
  } else {
    // Overview state before a specific plot is chosen (shows township summary + prompt)
    detailsHtml = `
      <div>
        <span class="inspector-kicker">Interactive Layout Plan</span>
        <div class="inspector-heading-row">
          <h3 class="inspector-heading">Select a Plot (01–104)</h3>
        </div>
        <p class="inspector-desc" style="margin-top: 8px;">
          Click any numbered plot directly on the master plan or select a plot number from the dropdown above to zoom in and view its exact size, direction, road width and availability.
        </p>
      </div>

      <div class="inspector-specs">
        <div class="inspector-spec-cell">
          <span class="spec-label">Approx. plot sizes</span>
          <span class="spec-value">120–550 sq. yd.</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Internal roads</span>
          <span class="spec-value">30 &amp; 40 FT</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Abutting highway</span>
          <span class="spec-value">150 FT</span>
        </div>
        <div class="inspector-spec-cell">
          <span class="spec-label">Total plots</span>
          <span class="spec-value">104 Plots</span>
        </div>
      </div>

      <button type="button" class="btn btn-gold btn-pill btn-block" id="inspectorEnquireBtn">
        Enquire About Available Plots
      </button>
    `;
  }

  inspector.innerHTML = `
    ${legendHtml}
    ${selectorHtml}
    ${detailsHtml}
  `;

  const selectEl = document.getElementById('inspectorPlotSelect');
  if (selectEl && typeof onSelectPlot === 'function') {
    selectEl.addEventListener('change', () => {
      const val = selectEl.value ? Number(selectEl.value) : null;
      onSelectPlot(val);
    });
  }

  const enquireBtn = document.getElementById('inspectorEnquireBtn');
  if (enquireBtn) {
    enquireBtn.addEventListener('click', () => {
      if (plot) {
        openPlotEnquiryModal(plot.label, `${plot.size.toFixed(1)}`, `${plot.road} FT`);
      } else {
        openPlotEnquiryModal('General Plot Enquiry', '', '');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. PLOT FINDER (2 Filters: Plot Size & Road Width)
   -------------------------------------------------------------------------- */
function initPlotFinder() {
  const sizeChips = document.querySelectorAll('.chip-size');
  const roadChips = document.querySelectorAll('.chip-road');
  const resetBtn = document.getElementById('resetFiltersBtn');

  let activeSize = 'all';
  let activeRoad = 'Either';

  const SIZE_LABELS = {
    '120-150': 'up to 150 sq. yd.',
    '150-200': '151–200 sq. yd.',
    '200-300': '201–300 sq. yd.',
    '300+': 'above 300 sq. yd.'
  };

  // Dim map plots that fall outside the active filters (null = compute from MJR_PLOTS or show all)
  const highlightOnMap = (matchSet) => {
    const isFiltered = activeSize !== 'all' || activeRoad !== 'Either';
    const data = window.MJR_PLOTS;
    document.querySelectorAll('.map-plot-node').forEach(node => {
      const plotNum = node.getAttribute('data-plot-num');
      let dim = false;
      if (isFiltered) {
        if (matchSet !== null) {
          dim = !matchSet.has(String(plotNum));
        } else if (data && data.byNo[Number(plotNum)]) {
          const p = data.byNo[Number(plotNum)];
          const matchSize = activeSize === 'all' || getBucket(p.size) === activeSize;
          const matchRoad = activeRoad === 'Either' || `${p.road} FT` === activeRoad;
          dim = !(matchSize && matchRoad);
        }
      }
      node.classList.toggle('is-filtered-out', dim);
      node.classList.toggle('is-dimmed', dim);
    });
  };

  const getBucket = (area) => {
    if (!area) return 'all';
    if (area <= 150) return '120-150';
    if (area <= 200) return '150-200';
    if (area <= 300) return '200-300';
    return '300+';
  };

  const renderSchedule = () => {
    const grid = document.getElementById('finderResultsGrid');
    const countEl = document.getElementById('finderMatchCount');
    if (!grid) return;

    if (PLOTS_RECORDS.length === 0) {
      const sizeText = activeSize === 'all' ? '120–550 sq. yd.' : SIZE_LABELS[activeSize];
      const roadText = activeRoad === 'Either' ? '30 & 40 FT roads' : `${activeRoad} road`;
      highlightOnMap(null);
      if (countEl) {
        countEl.textContent = `Your preference: ${sizeText}, ${roadText}`;
      }
      grid.innerHTML = `
        <div class="schedule-empty-card">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
              Request plots matching ${sizeText} on ${roadText}
            </h3>
            <p style="font-size: 0.94rem; color: var(--text-secondary);">
              Leave your number, and our team will share the official plot schedule, exact dimensions and current availability from the layout sheet.
            </p>
          </div>
          <button type="button" class="btn btn-gold btn-pill" onclick="openPlotEnquiryModal('Preference: ${sizeText} (${roadText})', '', '')">
            Get Matching Plots
          </button>
        </div>
      `;
      return;
    }

    const filtered = PLOTS_RECORDS.filter(p => {
      const matchSize = activeSize === 'all' || getBucket(p.areaSqYd) === activeSize;
      const matchRoad = activeRoad === 'Either' || p.roadWidth === activeRoad;
      return matchSize && matchRoad;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} of ${PLOTS_RECORDS.length} plots match`;
    }
    highlightOnMap(new Set(filtered.map(p => String(p.number))));

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="schedule-empty-card">
          <p style="font-size: 0.95rem; color: var(--text-secondary);">No plots match the selected combination.</p>
          <button type="button" class="btn btn-outline btn-sm" id="emptyResetBtn">Reset Filters</button>
        </div>
      `;
      const emptyReset = document.getElementById('emptyResetBtn');
      if (emptyReset) emptyReset.addEventListener('click', resetAll);
      return;
    }

    let rows = filtered.map(p => `
      <tr>
        <td><strong>Plot #${p.number}</strong></td>
        <td>${p.areaSqYd ? `${p.areaSqYd} sq. yd.` : '—'}</td>
        <td>${p.roadWidth || '—'}</td>
        <td>${p.facing || '—'}</td>
        <td>${p.status || 'Available'}</td>
        <td style="text-align:right;">
          <button type="button" class="btn btn-gold btn-sm btn-pill" onclick="openPlotEnquiryModal('${p.number}', '${p.areaSqYd || ''}', '${p.roadWidth || ''}')">
            Enquire About This Plot
          </button>
        </td>
      </tr>
    `).join('');

    grid.innerHTML = `
      <div style="overflow-x:auto;">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Plot No.</th>
              <th>Area</th>
              <th>Road Width</th>
              <th>Facing</th>
              <th>Status</th>
              <th style="text-align:right;">Action</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  };

  const resetAll = () => {
    activeSize = 'all';
    activeRoad = 'Either';
    sizeChips.forEach(c => c.classList.toggle('active', c.dataset.value === 'all'));
    roadChips.forEach(c => c.classList.toggle('active', c.dataset.value === 'Either'));
    renderSchedule();
  };

  sizeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sizeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSize = chip.dataset.value;
      renderSchedule();
    });
  });

  roadChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roadChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeRoad = chip.dataset.value;
      renderSchedule();
    });
  });

  if (resetBtn) resetBtn.addEventListener('click', resetAll);
  renderSchedule();
}

/* --------------------------------------------------------------------------
   5. AMENITIES INTERACTIVE SHOWCASE
   -------------------------------------------------------------------------- */
function initAmenitiesShowcase() {
  const stageImgA = document.getElementById('amenityStageImgA');
  const stageImgB = document.getElementById('amenityStageImgB');
  const stageCaption = document.getElementById('amenityStageCaption');
  const prevBtn = document.getElementById('amenityPrevBtn');
  const nextBtn = document.getElementById('amenityNextBtn');
  const stepCountEl = document.getElementById('amenityStepCount');
  const detailCategoryEl = document.getElementById('amenityDetailCategory');
  const detailNameEl = document.getElementById('amenityDetailName');
  const detailDescEl = document.getElementById('amenityDetailDesc');
  const pillarBlocks = Array.from(document.querySelectorAll('.amenity-pillar-block'));
  const listItems = Array.from(document.querySelectorAll('.amenity-list-item'));
  const rowWraps = Array.from(document.querySelectorAll('.amenity-row-wrap'));

  if (!listItems.length) return;

  // E. Preload all amenity images to avoid flicker
  listItems.forEach(item => {
    const src = item.dataset.img;
    if (src) {
      const preload = new Image();
      preload.src = src;
    }
  });

  let activeIndex = listItems.findIndex(item => item.classList.contains('active'));
  if (activeIndex < 0) activeIndex = 0;

  let showingImgA = true;

  const crossfadePreview = (imgSrc, amenityName) => {
    if (stageCaption && amenityName) {
      stageCaption.textContent = amenityName;
    }
    if (!stageImgA || !stageImgB || !imgSrc) return;

    const currentImg = showingImgA ? stageImgA : stageImgB;
    const nextImg = showingImgA ? stageImgB : stageImgA;

    if (currentImg.getAttribute('src') === imgSrc) {
      currentImg.alt = amenityName || '';
      return;
    }

    nextImg.src = imgSrc;
    nextImg.alt = amenityName || '';
    nextImg.removeAttribute('aria-hidden');
    currentImg.setAttribute('aria-hidden', 'true');

    nextImg.classList.add('is-visible');
    currentImg.classList.remove('is-visible');
    showingImgA = !showingImgA;
  };

  const selectAmenityByIndex = (index, options = {}) => {
    const { focusTab = false, toggleMobileInline = false } = options;
    const total = listItems.length;
    const normalizedIndex = ((index % total) + total) % total;
    const targetBtn = listItems[normalizedIndex];
    if (!targetBtn) return;

    const targetWrap = targetBtn.closest('.amenity-row-wrap');
    const wasAlreadyOpen = targetWrap && targetWrap.classList.contains('is-open');

    activeIndex = normalizedIndex;

    // Update all 10 tab buttons
    listItems.forEach((btn, idx) => {
      const isSelected = idx === activeIndex;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
      if (isSelected && focusTab) {
        btn.focus();
      }
    });

    // Update mobile inline image expansion (only one open at a time)
    rowWraps.forEach(wrap => {
      if (wrap === targetWrap) {
        if (toggleMobileInline && window.innerWidth < 768 && wasAlreadyOpen) {
          wrap.classList.remove('is-open');
        } else {
          wrap.classList.add('is-open');
        }
      } else {
        wrap.classList.remove('is-open');
      }
    });

    // F. Highlight the category block containing the active amenity
    const parentBlock = targetBtn.closest('.amenity-pillar-block');
    pillarBlocks.forEach(block => {
      const isActiveBlock = block === parentBlock;
      block.classList.toggle('active', isActiveBlock);
      const trigger = block.querySelector('.amenity-pillar-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', isActiveBlock ? 'true' : 'false');
      }
    });

    // E. Crossfade preview image & show only amenity name in caption
    crossfadePreview(targetBtn.dataset.img, targetBtn.dataset.name);

    // D. Update amenity details block below the sticky preview (category, name, description)
    if (detailCategoryEl && targetBtn.dataset.category) {
      detailCategoryEl.textContent = targetBtn.dataset.category;
    }
    if (detailNameEl && targetBtn.dataset.name) {
      detailNameEl.textContent = targetBtn.dataset.name;
    }
    if (detailDescEl && targetBtn.dataset.desc) {
      detailDescEl.textContent = targetBtn.dataset.desc;
    }

    // A. Update "X / 10" stepper indicator
    if (stepCountEl) {
      stepCountEl.textContent = `${activeIndex + 1} / ${total}`;
    }
  };

  // Row click & keyboard navigation (role="tab")
  listItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      selectAmenityByIndex(idx, { toggleMobileInline: true });
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        selectAmenityByIndex(activeIndex + 1, { focusTab: true });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        selectAmenityByIndex(activeIndex - 1, { focusTab: true });
      } else if (e.key === 'Home') {
        e.preventDefault();
        selectAmenityByIndex(0, { focusTab: true });
      } else if (e.key === 'End') {
        e.preventDefault();
        selectAmenityByIndex(listItems.length - 1, { focusTab: true });
      }
    });
  });

  // Category header trigger click (activates category + its first amenity, or toggles accordion on mobile)
  pillarBlocks.forEach(block => {
    const trigger = block.querySelector('.amenity-pillar-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && block.classList.contains('active')) {
          block.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          return;
        }
        const firstItem = block.querySelector('.amenity-list-item');
        if (firstItem) {
          const itemIdx = listItems.indexOf(firstItem);
          if (itemIdx !== -1) {
            selectAmenityByIndex(itemIdx);
          }
        }
      });
    }
  });

  // A. Previous / Next stepper arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      selectAmenityByIndex(activeIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      selectAmenityByIndex(activeIndex + 1);
    });
  }

  // Initialize state cleanly
  selectAmenityByIndex(activeIndex);
}

/* --------------------------------------------------------------------------
   6. LOCATION INTERACTIVE CORRIDORS
   -------------------------------------------------------------------------- */
function initLocationShowcase() {
  const cards = document.querySelectorAll('.location-corridor-card');
  const videoEl = document.getElementById('locationVideo');
  const titleEl = document.getElementById('locationMediaTitle');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const vSrc = card.dataset.video;
      const vTitle = card.dataset.title;
      if (titleEl && vTitle) titleEl.textContent = vTitle;
      if (videoEl && vSrc) {
        const source = videoEl.querySelector('source');
        if (source && source.getAttribute('src') !== vSrc) {
          source.setAttribute('src', vSrc);
          videoEl.load();
          videoEl.play().catch(() => { });
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFAQ() {
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = card.classList.contains('active');
        faqCards.forEach(c => {
          c.classList.remove('active');
          const t = c.querySelector('.faq-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          card.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   8. MODALS & FORMS
   -------------------------------------------------------------------------- */
function initModals() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const modalMap = {
    'site-visit': document.getElementById('modalSiteVisit'),
    'brochure': document.getElementById('modalBrochure')
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-open-modal');
      const targetModal = modalMap[key];
      if (targetModal) openModal(targetModal);
    });
  });

  document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

window.openPlotEnquiryModal = function (plotNum, area, road) {
  const modal = document.getElementById('modalPlotEnquiry');
  const inputNum = document.getElementById('enquiryPlotNumber');
  const detail = document.getElementById('enquiryPlotDetail');

  if (inputNum) inputNum.value = plotNum;
  if (detail) {
    const parts = [`Plot ${plotNum}`];
    if (area) parts.push(`${area} sq. yd.`);
    if (road) parts.push(road);
    detail.textContent = `${parts.join(' · ')} — Leave your number, and our team will call with current prices and payment details.`;
  }
  openModal(modal);
};

function initForms() {
  const mainForm = document.getElementById('mainEnquiryForm');
  const chips = document.querySelectorAll('.interest-chip');
  const hiddenInput = document.getElementById('selectedInterestInput');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      if (hiddenInput) hiddenInput.value = chip.dataset.val;
    });
  });

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('mainFormFeedback');
      if (feedback) feedback.style.display = 'block';
      mainForm.reset();
    });
  }

  document.querySelectorAll('.modal-dialog form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you. Our team will call you shortly to share pricing and availability and to answer your questions.');
      closeAllModals();
      form.reset();
    });
  });
}

/* --------------------------------------------------------------------------
   9. STICKY MOBILE BAR AUTO-HIDE
   -------------------------------------------------------------------------- */
function initStickyMobileBar() {
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  if (!stickyBar) return;

  let isFormInView = false;
  let isInspectorInView = false;
  let isKeyboardOpen = false;

  const updateVisibility = () => {
    const isModalOpen = document.querySelector('.modal-backdrop.open') !== null;
    if (isFormInView || isInspectorInView || isKeyboardOpen || isModalOpen) {
      stickyBar.classList.add('is-hidden');
      stickyBar.setAttribute('aria-hidden', 'true');
    } else {
      stickyBar.classList.remove('is-hidden');
      stickyBar.removeAttribute('aria-hidden');
    }
  };

  const contactSection = document.getElementById('contact');
  if (contactSection && 'IntersectionObserver' in window) {
    const formObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isFormInView = entry.isIntersecting;
        updateVisibility();
      });
    }, { threshold: 0.08 });
    formObserver.observe(contactSection);
  }

  const plotInspector = document.getElementById('plotInspector');
  if (plotInspector && 'IntersectionObserver' in window) {
    const inspectorObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isInspectorInView = entry.isIntersecting;
        updateVisibility();
      });
    }, { threshold: 0.25 });
    inspectorObserver.observe(plotInspector);
  }

  document.addEventListener('focusin', (e) => {
    if (e.target && e.target.matches('input, select, textarea')) {
      isKeyboardOpen = true;
      updateVisibility();
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target && e.target.matches('input, select, textarea')) {
      setTimeout(() => {
        const active = document.activeElement;
        isKeyboardOpen = !!(active && active.matches && active.matches('input, select, textarea'));
        updateVisibility();
      }, 100);
    }
  });

  if (window.visualViewport) {
    const initialHeight = window.innerHeight;
    window.visualViewport.addEventListener('resize', () => {
      isKeyboardOpen = window.visualViewport.height < initialHeight * 0.78;
      updateVisibility();
    });
  }
}