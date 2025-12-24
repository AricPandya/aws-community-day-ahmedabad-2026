import { createCrudApi } from "./base";
import { ScheduleEntry } from "../supabase";

export const schedulesApi = createCrudApi<ScheduleEntry>("schedules");
