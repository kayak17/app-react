import get from 'lodash/get';

export const getHeaderLinkLast = (headerLink) => (
  get(headerLink, 'last.url', '')
);

export const getHeaderLinkNext = (headerLink) => (
  get(headerLink, 'next.url', '')
);

export const getHeaderLinkPrev = (headerLink) => (
  get(headerLink, 'prev.url', '')
);
