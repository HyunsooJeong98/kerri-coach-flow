import { Fragment, type ReactNode } from "react";
import { PolicyLayout, Chapter, Body, P } from "@/components/landing/PolicyLayout";
import { privacySections, privacyVersion } from "@/components/landing/privacy-content";

function LinkedText({ text }: { text: string }) {
  return text.split(/(hyunsoo@kerri\.co\.kr|www\.pipc\.go\.kr)/g).map((part, index) => {
    const email = part === "hyunsoo@kerri.co.kr";
    if (!email && part !== "www.pipc.go.kr") return <Fragment key={index}>{part}</Fragment>;
    return (
      <a key={index} href={email ? `mailto:${part}` : "https://www.pipc.go.kr"}
        target={email ? undefined : "_blank"} rel={email ? undefined : "noopener noreferrer"}
        className="font-medium text-primary underline underline-offset-4">
        {part}
      </a>
    );
  });
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  const content: ReactNode[] = [];
  let index = 0;
  while (index < paragraphs.length) {
    const text = paragraphs[index];
    if (text.startsWith("• ")) {
      const items: string[] = [];
      while (index < paragraphs.length && paragraphs[index].startsWith("• ")) {
        items.push(paragraphs[index]);
        index += 1;
      }
      content.push(<ul key={index} className="list-none space-y-2 pl-5">
        {items.map((item) => <li key={item} className="-indent-5"><LinkedText text={item} /></li>)}
      </ul>);
    } else {
      content.push(<P key={index}><LinkedText text={text} /></P>);
      index += 1;
    }
  }
  return content;
}

export function PrivacyDocument({ header }: { header: ReactNode }) {
  return (
    <PolicyLayout>
      {header}
      {privacySections.map((section) => (
        <Fragment key={section.title}>
          <Chapter>{section.title}</Chapter>
          <Body><Paragraphs paragraphs={section.paragraphs} /></Body>
        </Fragment>
      ))}
      <p className="mt-8 text-sm text-muted-foreground">{privacyVersion}</p>
    </PolicyLayout>
  );
}