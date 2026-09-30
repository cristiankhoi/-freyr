/* Freyr: giao diện (PWA). Dữ liệu ở Google Sheets qua Apps Script (Freyr.gs). */
'use strict';

/* ---------------- chữ giao diện VI / EN ---------------- */
const I18N = {
  vi: {
    today: 'Hôm nay', decisions: 'Quyết định', review: 'Cần review', progress: 'Tiến độ', daily: 'Báo cáo ngày',
    weekly: 'Báo cáo tuần', selfreview: 'Self-review 18h', study: 'Học tập', marketing: 'Marketing tự động',
    tasks: 'Công việc', done: 'Hoàn thành', rules: 'Cách làm việc', tips: 'AI Tips', env: 'Môi trường',
    archive: 'Lưu trữ', settings: 'Cài đặt', soon: 'GĐ',
    sub_today: 'Kế hoạch theo khung giờ', sub_decisions: 'Việc chờ bạn quyết, kèm khuyến nghị của Claude',
    sub_review: 'Việc Claude làm xong, chờ bạn duyệt', sub_tasks: 'Việc chưa xếp vào hôm nay',
    sub_done: 'Việc đã xong 30 ngày gần nhất', sub_rules: 'Bản đọc gọn của các quy tắc làm việc', sub_settings: 'Kết nối dữ liệu',
    k_done: 'Hoàn thành hôm nay', k_dec: 'Quyết định đang chờ', k_hours: 'Giờ ước tính / thực tế', k_ai: 'Chi phí AI tháng',
    avg_wait: 'chờ TB', days: 'ngày', not_measured: 'chưa đo', hours_note: 'tính trên việc đã xong có đo giờ',
    add: 'Thêm', add_task: 'Thêm việc', title_ph: 'Tên việc...', minutes: 'Phút', area: 'Mảng', priority: 'Ưu tiên',
    a_isolution: 'iSolution', a_own: 'Dự án riêng', a_study: 'Học tập', a_life: 'Cá nhân',
    p1: 'Cao', p2: 'Vừa', p3: 'Thấp',
    s_todo: 'chưa', s_doing: 'đang làm', s_done: 'xong', s_skip: 'bỏ',
    carried: 'chuyển', times: 'lần', no_time: 'chưa xếp giờ',
    reschedule: 'Xếp lại giờ', reschedule_hint: 'Xếp việc chưa có giờ vào khoảng trống từ bây giờ',
    plan_at: 'Kế hoạch tạo lúc', tasks_n: 'việc',
    pending_dec: 'Quyết định chờ bạn', see_all: 'Xem tất cả', save_choice: 'Lưu lựa chọn', recommended: 'Claude khuyên',
    purpose: 'Mục đích', effect: 'Hiệu quả', tradeoff: 'Đánh đổi', why: 'Vì sao khuyên', evidence: 'Bằng chứng',
    your_note: 'Ghi chú của bạn (tuỳ chọn)', chosen: 'Đã chọn', decided_on: 'lúc', change: 'Đổi lựa chọn',
    open_items: 'Đang chờ', recent_done: 'Đã xử lý gần đây',
    approve: 'Duyệt', need_fix: 'Cần sửa', reopen: 'Mở lại', open_link: 'Mở', approved: 'Đã duyệt', changes: 'Cần sửa',
    to_today: 'Đưa vào hôm nay', backlog: 'Danh sách chờ', all: 'Tất cả',
    edit: 'Sửa việc', date: 'Ngày', start: 'Giờ bắt đầu', status: 'Trạng thái', note: 'Ghi chú', link: 'Link',
    actual: 'Phút thực tế', save: 'Lưu', cancel: 'Huỷ', del: 'Xoá', to_backlog: 'Về danh sách chờ', confirm_del: 'Xoá việc này?',
    empty_today: 'Chưa có việc hôm nay. Thêm việc ở ô trên, hoặc chờ kế hoạch 7:00.',
    empty: 'Không có gì ở đây.', offline: 'Đang ngoại tuyến: thay đổi sẽ gửi khi có mạng',
    queued: 'thay đổi chờ gửi', synced: 'đã đồng bộ', syncing: 'đang đồng bộ...', sync_err: 'lỗi đồng bộ',
    api_url: 'Link Apps Script (Web app)', token: 'Mã bí mật', connect: 'Kết nối', demo: 'Xem thử với dữ liệu mẫu',
    demo_on: 'Đang xem dữ liệu mẫu. Vào Cài đặt để kết nối dữ liệu thật.',
    setup_help: 'Lần đầu mở app: dán link Web app và mã bí mật (từ hàm makeToken). Hai thông tin này chỉ lưu trên máy này.',
    logout: 'Ngắt kết nối', install_ios: 'Cài lên iPhone: mở bằng Safari > nút Chia sẻ > "Thêm vào MH chính".',
    last_sync_claude: 'Claude cập nhật lần cuối', none: 'chưa có',
    group_other: 'Khác', err_unauth: 'Sai mã bí mật', saved: 'Đã lưu', coming: 'Sẽ làm ở giai đoạn',
    star: 'Việc chính ★', close_day: 'Chốt ngày', close_day_hint: 'Chọn tối đa 3 việc chính (mỗi mảng nên 1 việc). Việc chính được xếp vào buổi sáng.',
    for_tomorrow: 'Cho ngày mai', for_today: 'Cho hôm nay', max3: 'Tối đa 3 việc', week: 'Tuần này', plan_mode: 'Phương án',
    mode_A: 'A · Cân bằng', mode_B: 'B · Mùa thi', mode_C: 'C · Dồn dự án', auto_B: 'tự chuyển vì còn', to_exam: 'ngày tới kỳ thi',
    hours: 'giờ', today_cap: 'Công suất hôm nay', budget: 'Ngân sách giờ', first_exam: 'Ngày thi đầu tiên (còn 28 ngày thì tự chuyển sang B)',
    due: 'Hạn', weekly_hours: 'Giờ làm/học mỗi tuần', sunday_pct: 'Chủ nhật làm (% ngày thường)', save_budget: 'Lưu ngân sách', ratio: 'Hệ số lệch giờ'
  },
  en: {
    today: 'Today', decisions: 'Decisions', review: 'To review', progress: 'Progress', daily: 'Daily report',
    weekly: 'Weekly report', selfreview: 'Self-review 6pm', study: 'Study', marketing: 'Marketing automation',
    tasks: 'Work', done: 'Completed', rules: 'How I work', tips: 'AI Tips', env: 'Environment',
    archive: 'Archive', settings: 'Settings', soon: 'Ph',
    sub_today: 'Time-blocked plan', sub_decisions: 'Waiting on you, with Claude\'s recommendation',
    sub_review: 'Finished by Claude, waiting for your approval', sub_tasks: 'Not scheduled for today',
    sub_done: 'Completed in the last 30 days', sub_rules: 'Short readable version of the working rules', sub_settings: 'Data connection',
    k_done: 'Done today', k_dec: 'Pending decisions', k_hours: 'Estimated / actual hours', k_ai: 'AI cost this month',
    avg_wait: 'avg wait', days: 'days', not_measured: 'not measured', hours_note: 'done tasks with measured time',
    add: 'Add', add_task: 'Add task', title_ph: 'Task name...', minutes: 'Min', area: 'Area', priority: 'Priority',
    a_isolution: 'iSolution', a_own: 'Own project', a_study: 'Study', a_life: 'Personal',
    p1: 'High', p2: 'Medium', p3: 'Low',
    s_todo: 'to do', s_doing: 'doing', s_done: 'done', s_skip: 'skipped',
    carried: 'carried', times: 'x', no_time: 'no slot',
    reschedule: 'Reschedule', reschedule_hint: 'Fit unscheduled tasks into free slots from now',
    plan_at: 'Plan made at', tasks_n: 'tasks',
    pending_dec: 'Waiting on you', see_all: 'See all', save_choice: 'Save choice', recommended: 'Claude recommends',
    purpose: 'Purpose', effect: 'Effect', tradeoff: 'Trade-off', why: 'Why this one', evidence: 'Evidence',
    your_note: 'Your note (optional)', chosen: 'Chosen', decided_on: 'at', change: 'Change',
    open_items: 'Open', recent_done: 'Recently handled',
    approve: 'Approve', need_fix: 'Needs changes', reopen: 'Reopen', open_link: 'Open', approved: 'Approved', changes: 'Needs changes',
    to_today: 'Move to today', backlog: 'Backlog', all: 'All',
    edit: 'Edit task', date: 'Date', start: 'Start', status: 'Status', note: 'Note', link: 'Link',
    actual: 'Actual minutes', save: 'Save', cancel: 'Cancel', del: 'Delete', to_backlog: 'Move to backlog', confirm_del: 'Delete this task?',
    empty_today: 'Nothing planned yet. Add a task above or wait for the 7:00 plan.',
    empty: 'Nothing here.', offline: 'Offline: changes will be sent when back online',
    queued: 'changes queued', synced: 'synced', syncing: 'syncing...', sync_err: 'sync error',
    api_url: 'Apps Script Web app URL', token: 'Secret token', connect: 'Connect', demo: 'Try with sample data',
    demo_on: 'Viewing sample data. Go to Settings to connect real data.',
    setup_help: 'First run: paste the Web app URL and the secret token (from makeToken). Both stay on this device only.',
    logout: 'Disconnect', install_ios: 'Install on iPhone: open in Safari > Share > "Add to Home Screen".',
    last_sync_claude: 'Last Claude update', none: 'none',
    group_other: 'Other', err_unauth: 'Wrong token', saved: 'Saved', coming: 'Coming in phase',
    star: 'Main task ★', close_day: 'Close day', close_day_hint: 'Pick up to 3 main tasks (ideally one per area). Main tasks go into the morning.',
    for_tomorrow: 'For tomorrow', for_today: 'For today', max3: 'Max 3 tasks', week: 'This week', plan_mode: 'Plan',
    mode_A: 'A · Balanced', mode_B: 'B · Exam season', mode_C: 'C · Project push', auto_B: 'auto-switched,', to_exam: 'days to exam',
    hours: 'h', today_cap: 'Today capacity', budget: 'Hour budget', first_exam: 'First exam date (switches to B at 28 days)',
    due: 'Due', weekly_hours: 'Work/study hours per week', sunday_pct: 'Sunday load (% of a weekday)', save_budget: 'Save budget', ratio: 'Time drift'
  }
};

const PAGES = [
  { k: 'today', i: '📅' }, { k: 'decisions', i: '🗳' }, { k: 'review', i: '👀' },
  { k: 'progress', i: '📈', ph: 3 }, { k: 'daily', i: '📝', ph: 2 }, { k: 'weekly', i: '📋', ph: 2 },
  { k: 'selfreview', i: '🪞', ph: 2 }, { k: 'study', i: '🎓', ph: 3 }, { k: 'marketing', i: '🤖', ph: 4 },
  { sep: 1 },
  { k: 'tasks', i: '🗂' }, { k: 'done', i: '✅' }, { k: 'rules', i: '📘' },
  { k: 'tips', i: '💡', ph: 4 }, { k: 'env', i: '🧭', ph: 4 }, { k: 'archive', i: '🗄', ph: 4 },
  { sep: 1 }, { k: 'settings', i: '⚙️' }
];
const AREAS = ['isolution', 'own', 'study', 'life'];
const STATUS_NEXT = { todo: 'doing', doing: 'done', done: 'todo', skip: 'todo' };

/* ---------------- lưu trên máy ---------------- */
const LS = {
  get(k, d) { try { const v = localStorage.getItem('ko_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('ko_' + k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
};

const S = {
  cfg: LS.get('cfg', { url: '', token: '', demo: false }),
  lang: LS.get('lang', 'vi'),
  data: LS.get('data', null),
  queue: LS.get('queue', []),
  page: 'today',
  filter: 'all',
  sync: ''
};
const t = k => (I18N[S.lang][k] !== undefined ? I18N[S.lang][k] : k);
const esc = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// chỉ cho link http/https (chặn javascript: và kiểu link lạ)
const safeUrl = u => (/^https?:\/\//i.test(String(u || '').trim()) ? esc(String(u).trim()) : '');
const AREA_KEYS = ['isolution', 'study', 'own'];
function addDay(d, n) { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); }
const $ = sel => document.querySelector(sel);

/* ---------------- gọi máy chủ ---------------- */
const Api = {
  async post(body) {
    if (S.cfg.demo) return Demo.handle(body);
    const res = await fetch(S.cfg.url, {
      method: 'POST', redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ token: S.cfg.token }, body))
    });
    const j = await res.json();
    if (!j.ok) throw new Error(j.error === 'unauthorized' ? t('err_unauth') : j.error);
    return j;
  }
};

const App = {
  connected() { return S.cfg.demo || (S.cfg.url && S.cfg.token); },

  async init() {
    if (/[?&]demo=1/.test(location.search) && !App.connected()) { S.cfg = { url: '', token: '', demo: true }; }
    UI.renderNav();
    const h = location.hash.replace('#', '');
    S.page = PAGES.some(p => p.k === h && !p.ph) ? h : (App.connected() ? 'today' : 'settings');
    UI.render();
    if (App.connected()) App.refresh(false);
    window.addEventListener('hashchange', () => { const k = location.hash.replace('#', ''); if (k && k !== S.page) App.go(k, true); });
    window.addEventListener('online', () => App.refresh(false));
    document.addEventListener('visibilitychange', () => { if (!document.hidden && App.connected()) App.refresh(false); });
    setInterval(() => { if (S.page === 'today') UI.render(); }, 60000);
    if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
  },

  go(k, fromHash) {
    S.page = k; UI.closeNav(); UI.renderNav(); UI.render();
    if (!fromHash) history.replaceState(null, '', '#' + k);
    window.scrollTo(0, 0);
  },

  toggleLang() { S.lang = S.lang === 'vi' ? 'en' : 'vi'; LS.set('lang', S.lang); document.documentElement.lang = S.lang; UI.renderNav(); UI.render(); },

  setSync(s) { S.sync = s; UI.renderSync(); },

  async refresh(manual) {
    if (!App.connected()) return;
    await App.flush();
    App.setSync('syncing');
    try {
      const j = await Api.post({ action: 'data' });
      S.data = j.data || j; LS.set('data', S.data);
      App.setSync(S.queue.length ? 'queued' : 'synced');
      UI.renderNav(); UI.render();
      if (manual) UI.toast(t('synced'));
    } catch (e) {
      App.setSync(navigator.onLine ? 'err' : 'offline');
      if (manual) UI.toast(e.message);
    }
  },

  /** thay đổi: sửa ngay trên máy (optimistic), rồi gửi; mất mạng thì xếp hàng */
  async act(body, local) {
    if (local && S.data) { local(S.data); LS.set('data', S.data); UI.renderNav(); UI.render(); }
    S.queue.push(body); LS.set('queue', S.queue);
    await App.flush();
  },

  async flush() {
    if (App._flushing || !S.queue.length) return;
    App._flushing = true;
    try {
      while (S.queue.length) {
        App.setSync('syncing');
        const last = S.queue.length === 1;
        const j = await Api.post(Object.assign({}, S.queue[0], { withData: last }));
        S.queue.shift(); LS.set('queue', S.queue);
        if (last && j.data) { S.data = j.data; LS.set('data', S.data); UI.renderNav(); UI.render(); }
      }
      App.setSync('synced');
    } catch (e) {
      if (/token|mã/i.test(e.message)) { UI.toast(e.message); }
      else if (!/Failed to fetch|NetworkError|Load failed/i.test(e.message)) { S.queue.shift(); LS.set('queue', S.queue); UI.toast(e.message); }
      App.setSync(navigator.onLine ? 'err' : 'offline');
    } finally { App._flushing = false; }
  },

  /* ---- việc ---- */
  addTask(form) {
    const f = new FormData(form), title = (f.get('title') || '').trim();
    if (!title) return false;
    const task = { title, minutes: Number(f.get('minutes') || 60), area: f.get('area'), priority: Number(f.get('priority') || 2), date: S.page === 'tasks' ? '' : S.data.today };
    const tmp = Object.assign({ id: 'tmp' + Date.now(), start: '', status: 'todo', carried: 0, source: 'user', created: '' }, task);
    App.act({ action: 'addTask', task }, d => { (task.date ? d.tasks : d.backlog).push(tmp); });
    form.reset();
    return false;
  },

  cycle(id) {
    const tk = App.findTask(id); if (!tk) return;
    const st = STATUS_NEXT[tk.status] || 'todo';
    App.act({ action: 'updateTask', id, fields: { status: st } }, () => { tk.status = st; });
  },

  findTask(id) {
    const d = S.data || {};
    return (d.tasks || []).concat(d.backlog || [], d.doneRecent || []).find(x => x.id === id);
  },

  saveTask(id, form) {
    const f = Object.fromEntries(new FormData(form).entries());
    f.minutes = Number(f.minutes || 60); f.priority = Number(f.priority || 2); f.star = f.star ? 1 : '';
    App.act({ action: 'updateTask', id, fields: f }, d => {
      const tk = App.findTask(id); Object.assign(tk, f);
      App.relocate(d, tk);
    });
    UI.closeModal();
    return false;
  },

  relocate(d, tk) {
    d.tasks = d.tasks.filter(x => x.id !== tk.id); d.backlog = d.backlog.filter(x => x.id !== tk.id);
    if (tk.date === d.today) d.tasks.push(tk); else if (tk.status !== 'done') d.backlog.push(tk);
    d.tasks.sort((a, b) => (a.start || '99') < (b.start || '99') ? -1 : 1);
  },

  moveTask(id, date) {
    App.act({ action: 'updateTask', id, fields: { date, start: '' } }, d => { const tk = App.findTask(id); tk.date = date; tk.start = ''; App.relocate(d, tk); });
    UI.closeModal();
  },

  deleteTask(id) {
    if (!confirm(t('confirm_del'))) return;
    App.act({ action: 'deleteTask', id }, d => { d.tasks = d.tasks.filter(x => x.id !== id); d.backlog = d.backlog.filter(x => x.id !== id); });
    UI.closeModal();
  },

  reschedule() { App.act({ action: 'reschedule' }); UI.toast(t('syncing')); },

  /* ---- chốt ngày: chọn tối đa 3 việc chính ---- */
  saveStars(form) {
    const f = new FormData(form), ids = f.getAll('ids'), date = f.get('date');
    if (ids.length > 3) { UI.toast(t('max3')); return false; }
    App.act({ action: 'setStars', ids, date }, d => {
      d.tasks.concat(d.backlog).forEach(x => {
        if (x.date === date && x.star && !ids.includes(x.id)) x.star = '';
        if (ids.includes(x.id)) { x.star = 1; if (x.date !== date) x.start = ''; x.date = date; App.relocate(d, x); }
      });
    });
    UI.closeModal(); UI.toast(t('saved'));
    return false;
  },

  saveBudget(form) {
    const f = new FormData(form);
    const body = { action: 'setBudget', mode: f.get('mode'), first_exam: f.get('first_exam') || '', weekly_hours: Number(f.get('weekly_hours') || 70), sunday_factor: Number(f.get('sunday_pct') || 45) / 100 };
    App.act(body, d => { if (d.week) Object.assign(d.week, { mode: body.mode, first_exam: body.first_exam }); });
    UI.toast(t('saved'));
    return false;
  },

  /* ---- quyết định / review ---- */
  choose(id, form) {
    const f = new FormData(form), chosen = f.get('opt'), note = f.get('note') || '';
    if (!chosen) return false;
    App.act({ action: 'chooseDecision', id, chosen, note }, d => {
      const x = d.decisions.find(y => y.id === id); Object.assign(x, { chosen, note, status: 'decided', decided_at: nowLocal() });
    });
    UI.toast(t('saved'));
    return false;
  },
  reopenDecision(id) {
    const x = S.data.decisions.find(y => y.id === id); x.status = 'open'; UI.render();
  },
  reviewAct(id, status) {
    const note = status === 'changes' ? (prompt(t('note')) || '') : '';
    App.act({ action: 'reviewAction', id, status, note }, d => {
      const x = d.reviews.find(y => y.id === id); Object.assign(x, { status, note, done_at: status === 'open' ? '' : nowLocal() });
    });
  },

  /* ---- cài đặt ---- */
  connect(form) {
    const f = new FormData(form);
    S.cfg = { url: (f.get('url') || '').trim(), token: (f.get('token') || '').trim(), demo: false };
    LS.set('cfg', S.cfg); S.data = null; S.queue = []; LS.set('queue', []);
    App.refresh(true).then(() => { if (S.data) App.go('today'); });
    return false;
  },
  demo() { S.cfg = { url: '', token: '', demo: true }; LS.set('cfg', S.cfg); S.data = null; App.refresh(false).then(() => App.go('today')); },
  logout() { S.cfg = { url: '', token: '', demo: false }; LS.set('cfg', S.cfg); S.data = null; LS.set('data', null); S.queue = []; LS.set('queue', []); App.go('settings'); }
};

function nowLocal() { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
function hhmm() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
function toMin(s) { const p = String(s || '').split(':'); return Number(p[0]) * 60 + Number(p[1] || 0); }
function daysBetween(a, b) { return Math.max(0, Math.round((new Date(b.slice(0, 10)) - new Date(a.slice(0, 10))) / 864e5)); }
function fmtDate(d) {
  if (!d) return '';
  const x = new Date(d.slice(0, 10) + 'T12:00:00');
  return x.toLocaleDateString(S.lang === 'vi' ? 'vi-VN' : 'en-GB', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fmtNum(n, dig) { return Number(n).toLocaleString(S.lang === 'vi' ? 'vi-VN' : 'en-US', { maximumFractionDigits: dig || 0 }); }

/* ---------------- vẽ giao diện ---------------- */
const UI = {
  openNav() { document.body.classList.add('nav-open'); },
  closeNav() { document.body.classList.remove('nav-open'); },
  toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(UI._tt); UI._tt = setTimeout(() => el.classList.remove('on'), 2200); },

  counts() {
    const d = S.data; if (!d) return {};
    return {
      today: d.tasks.filter(x => x.status !== 'done' && x.status !== 'skip').length,
      decisions: d.decisions.filter(x => x.status !== 'decided').length,
      review: d.reviews.filter(x => x.status === 'open').length
    };
  },

  renderNav() {
    const c = UI.counts();
    $('#nav').innerHTML = '<div class="logo"><i>K</i>Freyr</div>' + PAGES.map(p => {
      if (p.sep) return '<hr>';
      const badge = c[p.k] ? `<b>${c[p.k]}</b>` : (p.ph ? `<small>${t('soon')}${p.ph}</small>` : '');
      return `<a href="#${p.k}" class="${p.k === S.page ? 'on' : ''} ${p.ph ? 'off' : ''}" onclick="App.go('${p.k}');return false"><span>${p.i} ${t(p.k)}</span>${badge}</a>`;
    }).join('');
    $('#langBtn').textContent = S.lang === 'vi' ? 'EN' : 'VI';
  },

  renderSync() {
    const q = S.queue.length, m = { syncing: t('syncing'), synced: t('synced'), err: t('sync_err'), offline: t('offline'), queued: q + ' ' + t('queued') };
    $('#syncState').textContent = S.cfg.demo ? 'demo' : (m[S.sync] || '');
  },

  render() {
    $('#pageTitle').textContent = t(S.page);
    $('#pageSub').textContent = t('sub_' + S.page) === 'sub_' + S.page ? '' : t('sub_' + S.page);
    UI.renderSync();
    if (S.page !== 'settings' && !S.data) { $('#view').innerHTML = `<div class="empty">${App.connected() ? t('syncing') : ''}</div>`; if (!App.connected()) App.go('settings'); return; }
    const fn = Pages[S.page] || Pages.today;
    const banner = S.cfg.demo && S.page !== 'settings' ? `<div class="banner">${t('demo_on')}</div>` : '';
    $('#view').innerHTML = banner + fn();
  },

  areaSel(name, val) { return `<select name="${name}">${AREAS.map(a => `<option value="${a}" ${a === val ? 'selected' : ''}>${t('a_' + a)}</option>`).join('')}</select>`; },
  prioSel(val) { return `<select name="priority">${[1, 2, 3].map(p => `<option value="${p}" ${Number(val) === p ? 'selected' : ''}>${t('p' + p)}</option>`).join('')}</select>`; },

  taskRow(x, now) {
    const cur = now && x.start && toMin(x.start) <= toMin(now) && toMin(now) < toMin(x.start) + Number(x.minutes || 0) && x.status !== 'done';
    const meta = [];
    if (Number(x.carried)) meta.push(`<span class="pill late">${t('carried')} ${x.carried} ${t('times')}</span>`);
    if (x.source === 'calendar') meta.push('📆 Calendar');
    if (x.due) {
      const left = daysBetween(S.data.today, x.due.slice(0, 10)), dd = x.due.slice(8, 10) + '/' + x.due.slice(5, 7) + ' ' + x.due.slice(11, 16);
      meta.push(`<span class="pill ${x.due.slice(0, 10) <= addDay(S.data.today, 2) ? 'late' : 'st-todo'}">⏰ ${t('due')} ${dd}${left > 0 ? ` · ${left} ${t('days')}` : ''}</span>`);
    }
    if (x.note) meta.push(esc(x.note));
    if (safeUrl(x.link)) meta.push(`<a href="${safeUrl(x.link)}" target="_blank" rel="noopener">${t('open_link')} ↗</a>`);
    return `<li class="task a-${esc(x.area)} ${cur ? 'now' : ''} ${x.status === 'done' ? 'is-done' : ''} ${x.star ? 'is-star' : ''}">
      <div class="tm">${x.start ? esc(x.start) : '<span class="mut">--:--</span>'}</div>
      <div><div class="tt" onclick="UI.editTask('${x.id}')">${x.star ? '<span class="star">★</span> ' : ''}${esc(x.title)}</div>${meta.length ? `<div class="meta">${meta.join(' · ')}</div>` : ''}</div>
      <div class="side"><span class="pill st-${esc(x.status)}" onclick="App.cycle('${x.id}')">${t('s_' + x.status)}</span><span class="mut">${Number(x.minutes) > 120 && x.source !== 'routine' && x.source !== 'calendar' ? `90'/${esc(x.minutes)}'` : esc(x.minutes) + "'"}</span></div>
    </li>`;
  },

  decisionCard(x, compact) {
    const decided = x.status === 'decided';
    const opts = (x.options || []).map(o => {
      const isRec = o.key === x.recommended, sel = decided ? o.key === x.chosen : isRec;
      const detail = compact ? '' : [o.purpose && `<b>${t('purpose')}:</b> ${esc(o.purpose)}`, o.effect && `<b>${t('effect')}:</b> ${esc(o.effect)}`, o.tradeoff && `<b>${t('tradeoff')}:</b> ${esc(o.tradeoff)}`].filter(Boolean).join('<br>');
      return `<label class="opt ${sel ? 'sel' : ''} ${isRec ? 'is-rec' : ''}" onclick="this.parentNode.querySelectorAll('.opt').forEach(e=>e.classList.remove('sel'));this.classList.add('sel')">
        <input type="radio" name="opt" value="${esc(o.key)}" ${sel ? 'checked' : ''} ${decided ? 'disabled' : ''}><b>${esc(o.key)}. ${esc(o.title)}</b> ${isRec ? `<span class="pill rec">${t('recommended')}</span>` : ''}
        ${detail ? `<div class="d">${detail}</div>` : ''}</label>`;
    }).join('');
    const wait = x.created ? ` · ${t('avg_wait').split(' ')[0]} ${daysBetween(x.created, S.data.today)} ${t('days')}` : '';
    const more = compact ? '' : `${x.why ? `<details><summary>${t('why')}</summary><div class="mut" style="white-space:pre-wrap">${esc(x.why)}</div></details>` : ''}
      ${x.evidence ? `<details><summary>${t('evidence')}</summary><div class="mut" style="white-space:pre-wrap">${esc(x.evidence)}</div></details>` : ''}`;
    const foot = decided
      ? `<div class="chosen mut" style="margin-top:8px">${t('chosen')}: <b>${esc(x.chosen)}</b> ${t('decided_on')} ${esc(x.decided_at)}${x.note ? ' · ' + esc(x.note) : ''} <button type="button" class="btn sm ghost" onclick="App.reopenDecision('${x.id}')">${t('change')}</button></div>`
      : `${compact ? '' : `<textarea name="note" placeholder="${t('your_note')}" style="margin-top:6px"></textarea>`}<div class="actions" style="justify-content:flex-start;margin-top:8px"><button class="btn p">${t('save_choice')}</button></div>`;
    return `<form class="card pad dec" onsubmit="return App.choose('${x.id}',this)">
      <div class="sec"><span>${esc(x.title)}</span><span class="mut">${esc((x.created || '').slice(0, 10))}${wait}</span></div>
      ${x.context && !compact ? `<div class="mut" style="white-space:pre-wrap">${esc(x.context)}</div>` : ''}
      ${opts}${more}${foot}</form>`;
  },

  editTask(id) {
    const x = App.findTask(id); if (!x) return;
    const st = ['todo', 'doing', 'done', 'skip'].map(s => `<option value="${s}" ${s === x.status ? 'selected' : ''}>${t('s_' + s)}</option>`).join('');
    UI.modal(`<form onsubmit="return App.saveTask('${id}',this)">
      <div class="sec">${t('edit')}</div>
      <input name="title" value="${esc(x.title)}" required>
      <div class="two"><div><label class="f">${t('date')}</label><input type="date" name="date" value="${esc(x.date)}"></div>
        <div><label class="f">${t('start')}</label><input type="time" name="start" value="${esc(x.start)}"></div></div>
      <div class="two"><div><label class="f">${t('minutes')}</label><input type="number" name="minutes" min="5" step="5" value="${esc(x.minutes)}"></div>
        <div><label class="f">${t('actual')}</label><input type="number" name="actual_min" min="0" value="${esc(x.actual_min)}"></div></div>
      <div class="two"><div><label class="f">${t('area')}</label>${UI.areaSel('area', x.area)}</div><div><label class="f">${t('priority')}</label>${UI.prioSel(x.priority)}</div></div>
      <label class="f">${t('status')}</label><select name="status">${st}</select>
      <label class="f" style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="star" value="1" style="width:auto" ${x.star ? 'checked' : ''}> ${t('star')}</label>
      <label class="f">${t('link')}</label><input name="link" value="${esc(x.link)}">
      <label class="f">${t('note')}</label><textarea name="note">${esc(x.note)}</textarea>
      <div class="actions">
        <button type="button" class="btn" onclick="App.deleteTask('${id}')">${t('del')}</button>
        ${x.date ? `<button type="button" class="btn" onclick="App.moveTask('${id}','')">${t('to_backlog')}</button>` : `<button type="button" class="btn" onclick="App.moveTask('${id}','${S.data.today}')">${t('to_today')}</button>`}
        <span style="flex:1"></span>
        <button type="button" class="btn" onclick="UI.closeModal()">${t('cancel')}</button><button class="btn p">${t('save')}</button>
      </div></form>`);
  },
  modal(html) { UI.closeModal(); const m = document.createElement('div'); m.className = 'modal'; m.id = 'modal'; m.innerHTML = `<div class="box">${html}</div>`; m.onclick = e => { if (e.target === m) UI.closeModal(); }; document.body.appendChild(m); },
  closeModal() { const m = $('#modal'); if (m) m.remove(); },

  closeDay() {
    const d = S.data, afternoon = Number(hhmm().slice(0, 2)) >= 12, date = afternoon ? addDay(d.today, 1) : d.today;
    const cands = d.tasks.concat(d.backlog).filter(x => AREA_KEYS.includes(x.area) && (x.status === 'todo' || x.status === 'doing') && x.source !== 'routine' && x.source !== 'calendar')
      .sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0) || a.priority - b.priority);
    const rows = cands.map(x => `<label class="opt" style="margin:5px 0"><input type="checkbox" name="ids" value="${x.id}" ${x.star && x.date === date ? 'checked' : ''}
      onchange="if(this.form.querySelectorAll('input[name=ids]:checked').length>3){this.checked=false;UI.toast(t('max3'))}">
      <span class="area-dot" style="background:var(--${esc(x.area)})"></span>${esc(x.title)} <span class="mut">${esc(x.minutes)}' · ${t('p' + x.priority)}</span></label>`).join('');
    UI.modal(`<form onsubmit="return App.saveStars(this)">
      <div class="sec">${t('close_day')}</div><p class="mut" style="margin-top:0">${t('close_day_hint')}</p>
      <select name="date"><option value="${addDay(d.today, 1)}" ${afternoon ? 'selected' : ''}>${t('for_tomorrow')} (${addDay(d.today, 1).slice(5).split('-').reverse().join('/')})</option>
        <option value="${d.today}" ${afternoon ? '' : 'selected'}>${t('for_today')}</option></select>
      ${rows || `<div class="empty">${t('empty')}</div>`}
      <div class="actions"><button type="button" class="btn" onclick="UI.closeModal()">${t('cancel')}</button><button class="btn p">${t('save')}</button></div></form>`);
  },

  weekCard() {
    const w = S.data.week; if (!w) return '';
    const auto = w.auto_switched ? ` <span class="pill st-doing">${t('auto_B')} ${w.days_to_exam} ${t('to_exam')}</span>` : (w.days_to_exam !== null && w.days_to_exam !== undefined ? ` <span class="mut">${w.days_to_exam} ${t('to_exam')}</span>` : '');
    const bars = AREA_KEYS.map(a => {
      const used = Number(w.used[a] || 0), tg = Number(w.targets[a] || 0), pl = Number(w.planned_today[a] || 0);
      const pu = tg ? Math.min(100, used / tg * 100) : 0, pp = tg ? Math.min(100 - pu, pl / tg * 100) : 0;
      return `<div style="margin:8px 0 2px;display:flex;justify-content:space-between;font-size:12.5px"><span><span class="area-dot" style="background:var(--${a})"></span>${t('a_' + a)}</span><span class="mut">${fmtNum(used, 1)} / ${fmtNum(tg, 1)} ${t('hours')}${w.ratio && w.ratio[a] ? ` · ×${fmtNum(w.ratio[a], 2)}` : ''}</span></div>
        <div class="bar"><i style="width:${pu}%;background:var(--${a})"></i><i style="width:${pp}%;background:var(--${a});opacity:.35"></i></div>`;
    }).join('');
    return `<div class="card pad"><div class="sec"><span>${t('week')} · ${t('mode_' + w.effective_mode)}</span></div>${auto}${bars}
      <div class="mut" style="margin-top:8px">${t('today_cap')}: ${fmtNum(w.capacity_today_min / 60, 1)} ${t('hours')}</div></div>`;
  },

  addForm() {
    return `<form class="form" onsubmit="return App.addTask(this)">
      <input name="title" placeholder="${t('title_ph')}" autocomplete="off">
      <input name="minutes" type="number" min="5" step="5" value="60" title="${t('minutes')}">
      ${UI.areaSel('area', 'isolution')}${UI.prioSel(2)}
      <button class="btn p">${t('add')}</button></form>`;
  }
};

/* ---------------- các trang ---------------- */
const Pages = {
  today() {
    const d = S.data, now = hhmm();
    const live = d.tasks.filter(x => x.status !== 'skip');
    const done = live.filter(x => x.status === 'done');
    const openDec = d.decisions.filter(x => x.status !== 'decided');
    const wait = openDec.length ? openDec.reduce((s, x) => s + daysBetween(x.created || d.today, d.today), 0) / openDec.length : 0;
    const measured = done.filter(x => Number(x.actual_min) > 0);
    const est = measured.reduce((s, x) => s + Number(x.minutes || 0), 0) / 60, act = measured.reduce((s, x) => s + Number(x.actual_min || 0), 0) / 60;
    const cost = d.meta.ai_cost_month_vnd, cap = d.meta.ai_cap_vnd;
    const kpis = `<div class="grid4">
      <div class="card pad kpi"><div class="l">${t('k_done')}</div><div class="v">${done.length}/${live.length}</div></div>
      <div class="card pad kpi"><div class="l">${t('k_dec')}</div><div class="v">${openDec.length}</div><div class="l">${openDec.length ? `${t('avg_wait')} ${fmtNum(wait, 1)} ${t('days')}` : '&nbsp;'}</div></div>
      <div class="card pad kpi"><div class="l">${t('k_hours')}</div><div class="v">${measured.length ? `${fmtNum(est, 1)} / ${fmtNum(act, 1)}` : '–'}</div><div class="l">${measured.length ? t('hours_note') : t('not_measured')}</div></div>
      <div class="card pad kpi"><div class="l">${t('k_ai')}</div><div class="v">${fmtNum(cost / 1000)}k / ${fmtNum(cap / 1000)}k</div><div class="l">${cost ? '&nbsp;' : t('not_measured')}</div></div>
    </div>`;
    const scheduled = live.filter(x => x.start), unscheduled = live.filter(x => !x.start);
    const list = live.length ? `<ul class="tasks">${scheduled.concat(unscheduled).map(x => UI.taskRow(x, now)).join('')}</ul>` : `<div class="empty">${t('empty_today')}</div>`;
    const openRev = d.reviews.filter(x => x.status === 'open');
    const side = `<div class="side-col" style="display:flex;flex-direction:column;gap:14px">
      ${UI.weekCard()}
      ${openDec.length ? `<div><div class="sec"><span>${t('pending_dec')} (${openDec.length})</span><a href="#decisions" onclick="App.go('decisions');return false" class="mut">${t('see_all')} →</a></div>${openDec.slice(0, 2).map(x => UI.decisionCard(x, true)).join('')}</div>` : ''}
      ${openRev.length ? `<div class="card"><div class="sec pad" style="margin:0;padding-bottom:0"><span>${t('review')} (${openRev.length})</span><a href="#review" onclick="App.go('review');return false" class="mut">${t('see_all')} →</a></div>
        ${openRev.slice(0, 5).map(r => `<div class="row"><span>${esc(r.title)}</span>${safeUrl(r.link) ? `<a href="${safeUrl(r.link)}" target="_blank" rel="noopener">${t('open_link')} ↗</a>` : ''}</div>`).join('')}</div>` : ''}
    </div>`;
    return `${kpis}
      <div class="split">
        <div><div class="sec"><span>${fmtDate(d.today)} · ${live.length} ${t('tasks_n')}</span>
          <span style="display:flex;gap:6px"><button class="btn sm" onclick="UI.closeDay()">★ ${t('close_day')}</button>
          <button class="btn sm" title="${t('reschedule_hint')}" onclick="App.reschedule()">${t('reschedule')}</button></span></div>
          <div class="card">${UI.addForm()}${list}</div>
          <div class="mut" style="margin-top:8px">${d.meta.last_plan ? `${t('plan_at')} ${esc(d.meta.last_plan)} · ` : ''}${t('last_sync_claude')}: ${esc(d.meta.last_claude_sync || t('none'))}</div>
        </div>${side}</div>`;
  },

  decisions() {
    const d = S.data, open = d.decisions.filter(x => x.status !== 'decided'), done = d.decisions.filter(x => x.status === 'decided');
    return `<div class="group-h">${t('open_items')} (${open.length})</div>${open.length ? open.map(x => UI.decisionCard(x, false)).join('') : `<div class="card empty">${t('empty')}</div>`}
      ${done.length ? `<div class="group-h">${t('recent_done')}</div>${done.map(x => UI.decisionCard(x, false)).join('')}` : ''}`;
  },

  review() {
    const d = S.data, open = d.reviews.filter(x => x.status === 'open'), done = d.reviews.filter(x => x.status !== 'open');
    const row = r => `<div class="row"><div><div>${esc(r.title)}</div><div class="mut">${t('a_' + r.area) === 'a_' + r.area ? '' : t('a_' + r.area) + ' · '}${esc((r.created || '').slice(0, 10))}${r.note ? ' · ' + esc(r.note) : ''}</div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">${safeUrl(r.link) ? `<a class="btn sm" href="${safeUrl(r.link)}" target="_blank" rel="noopener">${t('open_link')} ↗</a>` : ''}
      ${r.status === 'open' ? `<button class="btn sm p" onclick="App.reviewAct('${r.id}','approved')">${t('approve')}</button><button class="btn sm" onclick="App.reviewAct('${r.id}','changes')">${t('need_fix')}</button>`
        : `<span class="pill ${r.status === 'approved' ? 'st-done' : 'st-doing'}">${t(r.status)}</span><button class="btn sm ghost" onclick="App.reviewAct('${r.id}','open')">${t('reopen')}</button>`}</div></div>`;
    return `<div class="group-h">${t('open_items')} (${open.length})</div><div class="card">${open.length ? open.map(row).join('') : `<div class="empty">${t('empty')}</div>`}</div>
      ${done.length ? `<div class="group-h">${t('recent_done')}</div><div class="card">${done.map(row).join('')}</div>` : ''}`;
  },

  tasks() {
    const d = S.data;
    const list = d.backlog.filter(x => S.filter === 'all' || x.area === S.filter).sort((a, b) => (a.priority - b.priority) || ((a.date || '9') < (b.date || '9') ? -1 : 1));
    const chips = ['all'].concat(AREAS).map(a => `<span class="chip ${S.filter === a ? 'on' : ''}" onclick="S.filter='${a}';UI.render()">${a === 'all' ? t('all') : t('a_' + a)}</span>`).join('');
    return `<div class="chips">${chips}</div><div class="card">${UI.addForm()}${list.length ? `<ul class="tasks">${list.map(x => {
      const row = UI.taskRow(Object.assign({}, x, { start: x.date ? x.date.slice(5).split('-').reverse().join('/') : '' }), null);
      return row.replace('<div class="side">', `<div class="side"><button class="btn sm" onclick="App.moveTask('${x.id}','${d.today}')">${t('to_today')}</button>`);
    }).join('')}</ul>` : `<div class="empty">${t('empty')}</div>`}</div>`;
  },

  done() {
    const d = S.data, all = d.tasks.filter(x => x.status === 'done').concat(d.doneRecent || []);
    const by = {};
    all.forEach(x => { const k = (x.done_at || x.date || '').slice(0, 10); (by[k] = by[k] || []).push(x); });
    const days = Object.keys(by).sort().reverse();
    if (!days.length) return `<div class="card empty">${t('empty')}</div>`;
    return days.map(k => `<div class="group-h">${fmtDate(k)} · ${by[k].length}</div><div class="card"><ul class="tasks">${by[k].map(x => UI.taskRow(Object.assign({}, x, { start: (x.done_at || '').slice(11) }), null)).join('')}</ul></div>`).join('');
  },

  rules() {
    const d = S.data, by = {};
    d.rules.forEach(r => { const g = r.group || t('group_other'); (by[g] = by[g] || []).push(r); });
    const gs = Object.keys(by);
    if (!gs.length) return `<div class="card empty">${t('empty')}</div>`;
    return gs.map(g => `<div class="group-h">${esc(g)}</div><div class="card">${by[g].map(r => `<div class="rule"><b>${esc(r.title)}</b><div>${esc(r.body)}</div></div>`).join('')}</div>`).join('');
  },

  settings() {
    const c = S.cfg;
    return `<div class="card pad" style="max-width:560px">
      <p class="mut">${t('setup_help')}</p>
      <form onsubmit="return App.connect(this)">
        <label class="f">${t('api_url')}</label><input name="url" value="${esc(c.url)}" placeholder="https://script.google.com/macros/s/.../exec" autocomplete="off">
        <label class="f">${t('token')}</label><input name="token" value="${esc(c.token)}" type="password" autocomplete="off">
        <div class="actions" style="justify-content:flex-start"><button class="btn p">${t('connect')}</button>
          <button type="button" class="btn" onclick="App.demo()">${t('demo')}</button>
          ${App.connected() ? `<button type="button" class="btn ghost" onclick="App.logout()">${t('logout')}</button>` : ''}</div>
      </form>
      <p class="mut" style="margin-top:16px">${t('install_ios')}</p></div>
      ${S.data && S.data.week ? (() => { const w = S.data.week, b = w.budget || {};
        return `<form class="card pad" style="max-width:560px;margin-top:14px" onsubmit="return App.saveBudget(this)">
        <div class="sec">${t('budget')}</div>
        <label class="f">${t('plan_mode')}</label><select name="mode">${['A', 'B', 'C'].map(m => `<option value="${m}" ${w.mode === m ? 'selected' : ''}>${t('mode_' + m)}</option>`).join('')}</select>
        <label class="f">${t('first_exam')}</label><input type="date" name="first_exam" value="${esc(w.first_exam)}">
        <div class="two"><div><label class="f">${t('weekly_hours')}</label><input type="number" name="weekly_hours" min="10" max="112" value="${esc(b.weekly_hours || 70)}"></div>
          <div><label class="f">${t('sunday_pct')}</label><input type="number" name="sunday_pct" min="0" max="100" value="${Math.round((b.sunday_factor ?? 0.45) * 100)}"></div></div>
        <div class="actions" style="justify-content:flex-start"><button class="btn p">${t('save_budget')}</button></div></form>`; })() : ''}`;
  }
};

/* ---------------- dữ liệu mẫu (chỉ để xem thử, không gửi đi đâu) ---------------- */
const Demo = {
  db: null,
  make() {
    const d = new Date(), p = n => String(n).padStart(2, '0'), today = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    let n = 0; const T = (start, minutes, title, area, status, extra) => Object.assign({ id: 'D' + (++n), date: today, start, minutes, title, area, priority: 2, status, note: '', link: '', source: 'user', carried: 0, created: today + ' 07:00', actual_min: '' }, extra || {});
    return {
      today, meta: { ai_cost_month_vnd: 0, ai_cap_vnd: 100000, last_claude_sync: today + ' 00:30', last_plan: today + ' 07:00' },
      week: { mode: 'A', effective_mode: 'A', auto_switched: false, days_to_exam: null, first_exam: '', capacity_today_min: 651,
        budget: { mode: 'A', weekly_hours: 70, sunday_factor: 0.45 }, targets: { isolution: 35, study: 21, own: 14 },
        used: { isolution: 9.5, study: 4, own: 5.5 }, planned_today: { isolution: 4, study: 3.5, own: 1 }, ratio: { own: 1.2 } },
      tasks: [
        T('06:00', 60, 'Dậy, vệ sinh, ăn sáng', 'life', 'done', { source: 'routine', actual_min: 55 }),
        T('07:00', 60, 'Việc mẫu: ôn bài học', 'study', 'done', { actual_min: 70 }),
        T('08:00', 45, 'Việc mẫu: đọc tin, chọn chủ đề', 'isolution', 'doing', { star: 1 }),
        T('09:00', 180, 'Việc mẫu: khối việc công ty', 'isolution', 'todo'),
        T('11:30', 60, 'Ăn trưa, nghỉ', 'life', 'todo', { source: 'routine' }),
        T('13:30', 60, 'Việc mẫu: dự án riêng', 'own', 'todo', { carried: 1 }),
        T('14:30', 150, 'Lớp học mẫu (từ Calendar)', 'study', 'todo', { source: 'calendar' }),
        T('18:00', 15, 'Self-review', 'life', 'todo', { source: 'routine' }),
        T('', 30, 'Việc mẫu chưa xếp giờ', 'isolution', 'todo')
      ],
      backlog: [T('', 90, 'Việc mẫu trong danh sách chờ', 'own', 'todo', { date: '', priority: 1 })],
      doneRecent: [],
      decisions: [{ id: 'DD1', created: today + ' 07:00', title: 'Quyết định mẫu', context: 'Bối cảnh mẫu.', status: 'open', recommended: 'A', why: 'Lý do mẫu.', evidence: '',
        options: [{ key: 'A', title: 'Phương án A', purpose: 'mục đích', effect: 'hiệu quả', tradeoff: 'đánh đổi' }, { key: 'B', title: 'Phương án B', purpose: 'mục đích', effect: 'hiệu quả', tradeoff: 'đánh đổi' }] }],
      reviews: [{ id: 'DR1', created: today + ' 07:00', title: 'Bản nháp mẫu cần duyệt', link: '', area: 'isolution', status: 'open', note: '' }],
      rules: [{ id: 'R1', group: 'Chung', title: 'Quy tắc mẫu', body: 'Nội dung quy tắc mẫu.', order: 1 }]
    };
  },
  handle(b) {
    if (!Demo.db) Demo.db = Demo.make();
    const d = Demo.db;
    if (b.action === 'addTask') { const x = Object.assign({ id: 'D' + Date.now(), start: '', status: 'todo', carried: 0 }, b.task); (x.date ? d.tasks : d.backlog).push(x); }
    if (b.action === 'updateTask') { const x = d.tasks.concat(d.backlog).find(y => y.id === b.id); if (x) { Object.assign(x, b.fields); App.relocate(d, x); } }
    if (b.action === 'deleteTask') { d.tasks = d.tasks.filter(y => y.id !== b.id); d.backlog = d.backlog.filter(y => y.id !== b.id); }
    if (b.action === 'chooseDecision') Object.assign(d.decisions.find(y => y.id === b.id), { chosen: b.chosen, note: b.note, status: 'decided', decided_at: nowLocal() });
    if (b.action === 'reviewAction') Object.assign(d.reviews.find(y => y.id === b.id), { status: b.status, note: b.note });
    if (b.action === 'setStars') d.tasks.concat(d.backlog).forEach(x => {
      if (x.date === b.date && x.star && !b.ids.includes(x.id)) x.star = '';
      if (b.ids.includes(x.id)) { x.star = 1; x.date = b.date; App.relocate(d, x); }
    });
    if (b.action === 'setBudget') { Object.assign(d.week, { mode: b.mode, effective_mode: b.mode, first_exam: b.first_exam }); Object.assign(d.week.budget, { mode: b.mode, weekly_hours: b.weekly_hours, sunday_factor: b.sunday_factor }); }
    const copy = JSON.parse(JSON.stringify(d));
    return Promise.resolve(b.action === 'data' ? { ok: true, data: copy } : { ok: true, data: b.withData ? copy : undefined });
  }
};

App.init();
