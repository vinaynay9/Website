import BoardClient from "./board-client";

export const metadata = {
  title: "Board of Directors · Vinay",
  description: "Private list of mentors and guides.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <BoardClient />;
}

