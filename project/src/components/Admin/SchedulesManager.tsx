import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ScheduleEntry, schedulesApi } from "../../lib/api";

interface SchedulesManagerProps {
  schedules: ScheduleEntry[];
  onUpdate: (schedules: ScheduleEntry[]) => void;
}

const validateTrackAvailability = (
  schedules: ScheduleEntry[],
  timeSlot: string,
  trackNumber: number,
  excludeId?: string
): boolean => {
  return !schedules.some(
    (s) => s.time_slot === timeSlot && s.track_number === trackNumber && s.id !== excludeId
  );
};

const getAvailableTracks = (schedules: ScheduleEntry[], timeSlot: string, excludeId?: string): number[] => {
  const usedTracks = schedules
    .filter((s) => s.time_slot === timeSlot && s.id !== excludeId)
    .map((s) => s.track_number);
  return [1, 2, 3].filter((t) => !usedTracks.includes(t));
};

export function SchedulesManager({
  schedules,
  onUpdate,
}: SchedulesManagerProps) {
  const [editing, setEditing] = useState<ScheduleEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSchedules = schedules.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.speaker?.toLowerCase().includes(search.toLowerCase()) ||
    s.room?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedSchedules = [...filteredSchedules].sort(
    (a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );

  const groupedSchedules = sortedSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.time_slot]) {
      acc[schedule.time_slot] = [];
    }
    acc[schedule.time_slot].push(schedule);
    return acc;
  }, {} as Record<string, ScheduleEntry[]>);

  const deleteSchedule = async (id: string) => {
    if (confirm("Delete this schedule entry?")) {
      try {
        await schedulesApi.delete(id);
        onUpdate(schedules.filter((s) => s.id !== id));
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  const saveSchedule = async (
    schedule: Omit<ScheduleEntry, "id" | "created_at">
  ) => {
    if (!validateTrackAvailability(schedules, schedule.time_slot, schedule.track_number)) {
      alert(`Track ${schedule.track_number} is already occupied for this time slot`);
      return;
    }
    try {
      const newSchedule = await schedulesApi.create(schedule);
      onUpdate([...schedules, newSchedule]);
      setAdding(false);
    } catch (error) {
      alert("Failed to add");
    }
  };

  const updateSchedule = async (schedule: ScheduleEntry) => {
    if (!validateTrackAvailability(schedules, schedule.time_slot, schedule.track_number, schedule.id)) {
      alert(`Track ${schedule.track_number} is already occupied for this time slot`);
      return;
    }
    try {
      const updated = await schedulesApi.update(schedule.id, {
        time_slot: schedule.time_slot,
        start_time: schedule.start_time,
        track_number: schedule.track_number,
        title: schedule.title,
        speaker: schedule.speaker,
        room: schedule.room,
      });
      onUpdate(schedules.map((s) => (s.id === schedule.id ? updated : s)));
      setEditing(null);
    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Manage Schedule</h2>
          <button
            onClick={() => setAdding(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title, speaker, or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
          <div className="flex border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm ${viewMode === "grid" ? "bg-orange-600 text-white" : "bg-white text-gray-700"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-orange-600 text-white" : "bg-white text-gray-700"}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="space-y-6">
          {Object.entries(groupedSchedules).map(([timeSlot, entries]) => (
            <div key={timeSlot} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3">{timeSlot}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((trackNum) => {
                  const entry = entries.find((e) => e.track_number === trackNum);
                  return (
                    <div key={trackNum} className="border rounded p-3">
                      <div className="text-xs text-gray-500 mb-2">
                        Track {trackNum}
                      </div>
                      {entry ? (
                        <>
                          <div className="font-medium">{entry.title}</div>
                          {entry.speaker && (
                            <div className="text-sm text-orange-600">
                              {entry.speaker}
                            </div>
                          )}
                          {entry.room && (
                            <div className="text-xs text-gray-500">
                              {entry.room}
                            </div>
                          )}
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setEditing(entry)}
                              className="text-indigo-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSchedule(entry.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-sm">No entry</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Track</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Speaker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSchedules.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.time_slot}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Track {entry.track_number}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.title}</td>
                  <td className="px-6 py-4 text-sm text-orange-600">{entry.speaker || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{entry.room || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(entry)} className="text-indigo-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteSchedule(entry.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && (
        <ScheduleModal
          schedules={schedules}
          onSave={saveSchedule}
          onCancel={() => setAdding(false)}
        />
      )}
      {editing && (
        <ScheduleModal
          schedules={schedules}
          schedule={editing}
          onSave={(data) => updateSchedule({ ...editing, ...data })}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function ScheduleModal({
  schedules,
  schedule,
  onSave,
  onCancel,
}: {
  schedules: ScheduleEntry[];
  schedule?: ScheduleEntry;
  onSave: (data: Omit<ScheduleEntry, "id" | "created_at">) => void;
  onCancel: () => void;
}) {
  const getDefaultDateTime = () => {
    if (!schedule?.start_time) return "";
    const date = new Date(schedule.start_time);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const getEndDateTime = () => {
    if (!schedule?.time_slot) return "";
    const match = schedule.time_slot.match(/(\d{2}:\d{2} [AP]M) - (\d{2}:\d{2} [AP]M)/);
    if (!match) return "";
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      const date = new Date(schedule.start_time!);
      date.setHours(h, m, 0, 0);
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60000);
      return localDate.toISOString().slice(0, 16);
    };
    return parseTime(match[2]);
  };

  const [formData, setFormData] = useState({
    start_time: getDefaultDateTime(),
    end_time: getEndDateTime(),
    track_number: schedule?.track_number || 1,
    title: schedule?.title || "",
    speaker: schedule?.speaker || "",
    room: schedule?.room || "",
  });

  const [currentTimeSlot, setCurrentTimeSlot] = useState("");
  const [availableTracks, setAvailableTracks] = useState<number[]>([1, 2, 3]);

  const updateAvailableTracks = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return;
    const formatTime = (datetime: string) => {
      const date = new Date(datetime);
      let h = date.getHours();
      const m = date.getMinutes();
      const period = h >= 12 ? "PM" : "AM";
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
    };
    const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    setCurrentTimeSlot(timeSlot);
    const available = getAvailableTracks(schedules, timeSlot, schedule?.id);
    setAvailableTracks(available);
    if (available.length > 0 && !available.includes(formData.track_number)) {
      setFormData((prev) => ({ ...prev, track_number: available[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatTime = (datetime: string) => {
      const date = new Date(datetime);
      let h = date.getHours();
      const m = date.getMinutes();
      const period = h >= 12 ? "PM" : "AM";
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")} ${period}`;
    };
    const time_slot = `${formatTime(formData.start_time)} - ${formatTime(
      formData.end_time
    )}`;
    onSave({
      time_slot,
      start_time: new Date(formData.start_time).toISOString(),
      track_number: formData.track_number,
      title: formData.title,
      speaker: formData.speaker,
      room: formData.room,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {schedule ? "Edit" : "Add"} Schedule Entry
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => {
                setFormData({ ...formData, start_time: e.target.value });
                updateAvailableTracks(e.target.value, formData.end_time);
              }}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) => {
                setFormData({ ...formData, end_time: e.target.value });
                updateAvailableTracks(formData.start_time, e.target.value);
              }}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Track {availableTracks.length < 3 && currentTimeSlot && `(${availableTracks.length} available)`}
            </label>
            <select
              value={formData.track_number}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  track_number: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
              required
            >
              {[1, 2, 3].map((track) => (
                <option key={track} value={track} disabled={!availableTracks.includes(track)}>
                  Track {track} {!availableTracks.includes(track) ? "(Occupied)" : ""}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formData.speaker}
            onChange={(e) =>
              setFormData({ ...formData, speaker: e.target.value })
            }
            placeholder="Speaker (optional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            placeholder="Room (optional)"
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
