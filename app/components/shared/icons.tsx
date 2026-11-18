import {
  LuGraduationCap,
  LuHeartPulse,
  LuStore,
  LuWallet,
} from "react-icons/lu";
import {
  PiBrainDuotone,
  PiBrowsersDuotone,
  PiChalkboardTeacherDuotone,
  PiDeviceMobileCameraDuotone,
  PiHardDrivesDuotone,
  PiHeadsetDuotone,
  PiPaletteDuotone,
} from "react-icons/pi";
import type { ProductId } from "@/data/products";
import type { ServiceId } from "@/data/services";

export const productIcons: Record<ProductId, React.ReactNode> = {
  afya: <LuHeartPulse />,
  duka: <LuStore />,
  school: <LuGraduationCap />,
  pay: <LuWallet />,
};

// Duotone (filled + outline) icons: fuller, more "real" than line icons.
export const serviceIcons: Record<ServiceId, React.ReactNode> = {
  ai: <PiBrainDuotone />,
  web: <PiBrowsersDuotone />,
  mobile: <PiDeviceMobileCameraDuotone />,
  support: <PiHeadsetDuotone />,
  backend: <PiHardDrivesDuotone />,
  design: <PiPaletteDuotone />,
  training: <PiChalkboardTeacherDuotone />,
};
