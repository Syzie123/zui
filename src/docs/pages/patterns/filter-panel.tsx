import {
  AddFiltersCard,
  PaymentTypeCard,
  OwnedByCard,
  LocationCard,
} from '../../../patterns/FilterPanel/FilterPanel';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, H3, P } from '../../page-kit';

export default function FilterPanelDoc() {
  return (
    <article>
      <H2>Add filters card</H2>
      <P>
        Top-level filter list. Each row drills down into a focused sub-panel
        (radio group, search list, count list).
      </P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <AddFiltersCard />
          </div>
        }
        minHeight="22rem"
        code={`<FilterPanel>
  <FilterPanel.Header title="Add Filters" onClear={() => {}} clearLabel="Clear All" />
  <FilterPanel.RowList>
    <FilterPanel.Row label="Status"       value="Declined, Closed, 2+" />
    <FilterPanel.Row label="Payment Type" value="Fixed Rate" />
    <FilterPanel.Row label="Rate" />
    <FilterPanel.Row label="Location" />
    <FilterPanel.Row label="Owned By" />
  </FilterPanel.RowList>
</FilterPanel>`}
      />

      <H2>Payment type — radio sub-panel</H2>
      <P>Single-select with the green ring radio.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <PaymentTypeCard />
          </div>
        }
        minHeight="22rem"
        code={`<FilterPanel>
  <FilterPanel.Header title="Payment Type" onBack={() => {}} />
  <FilterPanel.RadioList
    value={value}
    onChange={setValue}
    options={[
      { value: 'all',    label: 'All' },
      { value: 'hourly', label: 'Hourly Rate' },
      { value: 'fixed',  label: 'Fixed Rate' },
    ]}
  />
</FilterPanel>`}
      />

      <H2>Owned by — searchable list</H2>
      <P>Search input + selectable list with a checkmark on the active row.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <OwnedByCard />
          </div>
        }
        minHeight="24rem"
        code={`<FilterPanel>
  <FilterPanel.Header title="Owned By" onBack={() => {}} onClear={() => {}} clearLabel="Clear" />
  <FilterPanel.Search placeholder="Search here..." />
  <FilterPanel.ListItem
    leading={<CompanyIcon />}
    label="Sync Inc."
    selected
    trailing={<FilterPanel.SelectedCheck />}
  />
</FilterPanel>`}
      />

      <H2>Location — count list</H2>
      <P>Same shell, the trailing slot becomes a tabular count chip.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <LocationCard />
          </div>
        }
        minHeight="24rem"
        code={`<FilterPanel>
  <FilterPanel.Header title="Location" onBack={() => {}} />
  <FilterPanel.Search placeholder="Search location..." />
  <FilterPanel.ListItem
    label="Europe"
    trailing={<FilterPanel.Count value={523} />}
  />
</FilterPanel>`}
      />

      <H3>Anatomy</H3>
      <P>
        <code>FilterPanel</code> is the card shell. Compose the rest:{' '}
        <code>Header</code>, <code>RowList</code>, <code>Row</code>,{' '}
        <code>Search</code>, <code>ListItem</code>, <code>Count</code>,{' '}
        <code>SelectedCheck</code>, and the <code>RadioList</code> helper.
      </P>
    </article>
  );
}
