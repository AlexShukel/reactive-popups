import { useCallback, useReducer } from 'react';

import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsBag } from '../types/PopupsBag';
import { popupsReducer } from '../utils/popupsReducer';

export const usePopupsBag = (): PopupsBag => {
    const [popupsState, dispatch] = useReducer(popupsReducer, { popups: {} });

    const getPopupsByGroup = useCallback(
        (group: PopupGroup) => {
            if (!popupsState.popups[group.groupId]) {
                return [];
            }

            return Object.values(popupsState.popups[group.groupId]);
        },
        [popupsState]
    );

    const getPopup = useCallback(
        ({ groupId, id }: PopupIdentifier) => {
            if (
                !popupsState.popups[groupId] ||
                !popupsState.popups[groupId][id]
            ) {
                return null;
            }

            return popupsState.popups[groupId][id];
        },
        [popupsState]
    );

    const unmount = useCallback((popupIdentifier: PopupIdentifier) => {
        dispatch({ type: 'unmount', payload: { popupIdentifier } });
    }, []);

    const mount = useCallback(<P = {}>(popup: Popup<P>) => {
        dispatch({
            type: 'mount',
            payload: {
                popup: popup as unknown as Popup<object>,
            },
        });

        return popup.popupIdentifier;
    }, []);

    const close = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const popup = getPopup(popupIdentifier);
            popup?.close();
        },
        [getPopup]
    );

    return {
        mount,
        unmount,
        getPopupsByGroup,
        getPopup,
        close,
    };
};
