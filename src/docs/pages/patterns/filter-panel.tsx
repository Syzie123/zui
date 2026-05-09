import {
  AddFiltersCard,
  PaymentTypeCard,
  OwnedByCard,
  LocationCard,
} from '../../../patterns/FilterPanel/FilterPanel';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P } from '../../page-kit';

export default function FilterPanelDoc() {
  return (
    <article>
      <H2>Filter list with sub-panels</H2>
      <P>
        A composed pattern: top-level filter rows that drill down into focused
        sub-panels (radio group, search list, count list). Built on{' '}
        <code>Card</code>, <code>Input</code>, and a tiny <code>FilterPanel</code>{' '}
        compound API.
      </P>
      <PreviewTabs
        preview={
          <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AddFiltersCard />
            <PaymentTypeCard />
            <OwnedByCard />
            <LocationCard />
          </div>
        }
        minHeight="32rem"
        code={`import { FilterPanel } from '@zui/patterns';

<FilterPanel>
  <FilterPanel.Header title="Add Filters" onClear={() => {}} />
  <FilterPanel.RowList>
    <FilterPanel.Row label="Status" value="Declined, 2+" />
    <FilterPanel.Row label="Payment Type" value="Fixed Rate" />
    <FilterPanel.Row label="Location" />
    <FilterPanel.Row label="Owned By" />
  </FilterPanel.RowList>
</FilterPanel>`}
      />
    </article>
  );
}
