import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/buttons/Button";

import { updateProject } from "@/firestore/project";

import { Project } from "@/types";

interface IProjectSlug {
  project?: Project;
}
const WhitelistDates = ({ project }: IProjectSlug) => {
  const router = useRouter();
  const slug = router.query.project as string;

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const [loading, setLoading] = useState(false);

  const update = async () => {
    if (!startDate || !endDate)
      return toast.error("Either date cannot be empty");

    if (endDate <= startDate)
      return toast.error("End date cannot be before or equal to start date");

    setLoading(true);

    await updateProject({
      projectSlug: slug,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toString(),
      updatedAt: new Date().toISOString(),
    })
      .then(() => {
        toast.success("Dates updated");
      })
      .catch(() => {
        toast.error("Unable to update dates");
      });

    setLoading(false);
  };

  useEffect(() => {
    setStartDate(project ? new Date(project?.startDate) : new Date());
    setEndDate(project ? new Date(project?.endDate) : new Date());
  }, [project]);

  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <p>Start Date</p>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={setStartDate}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderInput={(params: any) => <TextField {...params} />}
            />
          </div>

          <div className="flex flex-col gap-3">
            <p>End Date</p>
            <DesktopDatePicker
              label="End Date"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={setEndDate}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderInput={(params: any) => <TextField {...params} />}
            />
          </div>
        </div>
      </LocalizationProvider>

      <Button isLoading={loading} onClick={update} className="mt-4">
        Update Dates
      </Button>
    </div>
  );
};

export default WhitelistDates;
