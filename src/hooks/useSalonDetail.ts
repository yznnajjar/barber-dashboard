import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { Salon, Booking, QueueEntry } from '../lib/types';

export function useSalonDetail(id: string | string[] | undefined) {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [queueLoading, setQueueLoading] = useState(false);

  const fetchSalon = async () => {
    try {
      const { data } = await api.get(`/salons/${id}`);
      setSalon(data);
    } catch {}
    setLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get(`/bookings?salonId=${id}&limit=50`);
      setBookings(data.data || []);
    } catch {}
  };

  const fetchQueue = async () => {
    try {
      const { data } = await api.get(`/salons/${id}/queue`);
      setQueue(data || []);
    } catch {}
  };

  useEffect(() => {
    if (!id) return;
    fetchSalon();
    fetchBookings();
    fetchQueue();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const callNext = async () => {
    setQueueLoading(true);
    try {
      await api.post(`/queue/call-next/${id}`, {});
      await fetchQueue();
    } catch {}
    setQueueLoading(false);
  };

  const serveEntry = async (entryId: string) => {
    await api.post(`/queue/serve/${entryId}`);
    await fetchQueue();
  };

  const doneEntry = async (entryId: string) => {
    await api.post(`/queue/done/${entryId}`);
    await fetchQueue();
  };

  const activeQueue = queue.filter((q) =>
    ['WAITING', 'CALLED', 'SERVING'].includes(q.status)
  );

  return {
    salon,
    bookings,
    queue,
    activeQueue,
    loading,
    queueLoading,
    callNext,
    serveEntry,
    doneEntry,
  };
}
