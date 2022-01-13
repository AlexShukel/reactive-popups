import { PopupProps } from './PopupProps';
import { PopupsBag } from './PopupsBag';

export type PopupsContextType<P extends PopupProps> = Omit<
    PopupsBag<P>,
    'stock' | 'isPopupVisible'
>;
