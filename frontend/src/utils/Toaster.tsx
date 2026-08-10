import { toast } from "sonner";
import {
  CircleCheckBig,
  CircleChevronDown,
  CircleAlert,
  OctagonX,
} from "lucide-react";

const toastStyles = {
  success: {
    border: "border-green-600",
    icon: <CircleCheckBig size={24} className="text-green-600" />,
  },
  error: {
    border: "border-red-600",
    icon: <CircleAlert size={24} className="text-red-600" />,
  },
  info: {
    border: "border-blue-600",
    icon: <CircleChevronDown size={24} className="text-blue-600" />,
  },
  warning: {
    border: "border-yellow-500",
    icon: <OctagonX size={24} className="text-yellow-500" />,
  },
};

const showToast = (
  type: keyof typeof toastStyles,
  message: string
) => {
  const { border, icon } = toastStyles[type];

  toast.custom(() => (
    <div
      className={`flex items-center gap-4 bg-white shadow-lg rounded-lg p-4 border-l-4 ${border} min-w-[300px]`}
    >
      {icon}

      <div>
        <p className="font-semibold text-text-body">
          {message}
        </p>

        <p className="text-sm text-gray-500">
          {type === "success" && "Successfully completed"}
          {type === "error" && "Something went wrong"}
          {type === "info" && "Information"}
          {type === "warning" && "Please check this"}
        </p>
      </div>
    </div>
  ));
};

export const CSFCustomToaster = {
  success: (message: string) => showToast("success", message),
  error: (message: string) => showToast("error", message),
  info: (message: string) => showToast("info", message),
  warning: (message: string) => showToast("warning", message),
};
