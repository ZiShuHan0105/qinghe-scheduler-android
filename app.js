const STORAGE_KEY = 'qinghe-scheduler-data-v1';

const DAY_DEFS = [
  { id: 'mon', label: '周一', short: '一' },
  { id: 'tue', label: '周二', short: '二' },
  { id: 'wed', label: '周三', short: '三' },
  { id: 'thu', label: '周四', short: '四' },
  { id: 'fri', label: '周五', short: '五' },
];

const COURSE_PALETTE = ['#6d5dfc', '#38b5a3', '#f19b5b', '#df6d7b', '#5786d9', '#9a74cc', '#42a5c8', '#d58b55'];
const TYPE_LABELS = { class: '课程', meal: '用餐', activity: '活动 / 运动', break: '课间 / 休息' };
const TYPE_ICONS = { class: '▦', meal: '◒', activity: '♢', break: '◌' };

const DEFAULT_DATA = {
  version: 1,
  settings: { schoolName: '青禾实验学校', academicYear: '2026-2027 学年', weekStart: '2026-10-12' },
  slots: [
    { id: 's0', name: '早餐', type: 'meal', start: '07:20', end: '07:50' },
    { id: 's1', name: '第 1 节', type: 'class', start: '08:00', end: '08:45' },
    { id: 's2', name: '课间操', type: 'activity', start: '08:45', end: '09:05' },
    { id: 's3', name: '第 2 节', type: 'class', start: '09:10', end: '09:55' },
    { id: 's4', name: '第 3 节', type: 'class', start: '10:05', end: '10:50' },
    { id: 's5', name: '午餐', type: 'meal', start: '12:00', end: '13:00' },
    { id: 's6', name: '第 4 节', type: 'class', start: '13:30', end: '14:15' },
    { id: 's7', name: '眼保健操', type: 'break', start: '14:15', end: '14:25' },
    { id: 's8', name: '第 5 节', type: 'class', start: '14:30', end: '15:15' },
    { id: 's9', name: '课间运动', type: 'activity', start: '15:15', end: '15:35' },
    { id: 's10', name: '第 6 节', type: 'class', start: '15:40', end: '16:25' },
    { id: 's11', name: '晚餐', type: 'meal', start: '17:30', end: '18:20' },
    { id: 's12', name: '晚自习', type: 'class', start: '19:00', end: '20:30' },
  ],
  teachers: [
    { id: 't1', name: '林知夏', subject: '语文', contact: '138 0013 8801' },
    { id: 't2', name: '周予安', subject: '数学', contact: '138 0013 8802' },
    { id: 't3', name: '沈清禾', subject: '英语', contact: '138 0013 8803' },
    { id: 't4', name: '许言川', subject: '物理', contact: '138 0013 8804' },
    { id: 't5', name: '顾南栀', subject: '历史', contact: '138 0013 8805' },
    { id: 't6', name: '唐逸飞', subject: '体育', contact: '138 0013 8806' },
  ],
  classes: [
    { id: 'c1', name: '高一（1）班', grade: '高一', room: 'A301', contact: '班主任：林知夏' },
    { id: 'c2', name: '高一（2）班', grade: '高一', room: 'A302', contact: '班主任：周予安' },
    { id: 'c3', name: '初三（1）班', grade: '初三', room: 'B201', contact: '班主任：顾南栀' },
  ],
  courses: [
    { id: 'chinese', name: '语文', color: '#6d5dfc' },
    { id: 'math', name: '数学', color: '#38b5a3' },
    { id: 'english', name: '英语', color: '#f19b5b' },
    { id: 'physics', name: '物理', color: '#df6d7b' },
    { id: 'history', name: '历史', color: '#5786d9' },
    { id: 'pe', name: '体育', color: '#42a5c8' },
    { id: 'chemistry', name: '化学', color: '#9a74cc' },
    { id: 'self-study', name: '晚自习', color: '#8f96ab' },
  ],
  entries: [
    { id: 'e1', day: 'mon', slotId: 's1', classId: 'c1', teacherId: 't2', courseId: 'math', room: 'A301' },
    { id: 'e2', day: 'mon', slotId: 's3', classId: 'c1', teacherId: 't1', courseId: 'chinese', room: 'A301' },
    { id: 'e3', day: 'mon', slotId: 's4', classId: 'c1', teacherId: 't3', courseId: 'english', room: 'A301' },
    { id: 'e4', day: 'mon', slotId: 's6', classId: 'c1', teacherId: 't4', courseId: 'physics', room: 'A301' },
    { id: 'e5', day: 'mon', slotId: 's8', classId: 'c1', teacherId: 't6', courseId: 'pe', room: '操场' },
    { id: 'e6', day: 'mon', slotId: 's12', classId: 'c1', teacherId: 't1', courseId: 'self-study', room: 'A301' },
    { id: 'e7', day: 'tue', slotId: 's1', classId: 'c1', teacherId: 't1', courseId: 'chinese', room: 'A301' },
    { id: 'e8', day: 'tue', slotId: 's3', classId: 'c1', teacherId: 't2', courseId: 'math', room: 'A301' },
    { id: 'e9', day: 'tue', slotId: 's4', classId: 'c1', teacherId: 't5', courseId: 'history', room: 'A301' },
    { id: 'e10', day: 'tue', slotId: 's6', classId: 'c1', teacherId: 't3', courseId: 'english', room: 'A301' },
    { id: 'e11', day: 'tue', slotId: 's8', classId: 'c1', teacherId: 't4', courseId: 'physics', room: 'A301' },
    { id: 'e12', day: 'wed', slotId: 's1', classId: 'c1', teacherId: 't4', courseId: 'physics', room: 'A301' },
    { id: 'e13', day: 'wed', slotId: 's3', classId: 'c1', teacherId: 't3', courseId: 'english', room: 'A301' },
    { id: 'e14', day: 'wed', slotId: 's6', classId: 'c1', teacherId: 't2', courseId: 'math', room: 'A301' },
    { id: 'e15', day: 'wed', slotId: 's8', classId: 'c1', teacherId: 't1', courseId: 'chinese', room: 'A301' },
    { id: 'e16', day: 'thu', slotId: 's1', classId: 'c1', teacherId: 't5', courseId: 'history', room: 'A301' },
    { id: 'e17', day: 'thu', slotId: 's3', classId: 'c1', teacherId: 't1', courseId: 'chinese', room: 'A301' },
    { id: 'e18', day: 'thu', slotId: 's6', classId: 'c1', teacherId: 't3', courseId: 'english', room: 'A301' },
    { id: 'e19', day: 'thu', slotId: 's8', classId: 'c1', teacherId: 't6', courseId: 'pe', room: '操场' },
    { id: 'e20', day: 'fri', slotId: 's1', classId: 'c1', teacherId: 't2', courseId: 'math', room: 'A301' },
    { id: 'e21', day: 'fri', slotId: 's3', classId: 'c1', teacherId: 't4', courseId: 'physics', room: 'A301' },
    { id: 'e22', day: 'fri', slotId: 's6', classId: 'c1', teacherId: 't1', courseId: 'chinese', room: 'A301' },
    { id: 'e23', day: 'fri', slotId: 's8', classId: 'c1', teacherId: 't3', courseId: 'english', room: 'A301' },
    { id: 'e24', day: 'mon', slotId: 's1', classId: 'c2', teacherId: 't1', courseId: 'chinese', room: 'A302' },
    { id: 'e25', day: 'mon', slotId: 's3', classId: 'c2', teacherId: 't3', courseId: 'english', room: 'A302' },
    { id: 'e26', day: 'mon', slotId: 's4', classId: 'c2', teacherId: 't2', courseId: 'math', room: 'A302' },
    { id: 'e27', day: 'tue', slotId: 's1', classId: 'c2', teacherId: 't4', courseId: 'physics', room: 'A302' },
    { id: 'e28', day: 'tue', slotId: 's3', classId: 'c2', teacherId: 't1', courseId: 'chinese', room: 'A302' },
    { id: 'e29', day: 'tue', slotId: 's6', classId: 'c2', teacherId: 't6', courseId: 'pe', room: '操场' },
    { id: 'e30', day: 'wed', slotId: 's1', classId: 'c2', teacherId: 't3', courseId: 'english', room: 'A302' },
    { id: 'e31', day: 'wed', slotId: 's3', classId: 'c2', teacherId: 't2', courseId: 'math', room: 'A302' },
    { id: 'e32', day: 'wed', slotId: 's6', classId: 'c2', teacherId: 't5', courseId: 'history', room: 'A302' },
    { id: 'e33', day: 'thu', slotId: 's1', classId: 'c2', teacherId: 't1', courseId: 'chinese', room: 'A302' },
    { id: 'e34', day: 'thu', slotId: 's3', classId: 'c2', teacherId: 't4', courseId: 'physics', room: 'A302' },
    { id: 'e35', day: 'thu', slotId: 's8', classId: 'c2', teacherId: 't3', courseId: 'english', room: 'A302' },
    { id: 'e36', day: 'fri', slotId: 's1', classId: 'c2', teacherId: 't2', courseId: 'math', room: 'A302' },
    { id: 'e37', day: 'fri', slotId: 's3', classId: 'c2', teacherId: 't5', courseId: 'history', room: 'A302' },
    { id: 'e38', day: 'fri', slotId: 's6', classId: 'c2', teacherId: 't6', courseId: 'pe', room: '操场' },
    { id: 'e39', day: 'mon', slotId: 's1', classId: 'c3', teacherId: 't5', courseId: 'history', room: 'B201' },
    { id: 'e40', day: 'mon', slotId: 's3', classId: 'c3', teacherId: 't2', courseId: 'math', room: 'B201' },
    { id: 'e41', day: 'mon', slotId: 's6', classId: 'c3', teacherId: 't3', courseId: 'english', room: 'B201' },
    { id: 'e42', day: 'tue', slotId: 's1', classId: 'c3', teacherId: 't1', courseId: 'chinese', room: 'B201' },
    { id: 'e43', day: 'tue', slotId: 's4', classId: 'c3', teacherId: 't4', courseId: 'physics', room: 'B201' },
    { id: 'e44', day: 'wed', slotId: 's3', classId: 'c3', teacherId: 't5', courseId: 'history', room: 'B201' },
    { id: 'e45', day: 'wed', slotId: 's8', classId: 'c3', teacherId: 't6', courseId: 'pe', room: '操场' },
    { id: 'e46', day: 'thu', slotId: 's1', classId: 'c3', teacherId: 't2', courseId: 'math', room: 'B201' },
    { id: 'e47', day: 'thu', slotId: 's3', classId: 'c3', teacherId: 't1', courseId: 'chinese', room: 'B201' },
    { id: 'e48', day: 'fri', slotId: 's1', classId: 'c3', teacherId: 't3', courseId: 'english', room: 'B201' },
    { id: 'e49', day: 'fri', slotId: 's4', classId: 'c3', teacherId: 't4', courseId: 'physics', room: 'B201' },
  ],
};

let state = loadData();
let ui = { view: 'dashboard', scope: 'class', selectedClass: state.classes[0]?.id || '', selectedTeacher: state.teachers[0]?.id || '' };
let toastTimer;

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.slots) && Array.isArray(parsed.entries)) return parsed;
    }
  } catch (error) { console.warn('读取本地数据失败，使用示例数据', error); }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix = 'id') { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`; }
function byId(list, id) { return list.find(item => item.id === id); }
function escapeHTML(value) { return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch])); }
function escapeXml(value) { return escapeHTML(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); }
function formatDate(date) { return `${date.getMonth() + 1}月${date.getDate()}日`; }
function dateFromISO(iso) { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); }
function isoDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function getWeekDates() { const start = dateFromISO(state.settings.weekStart); return DAY_DEFS.map((day, index) => ({ ...day, date: new Date(start.getFullYear(), start.getMonth(), start.getDate() + index) })); }
function getWeekNumber(date) { const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); const dayNum = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - dayNum); const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); return Math.ceil((((d - yearStart) / 86400000) + 1) / 7); }
function getWeekMonday(weekValue) { const match = String(weekValue).match(/(\d{4})-W(\d{2})/); if (!match) return state.settings.weekStart; const year = Number(match[1]); const week = Number(match[2]); const jan4 = new Date(year, 0, 4); const day = jan4.getDay() || 7; const monday = new Date(jan4); monday.setDate(jan4.getDate() - day + 1 + (week - 1) * 7); return isoDate(monday); }
function weekInputValue() { const start = dateFromISO(state.settings.weekStart); return `${start.getFullYear()}-W${String(getWeekNumber(start)).padStart(2, '0')}`; }
function getCourse(courseId) { return byId(state.courses || [], courseId); }
function getTeacher(teacherId) { return byId(state.teachers, teacherId); }
function getClass(classId) { return byId(state.classes, classId); }
function getSlot(slotId) { return byId(state.slots, slotId); }
function entryName(entry) { return entry.courseId === '__custom__' ? (entry.customName || '自定义安排') : (getCourse(entry.courseId)?.name || entry.courseName || '未命名课程'); }
function entryAccent(entry) { return entry.courseId === '__custom__' ? '#8f96ab' : (getCourse(entry.courseId)?.color || COURSE_PALETTE[0]); }
function entryBackground(entry) { const hex = entryAccent(entry).replace('#', ''); if (hex.length !== 6) return '#f0efff'; const rgb = hex.match(/.{2}/g).map(v => parseInt(v, 16)); return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .11)`; }
function entryMatches(entry, scope, id) { return scope === 'class' ? entry.classId === id : entry.teacherId === id; }
function getCellEntries(scope, id, dayId, slotId) { return state.entries.filter(entry => entryMatches(entry, scope, id) && entry.day === dayId && entry.slotId === slotId); }
function conflictGroups() {
  const groups = new Map();
  state.entries.forEach(entry => {
    if (entry.teacherId) { const key = `教师 · ${entry.teacherId} · ${entry.day} · ${entry.slotId}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(entry); }
    if (entry.classId) { const key = `班级 · ${entry.classId} · ${entry.day} · ${entry.slotId}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(entry); }
  });
  return [...groups.values()].filter(group => group.length > 1);
}
function weeklyCountFor(scope, id) { return state.entries.filter(entry => entryMatches(entry, scope, id)).length; }

function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
function openModal(id) { const modal = document.getElementById(id); if (modal) { modal.hidden = false; document.body.style.overflow = 'hidden'; } }
function closeModal(id) { const modal = document.getElementById(id); if (modal) { modal.hidden = true; document.body.style.overflow = ''; } }
function closeAllModals() { ['entryModalBackdrop', 'entityModalBackdrop', 'slotModalBackdrop'].forEach(closeModal); }
function downloadBlob(blob, filename) { if (window.AndroidBridge && typeof window.AndroidBridge.saveFile === 'function') { const reader = new FileReader(); reader.onloadend = () => { const result = String(reader.result || ''); const comma = result.indexOf(','); window.AndroidBridge.saveFile(filename, blob.type || 'application/octet-stream', comma >= 0 ? result.slice(comma + 1) : result); }; reader.readAsDataURL(blob); return; } const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1200); }
function downloadText(text, filename, mime = 'text/plain;charset=utf-8') { downloadBlob(new Blob([text], { type: mime }), filename); }

function renderApp() {
  const viewRenderers = { dashboard: renderDashboard, schedule: renderSchedule, teachers: renderTeachers, classes: renderClasses, time: renderTime, data: renderData };
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.view === ui.view));
  document.getElementById('pageTitle').textContent = ({ dashboard: '本周概览', schedule: '课程排班', teachers: '教师管理', classes: '班级管理', time: '时间设置', data: '数据与导出' })[ui.view];
  const weekStart = dateFromISO(state.settings.weekStart);
  document.getElementById('topbarEyebrow').textContent = `${state.settings.academicYear} · 第 ${getWeekNumber(weekStart)} 周 · ${state.settings.schoolName}`;
  document.getElementById('appContent').innerHTML = viewRenderers[ui.view]();
}

function renderDashboard() {
  const conflicts = conflictGroups();
  const classPeriods = state.slots.filter(slot => slot.type === 'class').length;
  const entryTotal = state.entries.length;
  const dates = getWeekDates();
  const dayCounts = DAY_DEFS.map(day => state.entries.filter(entry => entry.day === day.id).length);
  const maxDayCount = Math.max(...dayCounts, 1);
  const timeline = state.slots.slice(0, 8).map(slot => {
    const count = state.entries.filter(entry => entry.slotId === slot.id).length;
    const percent = Math.min(100, Math.round((count / Math.max(state.classes.length * 5, 1)) * 100));
    return `<div class="timeline-row"><span class="timeline-time">${escapeHTML(slot.start)}–${escapeHTML(slot.end)}</span><div class="timeline-track"><i style="width:${Math.max(7, percent)}%;--fill:${slot.type === 'class' ? '#6d5dfc' : slot.type === 'meal' ? '#f2aa68' : '#4cb7a6'}"></i></div><b>${slot.name}</b></div>`;
  }).join('');
  const alerts = conflicts.length ? conflicts.slice(0, 3).map(group => {
    const sample = group[0];
    const teacher = getTeacher(sample.teacherId)?.name || '未指定教师';
    const klass = getClass(sample.classId)?.name || '未指定班级';
    return `<div class="alert-item"><i class="alert-marker"></i><div><strong>存在排课冲突</strong><span>${escapeHTML(klass)} · ${escapeHTML(teacher)} · ${escapeHTML(getSlot(sample.slotId)?.name || '')}</span></div></div>`;
  }).join('') : '<div class="alert-item ok"><i class="alert-marker"></i><div><strong>本周排课状态良好</strong><span>暂未发现班级或教师的时间冲突。</span></div></div>';
  return `<div class="section-heading"><div><h2>早上好，教务处</h2><p>这是 ${formatDate(dates[0].date)} 至 ${formatDate(dates[dates.length - 1].date)} 的校务排班概览。</p></div><div class="actions"><button class="button ghost" data-action="export-excel"><span class="button-icon">⇩</span>导出 Excel</button><button class="button primary" data-action="go-schedule"><span class="button-icon">＋</span>安排课程</button></div></div>
    <div class="stats-grid">
      <div class="stat-card" style="--tint:#eeedff;--accent:#6d5dfc"><span class="stat-icon">▦</span><span class="stat-label">本周课程安排</span><div class="stat-value">${entryTotal}</div><div class="stat-meta">↑ 已覆盖 ${classPeriods} 个教学时段</div></div>
      <div class="stat-card" style="--tint:#e7f8f4;--accent:#38b5a3"><span class="stat-icon">♙</span><span class="stat-label">教师人数</span><div class="stat-value">${state.teachers.length}</div><div class="stat-meta">↑ ${state.teachers.length ? '全部已加入排班' : '请先添加教师'}</div></div>
      <div class="stat-card" style="--tint:#fff1df;--accent:#e29252"><span class="stat-icon">▤</span><span class="stat-label">教学班级</span><div class="stat-value">${state.classes.length}</div><div class="stat-meta">↑ 覆盖初高中学段</div></div>
      <div class="stat-card" style="--tint:#ffe9ec;--accent:#df6d7b"><span class="stat-icon">!</span><span class="stat-label">待处理冲突</span><div class="stat-value">${conflicts.length}</div><div class="stat-meta ${conflicts.length ? '' : 'neutral'}">${conflicts.length ? '需要及时处理' : '当前安排很顺畅'}</div></div>
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><div><h3>本周排班密度</h3><p>每天已安排的课程和活动数量</p></div><button class="text-link" data-action="go-schedule">查看完整课表 →</button></div><div class="week-strip">${dates.map((day, i) => `<div class="week-day ${i === 0 ? 'today' : ''}"><span>${day.label}</span><strong>${day.date.getDate()}</strong><em>${dayCounts[i]} 项安排</em></div>`).join('')}</div><div class="panel-header" style="padding-top:7px"><div><h3>日程时间轴</h3><p>按时间段查看本周整体占用情况</p></div></div><div class="mini-timeline">${timeline}</div></section>
      <section class="panel"><div class="panel-header"><div><h3>常用操作</h3><p>把每天的教务动作集中在这里</p></div></div><div class="quick-actions"><button class="quick-action" data-action="go-schedule"><strong>＋ 新增排课</strong><span>给班级或教师安排课程</span></button><button class="quick-action" data-action="add-teacher"><strong>♙ 添加教师</strong><span>建立任课教师资料</span></button><button class="quick-action" data-action="add-class"><strong>▤ 添加班级</strong><span>维护教学班和教室</span></button><button class="quick-action" data-action="go-time"><strong>◷ 配置时间</strong><span>自定义早餐、运动和课间</span></button></div><div class="panel-header" style="padding-top:3px"><div><h3>排班提醒</h3><p>系统根据当前数据实时检查</p></div></div><div class="alert-list">${alerts}</div></section>
    </div>`;
}

function renderSchedule() {
  const selectedId = ui.scope === 'class' ? ui.selectedClass : ui.selectedTeacher;
  const selected = ui.scope === 'class' ? getClass(selectedId) : getTeacher(selectedId);
  const dates = getWeekDates();
  const targetOptions = (ui.scope === 'class' ? state.classes : state.teachers).map(item => `<option value="${escapeHTML(item.id)}" ${item.id === selectedId ? 'selected' : ''}>${escapeHTML(item.name)}${ui.scope === 'teacher' && item.subject ? ` · ${escapeHTML(item.subject)}` : ''}</option>`).join('');
  const headLabel = ui.scope === 'class' ? '班级' : '教师';
  const rows = state.slots.map(slot => {
    const cells = dates.map((day, index) => {
      const entries = getCellEntries(ui.scope, selectedId, day.id, slot.id);
      let body = '';
      if (entries.length) {
        body = entries.map(entry => {
          const teacher = getTeacher(entry.teacherId)?.name || '待分配教师';
          const klass = getClass(entry.classId)?.name || '待分配班级';
          const meta = ui.scope === 'class' ? teacher : klass;
          const conflict = entries.length > 1 ? '<span class="conflict-tag">冲突</span>' : '';
          return `<div class="entry-card" style="--entry-accent:${entryAccent(entry)};--entry-bg:${entryBackground(entry)}" data-action="open-entry" data-entry-id="${escapeHTML(entry.id)}" data-day="${day.id}" data-slot-id="${slot.id}"><span class="entry-name">${escapeHTML(entryName(entry))}${conflict}</span><span class="entry-meta">${escapeHTML(meta)}</span>${entry.room ? `<span class="entry-room">⌂ ${escapeHTML(entry.room)}</span>` : ''}</div>`;
        }).join('');
      } else if (slot.type !== 'class') {
        body = `<div class="system-entry" data-action="open-entry" data-day="${day.id}" data-slot-id="${slot.id}"><span class="system-icon">${TYPE_ICONS[slot.type] || '◌'}</span><span>${escapeHTML(slot.name)}</span></div>`;
      } else {
        body = `<div class="schedule-cell empty" data-action="open-entry" data-day="${day.id}" data-slot-id="${slot.id}" aria-label="添加安排">＋</div>`;
      }
      return `<td><div class="schedule-cell">${body}</div></td>`;
    }).join('');
    return `<tr><th><span class="slot-name"><i class="slot-type-dot" style="--slot-color:${slot.type === 'class' ? '#6d5dfc' : slot.type === 'meal' ? '#f2a566' : '#48b8a4'}"></i>${escapeHTML(slot.name)}</span><span class="slot-time">${escapeHTML(slot.start)} – ${escapeHTML(slot.end)}</span></th>${cells}</tr>`;
  }).join('');
  return `<div class="section-heading"><div><h2>${escapeHTML(selected?.name || '课程排班')}</h2><p>管理${headLabel}的课程、用餐、运动和所有自定义时段。</p></div><div class="actions"><button class="button ghost" data-action="export-current-png">▧ 导出当前 PNG</button><button class="button primary" data-action="export-excel">⇩ 导出 Excel</button></div></div>
    <div class="schedule-toolbar"><div class="toolbar-left"><div class="segmented"><button data-action="set-scope" data-scope="class" class="${ui.scope === 'class' ? 'active' : ''}">按班级</button><button data-action="set-scope" data-scope="teacher" class="${ui.scope === 'teacher' ? 'active' : ''}">按教师</button></div><select class="select-control" id="scheduleTarget" aria-label="选择${headLabel}">${targetOptions}</select><input class="date-control" id="weekControl" type="week" value="${weekInputValue()}" aria-label="选择周次" /></div><div class="toolbar-right"><button class="button ghost small" data-action="export-all-png">批量导出 PNG</button><button class="button primary small" data-action="open-entry" data-day="mon" data-slot-id="${state.slots.find(slot => slot.type === 'class')?.id || state.slots[0]?.id || ''}">＋ 添加安排</button></div></div>
    <section class="panel schedule-panel"><div class="schedule-scroll"><table class="schedule-table"><thead><tr><th>时间 / 时段</th>${dates.map((day, index) => `<th class="${index === 0 ? 'active-day' : ''}">${day.label}<span class="day-date">${formatDate(day.date)}</span></th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div><div class="schedule-caption">点击任意单元格即可编辑课程或添加自定义安排。早餐、午餐、晚餐和运动等时段会自动显示在时间轴中。</div></section>`;
}

function renderTeachers() {
  const cards = state.teachers.length ? state.teachers.map((teacher, index) => {
    const count = weeklyCountFor('teacher', teacher.id);
    const classCount = new Set(state.entries.filter(entry => entry.teacherId === teacher.id).map(entry => entry.classId)).size;
    return `<article class="person-card"><div class="person-top"><div class="person-avatar" style="background:${index % 2 ? 'linear-gradient(140deg,#f0a067,#d96e8d)' : 'linear-gradient(140deg,#7e72f8,#b3a3ff)'}">${escapeHTML(teacher.name.slice(0, 1))}</div><div><strong>${escapeHTML(teacher.name)}</strong><span>${escapeHTML(teacher.subject || '未设置学科')}</span></div><button class="card-menu" data-action="edit-entity" data-entity-type="teacher" data-entity-id="${escapeHTML(teacher.id)}">···</button></div><div class="person-meta"><div><span>本周安排</span><strong>${count} 节</strong></div><div><span>授课班级</span><strong>${classCount} 个</strong></div><div><span>联系方式</span><strong>${escapeHTML(teacher.contact || '—')}</strong></div></div></article>`;
  }).join('') : '<div class="empty-directory">还没有教师资料，先添加第一位任课教师吧。</div>';
  return `<div class="section-heading"><div><h2>教师管理</h2><p>维护教师、任教学科和联系信息，排课时可直接选择。</p></div><div class="actions"><button class="button primary" data-action="add-teacher">＋ 添加教师</button></div></div><div class="directory-grid">${cards}</div>`;
}

function renderClasses() {
  const cards = state.classes.length ? state.classes.map((klass, index) => {
    const count = weeklyCountFor('class', klass.id);
    const teacherCount = new Set(state.entries.filter(entry => entry.classId === klass.id).map(entry => entry.teacherId)).size;
    return `<article class="class-card"><div class="class-top"><div class="class-avatar" style="background:${index % 2 ? 'linear-gradient(140deg,#f0a067,#e29b75)' : 'linear-gradient(140deg,#4db9aa,#92d6bc)'}">${escapeHTML(klass.grade?.slice(-1) || '班')}</div><div><strong>${escapeHTML(klass.name)}</strong><span>${escapeHTML(klass.grade || '未设置年级')} · ${escapeHTML(klass.room || '未设置教室')}</span></div><button class="card-menu" data-action="edit-entity" data-entity-type="class" data-entity-id="${escapeHTML(klass.id)}">···</button></div><div class="class-meta"><div><span>本周安排</span><strong>${count} 项</strong></div><div><span>任课教师</span><strong>${teacherCount} 位</strong></div><div><span>班主任</span><strong>${escapeHTML(klass.contact || '—')}</strong></div></div></article>`;
  }).join('') : '<div class="empty-directory">还没有班级资料，先添加第一个教学班吧。</div>';
  return `<div class="section-heading"><div><h2>班级管理</h2><p>维护教学班、年级和固定教室，让排课信息更完整。</p></div><div class="actions"><button class="button primary" data-action="add-class">＋ 添加班级</button></div></div><div class="directory-grid">${cards}</div>`;
}

function renderTime() {
  const rows = state.slots.map(slot => `<tr><td><strong>${escapeHTML(slot.name)}</strong></td><td>${escapeHTML(slot.start)} – ${escapeHTML(slot.end)}</td><td><span class="type-pill ${escapeHTML(slot.type)}">${TYPE_LABELS[slot.type] || '自定义'}</span></td><td class="row-actions"><button data-action="edit-slot" data-slot-id="${escapeHTML(slot.id)}">编辑</button><button data-action="delete-slot" data-slot-id="${escapeHTML(slot.id)}">删除</button></td></tr>`).join('');
  return `<div class="section-heading"><div><h2>时间设置</h2><p>自由配置一天的课程节次、用餐、课间和运动安排，课表会自动同步。</p></div><div class="actions"><button class="button primary" data-action="add-slot">＋ 添加时间段</button></div></div><section class="panel time-panel"><table class="time-table"><thead><tr><th>名称</th><th>时间</th><th>类型</th><th></th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function renderData() {
  return `<div class="section-heading"><div><h2>数据与导出</h2><p>导出完整课表，也可以备份或迁移当前浏览器中的排班数据。</p></div><div class="actions"><button class="button ghost" data-action="export-all-png">▧ 批量导出 PNG</button><button class="button primary" data-action="export-excel">⇩ 导出 Excel</button></div></div><div class="data-grid"><section class="panel data-card"><h3>数据概览</h3><p>当前数据只保存在本机浏览器中，适合校内排课演示和轻量管理。</p><div class="data-stat"><div><strong>${state.teachers.length}</strong><span>教师</span></div><div><strong>${state.classes.length}</strong><span>班级</span></div><div><strong>${state.entries.length}</strong><span>排班记录</span></div></div><div class="data-actions" style="margin-top:18px"><button class="button ghost" data-action="export-json">导出备份 JSON</button><button class="button ghost" data-action="import-json">导入备份 JSON</button><input id="importFile" type="file" accept="application/json,.json" hidden /></div></section><section class="panel data-card"><h3>学校与学期</h3><p>这些信息会出现在页面顶部和导出文件中。</p><div class="school-setting"><label for="schoolNameInput">学校名称</label><input id="schoolNameInput" value="${escapeHTML(state.settings.schoolName)}" /></div><div class="school-setting"><label for="academicYearInput">学年名称</label><input id="academicYearInput" value="${escapeHTML(state.settings.academicYear)}" /></div><div class="data-actions" style="margin-top:18px"><button class="button primary" data-action="save-settings">保存设置</button><button class="button ghost danger" data-action="reset-data">恢复示例数据</button></div></section></div>`;
}

function openEntryModal(dayId, slotId, entryId = '') {
  const slot = getSlot(slotId) || state.slots[0];
  const dates = getWeekDates();
  const day = dates.find(item => item.id === dayId) || dates[0];
  const existing = entryId ? state.entries.find(entry => entry.id === entryId) : null;
  const selectedId = ui.scope === 'class' ? ui.selectedClass : ui.selectedTeacher;
  const selected = ui.scope === 'class' ? getClass(selectedId) : getTeacher(selectedId);
  document.getElementById('entryId').value = existing?.id || '';
  document.getElementById('entryDay').value = dayId;
  document.getElementById('entrySlotId').value = slot.id;
  document.getElementById('entryModalKicker').textContent = existing ? '编辑安排' : '新建安排';
  document.getElementById('entryModalTitle').textContent = existing ? '编辑课程 / 活动' : '添加课程 / 活动';
  document.getElementById('entryContext').textContent = `${selected?.name || '未选择对象'} · ${day.label} ${formatDate(day.date)} · ${slot.name} ${slot.start}–${slot.end}`;
  document.getElementById('entryCourse').innerHTML = `${state.courses.map(course => `<option value="${escapeHTML(course.id)}">${escapeHTML(course.name)}</option>`).join('')}<option value="__custom__">＋ 自定义课程 / 安排</option>`;
  document.getElementById('entryTeacher').innerHTML = `<option value="">待分配教师</option>${state.teachers.map(teacher => `<option value="${escapeHTML(teacher.id)}">${escapeHTML(teacher.name)} · ${escapeHTML(teacher.subject || '未设置学科')}</option>`).join('')}`;
  document.getElementById('entryClass').innerHTML = `<option value="">待分配班级</option>${state.classes.map(klass => `<option value="${escapeHTML(klass.id)}">${escapeHTML(klass.name)}</option>`).join('')}`;
  document.getElementById('entryCourse').value = existing?.courseId || (slot.type === 'class' ? state.courses[0]?.id : '__custom__');
  document.getElementById('entryCustomName').value = existing?.customName || (slot.type !== 'class' && !existing ? slot.name : '');
  document.getElementById('entryTeacher').value = existing?.teacherId || (ui.scope === 'teacher' ? ui.selectedTeacher : '');
  document.getElementById('entryClass').value = existing?.classId || (ui.scope === 'class' ? ui.selectedClass : '');
  document.getElementById('entryRoom').value = existing?.room || (ui.scope === 'class' ? getClass(ui.selectedClass)?.room || '' : '');
  document.getElementById('entryNote').value = existing?.note || '';
  document.getElementById('entryTeacherField').hidden = ui.scope === 'teacher';
  document.getElementById('entryClassField').hidden = ui.scope === 'class';
  document.getElementById('deleteEntryButton').hidden = !existing;
  document.getElementById('entryHint').textContent = slot.type === 'class' ? '课程时段可指定任课教师、班级、教室和备注。' : `这是一个${TYPE_LABELS[slot.type] || '自定义'}时段，可以覆盖默认的“${slot.name}”显示。`;
  toggleCustomEntryName();
  openModal('entryModalBackdrop');
}

function toggleCustomEntryName() { document.getElementById('customNameField').hidden = document.getElementById('entryCourse').value !== '__custom__'; }

function openEntityModal(type, id = '') {
  const isTeacher = type === 'teacher'; const item = id ? (isTeacher ? getTeacher(id) : getClass(id)) : null;
  document.getElementById('entityType').value = type; document.getElementById('entityId').value = item?.id || '';
  document.getElementById('entityModalKicker').textContent = isTeacher ? '教师资料' : '班级资料';
  document.getElementById('entityModalTitle').textContent = item ? (isTeacher ? '编辑教师' : '编辑班级') : (isTeacher ? '添加教师' : '添加班级');
  document.getElementById('entityNameLabel').textContent = isTeacher ? '教师姓名' : '班级名称';
  document.getElementById('entityName').placeholder = isTeacher ? '例如：林知夏' : '例如：高一（3）班';
  document.getElementById('entityName').value = item?.name || '';
  document.getElementById('entitySubject').value = item?.subject || '';
  document.getElementById('entityGrade').value = item?.grade || '高一';
  document.getElementById('entityRoom').value = item?.room || '';
  document.getElementById('entityContact').value = item?.contact || '';
  document.getElementById('entitySubjectField').hidden = !isTeacher;
  document.getElementById('entityGradeField').hidden = isTeacher;
  document.getElementById('entityRoomField').hidden = isTeacher;
  openModal('entityModalBackdrop');
}

function openSlotModal(id = '') {
  const slot = id ? getSlot(id) : null; document.getElementById('slotEditId').value = slot?.id || ''; document.getElementById('slotModalTitle').textContent = slot ? '编辑时间段' : '添加时间段'; document.getElementById('slotName').value = slot?.name || ''; document.getElementById('slotStart').value = slot?.start || '08:00'; document.getElementById('slotEnd').value = slot?.end || '08:45'; document.getElementById('slotType').value = slot?.type || 'class'; openModal('slotModalBackdrop');
}

function handleEntrySubmit(event) {
  event.preventDefault();
  const id = document.getElementById('entryId').value; const courseId = document.getElementById('entryCourse').value; const item = { id: id || uid('entry'), day: document.getElementById('entryDay').value, slotId: document.getElementById('entrySlotId').value, courseId, customName: courseId === '__custom__' ? document.getElementById('entryCustomName').value.trim() : '', teacherId: document.getElementById('entryTeacher').value, classId: document.getElementById('entryClass').value, room: document.getElementById('entryRoom').value.trim(), note: document.getElementById('entryNote').value.trim() };
  if (courseId === '__custom__' && !item.customName) { showToast('请填写自定义课程或安排名称'); return; }
  const index = state.entries.findIndex(entry => entry.id === id); if (index >= 0) state.entries[index] = { ...state.entries[index], ...item }; else state.entries.push(item); saveData(); closeModal('entryModalBackdrop'); renderApp(); showToast(index >= 0 ? '安排已更新' : '安排已添加');
}

function handleEntitySubmit(event) {
  event.preventDefault(); const type = document.getElementById('entityType').value; const id = document.getElementById('entityId').value; const isTeacher = type === 'teacher'; const item = isTeacher ? { id: id || uid('teacher'), name: document.getElementById('entityName').value.trim(), subject: document.getElementById('entitySubject').value.trim(), contact: document.getElementById('entityContact').value.trim() } : { id: id || uid('class'), name: document.getElementById('entityName').value.trim(), grade: document.getElementById('entityGrade').value, room: document.getElementById('entityRoom').value.trim(), contact: document.getElementById('entityContact').value.trim() };
  if (!item.name) { showToast(isTeacher ? '请填写教师姓名' : '请填写班级名称'); return; }
  const list = isTeacher ? state.teachers : state.classes; const index = list.findIndex(existing => existing.id === id); if (index >= 0) list[index] = { ...list[index], ...item }; else list.push(item); if (isTeacher && !ui.selectedTeacher) ui.selectedTeacher = item.id; if (!isTeacher && !ui.selectedClass) ui.selectedClass = item.id; saveData(); closeModal('entityModalBackdrop'); renderApp(); showToast(index >= 0 ? '资料已更新' : '资料已添加');
}

function handleSlotSubmit(event) {
  event.preventDefault(); const id = document.getElementById('slotEditId').value; const name = document.getElementById('slotName').value.trim(); const start = document.getElementById('slotStart').value; const end = document.getElementById('slotEnd').value; const type = document.getElementById('slotType').value; if (!name || !start || !end) { showToast('请完整填写时间段信息'); return; } if (start >= end) { showToast('结束时间需要晚于开始时间'); return; } const item = { id: id || uid('slot'), name, start, end, type }; const index = state.slots.findIndex(slot => slot.id === id); if (index >= 0) state.slots[index] = { ...state.slots[index], ...item }; else state.slots.push(item); saveData(); closeModal('slotModalBackdrop'); renderApp(); showToast(index >= 0 ? '时间段已更新' : '时间段已添加');
}

function deleteEntry() { const id = document.getElementById('entryId').value; if (!id) return; state.entries = state.entries.filter(entry => entry.id !== id); saveData(); closeModal('entryModalBackdrop'); renderApp(); showToast('安排已删除'); }
function deleteSlot(id) { if (state.slots.length <= 1) { showToast('至少保留一个时间段'); return; } const slot = getSlot(id); if (!slot) return; if (state.entries.some(entry => entry.slotId === id) && !window.confirm(`“${slot.name}”已有排班记录，删除后这些记录也会被移除，确定继续吗？`)) return; state.slots = state.slots.filter(item => item.id !== id); state.entries = state.entries.filter(entry => entry.slotId !== id); saveData(); renderApp(); showToast('时间段已删除'); }

function setScope(scope) { ui.scope = scope; if (scope === 'class' && !getClass(ui.selectedClass)) ui.selectedClass = state.classes[0]?.id || ''; if (scope === 'teacher' && !getTeacher(ui.selectedTeacher)) ui.selectedTeacher = state.teachers[0]?.id || ''; renderApp(); }
function navigate(view) { ui.view = view; renderApp(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function renderExportRows(scope, id) {
  const target = scope === 'class' ? getClass(id) : getTeacher(id); const rows = [['对象', '星期', '日期', '时段', '开始', '结束', '课程 / 安排', '教师', '班级', '教室 / 地点', '备注']];
  getWeekDates().forEach(day => state.slots.forEach(slot => { const entries = getCellEntries(scope, id, day.id, slot.id); if (entries.length) entries.forEach(entry => rows.push([target?.name || '', day.label, isoDate(day.date), slot.name, slot.start, slot.end, entryName(entry), getTeacher(entry.teacherId)?.name || '', getClass(entry.classId)?.name || '', entry.room || '', entry.note || ''])); else if (slot.type !== 'class') rows.push([target?.name || '', day.label, isoDate(day.date), slot.name, slot.start, slot.end, slot.name, '', '', '', '系统时间段']); }));
  return rows;
}

async function exportCurrentPNG() { const id = ui.scope === 'class' ? ui.selectedClass : ui.selectedTeacher; const name = (ui.scope === 'class' ? getClass(id)?.name : getTeacher(id)?.name) || '课表'; const blob = await renderSchedulePNG(ui.scope, id); downloadBlob(blob, `青禾排课-${name}-${state.settings.weekStart}.png`); showToast('当前课表 PNG 已导出'); }
async function exportAllPNG() { const targets = [{ scope: 'class', items: state.classes }, { scope: 'teacher', items: state.teachers }]; const files = []; for (const group of targets) for (const item of group.items) { const blob = await renderSchedulePNG(group.scope, item.id); files.push({ name: `青禾排课-${group.scope === 'class' ? '班级' : '教师'}-${item.name}.png`, data: new Uint8Array(await blob.arrayBuffer()) }); } if (files.length) downloadBlob(new Blob([zipStore(files)], { type: 'application/zip' }), `青禾排课-全部PNG-${state.settings.weekStart}.zip`); showToast(`已打包 ${files.length} 份 PNG`); }

function renderSchedulePNG(scope, id) {
  const target = scope === 'class' ? getClass(id) : getTeacher(id); const dates = getWeekDates(); const canvas = document.createElement('canvas'); const width = 1800; const left = 215; const col = (width - left) / dates.length; const rowH = 106; const top = 155; const height = top + state.slots.length * rowH + 75; canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); ctx.fillStyle = '#f6f7fb'; ctx.fillRect(0, 0, width, height); ctx.fillStyle = '#20233a'; ctx.font = '700 30px "Microsoft YaHei", sans-serif'; ctx.fillText(state.settings.schoolName, 54, 56); ctx.font = '500 17px "Microsoft YaHei", sans-serif'; ctx.fillStyle = '#7c819b'; ctx.fillText(`${scope === 'class' ? '班级' : '教师'}课表 · ${target?.name || ''}`, 54, 88); ctx.font = '500 14px "Microsoft YaHei", sans-serif'; ctx.fillText(`${state.settings.academicYear} · ${state.settings.weekStart} 起`, 54, 116); ctx.fillStyle = '#fff'; roundRect(ctx, 34, 137, width - 68, height - 166, 16); ctx.fill(); ctx.fillStyle = '#fbfbfd'; ctx.fillRect(34, 137, width - 68, 63); ctx.fillStyle = '#666c88'; ctx.font = '700 15px "Microsoft YaHei", sans-serif'; ctx.fillText('时间 / 时段', 55, 176); dates.forEach((day, index) => { const x = left + index * col + 34; ctx.fillStyle = index === 0 ? '#efedff' : '#fbfbfd'; ctx.fillRect(x, 137, col, 63); ctx.fillStyle = index === 0 ? '#6d5dfc' : '#666c88'; ctx.textAlign = 'center'; ctx.font = '700 15px "Microsoft YaHei", sans-serif'; ctx.fillText(day.label, x + col / 2, 168); ctx.font = '500 12px "Microsoft YaHei", sans-serif'; ctx.fillStyle = '#9a9db2'; ctx.fillText(formatDate(day.date), x + col / 2, 187); ctx.textAlign = 'left'; });
  state.slots.forEach((slot, rowIndex) => { const y = 200 + rowIndex * rowH; ctx.strokeStyle = '#e9eaf2'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(34, y); ctx.lineTo(width - 34, y); ctx.stroke(); ctx.fillStyle = '#555a77'; ctx.font = '700 13px "Microsoft YaHei", sans-serif'; ctx.fillText(slot.name, 55, y + 38); ctx.fillStyle = '#a4a7bc'; ctx.font = '500 12px "Microsoft YaHei", sans-serif'; ctx.fillText(`${slot.start} – ${slot.end}`, 55, y + 62); dates.forEach((day, dayIndex) => { const x = left + dayIndex * col + 34; ctx.strokeStyle = '#e9eaf2'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + rowH); ctx.stroke(); const entries = getCellEntries(scope, id, day.id, slot.id); if (entries.length) entries.slice(0, 2).forEach((entry, index) => { const accent = entryAccent(entry); const fill = entryBackground(entry); ctx.fillStyle = fill; roundRect(ctx, x + 10, y + 12 + index * 39, col - 20, 31, 7); ctx.fill(); ctx.fillStyle = accent; ctx.fillRect(x + 10, y + 12 + index * 39, 4, 31); ctx.fillStyle = '#49445f'; ctx.font = '700 12px "Microsoft YaHei", sans-serif'; ctx.fillText(entryName(entry), x + 23, y + 32 + index * 39); }); else if (slot.type !== 'class') { ctx.fillStyle = '#f5f5f9'; roundRect(ctx, x + 10, y + 20, col - 20, 39, 7); ctx.fill(); ctx.fillStyle = '#9094aa'; ctx.font = '500 12px "Microsoft YaHei", sans-serif'; ctx.fillText(slot.name, x + 23, y + 45); } }); }); ctx.strokeStyle = '#e9eaf2'; ctx.beginPath(); ctx.moveTo(width - 34, 137); ctx.lineTo(width - 34, height - 29); ctx.stroke(); ctx.fillStyle = '#9296aa'; ctx.font = '500 11px "Microsoft YaHei", sans-serif'; ctx.fillText('由青禾排课生成 · 点击课表中的单元格可继续编辑', 54, height - 44); return new Promise(resolve => canvas.toBlob(resolve, 'image/png')); }

function roundRect(ctx, x, y, w, h, radius) { const r = Math.min(radius, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

function exportJSON() { downloadText(JSON.stringify(state, null, 2), `青禾排课-备份-${state.settings.weekStart}.json`, 'application/json;charset=utf-8'); showToast('JSON 备份已导出'); }
function importJSON(file) { const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!imported || !Array.isArray(imported.slots) || !Array.isArray(imported.teachers) || !Array.isArray(imported.classes) || !Array.isArray(imported.entries)) throw new Error('格式不完整'); state = { ...DEFAULT_DATA, ...imported, settings: { ...DEFAULT_DATA.settings, ...(imported.settings || {}) } }; ui.selectedClass = state.classes[0]?.id || ''; ui.selectedTeacher = state.teachers[0]?.id || ''; saveData(); renderApp(); showToast('数据备份已导入'); } catch (error) { showToast('导入失败：JSON 格式不正确'); } }; reader.readAsText(file); }

function exportExcel() { const sheets = []; state.classes.forEach(klass => sheets.push({ name: `班级-${klass.name}`, rows: renderExportRows('class', klass.id) })); state.teachers.forEach(teacher => sheets.push({ name: `教师-${teacher.name}`, rows: renderExportRows('teacher', teacher.id) })); sheets.push({ name: '时间设置', rows: [['名称', '开始时间', '结束时间', '类型'], ...state.slots.map(slot => [slot.name, slot.start, slot.end, TYPE_LABELS[slot.type] || slot.type])] }); sheets.push({ name: '基础资料', rows: [['类别', '名称', '学科 / 年级', '教室', '联系方式'], ...state.teachers.map(item => ['教师', item.name, item.subject || '', '', item.contact || '']), ...state.classes.map(item => ['班级', item.name, item.grade || '', item.room || '', item.contact || ''])] }); downloadBlob(new Blob([createXlsx(sheets)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `青禾排课-完整课表-${state.settings.weekStart}.xlsx`); showToast('Excel 文件已导出'); }

function createXlsx(sheets) {
  const files = []; const safeSheets = []; const seen = new Set(); sheets.forEach((sheet, index) => { let name = String(sheet.name || `Sheet${index + 1}`).replace(/[\\/:?*\[\]]/g, '').slice(0, 31) || `Sheet${index + 1}`; let base = name; let n = 2; while (seen.has(name)) name = `${base.slice(0, 27)}-${n++}`; seen.add(name); safeSheets.push({ ...sheet, name }); });
  files.push({ name: '[Content_Types].xml', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${safeSheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`) });
  files.push({ name: '_rels/.rels', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`) });
  files.push({ name: 'docProps/core.xml', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${escapeXml(state.settings.schoolName)} 课程排班</dc:title><dc:creator>青禾排课</dc:creator><cp:lastModifiedBy>青禾排课</cp:lastModifiedBy></cp:coreProperties>`) });
  files.push({ name: 'docProps/app.xml', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>青禾排课</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop></Properties>`) });
  files.push({ name: 'xl/styles.xml', data: textBytes('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Microsoft YaHei"/></font><font><b/><sz val="11"/><name val="Microsoft YaHei"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>') });
  safeSheets.forEach((sheet, index) => files.push({ name: `xl/worksheets/sheet${index + 1}.xml`, data: textBytes(sheetXml(sheet.rows)) }));
  files.push({ name: 'xl/workbook.xml', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${safeSheets.map((sheet, i) => `<sheet name="${escapeXml(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`) });
  files.push({ name: 'xl/_rels/workbook.xml.rels', data: textBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${safeSheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${safeSheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`) });
  return zipStore(files);
}
function textBytes(text) { return new TextEncoder().encode(text); }
function columnName(number) { let result = ''; let n = number + 1; while (n) { const remainder = (n - 1) % 26; result = String.fromCharCode(65 + remainder) + result; n = Math.floor((n - 1) / 26); } return result; }
function sheetXml(rows) { const rowXml = rows.map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((value, colIndex) => { const text = escapeXml(value); return text ? `<c r="${columnName(colIndex)}${rowIndex + 1}" t="inlineStr"${rowIndex === 0 ? ' s="1"' : ''}><is><t xml:space="preserve">${text}</t></is></c>` : ''; }).join('')}</row>`).join(''); return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetData>${rowXml}</sheetData></worksheet>`; }
function concatBytes(arrays) { const size = arrays.reduce((sum, arr) => sum + arr.length, 0); const result = new Uint8Array(size); let offset = 0; arrays.forEach(arr => { result.set(arr, offset); offset += arr.length; }); return result; }
function u16(value) { return new Uint8Array([value & 255, (value >>> 8) & 255]); }
function u32(value) { return new Uint8Array([value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255]); }
const CRC_TABLE = (() => { const table = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : c >>> 1; table[n] = c >>> 0; } return table; })();
function crc32(bytes) { let crc = 0xffffffff; for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; }
function zipStore(files) { const locals = []; const centrals = []; let offset = 0; files.forEach(file => { const name = textBytes(file.name); const data = file.data instanceof Uint8Array ? file.data : textBytes(file.data); const crc = crc32(data); const local = concatBytes([new Uint8Array([80, 75, 3, 4]), u16(20), u16(0x800), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0), name, data]); locals.push(local); const central = concatBytes([new Uint8Array([80, 75, 1, 2]), u16(20), u16(20), u16(0x800), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name]); centrals.push(central); offset += local.length; }); const centralData = concatBytes(centrals); const end = concatBytes([new Uint8Array([80, 75, 5, 6]), u16(0), u16(0), u16(files.length), u16(files.length), u32(centralData.length), u32(offset), u16(0)]); return concatBytes([...locals, centralData, end]); }

function openSearch() { const existing = document.querySelector('.search-overlay'); if (existing) { existing.remove(); return; } const overlay = document.createElement('div'); overlay.className = 'search-overlay'; overlay.innerHTML = '<div class="search-box"><input id="searchInput" placeholder="搜索教师、班级或课程…" autofocus /><div class="search-results" id="searchResults"></div></div>'; document.body.appendChild(overlay); const input = overlay.querySelector('#searchInput'); const results = overlay.querySelector('#searchResults'); const search = () => { const query = input.value.trim().toLowerCase(); const matches = []; state.teachers.forEach(item => { if (!query || `${item.name}${item.subject}`.toLowerCase().includes(query)) matches.push({ type: '教师', name: item.name, detail: item.subject || '未设置学科', action: () => { ui.scope = 'teacher'; ui.selectedTeacher = item.id; navigate('schedule'); } }); }); state.classes.forEach(item => { if (!query || `${item.name}${item.grade}`.toLowerCase().includes(query)) matches.push({ type: '班级', name: item.name, detail: `${item.grade || ''} · ${item.room || '未设置教室'}`, action: () => { ui.scope = 'class'; ui.selectedClass = item.id; navigate('schedule'); } }); }); (state.courses || []).forEach(item => { if (!query || item.name.toLowerCase().includes(query)) matches.push({ type: '课程', name: item.name, detail: '课程安排', action: () => navigate('schedule') }); }); results.innerHTML = matches.slice(0, 12).map((item, index) => `<button class="search-result" data-search-index="${index}"><strong>${escapeHTML(item.name)} <small>${escapeHTML(item.type)}</small></strong><span>${escapeHTML(item.detail)}</span></button>`).join('') || '<div style="padding:16px;color:#858aa7;font-size:11px">没有找到匹配内容</div>'; overlay.querySelectorAll('.search-result').forEach((button, index) => button.addEventListener('click', () => { matches[index]?.action(); overlay.remove(); })); }; input.addEventListener('input', search); overlay.addEventListener('click', event => { if (event.target === overlay) overlay.remove(); }); input.addEventListener('keydown', event => { if (event.key === 'Escape') overlay.remove(); }); search(); }

document.addEventListener('click', event => {
  const closeButton = event.target.closest('[data-close-modal]'); if (closeButton) { closeModal(closeButton.dataset.closeModal); return; }
  const nav = event.target.closest('.nav-item[data-view]'); if (nav) { navigate(nav.dataset.view); return; }
  const action = event.target.closest('[data-action]'); if (!action) return; const type = action.dataset.action;
  if (type === 'go-schedule') return navigate('schedule');
  if (type === 'go-time') return navigate('time');
  if (type === 'set-scope') return setScope(action.dataset.scope);
  if (type === 'open-entry') return openEntryModal(action.dataset.day || 'mon', action.dataset.slotId || state.slots[0]?.id, action.dataset.entryId || '');
  if (type === 'add-teacher') return openEntityModal('teacher');
  if (type === 'add-class') return openEntityModal('class');
  if (type === 'edit-entity') return openEntityModal(action.dataset.entityType, action.dataset.entityId);
  if (type === 'add-slot') return openSlotModal();
  if (type === 'edit-slot') return openSlotModal(action.dataset.slotId);
  if (type === 'delete-slot') return deleteSlot(action.dataset.slotId);
  if (type === 'export-current-png') return exportCurrentPNG();
  if (type === 'export-all-png') return exportAllPNG();
  if (type === 'export-excel') return exportExcel();
  if (type === 'export-json') return exportJSON();
  if (type === 'import-json') return document.getElementById('importFile')?.click();
  if (type === 'save-settings') { state.settings.schoolName = document.getElementById('schoolNameInput').value.trim() || DEFAULT_DATA.settings.schoolName; state.settings.academicYear = document.getElementById('academicYearInput').value.trim() || DEFAULT_DATA.settings.academicYear; saveData(); renderApp(); return showToast('学校设置已保存'); }
  if (type === 'reset-data') { if (window.confirm('恢复示例数据会覆盖当前本地排班，确定继续吗？')) { state = JSON.parse(JSON.stringify(DEFAULT_DATA)); ui.selectedClass = state.classes[0].id; ui.selectedTeacher = state.teachers[0].id; saveData(); renderApp(); showToast('已恢复示例数据'); } return; }
});

document.addEventListener('change', event => {
  if (event.target.id === 'scheduleTarget') { if (ui.scope === 'class') ui.selectedClass = event.target.value; else ui.selectedTeacher = event.target.value; renderApp(); }
  if (event.target.id === 'weekControl') { state.settings.weekStart = getWeekMonday(event.target.value); saveData(); renderApp(); }
  if (event.target.id === 'entryCourse') toggleCustomEntryName();
  if (event.target.id === 'importFile' && event.target.files[0]) importJSON(event.target.files[0]);
});
document.getElementById('entryForm').addEventListener('submit', handleEntrySubmit);
document.getElementById('entityForm').addEventListener('submit', handleEntitySubmit);
document.getElementById('slotForm').addEventListener('submit', handleSlotSubmit);
document.getElementById('deleteEntryButton').addEventListener('click', deleteEntry);
document.getElementById('quickSearch').addEventListener('click', openSearch);
document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', event => { if (event.target === backdrop) closeModal(backdrop.id); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeAllModals(); });
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js?version=4').catch(() => {});
renderApp();

