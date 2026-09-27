/**
 * Utility for Web Notifications & Sound alerts for Khatam Reminders
 */

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notifications");
    return "denied";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return "denied";
  }
}

export function playReminderChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Pleasant Islamic harp-like chord
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  } catch (e) {
    console.error("Failed to play reminder chime:", e);
  }
}

export function sendKhatamNotification(title: string, body: string, url: string = "/khatam") {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    playReminderChime();
    const notif = new Notification(title, {
      body,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
    });

    notif.onclick = () => {
      window.focus();
      window.location.href = url;
    };
  }
}
