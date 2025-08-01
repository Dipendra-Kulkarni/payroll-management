import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  User,
  FileText,
  X,
  MoreHorizontal,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'approval' | 'alert' | 'info' | 'shift' | 'leave';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  urgent?: boolean;
  avatar?: string;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Break Reminder',
    message: 'You\'ve been working for 4 hours. Time for a break!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    urgent: true
  },
  {
    id: '2',
    type: 'approval',
    title: 'Leave Request Needs Approval',
    message: 'Sarah Wilson has requested vacation leave for Dec 20-22',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    avatar: '/placeholder.svg',
    actionUrl: '/leave'
  },
  {
    id: '3',
    type: 'shift',
    title: 'Shift Reminder',
    message: 'Your shift starts in 1 hour (2:00 PM)',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: false
  },
  {
    id: '4',
    type: 'alert',
    title: 'Overtime Alert',
    message: 'You are approaching weekly overtime limit (38/40 hours)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    urgent: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Schedule Updated',
    message: 'Your schedule for next week has been updated',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    actionUrl: '/schedule'
  },
  {
    id: '6',
    type: 'leave',
    title: 'Leave Request Approved',
    message: 'Your vacation request for Dec 25 has been approved',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'reminder':
      return Clock;
    case 'approval':
      return User;
    case 'alert':
      return AlertTriangle;
    case 'info':
      return CheckCircle;
    case 'shift':
      return Calendar;
    case 'leave':
      return FileText;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string, urgent?: boolean) => {
  if (urgent) return 'text-destructive';
  
  switch (type) {
    case 'reminder':
      return 'text-warning';
    case 'approval':
      return 'text-primary';
    case 'alert':
      return 'text-destructive';
    case 'info':
      return 'text-success';
    case 'shift':
      return 'text-blue-500';
    case 'leave':
      return 'text-purple-500';
    default:
      return 'text-muted-foreground';
  }
};

const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return timestamp.toLocaleDateString();
};

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications
      if (Math.random() > 0.95) { // 5% chance every second
        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          type: ['reminder', 'approval', 'alert', 'info', 'shift'][Math.floor(Math.random() * 5)] as any,
          title: 'New Update',
          message: 'You have a new notification',
          timestamp: new Date(),
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep only 20 notifications
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => !n.read && n.urgent).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className={`absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs ${
                urgentCount > 0 ? 'bg-destructive' : 'bg-primary'
              }`}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {unreadCount > 0 && (
              <CardDescription>
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                {urgentCount > 0 && (
                  <span className="text-destructive ml-1">
                    ({urgentCount} urgent)
                  </span>
                )}
              </CardDescription>
            )}
          </CardHeader>
          
          <ScrollArea className="h-96">
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {notifications.map((notification, index) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    const iconColor = getNotificationColor(notification.type, notification.urgent);
                    
                    return (
                      <div key={notification.id}>
                        <div 
                          className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            {notification.avatar ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback className="text-xs">
                                  {notification.title.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`p-1.5 rounded-full bg-muted ${iconColor}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className={`text-sm font-medium truncate flex items-center gap-2 ${
                                  !notification.read ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  <span>{notification.title}</span>
                                  {notification.urgent && (
                                    <Badge variant="destructive" className="h-4 text-xs">
                                      Urgent
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                
                                {notification.actionUrl && (
                                  <Button variant="ghost" size="sm" className="h-5 text-xs px-2">
                                    View
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                            )}
                          </div>
                        </div>
                        
                        {index < notifications.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </ScrollArea>
          
          {notifications.length > 0 && (
            <div className="border-t p-2">
              <Button variant="ghost" className="w-full text-sm" size="sm">
                View all notifications
              </Button>
            </div>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}

// Toast notification component for immediate alerts
export function useToastNotification() {
  const showNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    // In a real app, this would integrate with your toast system
    console.log('Toast notification:', notification);
  };

  return { showNotification };
}
