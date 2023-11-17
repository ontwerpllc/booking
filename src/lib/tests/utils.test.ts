import { expect, describe, it } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
  it('should handle combining strings', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', 'b', 'c')).toBe('a b c');
    expect(cn('a', 'b', 'c', 'd')).toBe('a b c d');
    expect(cn('a', 'b', 'c', 'd', 'e')).toBe('a b c d e');
  });

  it('should handle combining boolean objects', () => {
    expect(cn({ a: true, b: true })).toBe('a b');
    expect(cn({ a: true, b: true, c: true })).toBe('a b c');
    expect(cn({ a: true, b: true, c: true, d: true })).toBe('a b c d');
    expect(cn({ a: true, b: true, c: true, d: true, e: true })).toBe(
      'a b c d e',
    );
  });

  it('should handle combining strings & boolean objects', () => {
    expect(cn('a', { b: true })).toBe('a b');
    expect(cn('a', 'b', { c: true })).toBe('a b c');
    expect(cn('a', 'b', 'c', { d: true })).toBe('a b c d');
    expect(cn('a', 'b', 'c', 'd', { e: true })).toBe('a b c d e');
  });

  it('should handle tailwind class overrides', () => {
    expect(cn('text-center')).toBe('text-center');
    expect(cn('text-center', 'text-right')).toBe('text-right');
    expect(cn('text-center', 'text-right', 'text-left')).toBe('text-left');
    expect(cn('text-center', 'text-right', 'text-left', 'text-justify')).toBe(
      'text-justify',
    );
    expect(
      cn(
        'text-center',
        'text-right',
        'text-left',
        'text-justify',
        'text-transparent',
      ),
    ).toBe('text-justify text-transparent');
  });

  it('should handle tailwind object overrides', () => {
    expect(cn('text-center', { 'text-right': true })).toBe('text-right');
    expect(cn('text-center', 'text-right', { 'text-left': true })).toBe(
      'text-left',
    );
    expect(
      cn('text-center', 'text-right', 'text-left', { 'text-justify': true }),
    ).toBe('text-justify');
    expect(
      cn('text-center', 'text-right', 'text-left', 'text-justify', {
        'text-transparent': true,
      }),
    ).toBe('text-justify text-transparent');
  });

  it('should handle tailwind class & object overrides', () => {
    expect(cn('text-center', { 'text-center': false })).toBe('text-center');
    expect(cn('text-center', 'text-right', { 'text-right': false })).toBe(
      'text-right',
    );
    expect(
      cn('text-center', 'text-right', 'text-left', { 'text-left': false }),
    ).toBe('text-left');
    expect(
      cn(
        'text-center',
        'text-right',
        'text-left',
        'text-justify',
        { 'text-justify': false },
        'text-transparent',
      ),
    ).toBe('text-justify text-transparent');
  });
});
