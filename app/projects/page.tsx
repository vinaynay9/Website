import ProjectsClient from "./projects-client";

export const metadata = {
  title: "Projects · Vinay",
  description: "A calm list of current builds, shipped releases, and the craft behind each launch."
};

export default function Page() {
  return <ProjectsClient />;
}

