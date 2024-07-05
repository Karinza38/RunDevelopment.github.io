import { Markdown } from "../../../components/md/Markdown";
import { getPostFromSlug, getPosts } from "../../../lib/fs/posts";
import { Metadata } from "next";
import React from "react";
import { Footer } from "./Footer";

interface Props {
    params: { slug: string };
}

export default async function Page({ params }: Props) {
    const post = await getPostFromSlug(params.slug);
    if (!post) {
        throw new Error("Post " + params.slug + " not found");
    }

    return (
        <div>
            <article className="text-[15px] leading-6 md:text-base md:leading-[1.666rem]">
                <Markdown
                    code={post.markdown}
                    inlineCodeLanguage={post.metadata.inlineCodeLanguage}
                    draft={post.metadata.draft}
                    afterHeader={
                        <p className="my-4 text-zinc-500">{post.metadata.datePublished}</p>
                    }
                />
            </article>
            <Footer />
        </div>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostFromSlug(params.slug);
    if (!post) {
        throw new Error("Post " + params.slug + " not found");
    }

    return {
        title: post.metadata.title + " - RD",
        authors: {
            name: "Michael Schmidt",
        },
        openGraph: {
            type: "article",
            authors: ["Michael Schmidt"],
            publishedTime: post.metadata.datePublished,
            modifiedTime: post.metadata.dateModified,
            title: post.metadata.title,
        },
    };
}

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({
        slug: post.metadata.slug,
    }));
}
