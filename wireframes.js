// ============================================================
// TGP Homepage — 8 wireframe variations
// Each variation returns { desktop: HTML, mobile: HTML, notes: [] }
// Layouts are absolutely-positioned on a 1440×1100 (desktop) or 375×780 (mobile) canvas
// using % units so they scale with the .sheet aspect-ratio container.
// ============================================================

// ----- tiny HTML helpers -----
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const el = (tag, attrs = {}, children = '') => {
  const a = Object.entries(attrs).map(([k,v]) => ` ${k}="${esc(v)}"`).join('');
  return `<${tag}${a}>${Array.isArray(children) ? children.join('') : children}</${tag}>`;
};
// position helper: pos(top, left, width, height) -> style string
const pos = (t, l, w, h) => `position:absolute; top:${t}%; left:${l}%; width:${w}%; height:${h}%;`;

// a line stack in a card
const lines = (count = 3, opts = {}) => {
  let out = '';
  for (let i = 0; i < count; i++) {
    const cls = i === count - 1 ? 'line thin short' : 'line thin';
    out += `<div class="${cls}"></div>`;
  }
  return out;
};

// headline block (kicker + big bars + lines)
const story = ({ kicker, kind = 'oxblood', hdSize = 'sm', hdLines = 2, bodyLines = 2, short = false, pad = 10 } = {}) => {
  let hd = '';
  for (let i = 0; i < hdLines; i++) {
    hd += `<div class="hd ${hdSize} ${i === hdLines-1 && short ? 'short' : ''}"></div>`;
  }
  return `<div style="padding:${pad}px; height:100%; overflow:hidden;">
    ${kicker ? `<div class="kicker ${kind}">${esc(kicker)}</div>` : ''}
    ${hd}
    <div style="height:6px"></div>
    ${lines(bodyLines)}
  </div>`;
};

// masthead (full width centered)
const masthead = (size = 48, tagline = true, dateline = true) => `
  <div style="padding: 16px 12px 10px; text-align:center;">
    <div class="mast" style="font-size:${size}px;">The Global Polymath</div>
    ${tagline ? `<div class="tagline" style="margin-top:6px;">Where Empirical Science Meets Human Philosophy &amp; Jurisprudence</div>` : ''}
    <div class="rule double" style="margin: 10px 0 6px;"></div>
    ${dateline ? `<div class="dateline-sm" style="display:flex; justify-content:space-between; padding: 0 8px;">
      <span>Vol. I · No. 4</span>
      <span>Saturday, April 18, 2026</span>
      <span>globalpolymath.com</span>
    </div>` : ''}
  </div>
`;

// top utility bar (lang/sub/search)
const topbar = () => `
  <div style="display:flex; justify-content:space-between; align-items:center; padding: 6px 14px; font-family:'Inter',sans-serif; font-size:9px; letter-spacing:0.08em; text-transform:uppercase; color:#6b6456; border-bottom: 1px solid #C9B99A;">
    <span>EN · EDITION: INTL</span>
    <span style="color:#1B3358; font-weight:600;">Subscribe · Sign In · ⌕ Search</span>
  </div>
`;

// nav strip
const navstrip = () => `
  <div style="display:flex; justify-content:center; gap: 18px; padding: 8px 12px; font-family:'Inter',sans-serif; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#1B3358; font-weight:600; border-top: 3px double #1B3358; border-bottom: 1px solid #1B3358;">
    <span>Today's Imperatives</span><span>Legal</span><span>The Lyceum</span><span>Science</span><span>Psychology</span><span>Literature</span><span>Economy</span><span>Opinion</span>
  </div>
`;

// ============================================================
// VARIATION 1 — The Broadsheet, Faithful (NYT-style 5-col)
// ============================================================
const v1 = {
  title: 'The Broadsheet, Faithful',
  desc: "A traditional 5-column front page — pinned masthead, dominant lead on the left, stacked secondaries, sidebar for Today's Imperatives. The register that TGP's founder described.",
  notes: [
    { kind: 'Hero', text: 'Single lead with full-column deck & lede paragraph — classical front-page.' },
    { kind: 'Columns', text: '5-col grid w/ hairline rules. Left rail = Today\'s Imperatives. Right rail = Opinion + Newsletter sign-up.' },
    { kind: 'Risk', text: 'Density may read as "dated" to web-first readers. Great for authority.' }
  ],
  desktop: () => `
    <div class="wire">
      ${topbar()}
      ${masthead(56)}
      ${navstrip()}
      <div style="flex:1; display:grid; grid-template-columns: 1fr 2.2fr 2.2fr 1.2fr; gap: 0; border-top: 1px solid #C9B99A;">

        <!-- Left rail: Today's Imperatives -->
        <div style="border-right: 1px solid #C9B99A; padding: 12px 10px;">
          <div class="kicker oxblood" style="font-size:9px;">Today's Imperatives</div>
          <div class="rule gold" style="margin: 6px 0;"></div>
          <div class="hd xs"></div><div class="hd xs short"></div>
          <div style="height:6px"></div>${lines(3)}
          <div class="rule" style="margin: 10px 0; opacity:0.3;"></div>
          <div class="kicker">Briefing</div>
          <div class="hd xs"></div><div class="hd xs short"></div>
          <div style="height:4px"></div>${lines(2)}
          <div class="rule" style="margin: 10px 0; opacity:0.3;"></div>
          <div class="hd xs"></div><div class="hd xs short"></div>
          <div style="height:4px"></div>${lines(2)}
          <div class="rule" style="margin: 10px 0; opacity:0.3;"></div>
          <div class="hd xs"></div>
          <div style="height:4px"></div>${lines(2)}
        </div>

        <!-- Center: LEAD story -->
        <div style="border-right: 1px solid #C9B99A; padding: 14px 16px;">
          <div class="kicker forest">Science · Lead</div>
          <div class="hd" style="height:20px;"></div>
          <div class="hd" style="height:20px;"></div>
          <div class="hd short" style="height:20px;"></div>
          <div style="height:8px"></div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:11px; color:#3B362C; line-height:1.3;">A pioneering study from Dhaka raises a jurisprudential puzzle for the clean-energy age.</div>
          <div class="img-ph" style="margin-top: 12px; height: 180px;"></div>
          <div style="font-family:'Source Serif 4',serif; font-style:italic; font-size:9px; color:#6b6456; margin-top:4px;">A solar array under construction near Savar. — Our correspondent</div>
          <div style="height:10px"></div>
          ${lines(5)}
        </div>

        <!-- Center-right: two stacked secondaries -->
        <div style="border-right: 1px solid #C9B99A;">
          <div style="padding: 14px 14px; border-bottom: 1px solid #EDE4CE;">
            ${story({ kicker: 'Legal Perspective', kind: 'oxblood', hdSize: 'sm', hdLines: 3, short: true, pad: 0 })}
            <div class="img-ph" style="margin-top: 8px; height: 100px;"></div>
            <div style="height:6px"></div>${lines(2)}
          </div>
          <div style="padding: 14px 14px;">
            ${story({ kicker: 'The Lyceum', kind: 'aubergine', hdSize: 'xs', hdLines: 2, short: true, pad: 0, bodyLines: 3 })}
            <div class="rule" style="margin: 12px 0; opacity:0.3;"></div>
            ${story({ kicker: 'Global Economy', kind: 'gold', hdSize: 'xs', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          </div>
        </div>

        <!-- Right rail: Opinion + Newsletter -->
        <div style="padding: 12px 10px; background: rgba(201,169,97,0.06);">
          <div class="kicker">Opinion</div>
          <div class="rule gold" style="margin: 6px 0;"></div>
          <div class="hd xs"></div><div class="hd xs short"></div>
          <div style="height:4px"></div>${lines(2)}
          <div style="display:flex; gap:6px; margin-top:8px;">
            <div style="width:24px; height:24px; border-radius:50%; background:#d9cfb8; border:1px solid #1a1814;"></div>
            <div style="flex:1">
              <div class="line thin short" style="width:50%;"></div>
              <div class="line thin" style="width:40%; opacity:0.25;"></div>
            </div>
          </div>
          <div class="rule" style="margin: 12px 0; opacity:0.3;"></div>
          <div class="kicker">Literature</div>
          <div class="hd xs"></div>
          <div style="height:4px"></div>${lines(2)}
          <div class="rule" style="margin: 12px 0; opacity:0.3;"></div>
          <div class="box" style="padding: 8px; background: rgba(27,51,88,0.06); border: 1px dashed #1B3358;">
            <div class="kicker">The Weekly Dispatch</div>
            <div class="line thin" style="width:90%;"></div>
            <div class="line thin" style="width:70%;"></div>
            <div style="margin-top:6px; background:#1B3358; color:#FBF7EE; font-family:'Inter'; font-size:8px; padding:4px 6px; letter-spacing:0.1em; text-transform:uppercase; text-align:center;">Subscribe →</div>
          </div>
        </div>
      </div>

      <div class="note" style="top: 8%; left: 26%; transform: rotate(-2deg);">LEAD · 5 col wide</div>
      <div class="note" style="top: 38%; left: 2%; font-size: 14px;">left rail = imperatives ticker</div>
      <div class="note" style="top: 38%; right: 2%; font-size: 14px;">newsletter anchor</div>
    </div>
  `,
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 10px 8px 6px; text-align:center;">
        <div class="mast" style="font-size:20px;">The Global Polymath</div>
        <div class="tagline" style="font-size:6px; margin-top:4px;">Where Empirical Science Meets Human Philosophy</div>
        <div class="rule double" style="margin: 6px 0;"></div>
        <div class="dateline-sm" style="font-size:6px;">Sat · Apr 18, 2026 · Vol. I</div>
      </div>
      <div style="display:flex; gap:8px; overflow:hidden; padding: 4px 8px; border-top: 1px solid #1B3358; border-bottom: 1px solid #1B3358;">
        <span style="font-family:'Inter'; font-size:7px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;">TODAY</span>
        <span style="font-family:'Inter'; font-size:7px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">LEGAL</span>
        <span style="font-family:'Inter'; font-size:7px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">LYCEUM</span>
        <span style="font-family:'Inter'; font-size:7px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">SCI</span>
        <span style="font-family:'Inter'; font-size:7px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">ECON</span>
      </div>
      <div style="padding: 12px;">
        <div class="kicker forest">Science · Lead</div>
        <div class="hd"></div><div class="hd"></div><div class="hd short"></div>
        <div class="img-ph" style="margin-top: 8px; height: 120px;"></div>
        <div style="height:8px"></div>${lines(4)}
      </div>
      <div style="padding: 0 12px 10px;">
        <div class="rule thick"></div>
        <div class="kicker oxblood" style="margin-top:8px;">Legal Perspective</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
        <div style="height:4px"></div>${lines(2)}
      </div>
      <div style="padding: 0 12px 10px;">
        <div class="rule" style="opacity:0.3"></div>
        <div class="kicker aubergine" style="margin-top:8px;">The Lyceum</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
      </div>
      <div class="note" style="top: 4%; right: 4%; font-size:13px;">hamburger ☰</div>
      <div class="note" style="top: 22%; left: 4%; font-size:13px;">horiz. scroll tabs</div>
    </div>
  `
};

// ============================================================
// VARIATION 2 — The Single Lead (Guardian-esque)
// ============================================================
const v2 = {
  title: 'The Single Lead',
  desc: 'One immersive hero dominates the viewport. Below it, honest stacked sections. Favours story over index.',
  notes: [
    { kind: 'Hero', text: 'Full-width hero w/ photo on left, headline overset on right. One story gets the whole top.' },
    { kind: 'Below', text: 'Four section bands stack — each reads as a mini-front-page.' },
    { kind: 'Register', text: 'Reads as "editorial" rather than "newspaper-of-record". More magazine.' }
  ],
  desktop: () => `
    <div class="wire">
      ${topbar()}
      <div style="display:grid; grid-template-columns: 1fr auto 1fr; align-items:center; padding: 10px 24px; border-bottom: 3px double #1B3358;">
        <div class="dateline-sm">SAT · APR 18, 2026</div>
        <div class="mast" style="font-size:36px;">The Global Polymath</div>
        <div style="text-align:right;"><span style="font-family:'Inter';font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#1B3358;font-weight:600;">⌕  Subscribe</span></div>
      </div>
      ${navstrip()}

      <!-- Hero: photo + overlay -->
      <div style="display:grid; grid-template-columns: 1.4fr 1fr; gap:0; border-bottom: 1px solid #C9B99A;">
        <div class="img-ph" style="height: 440px; border:none; border-right: 1px solid #C9B99A;"></div>
        <div style="padding: 40px 36px; display:flex; flex-direction:column; justify-content:center;">
          <div class="kicker forest">Science · The Lead Essay</div>
          <div class="rule gold" style="margin: 8px 0 16px; width:40px;"></div>
          <div class="hd" style="height:28px;"></div>
          <div class="hd" style="height:28px;"></div>
          <div class="hd short" style="height:28px;"></div>
          <div style="height:14px"></div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:#3B362C; line-height:1.4;">The quantum leap in green energy arrives with a puzzle for the courts; who owns the photons?</div>
          <div style="height:14px"></div>
          ${lines(4)}
          <div style="margin-top:12px; font-family:'Inter'; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#6b6456;">By An-Nisa Rahman · 14 min read</div>
        </div>
      </div>

      <!-- Three-column sections below -->
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0;">
        <div style="padding: 18px 20px; border-right: 1px solid #C9B99A;">
          ${story({ kicker: 'Legal Perspective', kind: 'oxblood', hdSize: 'sm', hdLines: 2, short: true, pad: 0, bodyLines: 3 })}
          <div class="rule" style="margin: 12px 0; opacity:0.3;"></div>
          ${story({ kicker: 'Jurisprudence', kind: 'oxblood', hdSize: 'xs', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
        </div>
        <div style="padding: 18px 20px; border-right: 1px solid #C9B99A;">
          ${story({ kicker: 'The Lyceum', kind: 'aubergine', hdSize: 'sm', hdLines: 2, short: true, pad: 0, bodyLines: 3 })}
          <div class="img-ph" style="margin-top: 10px; height: 90px;"></div>
        </div>
        <div style="padding: 18px 20px;">
          ${story({ kicker: 'Psychology', kind: 'gold', hdSize: 'sm', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          <div class="rule" style="margin: 12px 0; opacity:0.3;"></div>
          ${story({ kicker: 'Global Economy', kind: 'gold', hdSize: 'xs', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
        </div>
      </div>

      <div class="note" style="top: 18%; left: 3%; transform: rotate(-3deg);">one lead · editorial</div>
      <div class="note bubble" style="top: 24%; left: 52%;">deck in Cormorant italic</div>
      <div class="note" style="bottom: 8%; left: 3%;">sections as equal cols</div>
    </div>
  `,
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 8px 12px; text-align:center; border-bottom: 3px double #1B3358;">
        <div class="mast" style="font-size:16px;">The Global Polymath</div>
        <div class="dateline-sm" style="font-size:6px; margin-top:4px;">SAT · APR 18, 2026</div>
      </div>
      <div class="img-ph" style="height: 160px; margin: 0;"></div>
      <div style="padding: 12px;">
        <div class="kicker forest">Science · The Lead Essay</div>
        <div class="rule gold" style="margin: 6px 0 10px; width:30px;"></div>
        <div class="hd"></div><div class="hd"></div><div class="hd short"></div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:11px; color:#3B362C; margin-top:8px; line-height:1.3;">The quantum leap in green energy arrives with a puzzle for the courts.</div>
        <div style="height:8px"></div>${lines(3)}
      </div>
      <div style="padding: 10px 12px; border-top: 1px solid #C9B99A;">
        <div class="kicker oxblood">Legal Perspective</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
      </div>
      <div style="padding: 10px 12px; border-top: 1px solid #C9B99A;">
        <div class="kicker aubergine">The Lyceum</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
      </div>
      <div class="note" style="top: 20%; left: 4%; font-size:13px;">full-bleed hero img</div>
    </div>
  `
};

// ============================================================
// VARIATION 3 — The Index (front page = ToC)
// ============================================================
const v3 = {
  title: 'The Index',
  desc: 'A reading list disguised as a front page. Every section is given equal visual weight — no single "most important" story. Every headline sits on a numbered list, indexed.',
  notes: [
    { kind: 'Premise', text: 'Radical equality between pieces. For readers who come to TGP to browse, not be told what matters.' },
    { kind: 'Hero', text: 'No hero. Just the mark + an editor\'s note at top.' },
    { kind: 'Visual', text: 'Bylines, run-times, and section tags do a lot of heavy lifting. Photos small & aligned right.' }
  ],
  desktop: () => {
    const row = (n, kicker, kind, imgRight = true) => `
      <div style="display:grid; grid-template-columns: 40px 1fr 90px; gap: 20px; padding: 14px 0; border-bottom: 1px solid #EDE4CE; align-items:start;">
        <div style="font-family:'IBM Plex Mono',monospace; font-size:12px; color:#6b6456; padding-top:6px;">${n}</div>
        <div>
          <div class="kicker ${kind}">${kicker}</div>
          <div class="hd sm"></div>
          <div class="hd sm short"></div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:11px; color:#6b6456; margin-top:6px;">A short italicized deck sits here to summarize the piece in a single sentence.</div>
          <div style="margin-top:6px; font-family:'Inter'; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#9a9382;">BYLINE · 12 MIN</div>
        </div>
        ${imgRight ? '<div class="img-ph" style="height:70px;"></div>' : '<div></div>'}
      </div>`;
    return `
    <div class="wire">
      ${topbar()}
      ${masthead(52)}
      ${navstrip()}
      <div style="padding: 24px 60px;">
        <!-- Editor's note -->
        <div style="display:grid; grid-template-columns: 1fr 3fr; gap: 32px; padding-bottom: 20px; border-bottom: 3px double #1B3358;">
          <div>
            <div class="kicker">FROM THE EDITOR</div>
            <div style="font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#1B3358; line-height:1.15; margin-top: 6px;">Saturday's ledger — eight pieces to sit with.</div>
          </div>
          <div style="font-family:'Source Serif 4',serif; font-size:13px; color:#3B362C; line-height:1.6;">
            ${lines(4)}
          </div>
        </div>

        <!-- Index -->
        <div style="margin-top: 16px;">
          ${row('I', 'Science', 'forest')}
          ${row('II', 'Legal Perspective', 'oxblood')}
          ${row('III', 'The Lyceum', 'aubergine', false)}
          ${row('IV', 'Psychology', 'gold')}
          ${row('V', 'Literature', 'gold', false)}
          ${row('VI', 'Global Economy', '')}
          ${row('VII', 'Opinion', '')}
        </div>
      </div>

      <div class="note" style="top: 18%; left: 4%; transform: rotate(-3deg);">editor's note anchors</div>
      <div class="note bubble" style="top: 32%; right: 4%;">roman numerals = gravitas</div>
      <div class="note" style="bottom: 10%; left: 4%; font-size:14px;">no hero image — quieter</div>
    </div>
  `;
  },
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 10px 12px; text-align:center; border-bottom: 3px double #1B3358;">
        <div class="mast" style="font-size:18px;">The Global Polymath</div>
      </div>
      <div style="padding: 14px 14px 8px; border-bottom: 1px solid #C9B99A;">
        <div class="kicker">FROM THE EDITOR</div>
        <div style="font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:#1B3358; margin-top: 4px; line-height:1.2;">Eight pieces to sit with.</div>
        <div style="height:4px"></div>${lines(2)}
      </div>
      ${['I','II','III','IV','V'].map((n,i) => `
        <div style="padding: 10px 14px; border-bottom: 1px solid #EDE4CE; display:grid; grid-template-columns: 24px 1fr; gap: 10px;">
          <div style="font-family:'IBM Plex Mono'; font-size:9px; color:#6b6456; padding-top:4px;">${n}</div>
          <div>
            <div class="kicker ${['forest','oxblood','aubergine','gold',''][i]}">${['Science','Legal','The Lyceum','Psych','Lit'][i]}</div>
            <div class="hd sm"></div>
            <div class="hd sm short"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

// ============================================================
// VARIATION 4 — The Split Authority (left rail masthead)
// ============================================================
const v4 = {
  title: 'The Split Authority',
  desc: 'Masthead held on a fixed left rail, stories scroll on the right. Modern newsroom take — lets the identity stay present without dominating the fold.',
  notes: [
    { kind: 'Masthead', text: 'Rotated 90° or stacked vertically in the rail. Emblem + nav live here.' },
    { kind: 'Fold', text: 'Right column is a dense feed; lead story sits at top, then two-up cards.' },
    { kind: 'Controversy', text: 'Violates the design system\'s "masthead is always centered, full-width" rule — but rule-breaking is on the table for wires.' }
  ],
  desktop: () => `
    <div class="wire" style="flex-direction: row;">
      <!-- Left rail -->
      <div style="width: 240px; border-right: 3px double #1B3358; padding: 24px 20px; display:flex; flex-direction: column; justify-content:space-between;">
        <div>
          <div style="width:48px; height:48px; border: 1.5px solid #1B3358; border-radius: 50%; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display'; font-weight:800; color:#1B3358; font-size:20px;">G</div>
          <div style="font-family:'Playfair Display',serif; font-weight:800; font-size:28px; color:#1B3358; line-height:0.95; text-transform:uppercase; margin-top: 14px; letter-spacing:-0.02em;">The<br/>Global<br/>Polymath</div>
          <div class="rule gold" style="margin: 14px 0;"></div>
          <div class="dateline-sm">SAT · APR 18, 2026</div>
          <div class="dateline-sm">VOL. I · NO. 4</div>
          <div style="margin-top: 28px;">
            ${['Today\'s Imperatives','Legal Perspective','The Lyceum','Science','Psychology','Literature','Economy','Opinion'].map(s => `
              <div style="font-family:'Inter'; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#1B3358; font-weight:600; padding: 7px 0; border-top: 1px solid #EDE4CE;">${s}</div>
            `).join('')}
          </div>
        </div>
        <div>
          <div class="box" style="padding: 10px; background: rgba(27,51,88,0.06); border: 1px dashed #1B3358;">
            <div class="kicker">Weekly Dispatch</div>
            <div class="line thin"></div>
            <div class="line thin short"></div>
            <div style="margin-top:6px; background:#1B3358; color:#FBF7EE; font-family:'Inter'; font-size:8px; padding:4px 6px; letter-spacing:0.1em; text-transform:uppercase; text-align:center;">Subscribe</div>
          </div>
        </div>
      </div>

      <!-- Right: feed -->
      <div style="flex:1; display:flex; flex-direction:column;">
        <div style="display:flex; justify-content:space-between; padding: 12px 24px; border-bottom: 1px solid #C9B99A;">
          <div class="dateline-sm">On the wire · live</div>
          <div style="font-family:'Inter'; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#1B3358;">⌕ Search · Sign in</div>
        </div>
        <!-- Lead story -->
        <div style="padding: 24px 28px; border-bottom: 1px solid #C9B99A;">
          <div class="kicker forest">Science · The Lead</div>
          <div class="hd" style="height:22px;"></div>
          <div class="hd" style="height:22px;"></div>
          <div class="hd short" style="height:22px;"></div>
          <div style="display:grid; grid-template-columns: 2fr 1fr; gap:24px; margin-top: 14px;">
            <div>
              <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:13px; color:#3B362C;">A pioneering study raises a jurisprudential puzzle for the clean-energy age.</div>
              <div style="height:10px"></div>${lines(4)}
            </div>
            <div class="img-ph" style="height:120px;"></div>
          </div>
        </div>

        <!-- Two-up cards -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0;">
          <div style="padding: 18px 28px; border-right: 1px solid #C9B99A; border-bottom: 1px solid #C9B99A;">
            ${story({ kicker: 'Legal Perspective', kind: 'oxblood', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          </div>
          <div style="padding: 18px 28px; border-bottom: 1px solid #C9B99A;">
            ${story({ kicker: 'The Lyceum', kind: 'aubergine', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          </div>
          <div style="padding: 18px 28px; border-right: 1px solid #C9B99A;">
            ${story({ kicker: 'Psychology', kind: 'gold', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          </div>
          <div style="padding: 18px 28px;">
            ${story({ kicker: 'Literature', kind: 'gold', hdLines: 2, short: true, pad: 0, bodyLines: 2 })}
          </div>
        </div>
      </div>

      <div class="note bubble" style="top: 6%; left: 18%;">masthead on rail — breaks DS rule?</div>
      <div class="note" style="top: 40%; right: 3%; transform: rotate(2deg);">2-up card grid</div>
    </div>
  `,
  mobile: () => `
    <div class="wire">
      <!-- Rail becomes top strip on mobile -->
      <div style="display:flex; align-items:center; gap: 10px; padding: 10px 12px; border-bottom: 3px double #1B3358;">
        <div style="width:28px; height:28px; border: 1px solid #1B3358; border-radius: 50%; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display'; font-weight:800; font-size:14px; color:#1B3358;">G</div>
        <div style="font-family:'Playfair Display',serif; font-weight:800; font-size:14px; color:#1B3358; text-transform:uppercase; line-height:1; letter-spacing:-0.01em;">The Global<br/>Polymath</div>
        <div style="flex:1"></div>
        <div class="dateline-sm" style="font-size:6px;">VOL. I · NO. 4</div>
      </div>
      <div style="padding: 12px;">
        <div class="kicker forest">Science · The Lead</div>
        <div class="hd"></div><div class="hd short"></div>
        <div class="img-ph" style="height:100px; margin-top:8px;"></div>
        <div style="height:6px"></div>${lines(3)}
      </div>
      <div style="padding: 10px 12px; border-top: 1px solid #C9B99A;">
        <div class="kicker oxblood">Legal</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
      </div>
      <div style="padding: 10px 12px; border-top: 1px solid #C9B99A;">
        <div class="kicker aubergine">The Lyceum</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
      </div>
    </div>
  `
};

// ============================================================
// VARIATION 5 — The Dispatch (Today / This Week / Long Reads)
// ============================================================
const v5 = {
  title: 'The Dispatch',
  desc: 'Three temporal bands: Today (fast), This Week (considered), The Long Reads (slow). Each band has its own grid rhythm. A reader orients by time rather than section.',
  notes: [
    { kind: 'IA', text: 'Temporal IA. Answers "what should I read right now?" vs "what should I save for Sunday?"' },
    { kind: 'Grid', text: 'Band 1 = 4 narrow columns (briefs). Band 2 = 2 medium (features). Band 3 = 1 wide (essay).' },
    { kind: 'Risk', text: 'Less "newspaper" than "magazine". May de-emphasize sections the founder cares about.' }
  ],
  desktop: () => {
    const band = (title, subtitle, cols, contents, accent = '#1B3358') => `
      <div style="border-bottom: 3px double ${accent}; padding: 18px 32px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 14px;">
          <div>
            <div class="kicker" style="color:${accent};">${title}</div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:#3B362C; margin-top:2px;">${subtitle}</div>
          </div>
          <div style="font-family:'Inter'; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">SEE ALL →</div>
        </div>
        <div style="display:grid; grid-template-columns: repeat(${cols}, 1fr); gap: 20px;">${contents}</div>
      </div>
    `;
    const brief = (kicker, kind) => `<div style="border-left: 1px solid #C9B99A; padding-left: 12px;">
      <div class="kicker ${kind}">${kicker}</div>
      <div class="hd xs"></div><div class="hd xs short"></div>
      <div style="height:4px"></div>${lines(2)}
      <div style="margin-top:6px; font-family:'Inter'; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#9a9382;">3 MIN</div>
    </div>`;
    const feature = (kicker, kind) => `<div>
      <div class="img-ph" style="height:140px;"></div>
      <div style="padding-top:10px;">
        <div class="kicker ${kind}">${kicker}</div>
        <div class="hd sm"></div><div class="hd sm short"></div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:12px; color:#6b6456; margin-top:4px;">A two-sentence deck introduces the feature and sets its register.</div>
        <div style="margin-top:6px; font-family:'Inter'; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#9a9382;">14 MIN</div>
      </div>
    </div>`;
    return `
    <div class="wire">
      ${topbar()}
      ${masthead(48)}
      ${band('TODAY · THE BRIEFING', "Tuesday's dispatches — 15 minutes or fewer.",
        4,
        brief('Dhaka','') + brief('Legal','oxblood') + brief('Sci','forest') + brief('Econ','gold'),
        '#1B3358')}
      ${band('THIS WEEK · FEATURES', 'The pieces to set your Thursday by.',
        2,
        feature('The Lyceum','aubergine') + feature('Science','forest'),
        '#7B2E2E')}
      <div style="padding: 18px 32px;">
        <div class="kicker" style="color:#B8862C;">THE LONG READS · SATURDAY ESSAYS</div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:#3B362C; margin-top:2px; margin-bottom: 16px;">Pour a long coffee; we won't be quick.</div>
        <div style="display:grid; grid-template-columns: 1.4fr 1fr; gap: 32px;">
          <div>
            <div class="hd" style="height:22px;"></div><div class="hd" style="height:22px;"></div><div class="hd short" style="height:22px;"></div>
            <div style="height:8px"></div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px; color:#3B362C;">A longer deck — two sentences — explaining why this matters, and who wrote it.</div>
            <div style="height:8px"></div>${lines(4)}
            <div style="margin-top:8px; font-family:'Inter'; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:#6b6456;">By Ishaan Dey · 48 MIN · The Lyceum</div>
          </div>
          <div class="img-ph" style="height:220px;"></div>
        </div>
      </div>

      <div class="note" style="top: 16%; left: 3%; transform: rotate(-2deg);">TODAY · 4-col briefs</div>
      <div class="note" style="top: 42%; left: 3%; transform: rotate(-1deg);">THIS WEEK · 2 features</div>
      <div class="note bubble" style="top: 74%; right: 4%;">SATURDAY ESSAY</div>
    </div>
  `;
  },
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 10px; text-align:center; border-bottom: 3px double #1B3358;">
        <div class="mast" style="font-size:16px;">The Global Polymath</div>
      </div>
      <div style="padding: 12px; border-bottom: 3px double #1B3358;">
        <div class="kicker">TODAY · THE BRIEFING</div>
        ${[0,1,2].map(()=>`
          <div style="display:grid; grid-template-columns: 20px 1fr; gap:8px; padding: 8px 0; border-bottom: 1px solid #EDE4CE;">
            <div style="font-family:'IBM Plex Mono'; font-size:8px; color:#6b6456;">•</div>
            <div><div class="hd xs"></div><div class="hd xs short"></div></div>
          </div>
        `).join('')}
      </div>
      <div style="padding: 12px; border-bottom: 3px double #7B2E2E;">
        <div class="kicker oxblood">THIS WEEK · FEATURES</div>
        <div class="img-ph" style="height:100px; margin-top:6px;"></div>
        <div class="hd sm" style="margin-top:6px;"></div><div class="hd sm short"></div>
      </div>
      <div style="padding: 12px;">
        <div class="kicker gold">LONG READS</div>
        <div class="hd"></div><div class="hd short"></div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:10px; margin-top:4px;">A longer deck for the essay.</div>
      </div>
    </div>
  `
};

// ============================================================
// VARIATION 6 — The Editor's Desk (curator-led)
// ============================================================
const v6 = {
  title: "The Editor's Desk",
  desc: "A curated, annotated front page. Each piece is introduced by a one-line editorial note in the margin. It feels like a journal handed to you by a thoughtful editor.",
  notes: [
    { kind: 'Voice', text: "Puts the editor's voice — the TGP 'we' — directly on the front page." },
    { kind: 'Layout', text: 'Story column center, margin notes left in italic Cormorant. Classic scholarly-margin treatment.' },
    { kind: 'Scale', text: 'Deliberately slower. Five pieces, not fifty. For the reader who wants to be guided.' }
  ],
  desktop: () => {
    const entry = (num, kicker, kind, editorNote) => `
      <div style="display:grid; grid-template-columns: 80px 260px 1fr 140px; gap: 32px; padding: 24px 0; border-bottom: 1px solid #EDE4CE; align-items:start;">
        <div style="font-family:'Playfair Display',serif; font-weight:800; font-size:36px; color:#C9A961; line-height:0.8;">${num}</div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:13px; color:#4B2E4F; line-height:1.35; text-align:right; padding-top:8px; border-right: 1px solid #C9B99A; padding-right: 16px;">
          <span style="font-family:'Inter'; font-size:8px; letter-spacing:0.14em; text-transform:uppercase; color:#6b6456; display:block; margin-bottom:4px; font-style:normal; font-weight:700;">— Editor's note</span>
          ${editorNote}
        </div>
        <div>
          <div class="kicker ${kind}">${kicker}</div>
          <div class="hd sm"></div>
          <div class="hd sm"></div>
          <div class="hd sm short"></div>
          <div style="height:6px"></div>
          ${lines(2)}
          <div style="margin-top:6px; font-family:'Inter'; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#9a9382;">BYLINE · 18 MIN</div>
        </div>
        <div class="img-ph" style="height:90px;"></div>
      </div>
    `;
    return `
    <div class="wire">
      ${topbar()}
      ${masthead(52)}
      ${navstrip()}
      <div style="padding: 28px 48px;">
        <div style="text-align:center; padding-bottom: 24px; border-bottom: 3px double #1B3358;">
          <div class="kicker" style="font-size:10px;">FROM THE EDITOR · SATURDAY, APRIL 18</div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:22px; color:#1B3358; line-height:1.35; max-width: 600px; margin: 10px auto 0;">"We ask, this week, what happens when science outruns the courts — and whether the courts, in turn, must learn to think in photons."</div>
          <div style="font-family:'Inter'; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#6b6456; margin-top:10px; font-weight:600;">— The editorial board</div>
        </div>

        ${entry('I', 'Science · Lead', 'forest', 'The most consequential study this quarter. Read it slowly.')}
        ${entry('II', 'Legal Perspective', 'oxblood', 'The legal answer has not yet been written; here is the argument that will shape it.')}
        ${entry('III', 'The Lyceum', 'aubergine', 'An essay that pairs well with the first two pieces — read after.')}
        ${entry('IV', 'Psychology', 'gold', 'A quieter piece. Useful for the commute home.')}
        ${entry('V', 'Literature', 'gold', 'Our Saturday essay, for the long afternoon.')}
      </div>

      <div class="note" style="top: 22%; left: 3%; transform: rotate(-4deg);">editor's quote = prime real estate</div>
      <div class="note bubble" style="top: 36%; right: 2%;">scholarly margin notes</div>
    </div>
  `;
  },
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 10px; text-align:center; border-bottom: 3px double #1B3358;">
        <div class="mast" style="font-size:16px;">The Global Polymath</div>
      </div>
      <div style="padding: 14px; border-bottom: 3px double #1B3358;">
        <div class="kicker" style="font-size:7px;">FROM THE EDITOR</div>
        <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:13px; color:#1B3358; line-height:1.3; margin-top:6px;">"We ask, this week, what happens when science outruns the courts."</div>
      </div>
      ${['I','II','III'].map((n,i)=>`
        <div style="padding: 14px; border-bottom: 1px solid #EDE4CE;">
          <div style="display:flex; gap:12px;">
            <div style="font-family:'Playfair Display'; font-weight:800; font-size:22px; color:#C9A961;">${n}</div>
            <div style="flex:1;">
              <div class="kicker ${['forest','oxblood','aubergine'][i]}">${['Science','Legal','The Lyceum'][i]}</div>
              <div class="hd sm"></div><div class="hd sm short"></div>
            </div>
          </div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:10px; color:#4B2E4F; margin-top:8px; padding-left: 34px; line-height:1.3;">Editor's note: read this one slowly.</div>
        </div>
      `).join('')}
    </div>
  `
};

// ============================================================
// VARIATION 7 — The Pillar Grid (sections as equal pillars)
// ============================================================
const v7 = {
  title: 'The Pillar Grid',
  desc: "The three intellectual pillars — science, law, philosophy — laid out as three full-height columns, each a mini-section-front. Humanities & social sciences sit below as a second tier.",
  notes: [
    { kind: 'Premise', text: "Makes the publication's thesis — 'empirical science × philosophy × jurisprudence' — the literal layout." },
    { kind: 'Hierarchy', text: 'Three equal pillars at the top. The secondary sections (psychology, lit, economy) fill the bottom band.' },
    { kind: 'Risk', text: 'May confuse readers looking for "the top story today". No single lead.' }
  ],
  desktop: () => {
    const pillar = (kicker, kind, pillar, accent) => `
      <div style="padding: 20px 22px; border-right: ${accent ? `3px solid ${accent}` : '1px solid #C9B99A'}; display:flex; flex-direction:column; gap:14px;">
        <div style="text-align:center; padding-bottom: 12px; border-bottom: 1px solid #C9B99A;">
          <div class="kicker ${kind}" style="font-size:11px;">${pillar}</div>
          <div style="font-family:'Playfair Display'; font-weight:800; font-size:22px; color:${accent || '#1B3358'}; line-height:1.05; margin-top: 4px;">${kicker}</div>
        </div>
        <div class="img-ph" style="height:110px;"></div>
        <div>
          <div class="kicker ${kind}" style="font-size:8px;">The Lead</div>
          <div class="hd sm"></div><div class="hd sm short"></div>
          <div style="height:4px"></div>${lines(3)}
        </div>
        <div style="border-top: 1px solid #EDE4CE; padding-top: 10px;">
          <div class="kicker" style="font-size:8px;">Also</div>
          <div class="hd xs"></div><div class="hd xs short"></div>
        </div>
        <div style="border-top: 1px solid #EDE4CE; padding-top: 10px;">
          <div class="kicker" style="font-size:8px;">And</div>
          <div class="hd xs"></div><div class="hd xs short"></div>
        </div>
      </div>
    `;
    return `
    <div class="wire">
      ${topbar()}
      ${masthead(48)}
      ${navstrip()}
      <!-- 3 Pillars -->
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; flex:1; border-bottom: 3px double #1B3358;">
        ${pillar('The Empirical', 'forest', 'I · SCIENCE', '#2E5339')}
        ${pillar('The Juridical', 'oxblood', 'II · LAW', '#7B2E2E')}
        ${pillar('The Philosophical', 'aubergine', 'III · PHILOSOPHY', '#4B2E4F')}
      </div>
      <!-- Second tier -->
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); padding: 16px 24px;">
        ${[
          {k: 'Psychology', kind:'gold'},
          {k: 'Literature', kind:'gold'},
          {k: 'Global Economy', kind:''},
          {k: 'Opinion', kind:''}
        ].map((s,i) => `
          <div style="padding: 0 18px; border-right: ${i < 3 ? '1px solid #C9B99A' : 'none'};">
            <div class="kicker ${s.kind}">${s.k}</div>
            <div class="hd xs"></div><div class="hd xs short"></div>
            <div style="height:4px"></div>${lines(2)}
          </div>
        `).join('')}
      </div>

      <div class="note" style="top: 28%; left: 32%; transform: rotate(-2deg); color: #2E5339;">three pillars = the thesis</div>
      <div class="note" style="bottom: 18%; right: 4%; font-size: 14px;">4-up secondary strip</div>
    </div>
  `;
  },
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 10px; text-align:center; border-bottom: 3px double #1B3358;">
        <div class="mast" style="font-size:16px;">The Global Polymath</div>
      </div>
      ${[
        { title: 'The Empirical', k: 'I · SCIENCE', kind: 'forest', accent: '#2E5339' },
        { title: 'The Juridical', k: 'II · LAW', kind: 'oxblood', accent: '#7B2E2E' },
        { title: 'The Philosophical', k: 'III · PHIL.', kind: 'aubergine', accent: '#4B2E4F' }
      ].map(p => `
        <div style="padding: 14px; border-bottom: 3px solid ${p.accent};">
          <div class="kicker ${p.kind}">${p.k}</div>
          <div style="font-family:'Playfair Display'; font-weight:800; font-size:16px; color:${p.accent}; margin-top:4px;">${p.title}</div>
          <div class="hd sm" style="margin-top:8px;"></div>
          <div class="hd sm short"></div>
        </div>
      `).join('')}
    </div>
  `
};

// ============================================================
// VARIATION 8 — The Scroll (chronological feed)
// ============================================================
const v8 = {
  title: 'The Scroll',
  desc: "A vertical scroll — newspaper-as-feed. Pieces appear in reverse-chronological order, tagged with their section. Sticky masthead stays above. For readers who return often.",
  notes: [
    { kind: 'IA', text: 'No hierarchy except recency + section kicker. Emphasizes active publishing cadence.' },
    { kind: 'Reading', text: 'Designed for return visits — like a Substack-style feed, but with TGP gravitas.' },
    { kind: 'Warning', text: 'Feels much less "newspaper". Might be the "what we publish daily" tab rather than the front page.' }
  ],
  desktop: () => {
    const scrollItem = (time, kicker, kind, hasImg = true) => `
      <div style="display:grid; grid-template-columns: 120px 1fr ${hasImg ? '180px' : '0px'}; gap: 32px; padding: 22px 0; border-bottom: 1px solid #EDE4CE; align-items:start;">
        <div style="padding-top:6px;">
          <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.08em; color:#6b6456; text-transform:uppercase;">${time}</div>
          <div class="kicker ${kind}" style="margin-top:4px;">${kicker}</div>
        </div>
        <div>
          <div class="hd sm"></div>
          <div class="hd sm short"></div>
          <div style="height:6px"></div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:13px; color:#3B362C; line-height:1.4;">A one-sentence italicized deck for the piece, kept short.</div>
          <div style="height:6px"></div>
          ${lines(2)}
          <div style="margin-top:6px; font-family:'Inter'; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#9a9382;">BYLINE · 14 MIN</div>
        </div>
        ${hasImg ? '<div class="img-ph" style="height:110px;"></div>' : '<div></div>'}
      </div>
    `;
    return `
    <div class="wire">
      ${topbar()}
      <!-- Compact sticky masthead -->
      <div style="display:grid; grid-template-columns: auto 1fr auto; align-items:center; padding: 12px 28px; border-top: 3px double #1B3358; border-bottom: 3px double #1B3358; background: #FBF7EE;">
        <div class="dateline-sm">SAT · APR 18, 2026</div>
        <div class="mast" style="font-size:24px;">The Global Polymath</div>
        <div style="text-align:right; font-family:'Inter'; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#1B3358; font-weight:600;">⌕ Filter by section ▾</div>
      </div>
      <!-- Filter chips -->
      <div style="display:flex; gap: 6px; padding: 10px 28px; border-bottom: 1px solid #C9B99A; flex-wrap:wrap;">
        ${['All','Science','Legal','Lyceum','Psych','Lit','Econ','Opinion'].map((s,i) => `
          <div style="font-family:'Inter'; font-size:10px; padding: 4px 10px; border-radius: 999px; border: 1px solid ${i===0 ? '#1B3358' : '#C9B99A'}; background: ${i===0 ? '#1B3358' : 'transparent'}; color: ${i===0 ? '#FBF7EE' : '#1B3358'}; letter-spacing:0.08em; text-transform:uppercase; font-weight:600;">${s}</div>
        `).join('')}
      </div>
      <!-- Scroll items -->
      <div style="padding: 8px 28px;">
        ${scrollItem('9 min ago', 'Science', 'forest')}
        ${scrollItem('42 min ago', 'Legal Perspective', 'oxblood', false)}
        ${scrollItem('2 h ago', 'The Lyceum', 'aubergine')}
        ${scrollItem('5 h ago', 'Psychology', 'gold', false)}
        ${scrollItem('Today, 7am', 'Literature', 'gold')}
      </div>

      <div class="note bubble" style="top: 14%; left: 4%;">sticky compact masthead</div>
      <div class="note" style="top: 22%; right: 4%; font-size: 14px;">filter chips — pill radius OK per DS</div>
      <div class="note" style="top: 45%; left: 3%; transform: rotate(-3deg);">timestamps left · section tag</div>
    </div>
  `;
  },
  mobile: () => `
    <div class="wire">
      ${topbar()}
      <div style="padding: 8px 12px; display:flex; align-items:center; justify-content:space-between; border-top: 3px double #1B3358; border-bottom: 3px double #1B3358;">
        <div class="dateline-sm" style="font-size:6px;">APR 18</div>
        <div class="mast" style="font-size:13px;">The Global Polymath</div>
        <div style="font-family:'Inter'; font-size:9px;">▾</div>
      </div>
      <div style="display:flex; gap: 4px; padding: 8px 12px; border-bottom: 1px solid #C9B99A; overflow:hidden;">
        ${['All','Sci','Legal','Lyc','Psy'].map((s,i)=>`<div style="font-family:'Inter'; font-size:8px; padding: 3px 8px; border-radius: 999px; border: 1px solid ${i===0?'#1B3358':'#C9B99A'}; background:${i===0?'#1B3358':'transparent'}; color:${i===0?'#FBF7EE':'#1B3358'}; letter-spacing:0.06em; text-transform:uppercase; font-weight:600; white-space:nowrap;">${s}</div>`).join('')}
      </div>
      ${[
        { t: '9m', k: 'Science', kind: 'forest' },
        { t: '42m', k: 'Legal', kind: 'oxblood' },
        { t: '2h', k: 'The Lyceum', kind: 'aubergine' }
      ].map(it => `
        <div style="padding: 12px; border-bottom: 1px solid #EDE4CE;">
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
            <div class="kicker ${it.kind}">${it.k}</div>
            <div style="font-family:'IBM Plex Mono'; font-size:8px; color:#6b6456;">${it.t} ago</div>
          </div>
          <div class="hd sm"></div><div class="hd sm short"></div>
          <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:10px; color:#3B362C; margin-top:4px;">A short italic deck.</div>
        </div>
      `).join('')}
    </div>
  `
};

// ============================================================
// Assemble & render
// ============================================================
const VARIATIONS = [v1, v2, v3, v4, v5, v6, v7, v8];

function render() {
  const stage = document.getElementById('stage');
  const tabs = document.getElementById('tabs');
  const active = Number(localStorage.getItem('tgp-wf-active') || '0');

  tabs.innerHTML = VARIATIONS.map((v, i) => `
    <button class="tab ${i === active ? 'active' : ''}" data-i="${i}">
      <span class="num">${i+1}</span>${v.title}
    </button>
  `).join('');

  stage.innerHTML = VARIATIONS.map((v, i) => `
    <section class="var-panel ${i === active ? 'active' : ''}" data-panel="${i}" data-screen-label="${String(i+1).padStart(2,'0')} ${v.title}">
      <div class="var-head">
        <div class="var-num">#${i+1}</div>
        <div>
          <h2 class="var-title">${esc(v.title)}</h2>
          <div class="var-desc">${esc(v.desc)}</div>
        </div>
        <div class="var-nav">
          <button class="nav-btn" data-nav="prev">← Prev</button>
          <button class="nav-btn" data-nav="next">Next →</button>
        </div>
      </div>
      <div class="pair">
        <div>
          <div class="device-label">Desktop · 1440</div>
          <div class="sheet desktop">${v.desktop()}</div>
        </div>
        <div class="mobile-wrap">
          <div class="device-label">Mobile · 375</div>
          <div class="sheet mobile">${v.mobile()}</div>
        </div>
      </div>
      <div class="annotations">
        ${v.notes.map(n => `<div class="anno"><h4>${esc(n.kind)}</h4><p>${esc(n.text)}</p></div>`).join('')}
      </div>
    </section>
  `).join('');

  // wire up
  tabs.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => setActive(Number(t.dataset.i)));
  });
  stage.querySelectorAll('[data-nav]').forEach(b => {
    b.addEventListener('click', () => {
      const cur = Number(localStorage.getItem('tgp-wf-active') || '0');
      const nx = b.dataset.nav === 'next'
        ? (cur + 1) % VARIATIONS.length
        : (cur - 1 + VARIATIONS.length) % VARIATIONS.length;
      setActive(nx);
    });
  });
}

function setActive(i) {
  localStorage.setItem('tgp-wf-active', String(i));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', Number(t.dataset.i) === i));
  document.querySelectorAll('.var-panel').forEach(p => p.classList.toggle('active', Number(p.dataset.panel) === i));
  try { window.parent.postMessage({ slideIndexChanged: i }, '*'); } catch(e) {}
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ==== Tweaks ====
const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "sketch": "med",
  "mobile": "show",
  "notes": "on"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  document.body.classList.remove('sketch-lo', 'sketch-med', 'sketch-hi');
  document.body.classList.add('sketch-' + t.sketch);
  document.body.classList.toggle('hide-mobile', t.mobile === 'hide');
  document.body.classList.toggle('hide-notes', t.notes === 'off');
  // hide notes via CSS class
  if (t.notes === 'off') {
    document.querySelectorAll('.note').forEach(n => n.style.display = 'none');
  } else {
    document.querySelectorAll('.note').forEach(n => n.style.display = '');
  }
}

let tweakState = { ...TWEAK_DEFAULS, ...(JSON.parse(localStorage.getItem('tgp-wf-tweaks') || '{}')) };

function initTweaks() {
  const panel = document.getElementById('tweaks');
  panel.querySelectorAll('.seg').forEach(seg => {
    const key = seg.dataset.tweak;
    seg.querySelectorAll('button').forEach(b => {
      b.classList.toggle('on', b.dataset.val === tweakState[key]);
      b.addEventListener('click', () => {
        tweakState[key] = b.dataset.val;
        localStorage.setItem('tgp-wf-tweaks', JSON.stringify(tweakState));
        seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
        applyTweaks(tweakState);
        try {
          window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: b.dataset.val } }, '*');
        } catch(e) {}
      });
    });
  });

  // register for edit mode
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') panel.classList.add('on');
    else if (d.type === '__deactivate_edit_mode') panel.classList.remove('on');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  applyTweaks(tweakState);
  initTweaks();
  // keyboard
  document.addEventListener('keydown', (e) => {
    const cur = Number(localStorage.getItem('tgp-wf-active') || '0');
    if (e.key === 'ArrowRight') setActive((cur+1) % VARIATIONS.length);
    if (e.key === 'ArrowLeft') setActive((cur-1+VARIATIONS.length) % VARIATIONS.length);
  });
});
