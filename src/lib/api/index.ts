import { authService } from './auth';
import { recipientService } from './recipients';
import { hamperService } from './hampers';
import { deliveryService } from './deliveries';
import { reportService } from './reports';
import { userService } from './users';

// Export all API services
export const api = {
  auth: authService,
  recipients: recipientService,
  hampers: hamperService,
  deliveries: deliveryService,
  reports: reportService,
  users: userService,
};
