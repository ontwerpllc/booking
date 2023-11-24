import { Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from '~/api/hooks/auth';
import { useProfile } from '~/api/hooks/user';
import { PATH } from '~/constants/paths';
import { getInitials } from '~/lib/utils';

export const Profile = () => {
  const navigate = useNavigate();
  const profile = useProfile();
  const signOut = useSignOut();

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'Your Profile',
            key: 'profile',
            onClick: () => {
              navigate(PATH.user.profile);
            },
          },
          {
            label: 'Sign out',
            key: 'sign-out',
            danger: true,
            onClick: () => {
              signOut.mutate();
            },
          },
        ],
      }}
      arrow
    >
      <Avatar className="select-none cursor-pointer">
        {getInitials(`${profile.data?.first_name} ${profile.data?.last_name}`)}
      </Avatar>
    </Dropdown>
  );
};
