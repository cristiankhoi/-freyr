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
    due: 'Hạn', weekly_hours: 'Giờ làm/học mỗi tuần', sunday_pct: 'Chủ nhật làm (% ngày thường)', save_budget: 'Lưu ngân sách', ratio: 'Hệ số lệch giờ',
    approvals: 'Chờ duyệt', isolog: 'iSolog tasks', sub_approvals: 'Bấm Duyệt phương án nào thì máy / Claude làm phương án đó',
    sub_isolog: 'Mọi việc cho công ty: đang làm, đã làm, tiến trình, hiệu quả', sub_selfreview: 'Tốt / chưa tốt / bài học / giải pháp / tâm sự',
    sub_daily: 'Tự tạo 19:00 mỗi ngày', sub_weekly: 'Tự tạo 16:00 thứ Sáu, chỉ mảng iSolution, để gửi sếp', sub_progress: 'Tuần / tháng / quý theo 3 mảng',
    sub_study: 'Môn học, hạn eStudy, ngày thi, lịch ôn', sub_tips: 'Mẹo dùng Claude/AI đã học', sub_env: 'Công cụ, tài khoản, link hệ thống (không có mật khẩu)',
    sub_archive: 'Việc, thẻ duyệt, review cũ hơn 30 ngày',
    s_situation: 'Tình huống', s_background: 'Bối cảnh', s_assessment: 'Đánh giá', s_recommend: 'Đề xuất',
    urgent: 'Gấp', not_urgent: 'Không gấp', important: 'Quan trọng', not_important: 'Ít quan trọng',
    glossary: 'Giải thích thuật ngữ', where: 'Nằm ở đâu', ice: 'Điểm ý tưởng (ICE)', ice_i: 'Tác động', ice_c: 'Chắc chắn', ice_e: 'Dễ làm',
    tier_T1: 'Máy làm ngay', tier_T3: 'Claude làm trên mây', tier_PC: 'Cần bật máy tính', reversible: 'Hoàn tác được', irreversible: 'Không hoàn tác được',
    eta: 'Xong lúc', run_at: 'Hẹn chạy', approve_opt: 'Duyệt phương án này', ask: 'Hỏi lại / Góp ý', ask_ph: 'Chỗ nào chưa rõ? Muốn đổi gì? Claude sẽ trả lời và sửa thẻ.',
    send: 'Gửi', waiting_claude: 'chờ Claude trả lời', ex_pending: 'đang chờ chạy', ex_done: 'đã làm xong', ex_failed: 'lỗi', ex_blocked: 'chưa làm được',
    ex_waiting_claude: 'Claude sẽ làm', ex_waiting_pc: 'chờ bật máy', exec_log: 'Nhật ký thực hiện', legacy_reviews: 'Review (kiểu cũ)',
    g_mkt: 'Marketing & SEO', g_admin: 'Hành chính & sếp giao', group: 'Nhóm', progress_pct: 'Tiến trình %', result: 'Hiệu quả / kết quả',
    overdue: 'Quá hạn', open_n: 'Đang mở', done_week: 'Xong tuần này', done_30: 'Xong 30 ngày', due_dt: 'Hạn (ngày giờ)',
    sr_good: 'Tốt', sr_bad: 'Chưa tốt', sr_lesson: 'Bài học', sr_fix: 'Giải pháp', sr_heart: 'Tâm sự', claude_reply: 'Freyr trả lời',
    sr_heart_hint: 'Freyr (AI) đọc và trả lời phần này trong khoảng 10 phút; chưa có API thì Claude trả lời ở phiên làm việc tiếp theo.', sr_today: 'Self-review hôm nay', streak: 'Chuỗi ngày liên tiếp',
    history: 'Những ngày trước', make_now: 'Tạo lại ngay', copy: 'Sao chép', copied: 'Đã sao chép', insights: 'Nhận xét và giải pháp',
    fix: 'Giải pháp', weeks: 'Tuần', months: 'Tháng', quarters: 'Quý', hours_by_area: 'Giờ làm theo mảng', pct_done: '% việc hoàn thành',
    table: 'Xem dạng bảng', no_stats: 'Chưa có số liệu (máy bắt đầu ghi từ 22:30 mỗi ngày).', courses: 'Môn học', exams: 'Ngày thi',
    course: 'Môn', upcoming: 'Hạn sắp tới (3 tuần)', exam_plan: 'Lịch ôn tự sinh', save_exams: 'Lưu ngày thi', add_row: 'Thêm dòng',
    exam_hint: 'Nhập ngày thi, máy tự tạo buổi ôn trước 21 / 14 / 7 / 3 / 1 ngày và tự chuyển phương án giờ B khi còn 28 ngày.',
    search: 'Tìm', search_ph: 'Tìm theo tên, ghi chú...', results: 'kết quả', k_card: 'Thẻ duyệt', k_task: 'Việc', k_review: 'Review',
    study_sessions: 'Lịch học hôm nay và sắp tới', study_notes: 'Tài liệu và prompt học', wp_missing: 'Chưa có tài khoản freyr-bot: phương án đăng bài sẽ báo "chưa làm được".', kpi_missing: 'Số liệu GA4/từ khóa: Claude cập nhật ở phiên làm việc.'
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
    due: 'Due', weekly_hours: 'Work/study hours per week', sunday_pct: 'Sunday load (% of a weekday)', save_budget: 'Save budget', ratio: 'Time drift',
    approvals: 'To approve', isolog: 'iSolog tasks', sub_approvals: 'Approving an option makes the machine / Claude carry it out',
    sub_isolog: 'All company work: in progress, done, progress, results', sub_selfreview: 'Good / not good / lesson / fix / personal note',
    sub_daily: 'Built at 19:00 every day', sub_weekly: 'Built Friday 16:00, iSolution only, for the boss', sub_progress: 'Week / month / quarter by area',
    sub_study: 'Courses, eStudy deadlines, exam dates, revision plan', sub_tips: 'Claude/AI tips learned', sub_env: 'Tools, accounts, system links (no passwords)',
    sub_archive: 'Tasks, cards, reviews older than 30 days',
    s_situation: 'Situation', s_background: 'Background', s_assessment: 'Assessment', s_recommend: 'Recommendation',
    urgent: 'Urgent', not_urgent: 'Not urgent', important: 'Important', not_important: 'Less important',
    glossary: 'Terms explained', where: 'Where it is', ice: 'Idea score (ICE)', ice_i: 'Impact', ice_c: 'Confidence', ice_e: 'Ease',
    tier_T1: 'Machine does it now', tier_T3: 'Claude in the cloud', tier_PC: 'Needs the PC on', reversible: 'Reversible', irreversible: 'Not reversible',
    eta: 'Done by', run_at: 'Scheduled', approve_opt: 'Approve this option', ask: 'Ask / comment', ask_ph: 'What is unclear? What should change? Claude will answer and update the card.',
    send: 'Send', waiting_claude: 'waiting for Claude', ex_pending: 'queued', ex_done: 'done', ex_failed: 'failed', ex_blocked: 'blocked',
    ex_waiting_claude: 'Claude will do it', ex_waiting_pc: 'waiting for PC', exec_log: 'Execution log', legacy_reviews: 'Reviews (old style)',
    g_mkt: 'Marketing & SEO', g_admin: 'Admin & boss requests', group: 'Group', progress_pct: 'Progress %', result: 'Result / impact',
    overdue: 'Overdue', open_n: 'Open', done_week: 'Done this week', done_30: 'Done 30 days', due_dt: 'Due (date time)',
    sr_good: 'Good', sr_bad: 'Not good', sr_lesson: 'Lesson', sr_fix: 'Fix', sr_heart: 'Personal note', claude_reply: 'Freyr replied',
    sr_heart_hint: 'Freyr (AI) reads and answers this within about 10 minutes; without the API, Claude answers in the next working session.', sr_today: 'Today\'s self-review', streak: 'Day streak',
    history: 'Earlier days', make_now: 'Rebuild now', copy: 'Copy', copied: 'Copied', insights: 'Findings and fixes',
    fix: 'Fix', weeks: 'Weeks', months: 'Months', quarters: 'Quarters', hours_by_area: 'Hours by area', pct_done: '% tasks completed',
    table: 'Show as table', no_stats: 'No data yet (recorded at 22:30 each day).', courses: 'Courses', exams: 'Exam dates',
    course: 'Course', upcoming: 'Upcoming deadlines (3 weeks)', exam_plan: 'Auto revision plan', save_exams: 'Save exam dates', add_row: 'Add row',
    exam_hint: 'Enter exam dates; revision sessions are created 21 / 14 / 7 / 3 / 1 days before, and the hour plan switches to B at 28 days.',
    search: 'Search', search_ph: 'Search title, notes...', results: 'results', k_card: 'Card', k_task: 'Task', k_review: 'Review',
    study_sessions: 'Study sessions today and upcoming', study_notes: 'Study materials and prompts', wp_missing: 'No freyr-bot account yet: publishing options will report "blocked".', kpi_missing: 'GA4/keyword numbers: Claude fills them in during a session.'
  }
};

const PAGES = [
  { k: 'today', i: '📅' }, { k: 'approvals', i: '🗳' }, { k: 'isolog', i: '🏢' },
  { k: 'progress', i: '📈' }, { k: 'daily', i: '📝' }, { k: 'weekly', i: '📋' },
  { k: 'selfreview', i: '🪞' }, { k: 'study', i: '🎓' },
  { sep: 1 },
  { k: 'tasks', i: '🗂' }, { k: 'done', i: '✅' }, { k: 'rules', i: '📘' },
  { k: 'tips', i: '💡' }, { k: 'env', i: '🧭' }, { k: 'archive', i: '🗄' },
  { sep: 1 }, { k: 'settings', i: '⚙️' }
];
// link cũ (email/Telegram trước đây) -> trang mới
const PAGE_ALIAS = { decisions: 'approvals', review: 'approvals', marketing: 'isolog' };
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
// Link Web app không phải bí mật (thiếu mã thì máy chủ trả "unauthorized").
const DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbyEnSC746m38w62XzM53FWO2uGkaOozSqlN5baZ8l0WYI0qreqmYyPD3WDfwBzBi8rA/exec';
const Api = {
  // Google đôi khi trả lời sai (lỗi 404 ở bước chuyển hướng, hoặc biến yêu cầu gửi thành "mở trang" -> {name:'Freyr API'},
  // nghĩa là máy chủ chưa chạy lệnh): khi đó gửi lại, tối đa 3 lần.
  async post(body) {
    if (S.cfg.demo) return Demo.handle(body);
    let last;
    for (let i = 0; i < 3; i++) {
      try {
        const res = await fetch(S.cfg.url, {
          method: 'POST', redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(Object.assign({ token: S.cfg.token }, body))
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const j = await res.json();
        if (j.name === 'Freyr API') throw new Error('redirect');
        if (body.action === 'data' && !(j.data || j).tasks) throw new Error('bad_data');
        if (!j.ok) throw new Error(j.error === 'unauthorized' ? t('err_unauth') : j.error);
        return j;
      } catch (e) {
        last = e;
        if (!/HTTP|redirect|bad_data|JSON|Unexpected token/i.test(e.message)) throw e;
        await new Promise(r => setTimeout(r, 1500));
      }
    }
    throw new Error('Failed to fetch (' + last.message + ')');
  }
};

const App = {
  connected() { return S.cfg.demo || (S.cfg.url && S.cfg.token); },

  async init() {
    if (/[?&]demo=1/.test(location.search) && !App.connected()) { S.cfg = { url: '', token: '', demo: true }; }
    UI.renderNav();
    const h = App.pageKey(location.hash.replace('#', ''));
    S.page = h && App.connected() ? h : (App.connected() ? 'today' : 'settings');
    UI.renderNav();
    UI.render();
    if (App.connected()) App.refresh(false);
    window.addEventListener('hashchange', () => { const k = App.pageKey(location.hash.replace('#', '')); if (k && k !== S.page) App.go(k, true); });
    window.addEventListener('online', () => App.refresh(false));
    document.addEventListener('visibilitychange', () => { if (!document.hidden && App.connected()) App.refresh(false); });
    setInterval(() => { if (S.page === 'today') UI.render(); }, 60000);
    if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
  },

  pageKey(h) { h = PAGE_ALIAS[h] || h; return PAGES.some(p => p.k === h) ? h : ''; },

  go(k, fromHash) {
    S.page = App.pageKey(k) || 'today'; UI.closeNav(); UI.renderNav(); UI.render();
    if (!fromHash) history.replaceState(null, '', '#' + S.page);
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
    // mã riêng cho mỗi lệnh: gửi lại (mạng chập chờn) thì máy chủ không làm 2 lần
    body.rid = body.rid || Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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
    const task = { title, minutes: Number(f.get('minutes') || 60), area: f.get('area') || 'isolution', priority: Number(f.get('priority') || 2), date: S.page === 'tasks' || S.page === 'isolog' ? '' : S.data.today };
    if (f.get('group')) task.group = f.get('group');
    if (f.get('due')) task.due = String(f.get('due')).replace('T', ' ');
    if (f.get('date')) task.date = f.get('date');
    if (f.get('start')) { task.start = f.get('start'); if (!task.date) task.date = S.data.today; }
    const tmp = Object.assign({ id: 'tmp' + Date.now(), start: '', status: 'todo', carried: 0, source: 'user', created: '' }, task);
    App.act({ action: 'addTask', task }, d => {
      (task.date === d.today ? d.tasks : d.backlog).push(tmp);
      d.tasks.sort((a, b) => (a.start || '99') < (b.start || '99') ? -1 : 1);
    });
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
    if (f.due !== undefined) f.due = String(f.due).replace('T', ' ');
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

  /* ---- thẻ chờ duyệt / review ---- */
  choose(id, form) {
    const f = new FormData(form), chosen = f.get('opt'), note = f.get('note') || '';
    if (!chosen) return false;
    App.act({ action: 'chooseDecision', id, chosen, note }, d => {
      const x = d.decisions.find(y => y.id === id), o = (x.options || []).find(y => y.key === chosen) || {};
      const ex = o.tier === 'T3' ? 'waiting_claude' : o.tier === 'PC' ? 'waiting_pc' : (o.action && o.action.type ? 'pending' : '');
      Object.assign(x, { chosen, note, status: 'decided', decided_at: nowLocal(), exec_status: ex });
    });
    UI.toast(t('saved'));
    return false;
  },
  ask(id, form) {
    const q = (new FormData(form).get('q') || '').trim();
    if (!q) return false;
    App.act({ action: 'askCard', id, q }, d => {
      const x = d.decisions.find(y => y.id === id); x.questions = (x.questions || []).concat([{ q, at: nowLocal(), a: '' }]); x.q_status = 'waiting_claude';
    });
    return false;
  },

  /* ---- self-review, báo cáo, học tập, lưu trữ ---- */
  saveSelfReview(form) {
    const f = Object.fromEntries(new FormData(form).entries());
    const body = Object.assign({ action: 'saveSelfReview' }, f);
    App.act(body, d => {
      d.selfReviews = (d.selfReviews || []).filter(s => s.id !== f.date);
      d.selfReviews.unshift(Object.assign({ id: f.date, updated: nowLocal() }, f));
    });
    UI.toast(t('saved'));
    return false;
  },
  makeReport(type) { App.act({ action: 'makeReport', type }); UI.toast(t('syncing')); },
  copyReport(id) {
    const r = (S.data.reports.daily || []).concat(S.data.reports.weekly || []).find(x => x.id === id); if (!r) return;
    const txt = r.edited || r.text;
    const done = () => UI.toast(t('copied'));
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => UI.copyFallback(txt, done));
    else UI.copyFallback(txt, done);
  },
  saveExams(form) {
    const f = new FormData(form), cs = f.getAll('course'), ds = f.getAll('date');
    const exams = cs.map((c, i) => ({ course: c, date: ds[i] })).filter(e => e.course && e.date);
    App.act({ action: 'setExams', exams }, d => { d.study.exams = exams; });
    UI.toast(t('saved'));
    return false;
  },
  async search(form) {
    const q = (new FormData(form).get('q') || '').trim();
    S.archiveQ = q; S.archive = null; UI.render();
    try { const j = await Api.post({ action: 'archive', q }); S.archive = j; } catch (e) { S.archive = { items: [], total: 0, err: e.message }; }
    UI.render();
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
    // Trình duyệt tự điền mật khẩu có thể xoá ô link (nó coi ô link là "tên đăng nhập"): trống thì dùng link mặc định.
    S.cfg = { url: (f.get('url') || '').trim() || DEFAULT_URL, token: (f.get('token') || '').trim(), demo: false };
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
    const d = S.data; if (!d || !d.tasks) return {};
    const iso = UI.isoTasks().filter(x => x.status === 'todo' || x.status === 'doing');
    return {
      today: d.tasks.filter(x => x.status !== 'done' && x.status !== 'skip').length,
      approvals: d.decisions.filter(x => x.status !== 'decided').length + d.reviews.filter(x => x.status === 'open').length,
      isolog: iso.filter(x => x.due && x.due.slice(0, 10) < d.today).length || '',
      selfreview: UI.srDone(d.today) || Number(hhmm().slice(0, 2)) < 18 ? '' : '!'
    };
  },
  srDone(date) { const s = (S.data.selfReviews || []).find(x => x.id === date); return !!(s && (s.good || s.bad || s.lesson || s.fix || s.heart)); },
  isoTasks() {
    const d = S.data; if (!d || !d.tasks) return [];
    const seen = {};
    return d.tasks.concat(d.backlog || [], d.doneRecent || []).filter(x => {
      if (seen[x.id] || x.area !== 'isolution' || x.source === 'routine' || x.source === 'calendar') return false;
      return (seen[x.id] = true);
    });
  },
  copyNote(id) {
    const n = (S.data.notes || []).find(x => x.id === id); if (!n) return;
    const done = () => UI.toast(t('copied'));
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(n.body).then(done, () => UI.copyFallback(n.body, done));
    else UI.copyFallback(n.body, done);
  },
  copyFallback(txt, done) {
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { /* bỏ qua */ } ta.remove();
  },

  renderNav() {
    const c = UI.counts();
    $('#nav').innerHTML = '<div class="logo"><i>K</i>Freyr</div>' + PAGES.map(p => {
      if (p.sep) return '<hr>';
      const badge = c[p.k] ? `<b class="${p.k === 'isolog' || p.k === 'selfreview' ? 'warn' : ''}">${c[p.k]}</b>` : '';
      return `<a href="#${p.k}" class="${p.k === S.page ? 'on' : ''}" onclick="App.go('${p.k}');return false"><span>${p.i} ${t(p.k)}</span>${badge}</a>`;
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
  examRow(names, e) {
    return `<div class="two exrow"><select name="course"><option value="">${t('course')}...</option>${names.map(n => `<option ${n === e.course ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>
      <input type="date" name="date" value="${esc(e.date || '')}"></div>`;
  },
  groupSel(val) { return `<select name="group">${['mkt', 'admin'].map(g => `<option value="${g}" ${g === (val || 'mkt') ? 'selected' : ''}>${t('g_' + g)}</option>`).join('')}</select>`; },
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

  /** Thẻ chờ duyệt: SBAR + Eisenhower + ICE + thuật ngữ + phương án (tầng thực hiện, hoàn tác) + hỏi đáp. */
  decisionCard(x, compact) {
    const decided = x.status === 'decided';
    const opts = (x.options || []).map(o => {
      const isRec = o.key === x.recommended, sel = decided ? o.key === x.chosen : isRec;
      const tier = o.tier ? `<span class="pill tier-${esc(o.tier)}">${o.tier === 'T1' && o.run_at ? '⏰ ' + t('run_at') + ' ' + esc(o.run_at.slice(11, 16) + ' ' + o.run_at.slice(8, 10) + '/' + o.run_at.slice(5, 7)) : t('tier_' + o.tier)}</span>` : '';
      const rev = o.reversible === undefined || o.reversible === '' ? '' : `<span class="pill ${o.reversible ? 'st-todo' : 'late'}">${o.reversible ? '↩ ' + t('reversible') : '⚠ ' + t('irreversible')}</span>`;
      const detail = compact ? '' : [o.purpose && `<b>${t('purpose')}:</b> ${esc(o.purpose)}`, o.effect && `<b>${t('effect')}:</b> ${esc(o.effect)}`, o.tradeoff && `<b>${t('tradeoff')}:</b> ${esc(o.tradeoff)}`,
        o.eta && `<b>${t('eta')}:</b> ${esc(o.eta)}`, o.run_at && `<b>${t('run_at')}:</b> ${esc(o.run_at)}`].filter(Boolean).join('<br>');
      return `<label class="opt ${sel ? 'sel' : ''} ${isRec ? 'is-rec' : ''}" onclick="if(this.querySelector('input').disabled)return;this.parentNode.querySelectorAll('.opt').forEach(e=>e.classList.remove('sel'));this.classList.add('sel')">
        <input type="radio" name="opt" value="${esc(o.key)}" ${sel ? 'checked' : ''} ${decided ? 'disabled' : ''}><b>${esc(o.key)}. ${esc(o.title)}</b> ${isRec ? `<span class="pill rec">${t('recommended')}</span>` : ''}
        ${!compact && (tier || rev) ? `<div class="pills">${tier}${rev}</div>` : ''}
        ${detail ? `<div class="d">${detail}</div>` : ''}</label>`;
    }).join('');
    const wait = x.created ? ` · ${daysBetween(x.created, S.data.today)} ${t('days')}` : '';
    const flags = x.urgent !== '' && x.urgent !== undefined ? `<div class="pills">
        <span class="pill ${String(x.urgent) === '1' ? 'late' : 'st-todo'}">${String(x.urgent) === '1' ? t('urgent') : t('not_urgent')}</span>
        <span class="pill ${String(x.important) === '1' ? 'rec' : 'st-todo'}">${String(x.important) === '1' ? t('important') : t('not_important')}</span>
        ${x.area ? `<span class="pill st-todo">${t('a_' + x.area)}</span>` : ''}</div>` : '';
    const sb = x.sbar && !compact ? `<dl class="sbar">${[['s', 'situation'], ['b', 'background'], ['a', 'assessment'], ['r', 'recommend']]
      .filter(([k]) => x.sbar[k]).map(([k, l]) => `<dt>${t('s_' + l)}</dt><dd>${esc(x.sbar[k])}</dd>`).join('')}</dl>` : '';
    const ice = x.ice && !compact ? `<div class="mut">${t('ice')}: ${t('ice_i')} ${esc(x.ice.i)}/10 · ${t('ice_c')} ${esc(x.ice.c)}/10 · ${t('ice_e')} ${esc(x.ice.e)}/10 = <b>${fmtNum((Number(x.ice.i) + Number(x.ice.c) + Number(x.ice.e)) / 3, 1)}</b></div>` : '';
    const gl = (x.glossary || []).length && !compact ? `<details open><summary>📖 ${t('glossary')} (${x.glossary.length})</summary><ul class="gloss">${x.glossary.map(g =>
      `<li><b>${esc(g.term)}</b>: ${esc(g.what)}${g.where ? `<div class="mut">${t('where')}: ${esc(g.where)}</div>` : ''}</li>`).join('')}</ul></details>` : '';
    const more = compact ? '' : `${x.why ? `<details><summary>${t('why')}</summary><div class="mut" style="white-space:pre-wrap">${esc(x.why)}</div></details>` : ''}
      ${x.evidence ? `<details><summary>${t('evidence')}</summary><div class="mut" style="white-space:pre-wrap">${esc(x.evidence)}</div></details>` : ''}`;
    const exec = x.exec_status ? `<span class="pill ex-${esc(x.exec_status)}">${t('ex_' + x.exec_status)}</span>` : '';
    const log = x.exec_log && !compact ? `<details><summary>${t('exec_log')}</summary><div class="mut" style="white-space:pre-wrap">${esc(x.exec_log)}</div></details>` : '';
    const foot = decided
      ? `<div class="chosen mut" style="margin-top:8px">${t('chosen')}: <b>${esc(x.chosen)}</b> ${t('decided_on')} ${esc(x.decided_at)} ${exec}${x.note ? ' · ' + esc(x.note) : ''}
          ${x.exec_status === 'done' || x.exec_status === 'pending' ? '' : `<button type="button" class="btn sm ghost" onclick="App.reopenDecision('${x.id}')">${t('change')}</button>`}</div>${log}`
      : `${compact ? '' : `<textarea name="note" placeholder="${t('your_note')}" style="margin-top:6px"></textarea>`}<div class="actions" style="justify-content:flex-start;margin-top:8px"><button class="btn p">✓ ${t('approve_opt')}</button></div>`;
    const qa = compact ? '' : `${(x.questions || []).map(q => `<div class="qa"><div><b>❓</b> ${esc(q.q)} <span class="mut">${esc(q.at)}</span></div>
        ${q.a ? `<div class="ans"><b>Claude:</b> ${esc(q.a)} <span class="mut">${esc(q.a_at)}</span></div>` : `<div class="mut">⏳ ${t('waiting_claude')}</div>`}</div>`).join('')}
      <details class="askbox"><summary>💬 ${t('ask')}</summary><div style="display:flex;gap:6px;margin-top:6px"><textarea name="q_${esc(x.id)}" placeholder="${t('ask_ph')}" style="min-height:44px"></textarea>
        <button type="button" class="btn" onclick="const f=document.createElement('form');const i=document.createElement('input');i.name='q';i.value=this.previousElementSibling.value;f.appendChild(i);App.ask('${x.id}',f);this.previousElementSibling.value=''">${t('send')}</button></div></details>`;
    return `<form class="card pad dec" onsubmit="return App.choose('${x.id}',this)">
      <div class="sec"><span>${x.kind === 'review' ? '👀 ' : ''}${esc(x.title)}</span><span class="mut">${esc((x.created || '').slice(0, 10))}${wait}${x.q_status === 'waiting_claude' ? ' · ⏳' : ''}</span></div>
      ${flags}${x.context && !compact ? `<div class="mut" style="white-space:pre-wrap">${esc(x.context)}</div>` : ''}
      ${safeUrl(x.link) && !compact ? `<div><a href="${safeUrl(x.link)}" target="_blank" rel="noopener">${t('open_link')} ↗</a></div>` : ''}
      ${sb}${ice}${gl}${opts}${more}${foot}${qa}</form>`;
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
      <label class="f">${t('due_dt')}</label><input type="datetime-local" name="due" value="${esc((x.due || '').replace(' ', 'T'))}">
      ${x.area === 'isolution' ? `<div class="two"><div><label class="f">${t('group')}</label>${UI.groupSel(x.group)}</div>
        <div><label class="f">${t('progress_pct')}</label><input type="number" name="progress" min="0" max="100" step="10" value="${esc(x.progress)}"></div></div>
        <label class="f">${t('result')}</label><input name="result" value="${esc(x.result)}">` : ''}
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
      <input name="date" type="date" title="${t('date')}" ${S.page === 'tasks' ? '' : `value="${S.data.today}"`}>
      <input name="start" type="time" title="${t('start')}">
      <input name="minutes" type="number" min="5" step="5" value="60" title="${t('minutes')}">
      ${UI.areaSel('area', 'isolution')}${UI.prioSel(2)}
      <button class="btn p">${t('add')}</button></form>`;
  }
};

/* ---------------- biểu đồ (SVG, không thư viện) ---------------- */
const Charts = {
  W: 640, H: 210, L: 34, B: 24, T: 12,
  /** Cột chồng giờ theo 3 mảng; khe 2px giữa các đoạn; rê chuột xem số. */
  stacked(rows) {
    const { W, H, L, B, T } = Charts, n = rows.length || 1;
    const tot = r => AREA_KEYS.reduce((s, a) => s + Number(r.hours[a] || 0), 0);
    const max = Math.max(1, ...rows.map(tot)), nice = Math.ceil(max / 5) * 5 || 5;
    const bw = Math.min(46, (W - L) / n * 0.55), step = (W - L) / n, y = v => H - B - v / nice * (H - B - T);
    let g = '';
    [0, 0.5, 1].forEach(f => { const v = nice * f; g += `<line x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${fmtNum(v)}</text>`; });
    rows.forEach((r, i) => {
      const x = L + step * i + (step - bw) / 2;
      let acc = 0;
      const segs = AREA_KEYS.filter(a => Number(r.hours[a]) > 0);
      segs.forEach((a, j) => {
        const v = Number(r.hours[a]), y0 = y(acc), y1 = y(acc + v), top = j === segs.length - 1;
        const h = Math.max(0, y0 - y1 - (j ? 2 : 0));
        g += `<rect x="${x}" y="${y1}" width="${bw}" height="${h}" rx="${top ? 4 : 0}" fill="var(--${a})"><title>${esc(r.label)} · ${t('a_' + a)}: ${fmtNum(v, 1)} ${t('hours')}</title></rect>`;
        acc += v;
      });
      const tt = tot(r);
      if (tt) g += `<text x="${x + bw / 2}" y="${y(tt) - 4}" class="val" text-anchor="middle">${fmtNum(tt, 1)}</text>`;
      g += `<text x="${x + bw / 2}" y="${H - 6}" class="ax" text-anchor="middle">${esc(r.label)}</text>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('hours_by_area')}">${g}</svg>`;
  },
  /** Cột % hoàn thành (một chuỗi). */
  pct(rows) {
    const { W, H, L, B, T } = Charts, n = rows.length || 1;
    const bw = Math.min(46, (W - L) / n * 0.55), step = (W - L) / n, y = v => H - B - v / 100 * (H - B - T);
    let g = '';
    [0, 50, 100].forEach(v => { g += `<line x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 6}" y="${y(v) + 4}" class="ax" text-anchor="end">${v}%</text>`; });
    rows.forEach((r, i) => {
      const x = L + step * i + (step - bw) / 2;
      if (r.pct !== null) {
        g += `<rect x="${x}" y="${y(r.pct)}" width="${bw}" height="${Math.max(0, y(0) - y(r.pct))}" rx="4" fill="var(--acc)"><title>${esc(r.label)}: ${r.pct}% (${r.dn}/${r.pl})</title></rect>`;
        g += `<text x="${x + bw / 2}" y="${y(r.pct) - 4}" class="val" text-anchor="middle">${r.pct}%</text>`;
      }
      g += `<text x="${x + bw / 2}" y="${H - 6}" class="ax" text-anchor="middle">${esc(r.label)}</text>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('pct_done')}">${g}</svg>`;
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
      ${openDec.length ? `<div><div class="sec"><span>${t('pending_dec')} (${openDec.length})</span><a href="#approvals" onclick="App.go('approvals');return false" class="mut">${t('see_all')} →</a></div>${openDec.slice(0, 2).map(x => UI.decisionCard(x, true)).join('')}</div>` : ''}
      ${openRev.length ? `<div class="card"><div class="sec pad" style="margin:0;padding-bottom:0"><span>${t('review')} (${openRev.length})</span><a href="#approvals" onclick="App.go('approvals');return false" class="mut">${t('see_all')} →</a></div>
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

  approvals() {
    const d = S.data;
    // gấp + quan trọng lên đầu (Eisenhower), rồi thẻ cũ trước
    const score = x => (String(x.urgent) === '1' ? 0 : 2) + (String(x.important) === '1' ? 0 : 1);
    const open = d.decisions.filter(x => x.status !== 'decided').sort((a, b) => score(a) - score(b) || ((a.created || '') < (b.created || '') ? -1 : 1));
    const done = d.decisions.filter(x => x.status === 'decided').sort((a, b) => (a.decided_at < b.decided_at ? 1 : -1));
    const revOpen = d.reviews.filter(x => x.status === 'open');
    const warn = !d.meta.wp_ready && open.some(x => JSON.stringify(x.options).match(/publish_now|schedule_at/)) ? `<div class="banner">${t('wp_missing')}</div>` : '';
    return `${warn}<div class="group-h">${t('open_items')} (${open.length + revOpen.length})</div>${open.length ? open.map(x => UI.decisionCard(x, false)).join('') : (revOpen.length ? '' : `<div class="card empty">${t('empty')}</div>`)}
      ${revOpen.length || d.reviews.length ? `<div class="group-h">${t('legacy_reviews')}</div>${Pages.review()}` : ''}
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

  isolog() {
    const d = S.data, all = UI.isoTasks(), today = d.today, mon = addDay(today, -((new Date(today + 'T12:00:00').getDay() + 6) % 7));
    const open = all.filter(x => x.status === 'todo' || x.status === 'doing'), over = open.filter(x => x.due && x.due.slice(0, 10) < today);
    const doneW = all.filter(x => x.status === 'done' && (x.done_at || '').slice(0, 10) >= mon);
    const doneM = all.filter(x => x.status === 'done');
    const kpis = `<div class="grid4">
      <div class="card pad kpi"><div class="l">${t('open_n')}</div><div class="v">${open.length}</div></div>
      <div class="card pad kpi"><div class="l">${t('overdue')}</div><div class="v" style="${over.length ? 'color:var(--red)' : ''}">${over.length}</div></div>
      <div class="card pad kpi"><div class="l">${t('done_week')}</div><div class="v">${doneW.length}</div></div>
      <div class="card pad kpi"><div class="l">${t('done_30')}</div><div class="v">${doneM.length}</div></div></div>`;
    const f = S.isoGroup || 'all';
    const chips = ['all', 'mkt', 'admin'].map(g => `<span class="chip ${f === g ? 'on' : ''}" onclick="S.isoGroup='${g}';UI.render()">${g === 'all' ? t('all') : t('g_' + g)}</span>`).join('');
    const inG = x => f === 'all' || (x.group || 'mkt') === f;
    const row = x => {
      const pr = Number(x.progress || (x.status === 'done' ? 100 : 0));
      const r = UI.taskRow(Object.assign({}, x, { start: x.date ? x.date.slice(5).split('-').reverse().join('/') : '' }), null);
      const extra = `<div class="meta"><span class="pill st-todo">${t('g_' + (x.group || 'mkt'))}</span>${x.result ? `<span>📊 ${esc(x.result)}</span>` : ''}</div>
        <div class="bar" style="margin-top:4px;max-width:260px" title="${pr}%"><i style="width:${pr}%;background:var(--isolution)"></i></div>`;
      return r.replace(/(<div class="tt"[\s\S]*?<\/div>)/, `$1${extra}`);
    };
    const sortOpen = (a, b) => ((a.due || '9') < (b.due || '9') ? -1 : (a.due || '9') > (b.due || '9') ? 1 : 0) || a.priority - b.priority;
    const form = `<form class="form iso" onsubmit="return App.addTask(this)">
      <input name="title" placeholder="${t('title_ph')}" autocomplete="off">${UI.groupSel(f === 'admin' ? 'admin' : 'mkt')}
      <input name="due" type="datetime-local" title="${t('due_dt')}"><input name="minutes" type="number" min="5" step="5" value="60" title="${t('minutes')}">
      <input type="hidden" name="area" value="isolution">${UI.prioSel(2)}<button class="btn p">${t('add')}</button></form>`;
    const openL = open.filter(inG).sort(sortOpen), doneL = doneM.filter(inG).sort((a, b) => (a.done_at < b.done_at ? 1 : -1));
    return `${kpis}<div class="chips" style="margin-top:14px">${chips}</div>
      <div class="card">${form}${openL.length ? `<ul class="tasks">${openL.map(row).join('')}</ul>` : `<div class="empty">${t('empty')}</div>`}</div>
      ${doneL.length ? `<div class="group-h">${t('done_30')} (${doneL.length})</div><div class="card"><ul class="tasks">${doneL.map(row).join('')}</ul></div>` : ''}`;
  },

  selfreview() {
    const d = S.data, list = d.selfReviews || [], cur = list.find(x => x.id === d.today) || {};
    const keys = ['good', 'bad', 'lesson', 'fix', 'heart'];
    let streak = 0; for (let i = 0; i < 60; i++) { if (UI.srDone(addDay(d.today, -i))) streak++; else if (i > 0) break; }
    const form = `<form class="card pad" onsubmit="return App.saveSelfReview(this)"><input type="hidden" name="date" value="${d.today}">
      <div class="sec"><span>${t('sr_today')} · ${fmtDate(d.today)}</span><span class="mut">${t('streak')}: ${streak}</span></div>
      ${keys.map(k => `<label class="f">${t('sr_' + k)}</label><textarea name="${k}">${esc(cur[k])}</textarea>${k === 'heart' ? `<div class="mut">${t('sr_heart_hint')}</div>` : ''}`).join('')}
      ${cur.reply ? `<div class="ans" style="margin-top:8px"><b>${t('claude_reply')}:</b> ${esc(cur.reply)}</div>` : ''}
      <div class="actions" style="justify-content:flex-start"><button class="btn p">${t('save')}</button></div></form>`;
    const hist = list.filter(x => x.id !== d.today).map(s => `<div class="card pad" style="margin-bottom:10px"><div class="sec">${fmtDate(s.id)}</div>
      ${keys.filter(k => s[k]).map(k => `<div><b>${t('sr_' + k)}:</b> <span style="white-space:pre-wrap">${esc(s[k])}</span></div>`).join('')}
      ${s.reply ? `<div class="ans"><b>${t('claude_reply')}:</b> ${esc(s.reply)}</div>` : ''}</div>`).join('');
    return form + (hist ? `<div class="group-h">${t('history')}</div>${hist}` : '');
  },

  reportList(type) {
    const list = ((S.data.reports || {})[type]) || [];
    const head = `<div class="actions" style="justify-content:flex-start;margin:0 0 10px"><button class="btn" onclick="App.makeReport('${type}')">⟳ ${t('make_now')}</button>
      ${type === 'weekly' && !(S.data.meta.kpi_week) ? `<span class="mut" style="align-self:center">${t('kpi_missing')}</span>` : ''}</div>`;
    if (!list.length) return head + `<div class="card empty">${t('empty')}</div>`;
    return head + list.map((r, i) => {
      return `<details class="card pad rep" ${i === 0 ? 'open' : ''}><summary class="sec" style="display:flex"><span>${type === 'weekly' ? '📋 ' + esc(r.period.slice(8, 10) + '/' + r.period.slice(5, 7)) + ' – ' + esc(addDay(r.period, 4).slice(8, 10) + '/' + addDay(r.period, 4).slice(5, 7)) : fmtDate(r.period)}</span>
        <span class="mut">${esc(r.created)}</span></summary>
        <div class="actions" style="justify-content:flex-start;margin:4px 0 8px"><button class="btn sm p" onclick="App.copyReport('${r.id}')">📋 ${t('copy')}</button></div>
        <pre class="reptxt">${esc(r.edited || r.text)}</pre>
        ${r.ai_text ? `<div class="ans" style="white-space:pre-wrap">${esc(r.ai_text)}</div>` : ''}</details>`;
    }).join('');
  },
  daily() { return Pages.reportList('daily'); },
  weekly() { return Pages.reportList('weekly'); },

  progress() {
    const p = S.data.progress; if (!p) return `<div class="card empty">${t('empty')}</div>`;
    const per = S.period || 'weeks', rows = p[per] || [];
    const chips = ['weeks', 'months', 'quarters'].map(k => `<span class="chip ${per === k ? 'on' : ''}" onclick="S.period='${k}';UI.render()">${t(k)}</span>`).join('');
    const legend = `<div class="legend">${AREA_KEYS.map(a => `<span><i style="background:var(--${a})"></i>${t('a_' + a)}</span>`).join('')}</div>`;
    const ins = (p.insights || []).map(x => `<li class="ins ins-${esc(x.level)}"><div>${x.level === 'warn' ? '⚠️' : x.level === 'good' ? '✅' : 'ℹ️'} ${esc(x.text)}</div><div class="mut"><b>${t('fix')}:</b> ${esc(x.fix)}</div></li>`).join('');
    const pctRows = rows.map(r => { const pl = AREA_KEYS.reduce((s, a) => s + r.planned[a], 0), dn = AREA_KEYS.reduce((s, a) => s + r.done[a], 0); return { label: r.label, pct: pl ? Math.round(dn / pl * 100) : null, dn, pl }; });
    const table = `<details><summary>${t('table')}</summary><div style="overflow-x:auto"><table class="tbl"><tr><th></th>${AREA_KEYS.map(a => `<th>${t('a_' + a)} (${t('hours')})</th>`).join('')}<th>${t('pct_done')}</th></tr>
      ${rows.map((r, i) => `<tr><td>${esc(r.label)}</td>${AREA_KEYS.map(a => `<td>${fmtNum(r.hours[a], 1)}</td>`).join('')}<td>${pctRows[i].pct === null ? '–' : pctRows[i].pct + '% (' + pctRows[i].dn + '/' + pctRows[i].pl + ')'}</td></tr>`).join('')}</table></div></details>`;
    return `<div class="chips">${chips}</div>
      <div class="card pad"><div class="sec">${t('hours_by_area')}</div>${legend}${Charts.stacked(rows)}</div>
      <div class="card pad" style="margin-top:14px"><div class="sec">${t('pct_done')}</div>${pctRows.some(r => r.pct !== null) ? Charts.pct(pctRows) : `<div class="empty">${t('no_stats')}</div>`}${table}</div>
      <div class="group-h">${t('insights')}</div><div class="card pad"><ul class="inslist">${ins || `<li class="mut">${t('empty')}</li>`}</ul></div>`;
  },

  study() {
    const s = S.data.study; if (!s) return `<div class="card empty">${t('empty')}</div>`;
    const d = S.data, names = s.courses.map(c => c.name);
    const cards = `<div class="grid3">${s.courses.map(c => {
      const pct = c.total ? Math.round(c.done / c.total * 100) : 0;
      return `<div class="card pad"><div class="sec"><span>${esc(c.name)}</span><span class="mut">${esc(c.code)}</span></div>
        <div class="bar"><i style="width:${pct}%;background:var(--study)"></i></div>
        <div class="mut" style="margin-top:4px">${c.done}/${c.total} (${pct}%)${c.next_due ? ` · ⏰ ${esc(c.next_due.slice(8, 10) + '/' + c.next_due.slice(5, 7))}` : ''}${c.exam ? ` · 📝 ${esc(c.exam.slice(8, 10) + '/' + c.exam.slice(5, 7))} (${daysBetween(d.today, c.exam)} ${t('days')})` : ''}</div></div>`;
    }).join('')}</div>`;
    const up = s.upcoming.length ? `<ul class="tasks">${s.upcoming.map(x => UI.taskRow(Object.assign({}, x, { start: x.date ? x.date.slice(5).split('-').reverse().join('/') : '' }), null)).join('')}</ul>` : `<div class="empty">${t('empty')}</div>`;
    const exRows = (s.exams.length ? s.exams : [{ course: '', date: '' }]).map(e => UI.examRow(names, e)).join('');
    const exams = `<form class="card pad" onsubmit="return App.saveExams(this)"><div class="sec">${t('exams')}</div><p class="mut" style="margin-top:0">${t('exam_hint')}</p>
      <div id="examRows">${exRows}</div>
      <div class="actions" style="justify-content:flex-start"><button type="button" class="btn" onclick="document.getElementById('examRows').insertAdjacentHTML('beforeend', UI.examRow(${esc(JSON.stringify(names))}, {}))">+ ${t('add_row')}</button><button class="btn p">${t('save_exams')}</button></div></form>`;
    const plan = s.plan.length ? `<div class="group-h">${t('exam_plan')}</div><div class="card"><ul class="tasks">${s.plan.map(x => UI.taskRow(Object.assign({}, x, { start: x.date ? x.date.slice(5).split('-').reverse().join('/') : '' }), null)).join('')}</ul></div>` : '';
    // buổi học đã xếp ngày (hôm nay + sắp tới), không kể lịch trên lớp và buổi ôn thi tự sinh
    const seen = {}, sessions = d.tasks.concat(d.backlog || []).filter(x => x.area === 'study' && x.date && x.date >= d.today && x.source !== 'calendar' && x.source !== 'exam_plan' && x.status !== 'skip' && !seen[x.id] && (seen[x.id] = 1))
      .sort((a, b) => (a.date + (a.start || '99')) < (b.date + (b.start || '99')) ? -1 : 1);
    const sess = sessions.length ? `<div class="group-h">${t('study_sessions')}</div><div class="card"><ul class="tasks">${sessions.map(x => {
      const r = UI.taskRow(Object.assign({}, x, { start: (x.date === d.today ? '' : x.date.slice(8, 10) + '/' + x.date.slice(5, 7) + ' ') + (x.start || '') }), null);
      return r.replace('<div class="meta">', '<div class="meta pre">');
    }).join('')}</ul></div>` : '';
    const notes = (d.notes || []).filter(n => n.type === 'study');
    const mats = notes.length ? `<div class="group-h">${t('study_notes')}</div><div class="card">${notes.map(n => `<details class="rule"><summary><b>${esc(n.group ? n.group + ' · ' : '')}${esc(n.title)}</b></summary>
      <div class="actions" style="justify-content:flex-start;margin:6px 0"><button class="btn sm p" onclick="UI.copyNote('${esc(n.id)}')">📋 ${t('copy')}</button></div><pre class="reptxt">${esc(n.body)}</pre></details>`).join('')}</div>` : '';
    return `${sess}${mats}<div class="group-h"${sess || mats ? '' : ' style="margin-top:0"'}>${t('courses')}</div>${cards}
      <div class="split"><div><div class="group-h" style="margin-top:0">${t('upcoming')}</div><div class="card">${up}</div>${plan}</div><div>${exams}</div></div>`;
  },

  notesPage(type) {
    const list = (S.data.notes || []).filter(n => n.type === type), by = {};
    list.forEach(n => { const g = n.group || t('group_other'); (by[g] = by[g] || []).push(n); });
    const gs = Object.keys(by);
    if (!gs.length) return `<div class="card empty">${t('empty')}</div>`;
    return gs.map(g => `<div class="group-h">${esc(g)}</div><div class="card">${by[g].map(n => `<div class="rule"><b>${esc(n.title)}</b><div>${esc(n.body)}</div>
      ${safeUrl(n.link) ? `<a href="${safeUrl(n.link)}" target="_blank" rel="noopener">${esc(n.link.replace(/^https?:\/\//, '').slice(0, 60))} ↗</a>` : ''}</div>`).join('')}</div>`).join('');
  },
  tips() { return Pages.notesPage('tip'); },
  env() { return Pages.notesPage('env'); },

  archive() {
    const a = S.archive;
    const form = `<form class="form arch" onsubmit="App.search(this);return false"><input name="q" value="${esc(S.archiveQ || '')}" placeholder="${t('search_ph')}" autocomplete="off"><button class="btn p">${t('search')}</button></form>`;
    let body = '';
    if (a === null && S.archiveQ !== undefined) body = `<div class="empty">${t('syncing')}</div>`;
    else if (a) body = a.err ? `<div class="empty">${esc(a.err)}</div>` : `<div class="mut pad">${a.total} ${t('results')}</div>` + a.items.map(x => `<div class="row"><div><div>${esc(x.title)}</div>
      <div class="mut">${t('k_' + x.kind)} · ${esc(x.date)}${x.status ? ' · ' + esc(x.status) : ''}${x.note ? ' · ' + esc(String(x.note).slice(0, 120)) : ''}</div></div>
      ${safeUrl(x.link) ? `<a class="btn sm" href="${safeUrl(x.link)}" target="_blank" rel="noopener">${t('open_link')} ↗</a>` : ''}</div>`).join('');
    return `<div class="card">${form}${body}</div>`;
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
      decisions: [{ id: 'DD1', created: today + ' 07:00', title: 'Thẻ mẫu: đăng bài blog mẫu', context: '', status: 'open', recommended: 'B', why: 'Lý do mẫu.', evidence: '',
        kind: 'review', area: 'isolution', urgent: '0', important: '1', link: '', questions: [], q_status: '', exec_status: '',
        sbar: { s: 'Bài mẫu đã viết xong, đang là bản nháp.', b: 'Bối cảnh mẫu.', a: 'Đánh giá mẫu: không gấp, quan trọng.', r: 'Hẹn giờ 8:00 sáng mai.' },
        glossary: [{ term: 'Bản nháp (draft)', what: 'Bài đã lưu nhưng khách chưa thấy.', where: 'WordPress > Posts > Drafts' }],
        options: [{ key: 'A', title: 'Đăng ngay', purpose: 'Lên sớm', effect: 'Khách thấy ngay', tradeoff: 'Giờ ít người đọc', tier: 'T1', reversible: true, action: { type: 'none' } },
          { key: 'B', title: 'Hẹn 8:00 mai', purpose: 'Giờ nhiều người đọc', effect: 'Lên lúc 8:00', tradeoff: 'Chậm 12 giờ', tier: 'T1', reversible: true, run_at: addDay(today, 1) + ' 08:00', action: { type: 'none' } },
          { key: 'C', title: 'Sửa tiêu đề trước', purpose: 'Tối ưu SEO', effect: 'Claude sửa rồi gửi lại thẻ', tradeoff: 'Chờ Claude', tier: 'T3', reversible: true }] },
        { id: 'DD2', created: today + ' 07:00', title: 'Ý tưởng mẫu: nhắc hạn qua Zalo', status: 'open', recommended: 'A', kind: 'decision', urgent: '0', important: '0', questions: [{ q: 'Zalo có tốn phí không?', at: today + ' 08:00', a: 'Không, ví dụ trả lời mẫu.', a_at: today + ' 09:00' }],
          ice: { i: 6, c: 7, e: 4 }, options: [{ key: 'A', title: 'Làm', tier: 'T3', effect: 'Claude làm ở phiên sau' }, { key: 'B', title: 'Không làm', tier: 'T1', action: { type: 'none' } }] }],
      reviews: [],
      rules: [{ id: 'R1', group: 'Chung', title: 'Quy tắc mẫu', body: 'Nội dung quy tắc mẫu.', order: 1 }],
      selfReviews: [{ id: addDay(today, -1), good: 'Xong việc chính sớm', bad: 'Ngủ muộn', lesson: 'Làm việc khó buổi sáng', fix: 'Tắt máy 22:45', heart: '', reply: '' }],
      reports: { daily: [{ id: 'D' + today, type: 'daily', period: today, created: today + ' 19:00', text: 'BÁO CÁO NGÀY (mẫu)\n\n1. Kết quả: xong 3/5 việc.\n...', data: {} }],
        weekly: [{ id: 'Wmau', type: 'weekly', period: addDay(today, -((d.getDay() + 6) % 7)), created: today + ' 16:00', text: 'BÁO CÁO TUẦN (mẫu)\n\n1. Đã làm\n...', data: {} }] },
      notes: [{ id: 'N1', type: 'tip', group: 'Tiết kiệm token', title: 'Mẹo mẫu', body: 'Nội dung mẹo mẫu.', order: 1 }, { id: 'N2', type: 'env', group: 'Hệ thống', title: 'Công cụ mẫu', body: 'Mô tả', link: 'https://example.com', order: 2 }],
      progress: { weeks: [3, 2, 1, 0].map(i => ({ label: addDay(today, -7 * i).slice(8, 10) + '/' + addDay(today, -7 * i).slice(5, 7), hours: { isolution: 20 + i, study: 10 - i, own: 6 + i }, done: { isolution: 8, study: 5, own: 3 }, planned: { isolution: 10, study: 7, own: 5 } })),
        months: [], quarters: [], insights: [{ level: 'warn', text: 'Nhận xét mẫu.', fix: 'Giải pháp mẫu.' }] },
      study: { courses: [{ code: 'FIN3904', name: 'Tài chính công ty', total: 6, done: 2, next_due: addDay(today, 3) + ' 23:59', exam: '' }], exams: [], upcoming: [], plan: [] }
    };
  },
  handle(b) {
    if (!Demo.db) Demo.db = Demo.make();
    const d = Demo.db;
    if (b.action === 'addTask') { const x = Object.assign({ id: 'D' + Date.now(), start: '', status: 'todo', carried: 0 }, b.task); (x.date === d.today ? d.tasks : d.backlog).push(x); }
    if (b.action === 'updateTask') { const x = d.tasks.concat(d.backlog).find(y => y.id === b.id); if (x) { Object.assign(x, b.fields); App.relocate(d, x); } }
    if (b.action === 'deleteTask') { d.tasks = d.tasks.filter(y => y.id !== b.id); d.backlog = d.backlog.filter(y => y.id !== b.id); }
    if (b.action === 'chooseDecision') { const x = d.decisions.find(y => y.id === b.id), o = x.options.find(y => y.key === b.chosen) || {};
      Object.assign(x, { chosen: b.chosen, note: b.note, status: 'decided', decided_at: nowLocal(), exec_status: o.tier === 'T3' ? 'waiting_claude' : o.run_at ? 'pending' : 'done' }); }
    if (b.action === 'askCard') { const x = d.decisions.find(y => y.id === b.id); x.questions = (x.questions || []).concat([{ q: b.q, at: nowLocal(), a: '' }]); x.q_status = 'waiting_claude'; }
    if (b.action === 'saveSelfReview') { d.selfReviews = d.selfReviews.filter(s => s.id !== b.date); d.selfReviews.unshift(Object.assign({ id: b.date }, b)); }
    if (b.action === 'setExams') d.study.exams = b.exams;
    if (b.action === 'archive') return Promise.resolve({ ok: true, items: [{ kind: 'task', id: 'A1', date: addDay(d.today, -40), title: 'Việc cũ mẫu', status: 'done', note: '' }], total: 1 });
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
