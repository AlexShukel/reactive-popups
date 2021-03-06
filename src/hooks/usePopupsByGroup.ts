import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';

export const usePopupsByGroup = (group: PopupGroup): Popup<object>[] => {
    const { getPopupsByGroup } = usePopupsContext();

    const popups = getPopupsByGroup(group);

    return popups;
};
