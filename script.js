// Збереження інформації про браузер
function saveBrowserInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    appVersion: navigator.appVersion,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine
  };
  localStorage.setItem('browserInfo', JSON.stringify(info));
}

// Відображення інформації у футері
function showBrowserInfo() {
  const footer = document.getElementById('footer-info');
  const infoStr = localStorage.getItem('browserInfo');
  if (!infoStr) {
    footer.textContent = 'Інформація про браузер недоступна.';
    return;
  }
  const info = JSON.parse(infoStr);
  footer.innerHTML = `
    <strong>Інформація про браузер та ОС:</strong><br>
    User Agent: ${info.userAgent}<br>
    Платформа: ${info.platform}<br>
    Версія: ${info.appVersion}<br>
    Мова: ${info.language}<br>
    Cookie увімкнено: ${info.cookieEnabled}<br>
    Онлайн: ${info.online}
  `;
}

// Коментарі з сервера
function loadComments() {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then(res => res.json())
    .then(comments => {
      const container = document.getElementById('comments-container');
      container.innerHTML = '';
      comments.forEach(comment => {
        const div = document.createElement('div');
        div.style.borderBottom = '1px solid #ccc';
        div.style.padding = '8px 0';
        div.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
        container.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById('comments-container').textContent = 'Не вдалося завантажити коментарі.';
    });
}

// Модальне вікно
function openFeedbackModal() {
  document.getElementById('feedback-modal').style.display = 'block';
}

function closeFeedbackModal() {
  document.getElementById('feedback-modal').style.display = 'none';
}

// Встановлення теми по часу
function getThemeByTime() {
  const h = new Date().getHours();
  return (h >= 7 && h < 21) ? 'light' : 'dark';
}

function applyTheme(theme) {
  if (theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.body.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// Ініціалізація
function init() {
  saveBrowserInfo();
  showBrowserInfo();
  loadComments();

  setTimeout(openFeedbackModal, 60000); // 1 хвилина

  document.getElementById('theme-toggle').onclick = toggleTheme;
  document.getElementById('open-feedback').onclick = openFeedbackModal;
  window.onclick = e => {
    const modal = document.getElementById('feedback-modal');
    if (e.target === modal) closeFeedbackModal();
  };

  let theme = localStorage.getItem('theme');
  if (!theme) theme = getThemeByTime();
  applyTheme(theme);
}

document.addEventListener('DOMContentLoaded', init);
