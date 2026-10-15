/* Tracey Altios - giao diện lịch việc chu kỳ tháng. Dùng trong 2 chỗ: trang riêng của chị (tracey/index.html) và mục "Tracey Altios" trong app Freyr.
   Dữ liệu ở backend riêng (Apps Script + Sheet riêng), không đụng tới dữ liệu Freyr. Chỉ lưu mã và số đếm. */
const Tracey = (() => {
  const KEY = 'tracey_cfg', CK = 'tracey_cache';
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
  };
  const E = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const S = { cfg: ls.get(KEY, null), d: ls.get(CK, null), tab: 'today', month: '', el: null, busy: false, edit: null, report: null, err: '' };
  const TABS = [['today', '📅 Hôm nay'], ['month', '🗓 Lịch tháng'], ['adhoc', '⚡ Chen ngang'], ['report', '📊 Báo cáo'], ['tpl', '🧩 Lịch mẫu'], ['ct', '📇 Liên hệ'], ['set', '⚙️ Cài đặt']];
  const ST = { todo: 'Chưa làm', doing: 'Đang làm', done: 'Xong', skip: 'Bỏ qua' };
  const NEXT = { todo: 'doing', doing: 'done', done: 'todo', skip: 'todo' };
  const KIND = { monthly: 'Hằng tháng', quarterly: 'Hằng quý', weekly: 'Hằng tuần (khung cố định)', once: 'Một lần' };
  const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const hm = m => Math.floor(m / 60) + 'h' + (m % 60 ? ('0' + (m % 60)).slice(-2) : '');
  const fd = d => d ? String(d).slice(8, 10) + '/' + String(d).slice(5, 7) : '';
  const tmin = s => { const p = String(s).split(':'); return Number(p[0]) * 60 + Number(p[1] || 0); };

  /* ---- gọi máy chủ ---- */
  async function api(body) {
    if (!S.cfg || !S.cfg.url || !S.cfg.token) throw new Error('Chưa kết nối');
    let last;
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(S.cfg.url, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(Object.assign({ token: S.cfg.token }, body)) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const j = await r.json();
        if (j.name === 'Tracey API') throw new Error('redirect');
        if (!j.ok) throw new Error(j.error === 'unauthorized' ? 'Mã kết nối không đúng - xin link mới' : j.error);
        return j;
      } catch (e) { last = e; if (!/HTTP|redirect|JSON|Unexpected token|Failed to fetch/i.test(e.message)) throw e; await new Promise(r => setTimeout(r, 1200)); }
    }
    throw new Error('Không kết nối được (' + last.message + ')');
  }
  async function load(month) {
    S.busy = true; S.err = ''; paint();
    try { const j = await api({ action: 'data', month: month || S.month || undefined }); S.d = j; S.month = j.month; ls.set(CK, j); }
    catch (e) { S.err = e.message; }
    S.busy = false; paint();
  }
  async function act(body, msg) {
    try { await api(body); if (msg) toast(msg); await load(); } catch (e) { toast('Lỗi: ' + e.message); }
  }
  function toast(m) { const t = document.getElementById('toast'); if (!t) return; t.textContent = m; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2400); }

  /* ---- kết nối ---- */
  function parseLink(s) {
    s = String(s || '').trim(); if (!s) return null;
    const h = s.includes('#') ? s.split('#')[1] : s;
    const p = new URLSearchParams(h); const u = p.get('u'), t = p.get('t');
    return u && t && /^https:\/\/script\.google\.com\//.test(u) ? { url: u, token: t } : null;
  }
  function connect(text) {
    const c = parseLink(text); if (!c) { toast('Link không đúng'); return; }
    S.cfg = c; ls.set(KEY, c); load();
  }
  function logout() { S.cfg = null; S.d = null; ls.set(KEY, null); ls.set(CK, null); paint(); }

  /* ---- vẽ ---- */
  function mount(el, opts) {
    S.el = el; S.opts = opts || {};
    const c = parseLink(location.hash);
    if (c) { S.cfg = c; ls.set(KEY, c); history.replaceState(null, '', location.pathname + location.search); }
    paint();
    if (S.cfg) load();
  }
  function paint() {
    if (!S.el) return;
    if (!S.cfg) { S.el.innerHTML = connectView(); return; }
    const d = S.d;
    const tabs = `<div class="chips">${TABS.map(t => `<button class="chip ${S.tab === t[0] ? 'on' : ''}" onclick="Tracey.go('${t[0]}')">${t[1]}</button>`).join('')}</div>`;
    const bar = S.err ? `<div class="banner">${E(S.err)} <button class="btn sm" onclick="Tracey.reload()">Thử lại</button></div>` : (S.busy ? '<div class="mut" style="margin:6px 0">Đang tải...</div>' : '');
    let body = d ? ({ today, month, adhoc, report, tpl, ct, set }[S.tab] || today)() : (S.busy ? '' : '<div class="empty">Chưa có dữ liệu</div>');
    S.el.innerHTML = tabs + bar + body;
  }
  function connectView() {
    return `<div class="card pad" style="max-width:520px;margin:20px auto"><h3 style="margin-top:0">Kết nối Tracey Altios</h3>
      <p class="mut">Dán link riêng được gửi cho bạn (bắt đầu bằng https://...). Chỉ cần làm một lần.</p>
      <textarea id="trLink" rows="3" placeholder="https://.../#u=...&t=..." style="width:100%"></textarea>
      <div class="actions"><button class="btn p" onclick="Tracey.connect(document.getElementById('trLink').value)">Kết nối</button></div></div>`;
  }
  const grpName = g => (S.d.groups[g] || S.d.cats[g] || g || '');

  function today() {
    const d = S.d, p = d.plan, td = d.today;
    const endRow = (d.days.find(x => String(x.date) === td) || {}).end_time || '';
    const pct = p.capacity ? Math.round(p.used * 100 / p.capacity) : 0;
    const upcoming = d.instances.filter(x => x.kind !== 'weekly' && x.status !== 'done' && x.status !== 'skip' && x.due >= td && x.due <= addDays(td, 7)).sort((a, b) => a.due < b.due ? -1 : 1);
    const late = d.instances.filter(x => x.kind !== 'weekly' && x.status !== 'done' && x.status !== 'skip' && x.due < td);
    return `<div class="grid4" style="margin:10px 0">
      <div class="card pad kpi"><div class="l">Giờ đã xếp / có</div><div class="v">${hm(p.used)} / ${hm(p.capacity)}</div><div class="l">${pct}% ngày làm việc</div></div>
      <div class="card pad kpi"><div class="l">Không đủ giờ</div><div class="v" style="color:${p.overflow.length ? 'var(--red)' : 'inherit'}">${p.overflow.length}</div><div class="l">việc cần xử lý</div></div>
      <div class="card pad kpi"><div class="l">Quá hạn</div><div class="v" style="color:${late.length ? 'var(--red)' : 'inherit'}">${late.length}</div></div>
      <div class="card pad kpi"><div class="l">Chen ngang đang mở</div><div class="v">${d.adhoc.filter(a => a.status === 'open').length}</div></div></div>
      ${!p.workday ? '<div class="banner">Hôm nay không phải ngày làm việc.</div>' : ''}
      ${p.overflow.length ? `<div class="banner" style="background:var(--reds);color:var(--red)"><b>Không đủ giờ hôm nay:</b> ${p.overflow.map(o => `${E(o.title)} (hạn ${fd(o.due)}${o.overdue ? ', quá hạn' : ''})`).join('; ')}. Cân nhắc lùi việc mềm hoặc báo người giao.</div>` : ''}
      <div class="sec"><span>Kế hoạch đề xuất hôm nay (${fd(td)})</span></div>
      <div class="card">${p.blocks.length ? p.blocks.map(b => `<div class="row" style="display:flex;gap:10px;align-items:center;padding:8px 12px">
        <b style="min-width:92px">${b.start}-${b.end}</b>
        <div style="flex:1;min-width:0">${E(b.title)}${b.tentative ? ' <span class="mut">(thời lượng tạm)</span>' : ''}${b.partial ? ' <span class="mut">(làm một phần)</span>' : ''}${b.overdue ? ' <span class="late">quá hạn</span>' : ''}<div class="mut">${E(grpName(b.grp))}${b.due ? ' · hạn ' + fd(b.due) : ''}${b.hard ? ' · hạn cứng' : ''}</div></div>
        ${b.kind === 'task' ? `<button class="btn sm" onclick="Tracey.set('${E(b.key)}','done')">Xong</button>` : b.kind === 'adhoc' ? `<button class="btn sm" onclick="Tracey.adhocDone('${E(b.key)}')">Xong</button>` : ''}</div>`).join('') : '<div class="empty">Không có việc nào trong khung giờ hôm nay</div>'}</div>
      <div class="sec"><span>Giờ tắt máy hôm nay</span></div>
      <div class="card pad"><input type="time" id="trEnd" value="${E(endRow)}"> <button class="btn sm" onclick="Tracey.saveEnd()">Lưu</button> <span class="mut">Dùng làm số liệu làm thêm giờ cho báo cáo.</span></div>
      <div class="sec"><span>Hạn trong 7 ngày tới</span></div>
      <div class="card">${upcoming.length ? upcoming.map(x => `<div class="row" style="padding:8px 12px">${fd(x.due)} · ${E(x.title)} <span class="mut">${x.hard ? 'cứng' : 'mềm'} · ${ST[x.status]}</span></div>`).join('') : '<div class="empty">Không có</div>'}</div>`;
  }
  function addDays(d, n) { const x = new Date(d + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }

  function month() {
    const d = S.d, td = d.today;
    const list = d.instances.filter(x => x.kind !== 'weekly' && (x.due.slice(0, 7) === d.month || x.from.slice(0, 7) === d.month)).sort((a, b) => a.from < b.from ? -1 : a.from > b.from ? 1 : a.due < b.due ? -1 : 1);
    const done = list.filter(x => x.status === 'done').length;
    const tpl = id => d.templates.find(t => t.id === id) || {};
    return `<div class="sec"><span>Tháng ${d.month} · ${done}/${list.length} xong</span>
      <span><button class="btn sm" onclick="Tracey.nav(-1)">‹</button> <button class="btn sm" onclick="Tracey.nav(0)">Nay</button> <button class="btn sm" onclick="Tracey.nav(1)">›</button></span></div>
      <div class="card">${list.map(x => {
        const t = tpl(x.tpl), steps = String(t.steps || '').split('\n').filter(String), sd = String(x.steps_done || '').split(',');
        const late = x.status !== 'done' && x.status !== 'skip' && x.due < td;
        return `<details class="row" style="padding:8px 12px"><summary style="cursor:pointer;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span class="pill ${x.status === 'done' ? 'st-done' : ''}">${ST[x.status]}</span><b>${x.from === x.due ? fd(x.due) : fd(x.from) + '–' + fd(x.due)}</b> ${E(x.title)}
          ${late ? '<span class="late">quá hạn</span>' : ''}<span class="mut">${E(grpName(x.grp))} · ${x.hard ? 'hạn cứng' : 'hạn mềm'}${x.est ? ' · ' + hm(x.est) : ''}</span></summary>
          <div style="padding:8px 0 4px">
            ${t.approver ? `<div class="mut">Duyệt: ${E(t.approver)}${t.output ? ' · Gửi: ' + E(t.output) : ''}</div>` : ''}
            ${steps.map((s, i) => `<label style="display:block;margin:3px 0"><input type="checkbox" ${sd.includes(String(i)) ? 'checked' : ''} onchange="Tracey.step('${E(x.key)}',${i},this.checked)"> ${E(s)}</label>`).join('')}
            ${t.note ? `<div class="mut" style="margin-top:4px">Ghi chú: ${E(t.note)}</div>` : ''}
            <div class="actions" style="margin-top:8px"><button class="btn sm p" onclick="Tracey.set('${E(x.key)}','${NEXT[x.status]}')">→ ${ST[NEXT[x.status]]}</button>
              <button class="btn sm" onclick="Tracey.set('${E(x.key)}','skip')">Bỏ qua</button>
              <label class="mut">Thực tế (phút) <input type="number" min="0" style="width:80px" value="${x.actual_min || ''}" onchange="Tracey.actual('${E(x.key)}',this.value)"></label></div>
          </div></details>`;
      }).join('') || '<div class="empty">Không có việc</div>'}</div>`;
  }

  function adhoc() {
    const d = S.d, cats = d.cats;
    const open = d.adhoc.filter(a => a.status === 'open'), back = d.adhoc.filter(a => a.status === 'backlog'), done = d.adhoc.filter(a => a.status === 'done');
    const row = a => `<div class="row" style="display:flex;gap:8px;align-items:center;padding:8px 12px"><div style="flex:1">${E(a.title)} ${Number(a.urgent) ? '<span class="late">gấp</span>' : ''}<div class="mut">${fd(a.date)} · ${E(cats[a.cat] || a.cat)}${a.minutes ? ' · ' + a.minutes + ' phút' : ''}${a.requester ? ' · ' + E(a.requester) : ''}</div></div>
      ${a.status === 'open' ? `<button class="btn sm" onclick="Tracey.adhocDone('${E(a.id)}')">Xong</button>` : a.status === 'backlog' ? `<button class="btn sm" onclick="Tracey.adhocPromote('${E(a.id)}')">Làm hôm nay</button>` : ''}<button class="btn sm ghost" onclick="Tracey.adhocDel('${E(a.id)}')">✕</button></div>`;
    return `<div class="card pad"><div class="sec" style="margin-top:0"><span>Ghi nhanh việc chen ngang</span></div>
      <div class="form"><input id="adT" placeholder="Việc gì? (không ghi tên khách/số tiền)" maxlength="120">
      <div class="two"><select id="adC">${Object.keys(cats).map(k => `<option value="${k}">${E(cats[k])}</option>`).join('')}</select><input id="adM" type="number" min="0" placeholder="Dự kiến (phút)"></div>
      <div class="two"><input id="adR" placeholder="Ai nhờ (mã, vd NV-01)" maxlength="20"><label><input type="checkbox" id="adU"> Gấp</label></div>
      <div class="actions"><button class="btn p" onclick="Tracey.adhocAdd()">Thêm</button></div></div></div>
      <div class="sec"><span>Đang mở (${open.length})</span></div><div class="card">${open.map(row).join('') || '<div class="empty">Không có</div>'}</div>
      <div class="sec"><span>Tồn đọng, chưa xếp lịch (${back.length})</span></div><div class="card">${back.map(row).join('') || '<div class="empty">Không có</div>'}</div>
      <div class="sec"><span>Đã xong trong tháng (${done.length})</span></div><div class="card">${done.map(row).join('') || '<div class="empty">Chưa có</div>'}</div>`;
  }

  function report() {
    const r = S.report;
    return `<div class="sec"><span>Báo cáo tháng ${E(S.month)} (tiếng Anh)</span>
      <span><button class="btn sm" onclick="Tracey.nav(-1)">‹</button> <button class="btn sm" onclick="Tracey.nav(1)">›</button></span></div>
      <div class="card pad"><div class="actions"><button class="btn p" onclick="Tracey.genReport()">Tạo bản nháp</button>
        ${r ? '<button class="btn" onclick="Tracey.copyReport()">Copy</button> <button class="btn" onclick="Tracey.sendDraft()">Gửi bản nháp về Gmail</button>' : ''}</div>
        ${r ? `<pre class="reptxt" style="white-space:pre-wrap;margin-top:10px">${E(r.text)}</pre>` : '<div class="mut" style="margin-top:8px">Nhấn "Tạo bản nháp" để tổng hợp việc đã xong, việc chen ngang, giờ làm thêm và đề xuất cải tiến.</div>'}
      </div>
      <div class="sec"><span>Đề xuất / sáng kiến của chị (thêm vào cuối báo cáo)</span></div>
      <div class="card pad"><textarea id="trProp" rows="4" style="width:100%" placeholder="Viết bằng tiếng Anh nếu muốn đưa vào báo cáo">${E(S.d.proposals)}</textarea>
        <div class="actions"><button class="btn sm" onclick="Tracey.saveProp()">Lưu</button></div></div>`;
  }

  function tpl() {
    const d = S.d, ed = S.edit;
    if (ed) {
      const t = ed;
      return `<div class="card pad"><h3 style="margin-top:0">${t.id ? 'Sửa' : 'Thêm'} việc mẫu</h3><div class="form">
        <label class="f">Tên việc<input id="tT" value="${E(t.title)}"></label>
        <div class="two"><label class="f">Nhóm<select id="tG">${Object.keys(d.groups).map(k => `<option value="${k}" ${t.grp === k ? 'selected' : ''}>${E(d.groups[k])}</option>`).join('')}</select></label>
        <label class="f">Lặp<select id="tK">${Object.keys(KIND).map(k => `<option value="${k}" ${(t.kind || 'monthly') === k ? 'selected' : ''}>${KIND[k]}</option>`).join('')}</select></label></div>
        <div class="two"><label class="f">Từ ngày (1-31, hoặc ngày YYYY-MM-DD nếu "một lần")<input id="tF" value="${E(t.from)}"></label><label class="f">Đến ngày (= hạn)<input id="tTo" value="${E(t.to)}"></label></div>
        <div class="two"><label class="f">Các tháng (hằng quý, vd 1,4,7,10)<input id="tM" value="${E(t.months)}"></label><label class="f">Thứ trong tuần (0=CN,1=T2...)<input id="tW" value="${E(t.weekdays)}"></label></div>
        <div class="two"><label class="f">Giờ bắt đầu (khung cố định)<input id="tS" type="time" value="${E(t.start)}"></label><label class="f">Giờ kết thúc<input id="tE" type="time" value="${E(t.end)}"></label></div>
        <div class="two"><label class="f">Thời lượng (phút)<input id="tEst" type="number" value="${E(t.est_min)}"></label><label class="f">Người duyệt<input id="tA" value="${E(t.approver)}"></label></div>
        <div class="two"><label><input type="checkbox" id="tH" ${Number(t.hard) ? 'checked' : ''}> Hạn cứng</label><label><input type="checkbox" id="tAu" ${Number(t.auto) ? 'checked' : ''}> Có thể tự động hóa</label></div>
        <label class="f">Các bước (mỗi dòng một bước)<textarea id="tSt" rows="6">${E(t.steps)}</textarea></label>
        <label class="f">Ghi chú<input id="tN" value="${E(t.note)}"></label>
        <div class="actions"><button class="btn p" onclick="Tracey.saveTpl()">Lưu</button> <button class="btn" onclick="Tracey.cancelEdit()">Hủy</button>${t.id ? ' <button class="btn" onclick="Tracey.delTpl()">Tắt việc này</button>' : ''}</div></div></div>`;
    }
    const list = d.templates.filter(t => String(t.active) !== '0').sort((a, b) => Number(a.ord) - Number(b.ord));
    return `<div class="sec"><span>Lịch mẫu (${list.length} việc) - sửa ở đây là lịch các tháng sau đổi theo</span><button class="btn sm p" onclick="Tracey.newTpl()">+ Thêm</button></div>
      <div class="card">${list.map(t => `<div class="row" style="display:flex;gap:8px;align-items:center;padding:8px 12px"><div style="flex:1"><b>${E(t.title)}</b><div class="mut">${E(d.groups[t.grp] || t.grp)} · ${KIND[t.kind] || t.kind} · ${t.kind === 'weekly' ? E(String(t.weekdays).split(',').map(x => WD[x]).join(',')) + ' ' + E(t.start) + '-' + E(t.end) : 'ngày ' + E(t.from) + (t.to && t.to !== t.from ? '–' + E(t.to) : '')} · ${t.est_min ? hm(Number(t.est_min)) : 'chưa có thời lượng'}${Number(t.auto) ? ' · tự động hóa được' : ''}</div></div>
        <button class="btn sm" onclick="Tracey.editTpl('${E(t.id)}')">Sửa</button></div>`).join('')}</div>
      <p class="mut">Ví dụ lịch học ACCA: thêm việc, chọn Lặp = "Hằng tuần", thứ trong tuần = 2,4 và giờ bắt đầu/kết thúc. Khung đó sẽ được trừ khỏi giờ làm khi xếp kế hoạch.</p>`;
  }

  function ct() {
    const d = S.d, ed = S.contact, q = (S.cq || '').toLowerCase();
    if (ed) {
      return `<div class="card pad"><h3 style="margin-top:0">${ed.id ? 'Sửa' : 'Thêm'} liên hệ</h3><div class="form">
        <label class="f">Tên<input id="cN" value="${E(ed.name)}" maxlength="200"></label>
        <div class="two"><label class="f">Công ty / đơn vị<input id="cO" value="${E(ed.org)}" maxlength="200"></label><label class="f">Vai trò (nhà cung cấp, ngân hàng, bảo hiểm...)<input id="cR" value="${E(ed.role)}" maxlength="200"></label></div>
        <div class="two"><label class="f">Điện thoại<input id="cP" type="tel" value="${E(ed.phone)}" maxlength="200"></label><label class="f">Email<input id="cE" type="email" value="${E(ed.email)}" maxlength="200"></label></div>
        <label class="f">Ghi chú<textarea id="cT" rows="3" maxlength="200">${E(ed.note)}</textarea></label>
        <div class="actions"><button class="btn p" onclick="Tracey.saveContact()">Lưu</button> <button class="btn" onclick="Tracey.cancelContact()">Hủy</button>${ed.id ? ' <button class="btn" onclick="Tracey.delContact()">Xóa</button>' : ''}</div></div></div>`;
    }
    const list = (d.contacts || []).filter(c => !q || [c.name, c.org, c.role, c.phone, c.email, c.note].join(' ').toLowerCase().includes(q)).sort((a, b) => String(a.name).localeCompare(String(b.name), 'vi'));
    return `<div class="sec"><span>Liên hệ (${(d.contacts || []).length})</span><button class="btn sm p" onclick="Tracey.newContact()">+ Thêm</button></div>
      <div class="card pad"><input id="cQ" placeholder="Tìm theo tên, công ty, số điện thoại..." value="${E(S.cq || '')}" style="width:100%" oninput="Tracey.search(this.value)"></div>
      <div class="card" id="cList">${contactRows(list)}</div>`;
  }
  function contactRows(list) {
    return list.map(c => `<div class="row" style="display:flex;gap:8px;align-items:center;padding:8px 12px"><div style="flex:1;min-width:0"><b>${E(c.name)}</b>${c.org ? ' · ' + E(c.org) : ''}${c.role ? ' <span class="mut">(' + E(c.role) + ')</span>' : ''}
      <div class="mut">${c.phone ? `<a href="tel:${E(String(c.phone).replace(/[^0-9+]/g, ''))}">${E(c.phone)}</a>` : ''}${c.phone && c.email ? ' · ' : ''}${c.email ? `<a href="mailto:${E(c.email)}">${E(c.email)}</a>` : ''}</div>
      ${c.note ? `<div class="mut">${E(c.note)}</div>` : ''}</div><button class="btn sm" onclick="Tracey.editContact('${E(c.id)}')">Sửa</button></div>`).join('') || '<div class="empty">Chưa có liên hệ</div>';
  }

  function set() {
    const d = S.d;
    return `<div class="card pad"><h3 style="margin-top:0">Nhắc việc qua Gmail</h3>
      <p>${d.email ? '✅ Đã bật: mỗi sáng 8:30 gửi kế hoạch trong ngày; ngày 26 gửi bản nháp báo cáo tháng.' : '⚠️ Chưa có địa chỉ Gmail nhận thư (người cài đặt điền TRACEY_EMAIL trong Script Properties).'}</p>
      <h3>Lịch (Google Calendar)</h3>
      <p class="mut">Tùy chọn. Trong Google Calendar: Other calendars (+) → From URL → dán link dưới đây. Google cập nhật chậm (vài giờ đến một ngày). Link là bí mật, đừng chia sẻ.</p>
      <input readonly value="${E(d.icsUrl)}" style="width:100%" onclick="this.select()">
      <div class="actions"><button class="btn sm" onclick="navigator.clipboard.writeText('${E(d.icsUrl)}').then(()=>Tracey.toast('Đã copy'))">Copy link</button>
        <a class="btn sm" href="${E(d.icsUrl)}" target="_blank" rel="noopener">Tải file .ics</a>
        <button class="btn sm" onclick="Tracey.rotate()">Đổi link lịch (vô hiệu link cũ)</button></div>
      <h3>Kết nối</h3><div class="actions"><button class="btn sm" onclick="Tracey.reload()">Tải lại dữ liệu</button> <button class="btn sm" onclick="if(confirm('Ngắt kết nối trên máy này?'))Tracey.logout()">Ngắt kết nối</button></div></div>`;
  }

  /* ---- thao tác ---- */
  const val = id => (document.getElementById(id) || {}).value;
  return {
    mount, toast, logout, connect,
    go(t) { S.tab = t; paint(); },
    reload() { load(); },
    nav(n) { const m = S.month || S.d.month; const p = m.split('-').map(Number); const dt = n === 0 ? new Date() : new Date(p[0], p[1] - 1 + n, 1); const ym = dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2); S.report = null; load(ym); },
    set(key, status) { act({ action: 'setStatus', key, status }); },
    actual(key, v) { act({ action: 'setStatus', key, actual_min: Number(v) || 0 }); },
    step(key, i, on) {
      const x = S.d.instances.find(z => z.key === key); const cur = String(x.steps_done || '').split(',').filter(String);
      const nx = on ? cur.concat(String(i)) : cur.filter(z => z !== String(i));
      x.steps_done = nx.join(','); api({ action: 'setStatus', key, steps_done: x.steps_done }).catch(e => toast('Lỗi: ' + e.message));
    },
    saveEnd() { const v = val('trEnd'); if (!v) return; act({ action: 'setEnd', date: S.d.today, end_time: v }, 'Đã lưu'); },
    adhocAdd() { const t = (val('adT') || '').trim(); if (!t) { toast('Nhập tên việc'); return; } act({ action: 'addAdhoc', title: t, cat: val('adC'), minutes: val('adM'), requester: val('adR'), urgent: document.getElementById('adU').checked }, 'Đã thêm'); },
    adhocPromote(id) { act({ action: 'updateAdhoc', id, status: 'open', date: S.d.today }, 'Đã đưa vào hôm nay'); },
    adhocDone(id) { act({ action: 'updateAdhoc', id, status: 'done' }); },
    adhocDel(id) { if (confirm('Xóa việc này?')) act({ action: 'deleteAdhoc', id }); },
    async genReport() { try { S.report = await api({ action: 'report', month: S.month }); paint(); } catch (e) { toast('Lỗi: ' + e.message); } },
    copyReport() { navigator.clipboard.writeText(S.report.text).then(() => toast('Đã copy')); },
    async sendDraft() { try { const j = await api({ action: 'sendDraft', month: S.month }); toast(j.sent ? 'Đã gửi về Gmail' : 'Chưa cấu hình Gmail'); } catch (e) { toast('Lỗi: ' + e.message); } },
    saveProp() { act({ action: 'saveProposals', month: S.month, text: val('trProp') }, 'Đã lưu'); },
    newContact() { S.contact = {}; paint(); },
    editContact(id) { S.contact = Object.assign({}, S.d.contacts.find(c => c.id === id)); paint(); },
    cancelContact() { S.contact = null; paint(); },
    search(v) {
      S.cq = v; const q = v.toLowerCase();
      const list = (S.d.contacts || []).filter(c => !q || [c.name, c.org, c.role, c.phone, c.email, c.note].join(' ').toLowerCase().includes(q)).sort((a, b) => String(a.name).localeCompare(String(b.name), 'vi'));
      document.getElementById('cList').innerHTML = contactRows(list);
    },
    saveContact() {
      const c = S.contact; Object.assign(c, { name: val('cN'), org: val('cO'), role: val('cR'), phone: val('cP'), email: val('cE'), note: val('cT') });
      if (!String(c.name).trim()) { toast('Nhập tên'); return; }
      S.contact = null; act({ action: 'saveContact', contact: c }, 'Đã lưu liên hệ');
    },
    delContact() { const id = S.contact.id; if (confirm('Xóa liên hệ này?')) { S.contact = null; act({ action: 'deleteContact', id }, 'Đã xóa'); } },
    newTpl() { S.edit = { kind: 'monthly', grp: 'acct', hard: 0 }; paint(); },
    editTpl(id) { S.edit = Object.assign({}, S.d.templates.find(t => t.id === id)); paint(); },
    cancelEdit() { S.edit = null; paint(); },
    saveTpl() {
      const t = S.edit;
      Object.assign(t, { title: val('tT'), grp: val('tG'), kind: val('tK'), from: val('tF'), to: val('tTo'), months: val('tM'), weekdays: val('tW'), start: val('tS'), end: val('tE'), est_min: val('tEst'), approver: val('tA'), hard: document.getElementById('tH').checked ? 1 : 0, auto: document.getElementById('tAu').checked ? 1 : 0, steps: val('tSt'), note: val('tN') });
      if (!String(t.title).trim()) { toast('Nhập tên việc'); return; }
      S.edit = null; act({ action: 'saveTemplate', tpl: t }, 'Đã lưu lịch mẫu');
    },
    delTpl() { const id = S.edit.id; if (confirm('Tắt việc này khỏi lịch?')) { S.edit = null; act({ action: 'deleteTemplate', id }, 'Đã tắt'); } },
    rotate() { if (confirm('Link lịch cũ sẽ ngừng hoạt động. Tiếp tục?')) act({ action: 'rotateIcs' }, 'Đã đổi link'); }
  };
})();
