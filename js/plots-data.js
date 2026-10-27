/* MJR Township plot data.
   Positions (x, y) are pixel centres on "Top-Down Residential Landscape Masterplan.png"
   (1606 x 979), traced from the final layout plan. Sizes, facing and availability are
   working values: replace them with the sales team's schedule before launch. */
(() => {
  const IMG_W = 1606;
  const IMG_H = 979;

  // Sold plots (from the selection card design, plus a few further up the layout)
  const SOLD = new Set([3, 9, 11, 15, 17, 20, 23, 25, 27, 30, 32, 35, 52, 57, 66, 70, 75, 88, 91, 99]);

  const plots = {};
  const add = (n, x, y, a) => { plots[n] = { n, x, y, ...a }; };

  // Lay a row of plot numbers evenly between x0 and x1 (centres)
  const row = (nums, x0, x1, y, a) => {
    const step = nums.length > 1 ? (x1 - x0) / (nums.length - 1) : 0;
    nums.forEach((n, i) => add(n, x0 + step * i, y, {
      ...a,
      first: i === 0,
      last: i === nums.length - 1,
    }));
  };
  const range = (a, b) => { const r = []; const s = a <= b ? 1 : -1; for (let i = a; i !== b + s; i += s) r.push(i); return r; };

  /* Block A: top-left, between the two upper 30 FT roads */
  row(range(94, 103), 183, 503, 217, { block: 'A', side: 'top', road: 30, size: 167.3 });
  row(range(93, 84), 183, 503, 272, { block: 'A', side: 'bottom', road: 30, size: 167.3 });

  /* Block B: upper triangle beside the 30 FT vertical road */
  add(104, 590, 220, { block: 'B', side: 'top', road: 30, size: 512.6, first: true, last: true, irregular: true });
  row(range(83, 80), 574, 688, 272, { block: 'B', side: 'bottom', road: 30, size: 181.5 });

  /* Block C: left middle, 30 FT road above, 40 FT road below */
  row(range(62, 72), 166, 504, 355, { block: 'C', side: 'top', road: 30, size: 160.4 });
  row(range(61, 51), 166, 504, 412, { block: 'C', side: 'bottom', road: 40, size: 160.4 });

  /* Block D: centre middle */
  const dx = (c) => 576 + 40.6 * c;
  range(73, 78).forEach((n, i) => add(n, dx(i), 355, { block: 'D', side: 'top', road: 30, size: 200.0, first: i === 0 }));
  add(44, dx(6), 384, { block: 'D', side: 'top', road: 30, size: 376.8, irregular: true });
  add(79, dx(7), 355, { block: 'D', side: 'top', road: 30, size: 214.2, last: true, irregular: true });
  range(50, 45).forEach((n, i) => add(n, dx(i), 412, { block: 'D', side: 'bottom', road: 40, size: 200.0, first: i === 0 }));
  add(43, dx(7), 412, { block: 'D', side: 'bottom', road: 40, size: 238.9, last: true, irregular: true });

  /* 42: small parcel beside the social infrastructure */
  add(42, 940, 412, { block: 'S', side: 'bottom', road: 40, size: 261.4, first: true, last: true, irregular: true });

  /* Block E: centre, 40 FT road above, 30 FT road below, open space to the west */
  row(range(41, 34), 575, 860, 505, { block: 'E', side: 'top', road: 40, size: 211.1 });
  row(range(19, 26), 575, 860, 565, { block: 'E', side: 'bottom', road: 30, size: 211.1 });

  /* Block F: right of the 40 FT vertical road */
  const fx = (c) => 936 + 41 * c;
  range(33, 31).forEach((n, i) => add(n, fx(i), 505, { block: 'F', side: 'top', road: 40, size: 218.7, first: i === 0 }));
  add(30, fx(3), 535, { block: 'F', side: 'top', road: 40, size: 448.2, last: true, irregular: true });
  range(27, 29).forEach((n, i) => add(n, fx(i), 565, { block: 'F', side: 'bottom', road: 30, size: 218.7, first: i === 0, last: i === 2 }));

  /* Block G: on the 150 FT main road, left of the 40 FT entrance road */
  add(18, 612, 668, { block: 'G', side: 'main', road: 150, size: 538.4, first: true, irregular: true });
  row(range(17, 13), 664, 856, 690, { block: 'G', side: 'main', road: 150, size: 395.6 });
  plots[17].first = false;

  /* Block H: on the 150 FT main road, right of the entrance road */
  range(12, 1).forEach((n, i) => {
    const tri = i >= 9; // 3, 2, 1 taper into the triangle
    add(n, 935 + 40.4 * i + (tri ? (i - 8) * 6 : 0), tri ? 700 + (i - 8) * 8 : 690, {
      block: 'H', side: 'main', road: 150,
      size: tri ? [392.5, 356.0, 328.7][i - 9] : 410.1,
      first: i === 0, last: i === 11, irregular: tri,
    });
  });

  /* ---------- Derived characteristics ---------- */
  const OPEN = new Set([94, 95, 96, 93, 92, 62, 61, 41, 40, 19, 20, 18, 17]);
  const OPEN_FACING = new Set([41, 19, 18, 62, 61]);
  const SOCIAL = new Set([80, 81, 79, 43, 42, 30, 29, 31]);
  const UTILITY = new Set([97, 98, 99, 100, 101]);
  const ENTRANCE = new Set([13, 14, 12, 11, 34, 26, 33, 27]);
  // Plot ends that meet a road on their side
  const cornerAt = (p) => {
    if (p.irregular && !['G', 'H'].includes(p.block)) return p.n === 104 || p.n === 79 || p.n === 43;
    if (p.block === 'A') return p.last; // west end of A is the outer boundary
    if (p.block === 'C') return p.last;
    if (p.block === 'G') return p.last || p.first;
    if (p.block === 'H') return p.first;
    return p.first || p.last && p.block !== 'F';
  };

  const pad = (n) => String(n).padStart(2, '0');

  Object.values(plots).forEach((p) => {
    p.sold = SOLD.has(p.n);
    p.corner = cornerAt(p);
    p.mainRoad = p.road === 150;
    p.nearMain = p.mainRoad || (p.block === 'E' && p.side === 'bottom') || (p.block === 'F' && p.side === 'bottom');
    p.open = OPEN.has(p.n);
    p.edge = (p.block === 'A' || p.block === 'C') && p.first || p.irregular;

    // Facing follows the road the plot fronts; corners take the side road as well
    const base = p.side === 'top' ? 'North' : 'South';
    const ew = p.corner ? (p.first ? 'West' : 'East') : '';
    p.facing = ew ? `${base}-${ew}` : base;

    // Highlight selection in priority order: unique -> road -> location -> other
    const tags = [];
    const push = (t) => { if (!tags.includes(t) && tags.length < 4) tags.push(t); };
    if (p.corner) push('Corner Plot');
    if (p.mainRoad) push(p.corner ? 'Multiple Road Access' : '150 FT Main Road Facing');
    else if (p.nearMain) push('Near 150 FT Main Road');
    if (p.road === 40) push('40 FT Road');
    if (p.corner || p.mainRoad) push(p.mainRoad ? 'Wide Frontage' : 'Wide Road Frontage');
    if (ENTRANCE.has(p.n)) push('Near Entrance');
    if (OPEN_FACING.has(p.n)) push('Open Space Facing');
    else if (p.open) push('Near Open Space');
    if (SOCIAL.has(p.n)) push('Near Social Infrastructure');
    if (UTILITY.has(p.n)) push('Near Public Utility');
    if (p.road === 30 && !p.mainRoad) push('30 FT Road');
    if (p.irregular) push(p.size > 400 ? 'Large Plot' : 'Irregular Plot');
    else if (p.edge) push('Edge Plot');
    if (tags.length < 3) push(p.corner || p.edge ? 'Good Visibility' : 'Internal Plot');
    p.highlights = tags;

    // One sentence on the strongest differentiator
    if (p.mainRoad && p.corner) p.desc = 'A corner plot on the 150 FT main road with frontage on two roads.';
    else if (p.mainRoad && p.irregular) p.desc = 'A generously sized plot at the tip of the layout, fronting the 150 FT main road.';
    else if (p.mainRoad) p.desc = 'A well-positioned residential plot with direct frontage on the 150 FT main road.';
    else if (p.corner) p.desc = 'A spacious corner plot with excellent road frontage and convenient access.';
    else if (OPEN_FACING.has(p.n)) p.desc = 'A well-positioned plot looking straight onto the open space.';
    else if (p.open) p.desc = 'A well-positioned plot a short walk from the open space.';
    else if (p.irregular) p.desc = 'A larger, irregular plot at the edge of the layout with extra room to plan.';
    else if (SOCIAL.has(p.n)) p.desc = 'A quiet plot close to the social infrastructure.';
    else if (p.road === 40) p.desc = 'A residential plot with frontage on a wide 40 FT internal road.';
    else if (p.nearMain) p.desc = 'A residential plot one block from the 150 FT main road.';
    else p.desc = 'A regular plot on a quiet 30 FT internal road, away from main-road traffic.';

    p.label = pad(p.n);
    p.px = p.x / IMG_W; // fractions of the plan image
    p.py = p.y / IMG_H;
  });

  window.MJR_PLOTS = { list: range(1, 104).map((n) => plots[n]), byNo: plots, IMG_W, IMG_H };
})();
