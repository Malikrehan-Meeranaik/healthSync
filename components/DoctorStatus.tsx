import { useState } from "react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDoctorStatus } from "@/lib/actions/doctor.actions";

const DoctorStatus = ({ initialStatus, userId }) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [pendingStatus, setPendingStatus] = useState(initialStatus);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (value) => {
    setPendingStatus(value);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await updateDoctorStatus(userId, pendingStatus);
      setCurrentStatus(pendingStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert to previous status on error
      setPendingStatus(currentStatus);
    } finally {
      setLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const handleCancel = () => {
    setPendingStatus(currentStatus);
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm font-medium">Status:</p>
      <div className="flex w-full items-center gap-2">
        <Select value={pendingStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Available</SelectItem>
            <SelectItem value="InActive">Not Available</SelectItem>
            <SelectItem value="OnLeave">Away</SelectItem>
          </SelectContent>
        </Select>

        {isConfirmOpen && (
          <ConfirmDialog
            title="Change Status"
            description={`Are you sure you want to change your status to ${pendingStatus.toLowerCase()}?`}
            onDelete={handleConfirm}
            cancelText="Cancel"
            deleteText="Confirm"
            loading={loading}
            buttonText="Change"
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorStatus;
