import { getFeatureFlags } from '../../utils/configuration';
import ChangeTaskListConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.change_task_list as ChangeTaskListConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
