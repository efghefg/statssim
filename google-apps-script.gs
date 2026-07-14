/**
 * Коннектор редактора отчёта по СИМ с Google Slides.
 *
 * 1. Вставьте этот код в Apps Script.
 * 2. Deploy → Manage deployments → Edit → New version → Deploy.
 * 3. Execute as: Me. Who has access: Anyone (или доступная вашей организации опция).
 */

const DEFAULT_PRESENTATION_ID = '1W4C2yVba8txza43UPpQvBOrfkJz47MyMQHVvbIUBOl8';
const MANAGED_IMAGE_PREFIX = 'SIM_REPORT_CANVAS_SLIDE_';

function doGet() {
  return jsonOutput_({
    ok: true,
    service: 'SIM report Google Slides connector',
    presentationId: DEFAULT_PRESENTATION_ID,
  });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    if (payload.action !== 'upsertSlideImage') {
      throw new Error('Неизвестное действие: ' + (payload.action || 'пусто'));
    }

    const presentationId = payload.presentationId || DEFAULT_PRESENTATION_ID;
    const slideNumber = Number(payload.slideNumber);
    if (!Number.isInteger(slideNumber) || slideNumber < 1) {
      throw new Error('slideNumber должен быть положительным целым числом.');
    }

    const imageData = String(payload.imageData || '');
    const base64 = imageData.replace(/^data:image\/png;base64,/, '');
    if (!base64) throw new Error('PNG не передан.');

    const presentation = SlidesApp.openById(presentationId);
    const slides = presentation.getSlides();
    const slide = slides[slideNumber - 1];
    if (!slide) throw new Error('Слайд №' + slideNumber + ' не найден.');

    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      'image/png',
      'sim-report-slide-' + slideNumber + '.png'
    );

    const marker = MANAGED_IMAGE_PREFIX + slideNumber;
    const managedImages = slide.getImages().filter(function(image) {
      return image.getDescription() === marker || image.getTitle() === marker;
    });

    let image;
    if (managedImages.length) {
      image = managedImages[0].replace(blob, false);
      managedImages.slice(1).forEach(function(extraImage) { extraImage.remove(); });
    } else {
      image = slide.insertImage(
        blob,
        0,
        0,
        presentation.getPageWidth(),
        presentation.getPageHeight()
      );
    }

    image
      .setLeft(0)
      .setTop(0)
      .setWidth(presentation.getPageWidth())
      .setHeight(presentation.getPageHeight())
      .setTitle(marker)
      .setDescription(marker)
      .bringToFront();

    return jsonOutput_({
      ok: true,
      presentationId: presentationId,
      slideNumber: slideNumber,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return jsonOutput_({ ok: false, error: String(error && error.message || error) });
  }
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      // Поддержка обычной HTML-формы как запасного варианта.
    }
  }
  return (e && e.parameter) || {};
}

function jsonOutput_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
