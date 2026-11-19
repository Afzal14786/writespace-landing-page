import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

import {
  Avatar,
  Badge,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";

import { site } from "@/content/site";

const actionIcons = {
  React: Heart,
  Reply: MessageCircle,
  Save: Bookmark,
  Share: Share2,
} as const;

export function OneIdea() {
  const post = site.mocks.heroPost;
  const article = site.idea.article;

  return (
    <Section id="idea" background="surface" className="border-y border-line">
      <Container>
        <div className="mx-auto max-w-content">
          <div className="max-w-copy">
            <Heading level={2}>{site.idea.heading}</Heading>

            <p className="mt-5 font-copy text-base leading-7 text-body sm:text-[17px] sm:leading-7">
              {site.idea.description}
            </p>
          </div>

          {/* The shared bar sits between cards on mobile and below them on desktop. */}
          <div className="mx-auto mt-10 grid max-w-[1000px] grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-4">
            {/* Post card */}
            <Card className="flex min-h-[300px] w-full max-w-[480px] flex-col p-5 sm:p-6 md:col-start-1 md:row-start-1">
              <div className="flex items-center gap-3">
                <Avatar
                  initials={post.initials}
                  label={`${post.author} profile`}
                  color="lavender"
                  size="md"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-copy text-sm font-semibold text-ink">
                    {post.author}
                  </p>

                  <p className="font-copy text-xs text-muted">
                    {post.metadata}
                  </p>
                </div>

                <Badge variant="lavender" className="text-lavender-text">
                  {site.idea.post.badge}
                </Badge>
              </div>

              <p className="mt-5 font-copy text-[15px] leading-7 text-body">
                {post.text}
              </p>

              {/* Coded thumbnail placeholders for the two post images. */}
              <div
                className="mt-5 grid grid-cols-2 gap-3"
                aria-label="Two post image previews"
              >
                <div
                  aria-hidden="true"
                  className="aspect-[16/9] rounded-xl border border-line bg-gradient-to-br from-lavender via-[#E7E1FF] to-peach"
                />
                <div
                  aria-hidden="true"
                  className="aspect-[16/9] rounded-xl border border-line bg-gradient-to-br from-peach via-[#FFE0D5] to-lavender"
                />
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                <span className="font-copy text-xs text-muted">
                  {post.reactions} reactions
                </span>
                <span className="font-copy text-xs text-muted">
                  {post.comments} replies
                </span>
              </div>

              <p className="mt-4 font-copy text-sm text-muted">
                {site.idea.post.caption}
              </p>
            </Card>

            {/* Shared interaction bar */}
            <div className="order-2 flex w-full flex-col items-center justify-center gap-2 md:order-none md:col-span-2 md:row-start-2">
              <div
                role="group"
                aria-label="Interactions shared by Posts and Articles"
                className="flex w-full max-w-[500px] flex-wrap items-center justify-center gap-2 rounded-pill border border-line bg-surface px-3 py-3 shadow-card sm:gap-5 sm:px-5"
              >
                {site.idea.sharedActions.map((action) => {
                  const Icon = actionIcons[action as keyof typeof actionIcons];

                  return (
                    <span
                      key={action}
                      className="inline-flex items-center gap-1.5 font-copy text-xs font-medium text-body sm:text-sm"
                    >
                      <Icon aria-hidden="true" className="size-4 text-violet" />
                      {action}
                    </span>
                  );
                })}
              </div>

              <p className="font-copy text-xs font-medium text-muted">
                {site.idea.sharedCaption}
              </p>
            </div>

            {/* Article card */}
            <Card className="flex min-h-[300px] w-full max-w-[480px] flex-col p-5 sm:p-6 md:col-start-2 md:row-start-1">
              <div
                aria-hidden="true"
                className="relative mb-5 aspect-[16/8] overflow-hidden rounded-xl border border-line bg-gradient-to-br from-ink via-[#51448F] to-violet"
              >
                <div className="absolute -right-8 -top-10 size-40 rounded-full border-[18px] border-surface/10" />
                <div className="absolute -bottom-12 left-8 size-44 rounded-full bg-coral/70 blur-2xl" />
                <div className="absolute bottom-4 left-5 font-mono text-xs tracking-[0.2em] text-surface/75">
                  WRITESPACE / ARTICLE
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Badge variant="peach">{site.idea.article.badge}</Badge>

                <span className="font-mono text-xs text-muted">
                  {article.readTime}
                </span>
              </div>

              <h3 className="mt-4 font-headline text-2xl font-semibold leading-tight tracking-tight text-ink">
                {article.title}
              </h3>

              <p className="mt-4 font-copy text-sm text-muted">
                {site.idea.article.caption}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
