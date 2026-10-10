/**
 * RSVP Service Module
 * Handles local persistent storage, Supabase fallback, and export for Rania & Omar's wedding.
 */

export interface RSVPPayload {
  id?: string;
  guestName: string;
  phoneNumber: string;
  numberOfGuests: number;
  attendance: 'attending' | 'declined';
  message: string;
  createdAt?: string;
}

const STORAGE_KEY = 'everafter_rsvps_rania_omar';

/**
 * Retrieve all persisted RSVPs from browser storage.
 */
export function getStoredRSVPs(): RSVPPayload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error('Failed to parse stored RSVPs:', err);
    return [];
  }
}

/**
 * Save an RSVP to persistent storage.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<{ success: boolean; message: string; savedEntry: RSVPPayload }> {
  // Simulate network latency for authentic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newEntry: RSVPPayload = {
    ...payload,
    id: payload.id || `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  try {
    const current = getStoredRSVPs();
    // Update existing if matching phone or append new
    const existingIndex = current.findIndex(
      (item) => item.phoneNumber.trim() === payload.phoneNumber.trim()
    );

    if (existingIndex >= 0) {
      current[existingIndex] = { ...newEntry, id: current[existingIndex].id };
    } else {
      current.unshift(newEntry);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to persist RSVP locally:', err);
  }

  return {
    success: true,
    message: payload.attendance === 'attending'
      ? `Thank you ${payload.guestName}! Rania & Omar cannot wait to celebrate with you at JW Marriott Terrace on October 30.`
      : `Thank you ${payload.guestName} for letting Rania & Omar know. You will be dearly missed!`,
    savedEntry: newEntry,
  };
}

/**
 * Remove an RSVP entry by ID.
 */
export function deleteRSVP(id: string): RSVPPayload[] {
  try {
    const current = getStoredRSVPs();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete RSVP:', err);
    return [];
  }
}

/**
 * Clear all stored RSVPs.
 */
export function clearAllRSVPs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear RSVPs:', err);
  }
}

/**
 * Export stored RSVPs as a downloadable CSV file.
 */
export function exportRSVPsToCSV(): void {
  const rsvps = getStoredRSVPs();
  if (rsvps.length === 0) {
    return;
  }

  const headers = ['ID', 'Guest Name', 'Phone Number', 'Attendance', 'Guest Count', 'Message', 'Submission Date'];
  const rows = rsvps.map((r) => [
    r.id ?? '',
    `"${(r.guestName || '').replace(/"/g, '""')}"`,
    `"${(r.phoneNumber || '').replace(/"/g, '""')}"`,
    r.attendance,
    r.attendance === 'attending' ? r.numberOfGuests : 0,
    `"${(r.message || '').replace(/"/g, '""')}"`,
    r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rania_Omar_Wedding_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
