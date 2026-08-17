export function downloadIcsCalendarEvent() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([100, 50, 100]);
    } catch {
      // Ignore vibration errors
    }
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yasmeen and Omar//Wedding Save the Date//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'DTSTART:20261119T160000Z',
    'DTEND:20261119T230000Z',
    'SUMMARY:Wedding Save the Date - Yasmeen & Omar',
    'LOCATION:AZHA New Cairo Venue\\, New Cairo\\, Egypt',
    'DESCRIPTION:Yasmeen & Omar are getting married!\\n\\nDate: 19 November 2026\\nVenue: AZHA New Cairo Venue\\nLocation Map: https://maps.app.goo.gl/j7xKH4SpBx2VppcFA',
    'URL:https://maps.app.goo.gl/j7xKH4SpBx2VppcFA',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'save-the-date-yasmeen-omar.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
