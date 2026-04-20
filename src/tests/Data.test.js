import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BigNumber from '$lib/components/Data/BigNumber.svelte';
import RankingList from '$lib/components/Data/RankingList.svelte';

describe('BigNumber', () => {
  it('renders the number and label', () => {
    render(BigNumber, { props: { number: '42%', label: 'Approval Rating' } });
    expect(screen.getByText('42%')).toBeTruthy();
    expect(screen.getByText('Approval Rating')).toBeTruthy();
  });

  it('renders a footnote when provided', () => {
    render(BigNumber, {
      props: {
        number: '$1.2M',
        label: 'Total Budget',
        footnote: 'As of 2024',
      },
    });
    expect(screen.getByText('As of 2024')).toBeTruthy();
  });

  it('does not render a footnote when omitted', () => {
    const { container } = render(BigNumber, {
      props: { number: '100', label: 'Count' },
    });
    expect(container.querySelector('.footnote')).toBeNull();
  });
});

describe('RankingList', () => {
  const sampleItems = [
    { rank: 1, title: 'Alpha', description: 'First item' },
    { rank: 2, title: 'Beta', description: 'Second item' },
    { rank: 3, title: 'Gamma', description: 'Third item' },
    { rank: 4, title: 'Delta', description: 'Fourth item' },
    { rank: 5, title: 'Epsilon', description: 'Fifth item' },
  ];

  it('renders a title when provided', () => {
    render(RankingList, {
      props: { title: 'My Rankings', items: sampleItems },
    });
    expect(screen.getByText('My Rankings')).toBeTruthy();
  });

  it('renders all items when pageSize is not set', () => {
    render(RankingList, { props: { items: sampleItems } });
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Epsilon')).toBeTruthy();
  });

  it('renders only the first page of items when pageSize is set', () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
    expect(screen.queryByText('Gamma')).toBeNull();
  });

  it('shows pagination controls when pageSize is set', () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    expect(screen.getByText(/Showing 1–2 of 5/)).toBeTruthy();
    expect(screen.getByText('← Previous')).toBeTruthy();
    expect(screen.getByText('Next →')).toBeTruthy();
  });

  it('disables Previous button on the first page', () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    const prevBtn = screen.getByText('← Previous');
    expect(prevBtn.disabled).toBe(true);
  });

  it('navigates to the next page when Next is clicked', async () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    const nextBtn = screen.getByText('Next →');
    await nextBtn.click();
    expect(screen.getByText('Gamma')).toBeTruthy();
    expect(screen.getByText('Delta')).toBeTruthy();
    expect(screen.queryByText('Alpha')).toBeNull();
    expect(screen.getByText(/Showing 3–4 of 5/)).toBeTruthy();
  });

  it('disables Next button on the last page', async () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    const nextBtn = screen.getByText('Next →');
    await nextBtn.click(); // page 2
    await nextBtn.click(); // page 3 (last)
    expect(screen.getByText('Epsilon')).toBeTruthy();
    expect(nextBtn.disabled).toBe(true);
    expect(screen.getByText(/Showing 5–5 of 5/)).toBeTruthy();
  });

  it('navigates back with Previous button', async () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 2 } });
    const nextBtn = screen.getByText('Next →');
    await nextBtn.click(); // page 2
    const prevBtn = screen.getByText('← Previous');
    await prevBtn.click(); // back to page 1
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
    expect(screen.getByText(/Showing 1–2 of 5/)).toBeTruthy();
  });

  it('does not show pagination when all items fit on one page', () => {
    render(RankingList, { props: { items: sampleItems, pageSize: 10 } });
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Epsilon')).toBeTruthy();
    expect(screen.queryByText('← Previous')).toBeNull();
  });

  it('does not show pagination without items', () => {
    render(RankingList, { props: { title: 'Empty' } });
    expect(screen.getByText('Empty')).toBeTruthy();
    expect(screen.queryByText('← Previous')).toBeNull();
  });
});
