import { Spin } from 'antd';
import React from 'react';
import { useMemberships } from '~/api/hooks/user';
import { useTypedSearchParams } from '~/hooks/useTypedSearchParams';
import NotFound from '~/routes/not-found';

type Props = {
  children: React.ReactNode;
};

export const DefaultOrgProtected = (props: Props) => {
  const { children } = props;
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
    return <NotFound />;
  }
  if (!params.get('org')) {
    const slug = memberships.data[0].organization?.slug;
    if (slug) {
      params.set('org', slug);
    }
  }
  if (
    !memberships.data.find((m) => m.organization?.slug === params.get('org'))
  ) {
    return <NotFound />;
  }
  return children;
};
