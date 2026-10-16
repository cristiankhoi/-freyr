/* Trang "Hiệu suất AI" của Freyr: dashboard theo dõi mọi hoạt động của Claude Code, Codex, Antigravity và các việc agent điều phối.
 * Chỉ HIỂN THỊ số liệu tổng hợp do máy chủ Freyr trả về (action "perf"). Không chứa khóa, không chứa nội dung hội thoại.
 * Giá trị quy đổi USD là giá API quy đổi, KHÔNG phải tiền thực trả (dùng thuê bao). */
(function () {
  'use strict';
  const TOOL = { claude: 'Claude Code', codex: 'Codex', antigravity: 'Antigravity', ma: 'Mã tự động', khac: 'Khác' };
  const COLOR = { claude: '#5b6fd6', codex: '#c97b3d', antigravity: '#5fa37a', ma: '#9ca3af', khac: '#c4c4c4' };
  const LOAI = [['', 'Để agent tự nhận diện'], ['viet', 'Viết bài, nội dung'], ['ma', 'Sửa mã, kỹ thuật'], ['nghien-cuu', 'Nghiên cứu, đọc tài liệu'], ['seo', 'SEO, phân tích số liệu'],
    ['dao-tao', 'Đào tạo, giáo trình'], ['khac', 'Khác']];
  const E = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const N = (x, d) => (x === null || x === undefined || isNaN(x)) ? '—' : Number(x).toLocaleString('vi-VN', { maximumFractionDigits: d === undefined ? 0 : d });
  const K = x => (x === null || x === undefined) ? '—' : x >= 1e9 ? N(x / 1e9, 1) + ' tỷ' : x >= 1e6 ? N(x / 1e6, 1) + ' tr' : x >= 1e3 ? N(x / 1e3, 0) + ' k' : N(x);
  const USD = x => x === null || x === undefined ? '—' : '$' + N(x, x < 10 ? 2 : 0);
  const VND = x => x === null || x === undefined ? '—' : (x >= 1e6 ? N(x / 1e6, 1) + ' tr đ' : N(x) + ' đ');
  const dm = d => String(d || '').slice(8, 10) + '/' + String(d || '').slice(5, 7);
  const dmy = d => dm(d) + '/' + String(d || '').slice(0, 4);
  const bar = p => p === null || p === undefined ? '<span class="mut">—</span>' : `<span class="pf-bar"><i style="width:${Math.max(0, Math.min(100, p))}%"></i></span> ${p}%`;
  const LEVEL = { cao: ['cao', 'pf-red'], trung: ['trung bình', 'pf-warn'], thap: ['thấp', 'pf-mut'] };

  /* ---------- Biểu đồ SVG thuần, không thư viện ---------- */
  function lineChart(series, lines, opt) {
    const W = 560, H = 210, L = 34, R = 34, T = 12, B = 26, ymax = opt.ymax, n = series.length;
    if (!n) return '<div class="mut pf-empty">Chưa có dữ liệu.</div>';
    const x = i => L + (n === 1 ? (W - L - R) / 2 : i * (W - L - R) / (n - 1));
    const y = v => T + (H - T - B) * (1 - v / ymax);
    let g = '';
    const steps = opt.steps || 4;
    for (let k = 0; k <= steps; k++) {
      const v = ymax * k / steps;
      g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="pf-grid"/><text x="${L - 6}" y="${y(v) + 4}" class="pf-ax" text-anchor="end">${N(v, ymax <= 10 ? 1 : 0)}</text>`;
    }
    const every = Math.max(1, Math.ceil(n / 8));
    for (let i = 0; i < n; i += every) g += `<text x="${x(i)}" y="${H - 6}" class="pf-ax" text-anchor="middle">${dm(series[i].day)}</text>`;
    let paths = '', dots = '';
    lines.forEach(ln => {
      let d = '', pen = false, last = null;
      series.forEach((s, i) => {
        const v = s[ln.key];
        if (v === null || v === undefined) { pen = false; return; }
        d += (pen ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1) + ' '; pen = true; last = [x(i), y(v), v];
        if (n <= 40) dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.4" fill="${ln.color}"><title>${dm(s.day)}: ${E(ln.label)} ${N(v, 1)}</title></circle>`;
      });
      if (d) paths += `<path d="${d}" fill="none" stroke="${ln.color}" stroke-width="2" stroke-linejoin="round"/>`;
      if (last) dots += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.6" fill="${ln.color}"/><text x="${last[0] + 6}" y="${last[1] + 4}" class="pf-ax" fill="${ln.color}">${N(last[2], ymax <= 10 ? 0 : 0)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="pf-svg" role="img" aria-label="${E(opt.label || '')}">${g}${paths}${dots}</svg>`;
  }

  function stackBars(series, tools, valueOf, fmt) {
    const W = 560, H = 210, L = 44, R = 10, T = 12, B = 26, n = series.length;
    if (!n) return '<div class="mut pf-empty">Chưa có dữ liệu.</div>';
    const totals = series.map(s => tools.reduce((m, t) => m + (valueOf(s, t) || 0), 0));
    const max = Math.max.apply(null, totals.concat([0.0001]));
    const nice = (() => { const p = Math.pow(10, Math.floor(Math.log10(max))); const f = max / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; })();
    const bw = (W - L - R) / n, gap = Math.min(3, bw * 0.2);
    const y = v => T + (H - T - B) * (1 - v / nice);
    let g = '';
    for (let k = 0; k <= 4; k++) { const v = nice * k / 4; g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="pf-grid"/><text x="${L - 6}" y="${y(v) + 4}" class="pf-ax" text-anchor="end">${fmt(v)}</text>`; }
    const every = Math.max(1, Math.ceil(n / 8));
    let bars = '';
    series.forEach((s, i) => {
      let acc = 0;
      tools.forEach(t => {
        const v = valueOf(s, t) || 0; if (!v) return;
        const y0 = y(acc), y1 = y(acc + v); acc += v;
        bars += `<rect x="${(L + i * bw + gap / 2).toFixed(1)}" y="${y1.toFixed(1)}" width="${Math.max(1, bw - gap).toFixed(1)}" height="${Math.max(0.5, y0 - y1).toFixed(1)}" fill="${COLOR[t]}"><title>${dm(s.day)} · ${E(TOOL[t])}: ${fmt(v)}</title></rect>`;
      });
      if (i % every === 0) bars += `<text x="${(L + i * bw + bw / 2).toFixed(1)}" y="${H - 6}" class="pf-ax" text-anchor="middle">${dm(s.day)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="pf-svg" role="img">${g}${bars}</svg>`;
  }

  const legend = items => `<div class="pf-leg">${items.map(i => `<span><i style="background:${i.color}"></i>${E(i.label)}</span>`).join('')}</div>`;

  /* ---------- Các khối ---------- */
  function kpis(d) {
    const k = d.kpi;
    const c = (v, l, sub) => `<div class="card pad kpi pf-kpi"><div class="l">${l}</div><div class="v">${v}</div><div class="mut">${sub}</div></div>`;
    return `<div class="pf-grid6">
      ${c(N(k.calls), 'Lượt gọi AI', N(k.jobs) + ' việc agent giao trong kỳ')}
      ${c(k.verify_pct === null ? '—' : k.verify_pct + '%', 'Đã kiểm chứng', k.checked ? k.checked + ' việc đã kiểm' : 'chưa có việc nào được kiểm')}
      ${c(USD(k.cost_usd), 'Giá trị quy đổi', k.cost_usd === null ? 'chưa có giá' : VND(k.cost_vnd) + ' · trung vị ' + USD(k.median_usd_per_call) + '/lượt')}
      ${c(k.ratio_min === null ? '—' : '×' + N(k.ratio_min, 2), 'Phút thực tế ÷ ước lượng', k.ratio_n ? 'trên ' + k.ratio_n + ' việc' : 'cần việc có ước lượng phút')}
      ${c(k.follow_pct === null ? '—' : k.follow_pct + '%', 'Bạn theo khuyến nghị của AI', k.follow_n ? k.follow_of + '/' + k.follow_n + ' quyết định' : 'chưa có quyết định')}
      ${c(k.right_pct === null ? '—' : k.right_pct + '%', 'Bạn chấm "Đúng"', k.rated_n ? 'từ ' + k.rated_n + ' lần bạn chấm' : 'chưa chấm việc nào')}
    </div>`;
  }

  function quota(d) {
    const q = d.quota || {};
    const when = ts => { if (!ts) return ''; const t = new Date(ts * 1000); return isNaN(t) ? '' : t.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }); };
    const meter = (label, p, reset) => `<div class="pf-q"><span>${label}</span><span class="pf-bar wide"><i class="${p >= 90 ? 'hot' : ''}" style="width:${Math.min(100, p)}%"></i></span><b>${N(p)}%</b>${reset ? `<small class="mut">đặt lại ${when(reset)}</small>` : ''}</div>`;
    const codex = q.codex ? meter('Codex, 5 giờ', q.codex.five_h, q.codex.five_h_reset) + meter('Codex, tuần', q.codex.week, q.codex.week_reset) + `<div class="mut">cập nhật ${E(dmy(q.codex.day))}</div>` : '<div class="mut">Codex: chưa có số liệu quota.</div>';
    const cl = q.claude ? `<div class="pf-q"><span>Claude Code</span><span>chạm giới hạn gần nhất: <b>${E(String(q.claude.last_hit || '').slice(0, 16).replace('T', ' '))}</b> (${E(q.claude.kind || '')})</span></div>` : '<div class="mut">Claude Code: không thấy lần chạm giới hạn nào trong kỳ.</div>';
    return `<div class="card pad"><div class="sec">Quota đã dùng</div>${codex}${cl}<div class="mut">Antigravity: chưa đọc được quota từ nhật ký.</div></div>`;
  }

  function modelTable(d) {
    const byTool = {};
    d.table.forEach(r => (byTool[r.tool] = byTool[r.tool] || []).push(r));
    const tools = {}; d.tools.forEach(t => (tools[t.tool] = t));
    const head = `<tr><th>Công cụ / mô hình</th><th>Lượt</th><th>Phiên</th><th>Token vào</th><th>Token ra</th><th>Giá trị quy đổi</th><th>Việc giao</th><th>Kiểm chứng</th><th>Bạn: đúng</th><th>Leo model</th><th>Sự cố</th></tr>`;
    let body = '';
    Object.keys(byTool).sort().forEach(tool => {
      const t = tools[tool] || {};
      body += `<tr class="pf-tool"><td><i class="pf-dot" style="background:${COLOR[tool] || '#999'}"></i><b>${E(TOOL[tool] || tool)}</b></td><td><b>${N(t.calls)}</b></td><td>${N(t.sessions)}</td><td>${K(t.tin)}</td><td>${K(t.tout)}</td>
        <td><b>${USD(t.cost_usd)}</b><div class="mut">${t.cost_usd === null ? '' : VND(t.cost_vnd)}</div></td><td>${N(t.jobs)}</td><td>${bar(t.pass)}</td><td>${t.right_pct === null || t.right_pct === undefined ? '—' : t.right_pct + '%'}</td><td></td><td>${N(t.incidents)}</td></tr>`;
      byTool[tool].forEach(r => {
        body += `<tr><td class="pf-model">${E(r.model)}</td><td>${N(r.calls)}</td><td>${N(r.sessions)}</td><td>${K(r.tin)}</td><td>${K(r.tout)}</td>
          <td>${r.cost_usd === null ? '<span class="mut" title="Chưa có giá cho model này">chưa có giá</span>' : USD(r.cost_usd) + (r.cost_partial ? ' <span class="mut" title="Có phần chưa có giá">*</span>' : '')}${r.cost_usd === null ? '' : `<div class="mut">${VND(r.cost_vnd)}</div>`}</td>
          <td>${N(r.jobs)}</td><td>${bar(r.pass)}</td><td>${r.right === null ? '—' : r.right + '% <span class="mut">(' + r.rated + ')</span>'}</td><td>${r.escalated ? N(r.escalated) : '—'}</td><td>${r.incidents ? N(r.incidents) : '—'}</td></tr>`;
      });
    });
    if (!body) body = `<tr><td colspan="11" class="mut pf-empty">Chưa có số liệu. Máy cần chạy gom_su_dung.js --push (đã có trong lịch chạy nền) để gửi số liệu lên.</td></tr>`;
    return `<div class="card pad"><div class="sec">Theo công cụ và mô hình AI <span class="mut">lượt = một lần gọi model; "việc giao" = việc con agent giao cho model đó</span></div>
      <div class="pf-scroll"><table class="pf-table">${head}${body}</table></div></div>`;
  }

  function incidents(d) {
    const rows = d.incidents.map(i => { const lv = LEVEL[i.level] || ['', 'pf-mut']; return `<tr><td>${E(i.type)}</td><td><span class="pf-pill ${lv[1]}">${E(lv[0] || i.level)}</span></td><td>${E(TOOL[i.tool] || i.tool)}</td><td class="r">${N(i.n)}</td></tr>`; }).join('')
      || '<tr><td colspan="4" class="mut pf-empty">Không có sự cố trong kỳ.</td></tr>';
    const today = d.today_incidents.length ? `<div class="mut" style="margin-top:8px"><b>Hôm nay:</b> ${d.today_incidents.map(i => E(TOOL[i.tool] || i.tool) + ' · ' + E(i.kind) + (i.note ? ' (' + E(String(i.note).slice(0, 80)) + ')' : '')).join('; ')}</div>` : '';
    return `<div class="card pad"><div class="sec">Sự cố <span class="mut">từ nhật ký và hàng chờ agent</span></div>
      <table class="pf-table small"><tr><th>Loại</th><th>Mức độ</th><th>Công cụ</th><th class="r">Số lần</th></tr>${rows}</table>${today}</div>`;
  }

  function escalation(d) {
    const e = d.escalation;
    const t = e.n ? `${N(e.n)} lần leo lên model cao hơn. Đạt kiểm khi leo: <b>${e.pass_escalated === null ? '—' : e.pass_escalated + '%'}</b> (${e.n_escalated_checked} việc); không leo: <b>${e.pass_normal === null ? '—' : e.pass_normal + '%'}</b> (${e.n_normal_checked} việc).`
      : 'Chưa có lần leo model nào được ghi.';
    return `<div class="card pad"><div class="sec">Leo model có đáng không</div><p class="mut" style="margin:0">${t} Mỗi lần leo phải có lý do ghi lại; nếu model cao không đạt hơn thì agent ngừng leo cho loại việc đó.</p></div>`;
  }

  function recent(d) {
    const st = { ok: ['đạt kiểm', 'pf-ok'], approved: ['bạn đã duyệt', 'pf-ok'], awaiting: ['chờ bạn duyệt', 'pf-warn'], review: ['đang kiểm', 'pf-mut'], running: ['đang chạy', 'pf-mut'], queued: ['chờ giao', 'pf-mut'], fix: ['chờ sửa', 'pf-warn'], escalated: ['hỏi bạn', 'pf-red'], waiting_perm: ['chờ quyền', 'pf-red'], cancelled: ['đã hủy', 'pf-mut'] };
    const rows = d.recent.map(j => { const s = st[j.status] || [j.status, 'pf-mut'];
      return `<div class="row"><div><div>${j.parent ? '↳ ' : ''}${E(j.title)}</div>
        <div class="mut">${E(TOOL[j.tool] || j.tool)}${j.model ? ' · ' + E(j.model) : ''}${j.effort ? ' (' + E(j.effort) + ')' : ''}${j.risk ? ' · ' + E(j.risk) : ''}${j.escalate_why ? ' · leo model: ' + E(j.escalate_why) : ''} · ${E(j.updated || '')}</div></div>
        <div class="pf-act"><span class="pf-pill ${s[1]}">${E(s[0])}</span>${j.status === 'waiting_perm' ? `<button class="btn sm p" onclick="FreyrPerf.grant('${E(j.id)}')">Cho phép đọc</button>` : ''}
        <button class="btn sm ${j.rating === 'dung' ? 'p' : ''}" onclick="FreyrPerf.rate('${E(j.id)}','dung')">Đúng</button>
        <button class="btn sm ${j.rating === 'sai' ? 'p' : ''}" onclick="FreyrPerf.rate('${E(j.id)}','sai')">Sai</button></div></div>`; }).join('')
      || '<div class="empty">Chưa có việc nào do agent giao.</div>';
    return `<div class="card"><div class="sec pad">Việc gần đây, bấm Đúng hoặc Sai để agent học</div>${rows}</div>`;
  }

  function notes(d) {
    const fx = d.fx;
    return `<div class="mut pf-notes">${d.notes.map(E).join('<br>')}<br>Tỷ giá: 1 USD = ${N(fx.usd_vnd)} đ (${E(fx.src)}${fx.at ? ', cập nhật ' + E(fx.at) : ''}). Số liệu sử dụng gửi lên: ${E(d.usage_pushed_at || 'chưa lần nào')}.</div>`;
  }

  function html(d) {
    const sel = [30, 60, 90, 180].map(n => `<button class="btn sm ${d.days === n ? 'p' : ''}" onclick="FreyrPerf.setDays(${n})">${n} ngày</button>`).join('');
    const toggle = ['usd', 'tok'].map(m => `<button class="btn sm ${FreyrPerf.mode === m ? 'p' : ''}" onclick="FreyrPerf.setMode('${m}')">${m === 'usd' ? 'Giá trị quy đổi (USD)' : 'Token'}</button>`).join('');
    const tools = ['claude', 'codex', 'antigravity'];
    const reliab = lineChart(d.series, [{ key: 'verify', color: '#5b6fd6', label: 'Tỉ lệ kiểm chứng' }, { key: 'trust', color: '#c97b3d', label: 'Tin cậy đạt được' }], { ymax: 100, label: 'Độ tin cậy' });
    const self = lineChart(d.series, [{ key: 'score', color: '#5b6fd6', label: 'Điểm ngày' }, { key: 'plan', color: '#c97b3d', label: 'Độ chính xác kế hoạch' }, { key: 'ver10', color: '#5fa37a', label: 'Kiểm chứng' }], { ymax: 10, steps: 4, label: 'Tự đánh giá' });
    const cost = FreyrPerf.mode === 'usd' ? stackBars(d.series, tools, (s, t) => s.cost[t], v => '$' + N(v, v < 10 ? 1 : 0)) : stackBars(d.series, tools, (s, t) => s.tokens[t], K);
    return `<div class="pf-top"><div class="pf-range">${sel}</div><span class="mut">từ ${E(dmy(d.from))} đến ${E(dmy(d.to))}</span></div>
      ${kpis(d)}
      <div class="pf-gap">${modelTable(d)}</div>
      <div class="pf-two pf-gap">
        <div class="card pad"><div class="sec">Độ tin cậy <span class="mut">tỉ lệ kiểm chứng và điểm tin cậy, 0 đến 100</span></div>${legend([{ color: '#5b6fd6', label: 'Tỉ lệ kiểm chứng' }, { color: '#c97b3d', label: 'Tin cậy đạt được' }])}${reliab}</div>
        <div class="card pad"><div class="sec">Tự đánh giá <span class="mut">điểm cuối ngày, 0 đến 10</span></div>${legend([{ color: '#5b6fd6', label: 'Điểm ngày' }, { color: '#c97b3d', label: 'Độ chính xác kế hoạch' }, { color: '#5fa37a', label: 'Kiểm chứng' }])}${self}</div>
      </div>
      <div class="pf-two pf-gap">
        <div class="card pad"><div class="sec">Chi phí mỗi ngày <span class="pf-range">${toggle}</span></div>${legend(tools.map(t => ({ color: COLOR[t], label: TOOL[t] })))}${cost}</div>
        ${incidents(d)}
      </div>
      <div class="pf-two pf-gap">${quota(d)}${escalation(d)}</div>
      <div class="pf-gap">${recent(d)}</div>
      ${notes(d)}`;
  }

  /* ---------- Form giao việc mới (dùng trong trang Quản lý AI) ---------- */
  function jobForm() {
    return `<form class="card pad pf-form" onsubmit="return FreyrPerf.addJob(this)">
      <div class="sec">Giao việc mới cho agent</div>
      <label class="f">Tên việc</label><input name="title" maxlength="160" required placeholder="Ví dụ: Tóm tắt đối thủ SEO tuần này">
      <label class="f">Yêu cầu (nêu tiêu chí đạt càng rõ càng tốt)</label><textarea name="spec" rows="3" maxlength="1500" placeholder="Làm gì, kết quả trông thế nào, giới hạn gì"></textarea>
      <div class="two"><div><label class="f">Loại việc</label><select name="loai">${LOAI.map(l => `<option value="${l[0]}">${l[1]}</option>`).join('')}</select></div>
      <div><label class="f">Ước lượng (phút, không bắt buộc)</label><input name="est_min" type="number" min="1" max="600"></div></div>
      <label class="f">Dữ liệu agent được đọc (đường dẫn hoặc ghi chú; thư mục nhạy cảm sẽ bị chặn)</label><input name="inputs" maxlength="600" placeholder="Ví dụ: Sheet từ khóa, thư mục SEO">
      <div class="actions" style="justify-content:flex-start"><button class="btn p">Giao cho agent</button><span class="mut" id="pfFormMsg"></span></div>
      <p class="mut" style="margin:6px 0 0">Agent tự chọn công cụ và model, kiểm kết quả, rồi gửi thẻ để bạn duyệt trước khi lên live.</p></form>`;
  }

  window.FreyrPerf = {
    days: 30, mode: 'usd', data: null, err: '', el: null, loading: false,
    html: html, jobForm: jobForm,
    mount(el) { this.el = el; this.paint(); this.load(); },
    paint() {
      if (!this.el) return;
      if (this.err) this.el.innerHTML = `<div class="card pad"><p class="mut">Không lấy được số liệu: ${E(this.err)}. Nếu thông báo là "unknown_action", hãy đẩy mã Freyr mới lên (day_len.ps1 freyr).</p><button class="btn" onclick="FreyrPerf.load()">Thử lại</button></div>`;
      else if (!this.data) this.el.innerHTML = '<div class="empty">Đang tải số liệu…</div>';
      else this.el.innerHTML = html(this.data);
    },
    async load() {
      if (this.loading) return; this.loading = true; this.err = '';
      try { const j = await Api.post({ action: 'perf', days: this.days }); this.data = j; } catch (e) { this.err = e.message || String(e); }
      this.loading = false; this.paint();
    },
    setDays(n) { this.days = n; this.data = null; this.paint(); this.load(); },
    setMode(m) { this.mode = m; this.paint(); },
    async grant(id) {
      try { await Api.post({ action: 'jobGrant', id: id }); if (typeof UI !== 'undefined') UI.toast('Đã cho phép. Agent sẽ làm lần chạy tới.'); this.load(); } catch (e) { if (typeof UI !== 'undefined') UI.toast('Không cho phép được: ' + (e.message || e)); }
    },
    async rate(id, rating) {
      try { await Api.post({ action: 'jobRate', id: id, rating: rating }); this.load(); } catch (e) { if (typeof UI !== 'undefined') UI.toast('Không chấm được: ' + (e.message || e)); }
    },
    async addJob(form) {
      const f = new FormData(form), msg = document.getElementById('pfFormMsg');
      const job = { title: String(f.get('title') || '').trim(), spec: String(f.get('spec') || '').trim(), loai: String(f.get('loai') || ''), inputs: String(f.get('inputs') || '').trim(), est_min: String(f.get('est_min') || '') };
      if (!job.title) return false;
      if (msg) msg.textContent = 'Đang gửi…';
      try { await Api.post({ action: 'jobAddV2', job: job }); if (msg) msg.textContent = 'Đã giao. Agent sẽ nhận trong lần chạy tới.'; form.reset(); if (typeof App !== 'undefined') App.refresh(false); }
      catch (e) { if (msg) msg.textContent = 'Không giao được: ' + (e.message || e); }
      return false;
    }
  };
})();
