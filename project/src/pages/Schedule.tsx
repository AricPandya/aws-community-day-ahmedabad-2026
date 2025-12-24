import { useState, useEffect } from "react";
import { SEOHead } from "../components/Layout/SEOHead";
import { Calendar, MapPin, Clock } from "lucide-react";
import { schedulesApi, ScheduleEntry } from "../lib/api";

export function Schedule() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const data = await schedulesApi.getAll();
      setSchedules(data);
    } catch (error) {
      console.error("Failed to load schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.time_slot]) {
      acc[schedule.time_slot] = [null, null, null];
    }
    acc[schedule.time_slot][schedule.track_number - 1] = schedule;
    return acc;
  }, {} as Record<string, (ScheduleEntry | null)[]>);

  const scheduleData = Object.entries(groupedSchedules).map(([time, tracks]) => ({
    time,
    tracks: tracks.map((track) => ({
      title: track?.title || "",
      speaker: track?.speaker || "",
      room: track?.room || "",
    })),
  }));

  const fallbackData = [
    {
      time: "09:00 AM - 10:00 AM",
      tracks: [
        { title: "Registration & Breakfast", speaker: "", room: "Foyer" },
        { title: "Registration & Breakfast", speaker: "", room: "Foyer" },
        { title: "Registration & Breakfast", speaker: "", room: "Foyer" },
      ],
    },
    {
      time: "10:00 AM - 10:45 AM",
      tracks: [
        {
          title: "Keynote: The Future of Cloud",
          speaker: "Dr. Werner Vogels",
          room: "Main Hall",
        },
        {
          title: "Keynote: The Future of Cloud",
          speaker: "Dr. Werner Vogels",
          room: "Main Hall",
        },
        {
          title: "Keynote: The Future of Cloud",
          speaker: "Dr. Werner Vogels",
          room: "Main Hall",
        },
      ],
    },
    {
      time: "11:00 AM - 11:45 AM",
      tracks: [
        {
          title: "Serverless at Scale",
          speaker: "Alice Smith",
          room: "Track 1 Hall",
        },
        {
          title: "Kubernetes Deep Dive",
          speaker: "Bob Jones",
          room: "Track 2 Hall",
        },
        {
          title: "AI/ML on AWS",
          speaker: "Charlie Brown",
          room: "Track 3 Hall",
        },
      ],
    },
    {
      time: "12:00 PM - 01:00 PM",
      tracks: [
        { title: "Networking Lunch", speaker: "", room: "Cafeteria" },
        { title: "Networking Lunch", speaker: "", room: "Cafeteria" },
        { title: "Networking Lunch", speaker: "", room: "Cafeteria" },
      ],
    },
    {
      time: "01:00 PM - 01:45 PM",
      tracks: [
        {
          title: "Building Resilient Systems",
          speaker: "David Lee",
          room: "Track 1 Hall",
        },
        {
          title: "Security Best Practices",
          speaker: "Eva Green",
          room: "Track 2 Hall",
        },
        {
          title: "Data Analytics for Everyone",
          speaker: "Frank White",
          room: "Track 3 Hall",
        },
      ],
    },
    {
      time: "02:00 PM - 02:45 PM",
      tracks: [
        {
          title: "Cost Optimization Strategies",
          speaker: "Grace Hopper",
          room: "Track 1 Hall",
        },
        { title: "DevOps & CI/CD", speaker: "Hank Pym", room: "Track 2 Hall" },
        {
          title: "IoT and Edge Computing",
          speaker: "Ivy Doom",
          room: "Track 3 Hall",
        },
      ],
    },
    {
      time: "03:00 PM - 03:30 PM",
      tracks: [
        { title: "High Tea & Networking", speaker: "", room: "Foyer" },
        { title: "High Tea & Networking", speaker: "", room: "Foyer" },
        { title: "High Tea & Networking", speaker: "", room: "Foyer" },
      ],
    },
    {
      time: "03:30 PM - 04:15 PM",
      tracks: [
        {
          title: "Panel Discussion: Women in Tech",
          speaker: "Various",
          room: "Main Hall",
        },
        {
          title: "Panel Discussion: Women in Tech",
          speaker: "Various",
          room: "Main Hall",
        },
        {
          title: "Panel Discussion: Women in Tech",
          speaker: "Various",
          room: "Main Hall",
        },
      ],
    },

    {
      time: "04:30 PM - 05:00 PM",
      tracks: [
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
      ],
    },

    {
      time: "04:30 PM - 05:00 PM",
      tracks: [
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
        {
          title: "Closing Remarks & Prize Distribution",
          speaker: "Organizers",
          room: "Main Hall",
        },
      ],
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-lg">Loading schedule...</div>
      </main>
    );
  }

  const displayData = schedules.length > 0 ? scheduleData : fallbackData;

  return (
    <>
      <SEOHead
        title="Schedule | AWS Community Day 2026"
        description="Check out the agenda for AWS Community Day 2026. Three tracks of sessions covering Serverless, Containers, AI/ML, Security, and more."
      />
      <main className="min-h-screen bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Event Schedule
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plan your day across three tracks of technical sessions,
              workshops, and networking opportunities.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 md:w-48 sticky left-0 bg-gray-50 z-10"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    Track 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    Track 2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    Track 3
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayData.map((slot, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-inherit z-10 border-r border-gray-100">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        {slot.time}
                      </div>
                    </td>
                    {slot.tracks.map((track, trackIndex) => (
                      <td
                        key={trackIndex}
                        className="px-6 py-4 text-sm text-gray-700 align-top"
                      >
                        {track.title && (
                          <div className="flex flex-col h-full">
                            <span className="font-bold text-gray-900 mb-1 block">
                              {track.title}
                            </span>
                            {track.speaker && (
                              <span className="text-orange-600 font-medium mb-1 block">
                                {track.speaker}
                              </span>
                            )}
                            {track.room && (
                              <div className="flex items-center text-gray-500 text-xs mt-auto">
                                <MapPin className="w-3 h-3 mr-1" />
                                {track.room}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/tickets"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Reserve Your Spot
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
