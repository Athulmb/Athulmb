const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projects = [
  {
    name: 'project-bricore',
    title: 'Bricore Platform',
    tag: 'Full-Stack UI',
    accent: '#00D4FF',
    accentBorder: 'rgba(0, 212, 255, 0.45)',
    iconSvg: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>`,
    code: 'GET /api/v1/workspace 200'
  },
  {
    name: 'project-petsgallary',
    title: 'PetStore Gallery',
    tag: 'E-Commerce / Redux',
    accent: '#8B5CF6',
    accentBorder: 'rgba(139, 92, 246, 0.45)',
    iconSvg: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    code: 'POST /checkout/stripe OK'
  },
  {
    name: 'project-fitvantage',
    title: 'FitVantage App',
    tag: 'Fitness Analytics',
    accent: '#00D6A3',
    accentBorder: 'rgba(0, 214, 163, 0.45)',
    iconSvg: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00D6A3" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    code: 'METRICS: Active Streak 48d'
  }
];

projects.forEach(p => {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: transparent;
      width: 260px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
    .thumb {
      width: 254px;
      height: 144px;
      border-radius: 12px;
      background: #030C1D;
      border: 1.2px solid ${p.accentBorder};
      box-shadow: 0 0 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.5);
      background-image: radial-gradient(circle at 80% 20%, ${p.accentBorder} 0%, transparent 65%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 14px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dots { display: flex; gap: 4px; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #405777; }
    .tag {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.6px;
      padding: 2px 7px;
      border-radius: 8px;
      background: rgba(255,255,255,0.06);
      color: ${p.accent};
      border: 1px solid ${p.accentBorder};
      text-transform: uppercase;
    }
    .center-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .proj-name {
      color: #E6F0FF;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .footer-bar {
      height: 18px;
      border-radius: 4px;
      background: rgba(10, 27, 49, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      font-size: 9px;
      color: #91B4E8;
      font-family: monospace;
    }
    .status-dot {
      width: 5px; height: 5px; border-radius: 50%; background: ${p.accent}; box-shadow: 0 0 6px ${p.accent};
    }
  </style>
</head>
<body>
  <div class="thumb">
    <div class="header">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <span class="tag">${p.tag}</span>
    </div>
    <div class="center-visual">
      ${p.iconSvg}
      <div class="proj-name">${p.title}</div>
    </div>
    <div class="footer-bar">
      <span>${p.code}</span>
      <span class="status-dot"></span>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join('d:/github/Athulmb/assets', `${p.name}.html`);
  const pngPath = path.join('d:/github/Athulmb/assets', `${p.name}.png`);
  fs.writeFileSync(htmlPath, html);

  const tempProfile = 'C:\\Users\\athu\\AppData\\Local\\Temp\\chrome-p-' + Math.random().toString(36).slice(2);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + tempProfile,
    '--screenshot=' + pngPath,
    '--window-size=260,150',
    '--hide-scrollbars',
    'file:///' + htmlPath.replace(/\\/g, '/')
  ];
  execFileSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', args);
  console.log(p.name, 'created? ->', fs.existsSync(pngPath));
});
