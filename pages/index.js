import Image from "next/image";
import { Inter } from "next/font/google";

import OTPSec from "./OTPSec";

export default function Home() {
  return (
    <div className="bg-get text-gray-900">
      <OTPSec />
    </div>
  );
}
