export interface MenuItem {
   title?: string;
   url?: string;
   permissions?: string[];
   icon?: string;
   loginRequired?: boolean;
   hideAfterLogin?: boolean;
   contextMenu?: any[];
}