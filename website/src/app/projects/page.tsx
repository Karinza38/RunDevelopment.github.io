import React from "react";
import { Metadata } from "next";
import BasicPage from "../../components/BasicPage";
import { Markdown } from "../../components/md/Markdown";
import { ProjectInfo, projectsByYear } from "./projects";
import { formatDateString } from "../../lib/util";
import Link from "next/link";
import { H2 } from "../headings";

export const metadata: Metadata = {
    title: "Projects by RunDev",
    authors: {
        name: "Michael Schmidt",
    },
    openGraph: {
        type: "website",
    },
};

export default function Page() {
    return (
        <BasicPage selectedLink="projects">
            <div className="narrow-container py-8">
                {projectsByYear.length === 0 && (
                    <>
                        <H2>Nothing to see here</H2>
                        <p className="narrow">{"I haven't published any projects here yet."}</p>
                    </>
                )}
                {projectsByYear.map(([year, projects]) => {
                    return (
                        <React.Fragment key={year}>
                            <H2>{year}</H2>
                            <div className="narrow">
                                {projects.map((project) => (
                                    <ProjectCard key={project.url} project={project} />
                                ))}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </BasicPage>
    );
}

function ProjectCard({ project }: { project: ProjectInfo }) {
    return (
        <div className="my-4 rounded-md">
            <Link
                href={project.url}
                className="text-blue-300 transition-colors hover:text-blue-400"
            >
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-zinc-200">
                    <span className="text-sm text-zinc-400">
                        {formatDateString(project.date, false)} -{" "}
                    </span>
                    <Markdown inline markdown={project.description} />
                </p>
            </Link>
        </div>
    );
}
