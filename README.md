# Редактор отчёта по СИМ

Статический HTML/CSS/JavaScript-проект для GitHub Pages.

## Публикация

1. Загрузите содержимое папки в корень репозитория.
2. Откройте `Settings → Pages`.
3. Выберите `GitHub Actions`.
4. Дождитесь завершения workflow `Deploy static site to Pages`.

## Google Slides

В `app.js` уже указаны URL Apps Script, ID презентации и номера слайдов 1–3.

Код из `google-apps-script.gs` должен быть опубликован как веб-приложение Apps Script:

- Execute as: `Me`;
- Who has access: `Anyone` или доступный аналог вашей организации.

После изменения Apps Script создайте новую версию существующего развёртывания.

## Moscow Sans

Добавьте лицензированный файл шрифта по пути:

```text
assets/moscow-sans-regular.ttf
```

## Файлы

- `index.html` — интерфейс;
- `styles.css` — оформление;
- `app.js` — редактор, Canvas, PNG и Google Slides;
- `google-apps-script.gs` — обработчик вставки изображений;
- `assets/slide-*-bg.png` — подложки слайдов.
