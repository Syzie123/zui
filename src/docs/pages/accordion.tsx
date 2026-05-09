import { Accordion } from '../../components/Accordion';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

const FAQ = [
  { v: 'a', q: 'Is there a free trial available?', a: 'Yes — try us for 30 days free.' },
  { v: 'b', q: 'Can I change my plan later?',      a: 'Yes — pricing scales with your team.' },
  { v: 'c', q: 'What is your cancellation policy?', a: 'Cancel anytime, refund unused balance.' },
  { v: 'd', q: 'How does billing work?',            a: 'Per workspace, not per account.' },
];

export default function AccordionDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Accordion uses the modern <code>grid-template-rows: 0fr → 1fr</code> trick
        for animating to <code>auto</code> height — smooth, no JS measurements.
      </P>
      <PreviewTabs
        preview={
          <Accordion
            type="single"
            collapsible
            defaultValue="a"
            className="w-full max-w-lg"
          >
            {FAQ.map((i) => (
              <Accordion.Item key={i.v} value={i.v}>
                <Accordion.Trigger>{i.q}</Accordion.Trigger>
                <Accordion.Content>{i.a}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        }
        code={`<Accordion type="single" collapsible defaultValue="a">
  <Accordion.Item value="a">
    <Accordion.Trigger>Is there a free trial?</Accordion.Trigger>
    <Accordion.Content>Yes — 30 days free.</Accordion.Content>
  </Accordion.Item>
  …
</Accordion>`}
      />

      <H2>Multiple open</H2>
      <PreviewTabs
        preview={
          <Accordion type="multiple" defaultValue={['a', 'b']} className="w-full max-w-lg">
            {FAQ.map((i) => (
              <Accordion.Item key={i.v} value={i.v}>
                <Accordion.Trigger>{i.q}</Accordion.Trigger>
                <Accordion.Content>{i.a}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        }
        code={`<Accordion type="multiple" defaultValue={['a', 'b']}>
  …
</Accordion>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'type',
            type: '"single" | "multiple"',
            defaultValue: '"single"',
            description: 'How many items can be open at once.',
          },
          {
            name: 'collapsible',
            type: 'boolean',
            description: 'Allow closing all items in single mode.',
          },
          { name: 'value', type: 'string | string[]', description: 'Controlled open value(s).' },
        ]}
      />
    </article>
  );
}
