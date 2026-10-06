'use client';

import { useNotification } from '@/libs/alignui/hooks/use-notification';

import * as Notification from '@/libs/alignui/components/ui/notification';

const NotificationProvider = () => {
  const { notifications } = useNotification();

  return (
    <Notification.Provider>
      {notifications.map(({ id, ...rest }) => {
        return <Notification.Root key={id} {...rest} />;
      })}
      <Notification.Viewport />
    </Notification.Provider>
  );
};

export { NotificationProvider };
