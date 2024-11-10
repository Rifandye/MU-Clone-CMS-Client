import { Button, Divider } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="tw-flex tw-flex-col tw-gap-10 tw-items-center tw-justify-center tw-h-screen">
      <div className="tw-flex tw-items-center tw-gap-4">
        <Image
          src="/reddevils.png"
          width={25}
          height={25}
          alt="Red Devils Logo"
        />
        <Divider orientation="vertical" flexItem />
        <p>Welcome To Content Management System - MU Clone</p>
      </div>
      <Button variant="outlined" color="error" size="small">
        Dashboard
      </Button>
    </main>
  );
}