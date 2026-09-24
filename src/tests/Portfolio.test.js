import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Profile from '$lib/components/Portfolio/Profile.svelte';

describe('Profile', () => {
  it('renders the name as a heading', () => {
    render(Profile, { props: { name: 'Max Eastman' } });
    expect(screen.getByRole('heading', { name: 'Max Eastman' })).toBeTruthy();
  });

  it('renders the tagline when provided', () => {
    render(Profile, {
      props: { name: 'Max Eastman', tagline: 'Editor of The Masses' },
    });
    expect(screen.getByText('Editor of The Masses')).toBeTruthy();
  });

  it('does not render a tagline element when omitted', () => {
    const { container } = render(Profile, { props: { name: 'Max Eastman' } });
    expect(container.querySelector('.tagline')).toBeNull();
  });

  it('renders an email link when provided', () => {
    render(Profile, {
      props: { name: 'Max Eastman', email: 'max@example.com' },
    });
    const link = screen.getByRole('link', { name: /email/i });
    expect(link.getAttribute('href')).toBe('mailto:max@example.com');
  });

  it('renders a GitHub link when provided', () => {
    render(Profile, {
      props: { name: 'Max Eastman', github: 'maxeastman' },
    });
    const link = screen.getByRole('link', { name: /github/i });
    expect(link.getAttribute('href')).toBe('https://github.com/maxeastman');
  });

  it('renders a LinkedIn link when provided', () => {
    render(Profile, {
      props: { name: 'Max Eastman', linkedin: 'maxeastman' },
    });
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link.getAttribute('href')).toBe(
      'https://linkedin.com/in/maxeastman'
    );
  });

  it('does not render contact links when none are provided', () => {
    const { container } = render(Profile, { props: { name: 'Max Eastman' } });
    expect(container.querySelectorAll('.contact li')).toHaveLength(0);
  });

  it('renders a photo with the name as default alt text', () => {
    render(Profile, {
      props: { name: 'Max Eastman', photo: '/photos/max.jpg' },
    });
    expect(screen.getByAltText('Max Eastman')).toBeTruthy();
  });

  it('renders a photo with explicit alt text when provided', () => {
    render(Profile, {
      props: {
        name: 'Max Eastman',
        photo: '/photos/max.jpg',
        photoAlt: 'Max Eastman in 1915',
      },
    });
    expect(screen.getByAltText('Max Eastman in 1915')).toBeTruthy();
  });

  it('keeps external photo URLs unchanged', () => {
    render(Profile, {
      props: {
        name: 'Max Eastman',
        photo: 'https://example.com/max.jpg',
        photoAlt: 'External photo',
      },
    });
    const img = screen.getByAltText('External photo');
    expect(img.getAttribute('src')).toBe('https://example.com/max.jpg');
  });

  it('renders bio bio paragraphs', () => {
    render(Profile, {
      props: {
        name: 'Max Eastman',
        bio: 'Currently editing The Masses.\n\nNext, translating Trotsky.',
      },
    });
    expect(screen.getByText('Currently editing The Masses.')).toBeTruthy();
    expect(screen.getByText('Next, translating Trotsky.')).toBeTruthy();
  });

  it('does not render the bio section when bio is omitted', () => {
    const { container } = render(Profile, { props: { name: 'Max Eastman' } });
    expect(container.querySelector('.now-next')).toBeNull();
  });
});
