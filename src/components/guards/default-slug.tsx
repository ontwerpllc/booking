import { Spin } from 'antd';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemberships } from '~/api/hooks/user';
import { useTypedSearchParams } from '~/hooks/useTypedSearchParams';
import NotFound from '~/routes/not-found';

export type DefaultOrgProtectedProps = {
  children: React.ReactNode;
};

export const DefaultOrgProtected = ({ children }: DefaultOrgProtectedProps) => {
  const location = useLocation();
  const params = useTypedSearchParams<'admin.dashboard'>();
  const memberships = useMemberships();
  if (memberships.isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }
  if (!memberships?.data?.length) {
    return children;
  }
  if (!params.get('org')) {
    const slug = memberships.data[0].organization?.slug;
    if (!slug) return <NotFound />;
    return (
      <Navigate
        to={{
          pathname: location.pathname,
          search: params.queryWith('org', slug),
        }}
      />
    );
  }
  if (
    !memberships.data.find((m) => m.organization?.slug === params.get('org'))
  ) {
    return <NotFound />;
  }
  return children;
};
